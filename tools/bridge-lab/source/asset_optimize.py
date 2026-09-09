"""Split and loss-conservatively repack the four bridge GLBs without editing originals.

Requires Python 3.10+, Pillow and NumPy. Run from anywhere:
  python source/asset_optimize.py
  python source/asset_optimize.py --verify-only
  python source/asset_optimize.py --source /path/to/original/models --root /path/to/WebV1

The current inputs have no animations, skins, morph targets, compressed geometry or
external buffers. Unexpected such inputs fail explicitly rather than losing data.
"""
from __future__ import annotations
import argparse
from copy import deepcopy
from datetime import datetime, timezone
import hashlib
from io import BytesIO
import json
import math
from pathlib import Path
import struct
import sys

import numpy as np
from PIL import Image, __version__ as PILLOW_VERSION

IDS = ('girder', 'cable_stayed', 'suspension', 'arch')
ENVIRONMENT_GROUPS = {'90_Environment', '90_Set'}


def sha(data):
    return hashlib.sha256(data).hexdigest()


def canonical(value):
    return json.dumps(value, sort_keys=True, separators=(',', ':'), ensure_ascii=False).encode('utf-8')


def payload_key(value, ignore_name=False):
    clean = deepcopy(value)
    if ignore_name: clean.pop('name', None)
    return sha(canonical(clean))


def texture_infos(value):
    """Yield standard/KHR material texture-info dictionaries, including clearcoat."""
    if isinstance(value, dict):
        for key, item in value.items():
            if key.endswith('Texture') and isinstance(item, dict) and 'index' in item:
                yield key, item
            yield from texture_infos(item)
    elif isinstance(value, list):
        for item in value: yield from texture_infos(item)


class GLB:
    def __init__(self, path):
        self.path = Path(path)
        self.raw = self.path.read_bytes()
        magic, version, length = struct.unpack_from('<4sII', self.raw)
        if magic != b'glTF' or version != 2 or length != len(self.raw):
            raise ValueError(f'Invalid or incomplete GLB: {path}')
        offset = 12
        self.json_bytes = self.bin_bytes = 0
        while offset < length:
            size, kind = struct.unpack_from('<I4s', self.raw, offset)
            offset += 8
            chunk = self.raw[offset:offset+size]
            if kind == b'JSON': self.doc = json.loads(chunk); self.json_bytes = size
            elif kind == b'BIN\x00': self.bin = chunk; self.bin_bytes = size
            offset += size
        if len(self.doc.get('buffers', [])) > 1 or any('uri' in b for b in self.doc.get('buffers', [])):
            raise ValueError('Only the observed single embedded buffer is supported')
        self.bin = getattr(self, 'bin', b'')
        if self.doc.get('animations') or self.doc.get('skins') or self.doc.get('cameras'):
            raise ValueError('Animation, skin or camera handling needs a deliberate extension before repacking')
        for mesh in self.doc.get('meshes', []):
            for prim in mesh['primitives']:
                if prim.get('targets') or prim.get('extensions'):
                    raise ValueError('Morph/compressed/extended geometry is outside this exact-byte repack')
        for node in self.doc.get('nodes', []):
            if node.get('extensions'):
                raise ValueError('Node extension needs explicit dependency handling before splitting')
        self.parent = {}
        self.environment = set()
        self.reachable = set()
        def walk(index, in_environment=False):
            if index in self.reachable: raise ValueError('Multiple-parent or cyclic node graph')
            self.reachable.add(index)
            node = self.doc['nodes'][index]
            env = in_environment or node.get('name') in ENVIRONMENT_GROUPS or node.get('extras',{}).get('category') in ENVIRONMENT_GROUPS
            if env: self.environment.add(index)
            for child in node.get('children', []):
                self.parent[child] = index
                walk(child, env)
        scene = self.doc['scenes'][self.doc.get('scene', 0)]
        for index in scene.get('nodes', []): walk(index)
        self.image_roles = {i:set() for i in range(len(self.doc.get('images', [])))}
        for material in self.doc.get('materials', []):
            for role, info in texture_infos(material):
                tex = self.doc['textures'][info['index']]
                if 'source' not in tex: raise ValueError('Extended texture source not covered')
                self.image_roles[tex['source']].add(role)

    def view(self, index):
        view = self.doc['bufferViews'][index]
        offset = view.get('byteOffset',0)
        data = self.bin[offset:offset+view['byteLength']]
        if len(data) != view['byteLength']: raise ValueError('Truncated bufferView')
        return data

    def image(self, index):
        item = self.doc['images'][index]
        if 'bufferView' not in item: raise ValueError('External image is outside this source pack')
        return self.view(item['bufferView'])

    def stats(self):
        images=[]
        image_views=set()
        for i, item in enumerate(self.doc.get('images', [])):
            data=self.image(i)
            with Image.open(BytesIO(data)) as im:
                alpha=('A' in im.getbands()) or 'transparency' in im.info
                images.append({'index':i,'name':item.get('name'),'format':im.format,'mode':im.mode,
                               'width':im.width,'height':im.height,'has_alpha':alpha,'bytes':len(data),
                               'roles':sorted(self.image_roles[i]),'sha256':sha(data)})
            image_views.add(item['bufferView'])
        accessor_views=set()
        for a in self.doc.get('accessors', []):
            if 'bufferView' in a: accessor_views.add(a['bufferView'])
            if 'sparse' in a:
                accessor_views.update(a['sparse'][key]['bufferView'] for key in ('indices','values'))
        image_bytes=sum(len(self.view(i)) for i in image_views)
        geometry_bytes=sum(len(self.view(i)) for i in accessor_views)
        return {'file_bytes':len(self.raw),'sha256':sha(self.raw),'json_bytes':self.json_bytes,
                'bin_bytes':self.bin_bytes,'geometry_buffer_view_bytes':geometry_bytes,
                'image_buffer_view_bytes':image_bytes,'bin_padding_or_other_bytes':self.bin_bytes-image_bytes-geometry_bytes,
                'node_count':len(self.doc.get('nodes',[])),'mesh_count':len(self.doc.get('meshes',[])),
                'mesh_node_count':sum('mesh' in n for n in self.doc.get('nodes',[])),
                'image_count':len(images),'images':images,'environment_node_count':len(self.environment)}

    def subset_nodes(self, mode):
        chosen=set(self.environment) if mode=='environment' else self.reachable-self.environment
        for index in list(chosen):
            while index in self.parent:
                index=self.parent[index]
                chosen.add(index)
        return chosen

    def attribute_signature(self, index):
        """Decode selected accessor bytes as stored: coordinates/UV/normals stay bit-exact."""
        a=self.doc['accessors'][index]
        if a.get('sparse'): raise ValueError('Sparse accessor requires explicit semantic decoder')
        sizes={5120:1,5121:1,5122:2,5123:2,5125:4,5126:4}
        widths={'SCALAR':1,'VEC2':2,'VEC3':3,'VEC4':4,'MAT2':4,'MAT3':9,'MAT4':16}
        width=sizes[a['componentType']]*widths[a['type']]
        view=self.doc['bufferViews'][a['bufferView']]
        stride=view.get('byteStride',width)
        start=a.get('byteOffset',0)
        data=self.view(a['bufferView'])
        packed=b''.join(data[start+i*stride:start+i*stride+width] for i in range(a['count']))
        return {'componentType':a['componentType'],'type':a['type'],'count':a['count'],
                'normalized':a.get('normalized',False),'decoded_element_bytes_sha256':sha(packed)}

    def node_signature(self, index):
        node=self.doc['nodes'][index]
        ancestors=[];at=index
        while True:
            n=self.doc['nodes'][at]
            ancestors.append({k:n[k] for k in ('name','matrix','translation','rotation','scale') if k in n})
            if at not in self.parent:break
            at=self.parent[at]
        primitives=[]
        if 'mesh' in node:
            for prim in self.doc['meshes'][node['mesh']]['primitives']:
                item={'mode':prim.get('mode',4),'attributes':{k:self.attribute_signature(v) for k,v in prim['attributes'].items()}}
                if 'indices' in prim:item['indices']=self.attribute_signature(prim['indices'])
                if 'material' in prim:
                    material=deepcopy(self.doc['materials'][prim['material']])
                    # Compare immutable material factors/modes/extensions while replacing
                    # remapped texture indices with the retained source texture identity.
                    for role,info in texture_infos(material):
                        tex=self.doc['textures'][info['index']]
                        image=self.doc['images'][tex['source']]
                        info['index']={'image_name':image.get('name'),'sampler':self.doc.get('samplers',[])[tex['sampler']] if 'sampler' in tex else None}
                    item['material']=material
                primitives.append(item)
        return {'name':node.get('name'),'extras':node.get('extras',{}),'transform_chain':ancestors,'primitives':primitives}


def encode_image(data, roles, max_dimension):
    with Image.open(BytesIO(data)) as opened:
        source_format=opened.format
        im=opened.copy()
        alpha=('A' in im.getbands()) or 'transparency' in opened.info
    original_size=list(im.size)
    resized=False
    if max_dimension and max(im.size)>max_dimension:
        scale=max_dimension/max(im.size)
        im=im.resize((max(1,round(im.width*scale)),max(1,round(im.height*scale))),Image.Resampling.LANCZOS)
        resized=True
        if any('normal' in role.lower() for role in roles) and not alpha:
            xyz=np.asarray(im.convert('RGB'),dtype=np.float32)/255*2-1
            xyz/=np.maximum(np.linalg.norm(xyz,axis=2,keepdims=True),1e-6)
            im=Image.fromarray(np.rint((xyz+1)*127.5).clip(0,255).astype(np.uint8))
    rgb=im.convert('RGB')
    color=bool(set(roles)&{'baseColorTexture','emissiveTexture'})
    # Only opaque color PNGs are candidates for JPEG. Alpha, packed scalar maps
    # and normal maps are never converted to JPEG by this optimization.
    selected=data if not resized else None
    encoding=source_format;quality=None;psnr=None
    if source_format=='PNG' and color and not alpha:
        pixels=np.asarray(rgb,dtype=np.float32)
        for q in (94,96,98,100):
            target=BytesIO();rgb.save(target,format='JPEG',quality=q,subsampling=0,optimize=True)
            candidate=target.getvalue()
            reconstructed=np.asarray(Image.open(BytesIO(candidate)).convert('RGB'),dtype=np.float32)
            mse=float(np.mean((pixels-reconstructed)**2))
            trial_psnr=99.0 if mse==0 else 10*math.log10(255*255/mse)
            if trial_psnr>=38:
                if selected is None or len(candidate)<len(selected):
                    selected=candidate;encoding='JPEG';quality=q;psnr=trial_psnr
                break
    if selected is None or (source_format=='PNG' and encoding=='PNG'):
        target=BytesIO();im.save(target,format='PNG',optimize=True,compress_level=9)
        candidate=target.getvalue()
        if selected is None or len(candidate)<len(selected):selected=candidate;encoding='PNG'
    with Image.open(BytesIO(selected)) as out:
        output_size=list(out.size)
    return selected, {'source_format':source_format,'source_size':original_size,'source_bytes':len(data),
                      'output_format':encoding,'output_size':output_size,'output_bytes':len(selected),
                      'has_alpha':alpha,'resized':resized,'jpeg_quality':quality,
                      'jpeg_rgb_psnr_db_against_same_resolution_reference':psnr,
                      'normal_map_renormalized_after_resize':resized and any('normal' in r.lower() for r in roles)}


def write_glb(path, doc, blob):
    doc['buffers']=[{'byteLength':len(blob)}] if blob else []
    encoded=json.dumps(doc,separators=(',',':'),ensure_ascii=False).encode('utf-8')
    encoded+=b' '*((-len(encoded))%4)
    binary=bytes(blob)+b'\x00'*((-len(blob))%4)
    size=12+8+len(encoded)+(8+len(binary) if binary else 0)
    raw=struct.pack('<4sII',b'glTF',2,size)+struct.pack('<I4s',len(encoded),b'JSON')+encoded
    if binary:raw+=struct.pack('<I4s',len(binary),b'BIN\x00')+binary
    path.parent.mkdir(parents=True,exist_ok=True)
    temporary=path.with_suffix(path.suffix+'.tmp')
    temporary.write_bytes(raw)
    temporary.replace(path)


def repack(source, output_path, mode, max_dimension=None):
    kept=source.subset_nodes(mode)
    if not kept:return None
    doc=deepcopy(source.doc)
    doc['asset']=deepcopy(doc['asset'])
    doc['asset']['generator']='Bridge WebV1 exact geometry repack; '+doc['asset'].get('generator','')
    blob=bytearray();views=[];view_cache={};accessors=[];accessor_map={};accessor_cache={}
    meshes=[];mesh_map={};mesh_cache={};materials=[];material_map={}
    images=[];image_map={};textures=[];texture_map={};samplers=[];sampler_map={};sampler_cache={}
    image_changes=[]
    def put_view(data,template=None):
        template=deepcopy(template or {})
        for key in ('buffer','byteOffset','byteLength'):template.pop(key,None)
        key=(sha(data),payload_key(template))
        if key in view_cache:return view_cache[key]
        blob.extend(b'\x00'*((-len(blob))%4));offset=len(blob);blob.extend(data)
        view={'buffer':0,'byteOffset':offset,'byteLength':len(data),**template}
        index=len(views);views.append(view);view_cache[key]=index;return index
    def accessor(old):
        if old in accessor_map:return accessor_map[old]
        value=deepcopy(source.doc['accessors'][old])
        if 'bufferView' in value:
            v=value['bufferView'];value['bufferView']=put_view(source.view(v),source.doc['bufferViews'][v])
        if 'sparse' in value:
            for field in ('indices','values'):
                v=value['sparse'][field]['bufferView'];value['sparse'][field]['bufferView']=put_view(source.view(v),source.doc['bufferViews'][v])
        key=payload_key(value)
        if key not in accessor_cache:accessor_cache[key]=len(accessors);accessors.append(value)
        accessor_map[old]=accessor_cache[key];return accessor_map[old]
    def image(old):
        if old in image_map:return image_map[old]
        encoded,change=encode_image(source.image(old),source.image_roles[old],max_dimension)
        item=deepcopy(source.doc['images'][old]);item.pop('uri',None)
        item['bufferView']=put_view(encoded);item['mimeType']='image/jpeg' if change['output_format']=='JPEG' else 'image/png'
        image_map[old]=len(images);images.append(item)
        image_changes.append({'source_index':old,'name':item.get('name'),'roles':sorted(source.image_roles[old]),**change})
        return image_map[old]
    def texture(old):
        if old in texture_map:return texture_map[old]
        value=deepcopy(source.doc['textures'][old]);value['source']=image(value['source'])
        if 'sampler' in value:
            s=value['sampler']
            if s not in sampler_map:
                sample=deepcopy(source.doc['samplers'][s]);key=payload_key(sample)
                if key not in sampler_cache:sampler_cache[key]=len(samplers);samplers.append(sample)
                sampler_map[s]=sampler_cache[key]
            value['sampler']=sampler_map[s]
        texture_map[old]=len(textures);textures.append(value);return texture_map[old]
    def material(old):
        if old in material_map:return material_map[old]
        value=deepcopy(source.doc['materials'][old])
        for _,info in texture_infos(value):info['index']=texture(info['index'])
        material_map[old]=len(materials);materials.append(value);return material_map[old]
    def mesh(old):
        if old in mesh_map:return mesh_map[old]
        value=deepcopy(source.doc['meshes'][old])
        for primitive in value['primitives']:
            primitive['attributes']={key:accessor(index) for key,index in primitive['attributes'].items()}
            if 'indices' in primitive:primitive['indices']=accessor(primitive['indices'])
            if 'material' in primitive:primitive['material']=material(primitive['material'])
        # A mesh resource may share geometry; all original node IDs/names remain.
        # Mesh extras and all primitive/material data still participate in equality.
        key=payload_key(value,ignore_name=True)
        if key not in mesh_cache:mesh_cache[key]=len(meshes);meshes.append(value)
        mesh_map[old]=mesh_cache[key];return mesh_map[old]
    node_map={old:new for new,old in enumerate(sorted(kept))}
    nodes=[]
    for old in sorted(kept):
        node=deepcopy(source.doc['nodes'][old])
        if 'children' in node:node['children']=[node_map[i] for i in node['children'] if i in node_map]
        if 'mesh' in node:node['mesh']=mesh(node['mesh'])
        nodes.append(node)
    scene=deepcopy(source.doc['scenes'][source.doc.get('scene',0)])
    scene['nodes']=[node_map[i] for i in scene.get('nodes',[]) if i in node_map]
    doc.update({'scene':0,'scenes':[scene],'nodes':nodes,'meshes':meshes,'materials':materials,
                'accessors':accessors,'bufferViews':views})
    for key,value in [('images',images),('textures',textures),('samplers',samplers)]:
        if value:doc[key]=value
        else:doc.pop(key,None)
    for key in ('animations','skins','cameras'):doc.pop(key,None)
    write_glb(output_path,doc,blob)
    return {'mode':mode,'max_texture_dimension':max_dimension,'image_encoding_changes':image_changes,
            'selected_source_nodes':len(kept),'selected_source_mesh_resources':len(mesh_map),
            'output_mesh_resources':len(meshes),'exact_duplicate_mesh_resources_removed':len(mesh_map)-len(meshes),
            'selected_source_accessors':len(accessor_map),'output_accessors':len(accessors),
            'exact_duplicate_accessors_removed':len(accessor_map)-len(accessors),
            'all_geometry_attribute_and_index_bytes_preserved':True}


def verify(source, output, mode):
    target=GLB(output)
    kept=source.subset_nodes(mode)
    src_nodes={source.doc['nodes'][i].get('name'):i for i in kept}
    dst_nodes={n.get('name'):i for i,n in enumerate(target.doc['nodes'])}
    errors=[]
    if len(src_nodes)!=len(kept) or len(dst_nodes)!=len(target.doc['nodes']):errors.append('duplicate node names prevent reliable matching')
    if set(src_nodes)!=set(dst_nodes):errors.append('node inventory mismatch')
    checked=0
    source_ids=[];target_ids=[];stage_count=0
    vertex_count=triangle_count=0
    for name,index in src_nodes.items():
        if name not in dst_nodes:continue
        before=source.node_signature(index);after=target.node_signature(dst_nodes[name])
        if canonical(before)!=canonical(after):errors.append('geometry/material/extras/transform mismatch: '+str(name))
        checked+=1
        node=source.doc['nodes'][index]
        if 'component_id' in node.get('extras',{}):source_ids.append(node['extras']['component_id'])
        dst=target.doc['nodes'][dst_nodes[name]]
        if 'component_id' in dst.get('extras',{}):target_ids.append(dst['extras']['component_id'])
        if 'stage' in node.get('extras',{}):stage_count+=1
        if 'mesh' in node:
            for prim in source.doc['meshes'][node['mesh']]['primitives']:
                vertex_count+=source.doc['accessors'][prim['attributes']['POSITION']]['count']
                if prim.get('mode',4)==4:
                    triangle_count+=source.doc['accessors'][prim['indices']]['count']//3 if 'indices' in prim else source.doc['accessors'][prim['attributes']['POSITION']]['count']//3
    if sorted(source_ids)!=sorted(target_ids) or len(set(source_ids))!=len(source_ids):errors.append('component IDs missing or duplicated')
    return {'passed':not errors,'errors':errors,'node_signatures_checked':checked,
            'component_id_count':len(source_ids),'nodes_with_stage_fields':stage_count,
            'instance_vertex_count_unchanged':vertex_count,'instance_triangle_count_unchanged':triangle_count,
            'checks':['exact POSITION/NORMAL/UV/all attribute and index element bytes',
                      'node names, full extras including component_id/stage/end_stage',
                      'entire ancestor transform chain', 'material colors, factors, alpha modes, clearcoat and UV/sampler settings'],
            'not_claimed':['identical image encoding/pixels after approved color compression or environment resize',
                           'smaller GPU draw count from unchanged component nodes', 'Godot browser frame rate or screenshot quality']}


def main():
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--root',type=Path,default=Path(__file__).resolve().parents[1])
    parser.add_argument('--source',type=Path)
    parser.add_argument('--verify-only',action='store_true')
    args=parser.parse_args()
    root=args.root.resolve()
    original=(args.source or root.parent/'三类桥梁_Blender_Godot_20260908'/'models').resolve()
    if original==root/'assets'/'models':raise SystemExit('Source and optimized output must be different directories')
    manifest={'schema':'bridge-web-assets/1','created_at_utc':datetime.now(timezone.utc).isoformat(),
              'original_directory':str(original),'python':sys.version.split()[0], 'pillow':PILLOW_VERSION,'numpy':np.__version__,
              'policy':{'no_mesh_decimation':True,'no_geometry_quantization':True,'body_texture_resolution_unchanged':True,
                        'environment_standard_max_px':1024,'environment_low_max_px':512,
                        'no_texture_upscaling':True,'color_jpeg_min_psnr_db':38,'alpha_images_never_jpeg':True,
                        'all_originals_unchanged':True},'models':[]}
    all_verified=True
    for model_id in IDS:
        source=GLB(original/f'{model_id}.glb')
        source_hash=sha(source.raw)
        model_path=root/'assets/models'/f'{model_id}.glb'
        record={'id':model_id,'model_path':model_path.relative_to(root).as_posix(),
                'source':source.stats(),'environments':{},'env_standard_bytes':0,'env_low_bytes':0}
        if not args.verify_only:record['body_optimization']=repack(source,model_path,'body')
        record['body_verification']=verify(source,model_path,'body')
        record['output']=GLB(model_path).stats();record['model_bytes']=record['output']['file_bytes']
        all_verified=all_verified and record['body_verification']['passed']
        if source.environment:
            for tier,size in [('standard',1024),('low',512)]:
                path=root/'assets/environments'/f'{model_id}_{tier}.glb'
                env={'path':path.relative_to(root).as_posix(),'texture_max_px':size}
                if not args.verify_only:env['optimization']=repack(source,path,'environment',size)
                env['verification']=verify(source,path,'environment');env['statistics']=GLB(path).stats()
                env['bytes']=env['statistics']['file_bytes'];record['environments'][tier]=env
                record[f'env_{tier}_bytes']=env['bytes'];all_verified=all_verified and env['verification']['passed']
        else:record['environment_note']='The provided original GLB contains no 90_Environment/90_Set subtree; no backdrop is invented.'
        record['body_reduction_percent']=round((1-record['model_bytes']/record['source']['file_bytes'])*100,2)
        record['source_file_hash_unchanged']=sha((original/f'{model_id}.glb').read_bytes())==source_hash
        all_verified=all_verified and record['source_file_hash_unchanged']
        manifest['models'].append(record)
        print(f'{model_id}: original {record["source"]["file_bytes"]:,}; body {record["model_bytes"]:,}; standard {record["env_standard_bytes"]:,}; low {record["env_low_bytes"]:,}; verified {record["body_verification"]["passed"]}',flush=True)
    manifest['all_geometry_and_semantic_comparisons_passed']=all_verified
    manifest['totals']={'original_bytes':sum(m['source']['file_bytes'] for m in manifest['models']),
                        'body_bytes':sum(m['model_bytes'] for m in manifest['models']),
                        'environment_standard_bytes':sum(m['env_standard_bytes'] for m in manifest['models']),
                        'environment_low_bytes':sum(m['env_low_bytes'] for m in manifest['models'])}
    destination=root/'docs/asset-verification.json' if args.verify_only else root/'assets/asset-manifest.json'
    destination.parent.mkdir(parents=True,exist_ok=True)
    destination.write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    if not args.verify_only:
        summary={'source_statistics':{m['id']:m['source'] for m in manifest['models']},
                 'totals':manifest['totals'],'all_geometry_and_semantic_comparisons_passed':all_verified}
        (root/'docs').mkdir(exist_ok=True)
        (root/'docs/asset-size-audit.json').write_text(json.dumps(summary,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    print(f'VERIFIED={all_verified} {destination}',flush=True)
    return 0 if all_verified else 1


if __name__=='__main__':sys.exit(main())
