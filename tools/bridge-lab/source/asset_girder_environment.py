"""Generate a separate, modest T-girder teaching environment; never write bodies.

Run after asset_optimize.py, using its same-origin material assets:
  python -X utf8 source/asset_girder_environment.py
  python -X utf8 source/asset_girder_environment.py --verify-only

Python 3.10+, Pillow and NumPy, no Blender installation required for this addition.
Physical coordinates are metres, X along the bridge, Y across, Z up. They are
mapped once to glTF/Godot (X,Z,-Y). This scenery is not surveyed terrain.
"""
from __future__ import annotations
import argparse
from copy import deepcopy
from datetime import datetime, timezone
import json
from pathlib import Path

import numpy as np

from asset_optimize import GLB, IDS, sha, verify, write_glb

ROOT = Path(__file__).resolve().parents[1]


def accessor(asset, index):
    """Read actual accessor elements, including optional strides."""
    item = asset.doc['accessors'][index]
    dtype = {5120:'i1',5121:'u1',5122:'<i2',5123:'<u2',5125:'<u4',5126:'<f4'}[item['componentType']]
    width = {'SCALAR':1,'VEC2':2,'VEC3':3,'VEC4':4}[item['type']]
    view = asset.doc['bufferViews'][item['bufferView']]
    return np.ndarray((item['count'],width),dtype=dtype,buffer=asset.view(item['bufferView']),
                      offset=item.get('byteOffset',0),
                      strides=(view.get('byteStride',np.dtype(dtype).itemsize*width),np.dtype(dtype).itemsize)).copy()


def matrix(node):
    if 'matrix' in node:return np.asarray(node['matrix'],dtype=float).reshape(4,4).T
    x,y,z,w = node.get('rotation',[0,0,0,1])
    m = np.eye(4)
    m[:3,:3] = [[1-2*y*y-2*z*z,2*x*y-2*z*w,2*x*z+2*y*w],
                 [2*x*y+2*z*w,1-2*x*x-2*z*z,2*y*z-2*x*w],
                 [2*x*z-2*y*w,2*y*z+2*x*w,1-2*x*x-2*y*y]]
    m[:3,:3] *= np.asarray(node.get('scale',[1,1,1]))
    m[:3,3] = node.get('translation',[0,0,0])
    return m


def measured_nodes(asset):
    result=[]
    def walk(index,parent):
        node=asset.doc['nodes'][index]; world=parent @ matrix(node)
        if 'mesh' in node:
            pp=[]
            for prim in asset.doc['meshes'][node['mesh']]['primitives']:
                local=accessor(asset,prim['attributes']['POSITION'])
                gltf=local @ world[:3,:3].T + world[:3,3]
                pp.append(np.column_stack((gltf[:,0],-gltf[:,2],gltf[:,1])))
            points=np.concatenate(pp)
            result.append({'name':node.get('name',''),'extras':node.get('extras',{}),
                           'lo':points.min(axis=0),'hi':points.max(axis=0),'points':points})
        for child in node.get('children',[]):walk(child,world)
    for index in asset.doc['scenes'][asset.doc.get('scene',0)]['nodes']:walk(index,np.eye(4))
    return result


def union_bounds(nodes):
    return [np.min([n['lo'] for n in nodes],axis=0).tolist(),np.max([n['hi'] for n in nodes],axis=0).tolist()]


def measure_body(path):
    asset=GLB(path);nodes=measured_nodes(asset)
    road=[n for n in nodes if n['name'].endswith('_Asphalt')]
    if len(road)!=6:raise ValueError('Expected six original two-carriageway asphalt panels')
    bounds=union_bounds(road)
    if not np.allclose(bounds,[[0,-12.25,12.6],[90,12.25,12.7]],atol=1e-5):
        raise ValueError('T-girder body dimensions changed; environment needs a deliberate redesign')
    bearing_root=next(n for n in asset.doc['nodes'] if n.get('name')=='04_Bearings')
    bearing_names={asset.doc['nodes'][i]['name'] for i in bearing_root.get('children',[])}
    supports=[n for n in nodes if n['name'] in bearing_names]
    # Bearing names are retained from the old beam model, not inferred from the
    # newer shared category that also includes diaphragms and secondary items.
    if not supports:raise ValueError('No actual bearing nodes found')
    return asset,nodes,{'coordinate_system':'physical metres: X bridge length, Y transverse, Z up',
                        'body_bounds_m':union_bounds(nodes),'road_bounds_m':bounds,
                        'carriageway_y_m':[[-12.25,-0.75],[0.75,12.25]],
                        'bearing_bounds_m':union_bounds(supports),'bearing_mesh_nodes':len(supports)}


def smoothstep(value):
    t=np.clip(value,0,1);return t*t*(3-2*t)


def terrain_height(x,y):
    center=45.0+2.0*np.sin(y/40.0)
    distance=np.abs(x-center)
    # Riverbed to 6 m low banks. Within the bridge envelope this remains at
    # least 3.9 m below the bearing assemblies. End footings are partly exposed.
    base=-1.30+7.30*smoothstep((distance-13.0)/32.0)
    hills=(0.5*np.sin(x/19.0+y/23.0)+0.25*np.sin(y/11.0))*smoothstep((np.abs(y)-18.0)/28.0)
    base=base+hills
    # Fill ends behind the existing backwalls, while the new surfacing meets
    # X=0/90. The sharp transition is hidden against the backwall, not a slope
    # pushed through the bearing inspection area.
    behind=np.maximum(smoothstep((-x-1.76)/0.03),smoothstep((x-91.76)/0.03))
    lateral=1.0-smoothstep((np.abs(y)-12.75)/17.0)
    fill=behind*lateral
    return base*(1.0-fill)+12.6*fill


class Builder:
    def __init__(self,material_asset):
        self.blob=bytearray()
        self.doc={'asset':{'version':'2.0','generator':'bridge WebV1 separate girder environment'},
                  'scene':0,'scenes':[{'name':'Girder teaching riverbank','nodes':[0]}],
                  'nodes':[{'name':'90_Environment','children':[],
                            'extras':{'category':'90_Environment','label':'教学河岸环境','stage':0,'end_stage':99}}],
                  'meshes':[],'materials':deepcopy(material_asset.doc['materials']),
                  'textures':deepcopy(material_asset.doc['textures']),
                  'samplers':deepcopy(material_asset.doc.get('samplers',[])),
                  'images':deepcopy(material_asset.doc['images']),
                  'bufferViews':[],'accessors':[]}
        for index,item in enumerate(self.doc['images']):
            item['bufferView']=self.view(material_asset.image(index))
        self.mat={m['name']:i for i,m in enumerate(self.doc['materials'])}
        self.components=[]

    def view(self,data,target=None):
        while len(self.blob)%4:self.blob.append(0)
        view={'buffer':0,'byteOffset':len(self.blob),'byteLength':len(data)}
        if target:view['target']=target
        self.blob.extend(data);self.doc['bufferViews'].append(view)
        return len(self.doc['bufferViews'])-1

    def access(self,data,kind,is_indices=False):
        data=np.asarray(data,dtype='<u4' if is_indices else '<f4')
        item={'bufferView':self.view(data.tobytes(),34963 if is_indices else 34962),
              'componentType':5125 if is_indices else 5126,'count':len(data),'type':kind}
        if kind=='VEC3':item.update(min=data.min(axis=0).tolist(),max=data.max(axis=0).tolist())
        self.doc['accessors'].append(item);return len(self.doc['accessors'])-1

    def mesh(self,name,label,points,faces,uv,material,smooth=False):
        points=np.asarray(points,dtype=float);faces=np.asarray(faces,dtype=np.uint32)
        uv=np.asarray(uv,dtype=float)
        if not smooth:
            points=points[faces.flatten()];uv=uv[faces.flatten()];faces=np.arange(len(points)).reshape(-1,3)
        edges1=points[faces[:,1]]-points[faces[:,0]];edges2=points[faces[:,2]]-points[faces[:,0]]
        fn=np.cross(edges1,edges2);normals=np.zeros_like(points)
        for column in range(3):np.add.at(normals,faces[:,column],fn)
        normals/=np.maximum(np.linalg.norm(normals,axis=1,keepdims=True),1e-12)
        du1=uv[faces[:,1]]-uv[faces[:,0]];du2=uv[faces[:,2]]-uv[faces[:,0]]
        determinant=du1[:,0]*du2[:,1]-du1[:,1]*du2[:,0]
        r=np.divide(1.0,determinant,out=np.zeros_like(determinant),where=np.abs(determinant)>1e-12)
        st=(edges1*du2[:,1,None]-edges2*du1[:,1,None])*r[:,None]
        bt=(edges2*du1[:,0,None]-edges1*du2[:,0,None])*r[:,None]
        tangent=np.zeros_like(points);bitangent=np.zeros_like(points)
        for column in range(3):
            np.add.at(tangent,faces[:,column],st);np.add.at(bitangent,faces[:,column],bt)
        tangent-=normals*np.sum(normals*tangent,axis=1,keepdims=True)
        tangent/=np.maximum(np.linalg.norm(tangent,axis=1,keepdims=True),1e-12)
        w=np.where(np.sum(np.cross(normals,tangent)*bitangent,axis=1)<0,-1.0,1.0)
        def gltf(a):return np.column_stack((a[:,0],a[:,2],-a[:,1]))
        attributes={'POSITION':self.access(gltf(points),'VEC3'),'NORMAL':self.access(gltf(normals),'VEC3'),
                    'TEXCOORD_0':self.access(uv,'VEC2'),
                    'TANGENT':self.access(np.column_stack((gltf(tangent),w)),'VEC4')}
        mesh_id=len(self.doc['meshes'])
        self.doc['meshes'].append({'name':name,'primitives':[{'attributes':attributes,
              'indices':self.access(faces.flatten(),'SCALAR',True),'material':material,'mode':4}]})
        cid='GirderEnvironment_'+name
        self.doc['nodes'][0]['children'].append(len(self.doc['nodes']))
        self.doc['nodes'].append({'name':name,'mesh':mesh_id,
             'extras':{'component_id':cid,'category':'90_Environment','label':label,
                       'stage':0,'end_stage':99,'source_kind':'teaching_environment_assumption'}})
        self.components.append({'id':cid,'name':name,'bounds_m':[points.min(axis=0).tolist(),points.max(axis=0).tolist()],
                                'triangles':len(faces)})

    def box(self,name,label,lo,hi,material,tile):
        x0,y0,z0=lo;x1,y1,z1=hi
        p=np.asarray([(x0,y0,z0),(x1,y0,z0),(x1,y1,z0),(x0,y1,z0),
                      (x0,y0,z1),(x1,y0,z1),(x1,y1,z1),(x0,y1,z1)],dtype=float)
        quads=[(0,3,2,1),(4,5,6,7),(0,1,5,4),(1,2,6,5),(2,3,7,6),(3,0,4,7)]
        points=[];faces=[];uv=[]
        for q in quads:
            pp=p[list(q)];start=len(points);points.extend(pp)
            a=np.linalg.norm(pp[1]-pp[0])/tile;b=np.linalg.norm(pp[3]-pp[0])/tile
            uv.extend([(0,0),(a,0),(a,b),(0,b)])
            faces.extend([(start,start+1,start+2),(start,start+2,start+3)])
        self.mesh(name,label,points,faces,uv,material)

    def build(self):
        grass=self.mat['Alluvial river banks'];water=self.mat['Deep green river water']
        asphalt=self.mat['Dense grey asphalt'];concrete=self.mat['Weathered structural concrete']
        # Modest grid, refined only at existing backwalls and road shoulders.
        xx=sorted(set(np.linspace(-60,150,141).tolist()+[-1.79,-1.76,0,90,91.76,91.79]))
        yy=sorted(set(np.linspace(-85,85,115).tolist()+[-29.75,-12.75,12.75,29.75]))
        points=[(x,y,float(terrain_height(x,y))) for x in xx for y in yy]
        uv=[(x/24.0,y/24.0) for x,y,_ in points]
        n=len(yy);faces=[]
        for i in range(len(xx)-1):
            for j in range(n-1):
                k=i*n+j;faces.extend([(k,k+n,k+n+1),(k,k+n+1,k+1)])
        self.mesh('RiverValleyTerrain','简化河谷与接引路路基',points,faces,uv,grass,True)
        yy=np.linspace(-85,85,115);points=[]
        for y in yy:
            center=45+2*np.sin(y/40)
            for across in np.linspace(-15.5,15.5,17):points.append((center+across,y,0.32))
        faces=[]
        for i in range(len(yy)-1):
            for j in range(16):
                k=i*17+j;faces.extend([(k,k+1,k+18),(k,k+18,k+17)])
        self.mesh('RiverSurface','教学水面（非实测水位）',points,faces,[(x/14,y/14) for x,y,z in points],water,True)
        for side in [-1,1]:
            x0,x1=(-60.0,0.0) if side<0 else (90.0,150.0)
            for carriage,yc in enumerate([-6.5,6.5],1):
                prefix=f'Approach_{side}_{carriage}'
                self.box(prefix+'_Slab','接引路混凝土基层',
                         (x0,yc-6.25,12.35),(x1,yc+6.25,12.6),concrete,4)
                self.box(prefix+'_Road','与原路面齐平的接引路',
                         (x0,yc-5.75,12.6),(x1,yc+5.75,12.7),asphalt,3)
        return self

    def write(self,path):
        write_glb(path,self.doc,self.blob)


def verify_environment(root,body_nodes,body_measurements):
    standard=GLB(root/'assets/environments/girder_standard.glb')
    low_path=root/'assets/environments/girder_low.glb'
    comparison=verify(standard,low_path,'environment')
    es=measured_nodes(standard)
    errors=list(comparison['errors'])
    ground=next(n for n in es if n['name']=='RiverValleyTerrain')
    points=ground['points'];under=points[(points[:,0]>=0)&(points[:,0]<=90)&(np.abs(points[:,1])<=13.1)]
    ground_high=float(under[:,2].max())
    min_bearing_z=body_measurements['bearing_bounds_m'][0][2]
    road=[n for n in es if n['name'].endswith('_Road')]
    connectors=[]
    for n in road:
        edge=float(n['hi'][0] if n['hi'][0]<45 else n['lo'][0])
        delta=float(n['hi'][2]-body_measurements['road_bounds_m'][1][2])
        connectors.append({'name':n['name'],'bridge_join_x_m':edge,'road_surface_z_m':float(n['hi'][2]),
                           'height_gap_m':delta,'transverse_edges_y_m':[float(n['lo'][1]),float(n['hi'][1])]})
        if edge not in (0.0,90.0) or abs(delta)>1e-5:errors.append('approach endpoint mismatch '+n['name'])
    if min_bearing_z-ground_high<3.8:errors.append('terrain encroaches on bearing inspection height')
    identity=all(not any(k in n for k in ('translation','rotation','scale','matrix')) for n in standard.doc['nodes'])
    if not identity:errors.append('environment has an unexpected transform')
    for asset in [standard,GLB(low_path)]:
        for n in measured_nodes(asset):
            if not np.isfinite(n['points']).all():errors.append('nonfinite geometry')
        for node in asset.doc['nodes']:
            if node.get('extras',{}).get('category')!='90_Environment':errors.append('non-environment node')
        max_px=1024 if asset.path.stem.endswith('standard') else 512
        if any(max(i['width'],i['height'])>max_px for i in asset.stats()['images']):errors.append('texture tier oversize')
    return {'passed':not errors,'errors':errors,'same_geometry_id_stage_between_tiers':comparison,
            'environment_bounds_m':union_bounds(es),'body_measurements':body_measurements,
            'terrain_highest_below_bridge_m':ground_high,'bearing_lowest_m':min_bearing_z,
            'minimum_vertical_terrain_to_bearings_m':min_bearing_z-ground_high,
            'road_connectors':connectors,'all_environment_node_transforms_identity':identity,
            'mesh_components':len(es),'triangles':sum(standard.doc['accessors'][p['indices']]['count']//3
                         for m in standard.doc['meshes'] for p in m['primitives']),
            'not_claimed':['surveyed terrain, hydrology, earthwork design or approach slab structural design',
                           'unchanged scenery compared with the original: this is newly authorized teaching scenery']}


def update_manifest(root,report):
    path=root/'assets/asset-manifest.json';manifest=json.loads(path.read_text(encoding='utf-8'))
    record=next(m for m in manifest['models'] if m['id']=='girder')
    for tier,px in [('standard',1024),('low',512)]:
        p=root/f'assets/environments/girder_{tier}.glb';stats=GLB(p).stats()
        record['environments'][tier]={'path':p.relative_to(root).as_posix(),'texture_max_px':px,
            'bytes':stats['file_bytes'],'statistics':stats,'verification':{'passed':report['passed'],
            'report':'docs/asset-girder-environment.json'},'provenance':'new teaching environment; reused project CC0 materials'}
        record[f'env_{tier}_bytes']=stats['file_bytes']
    record['environment_note']='User-authorized teaching riverbank and matching approach roads, based on old scene layout; independently generated, not surveyed terrain. Original body is byte-for-byte unchanged.'
    manifest['environment_updated_at_utc']=datetime.now(timezone.utc).isoformat()
    for tier in ['standard','low']:
        manifest['totals'][f'environment_{tier}_bytes']=sum(m[f'env_{tier}_bytes'] for m in manifest['models'])
    path.write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    audit_path=root/'docs/asset-size-audit.json'
    if audit_path.exists():
        audit=json.loads(audit_path.read_text(encoding='utf-8'));audit['totals']=manifest['totals']
        audit['new_girder_environment']={'standard_bytes':record['env_standard_bytes'],'low_bytes':record['env_low_bytes'],
                                        'audit':'asset-girder-environment.json'}
        audit_path.write_text(json.dumps(audit,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')


def main():
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--root',type=Path,default=ROOT)
    parser.add_argument('--verify-only',action='store_true')
    args=parser.parse_args();root=args.root.resolve()
    before={i:sha((root/f'assets/models/{i}.glb').read_bytes()) for i in IDS}
    body,body_nodes,measurements=measure_body(root/'assets/models/girder.glb')
    if not args.verify_only:
        for tier in ['standard','low']:
            material_asset=GLB(root/f'assets/environments/cable_stayed_{tier}.glb')
            Builder(material_asset).build().write(root/f'assets/environments/girder_{tier}.glb')
    report=verify_environment(root,body_nodes,measurements)
    after={i:sha((root/f'assets/models/{i}.glb').read_bytes()) for i in IDS}
    report['all_four_body_files_byte_unchanged']=before==after
    report['body_sha256_before']=before;report['body_sha256_after']=after
    manifest=json.loads((root/'assets/asset-manifest.json').read_text(encoding='utf-8'))
    report['body_hashes_match_approved_optimized_manifest']=all(m['output']['sha256']==after[m['id']] for m in manifest['models'])
    report['passed']=report['passed'] and before==after and report['body_hashes_match_approved_optimized_manifest']
    report['generated_at_utc']=datetime.now(timezone.utc).isoformat()
    report['assumptions']=['新建教学布景，不是原型测量地形或引道施工图。',
        '沿用旧梁桥源码的河道中心 X≈45 m、水面 Z=0.32 m 和两幅引道关系；简化岸坡与路基，不复用树草粒子。',
        '桥下地形控制在 Z≤6 m，便于查看最低约 Z=9.92 m 的支座组件。关闭背景可完整观察埋置桩基。',
        '两端引道 X=-60..0、90..150 m；两幅路面宽均11.5 m，Z=12.7 m。坐标取自实际主体GLB。',
        '标准/低档均直接复用已优化斜拉桥环境的CC0材料图像；标准最大1024、低档512，无新增或放大纹理。',
        '环境根组90_Environment，所有节点恒等变换；环境单独按需加载，主体无任何几何/颜色/变换修改。']
    out=root/'docs/asset-girder-environment.json';out.write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    if not report['passed']:raise SystemExit('FAILED '+str(out))
    if not args.verify_only:update_manifest(root,report)
    notes='''# T 梁桥独立河岸环境

应用户追加要求，新建了简洁河谷、水面、两岸路基与双幅接引路。原梁桥 GLB 不包含旧 Blender 的 `90_Set`；新环境依据旧工程源码的河道方向、水位和引道布置生成，采用已交付三类桥的 CC0 图像材质，未提取旧树草粒子。

这是一处教学布景，不代表现场地形、设计水位或接引路结构设计。桥下低岸坡保留支座观察空间；环境默认关闭，关闭后可查看完整埋置桩基。

主体实测：纵向 X=0–90 m；双幅路面横向分别为 Y=[-12.25,-0.75]、[0.75,12.25] m；路面顶 Z≈12.7 m。整体含翼墙与桩基范围 X=-7..97、Y=±13.1、Z=-12..13.678 m。环境没有给主体施加旋转、平移或缩放。

两端引道范围 X=-60..0、90..150 m，分别与实际 X=0/90 的双幅路面边界及标高对齐。水面沿横桥向延伸，中心 X≈45 m，Z=0.32 m。两端路基止于既有背墙后方；桥内地形最高 Z≤6 m，低于支座组件约3.92 m。

标准档最大贴图尺寸为1024，流畅档为512；原512水面法线保持原尺寸，不放大。两档实际几何、UV、法线、构件 ID、stage/end_stage 与节点变换逐项相同。每个节点属于90_Environment，阶段闭区间0–99，仅作环境独立显隐。

可复现：在本目录运行 `python -X utf8 source/asset_girder_environment.py`；独立复核运行相同命令加 `--verify-only`。先执行资产优化，再执行此环境生成器，最后执行报告生成器。脚本从不写入 `assets/models`。四个主体SHA-256与既定优化清单相同，实测尺寸、对接误差和完整验证见 [asset-girder-environment.json](asset-girder-environment.json)。
'''
    (root/'docs/asset-girder-environment.md').write_text(notes,encoding='utf-8')
    print(json.dumps({'passed':report['passed'],'body_hashes_unchanged':before==after,
                      'bearing_clearance_m':report['minimum_vertical_terrain_to_bearings_m'],
                      'environment_triangles':report['triangles'],
                      'standard_bytes':(root/'assets/environments/girder_standard.glb').stat().st_size,
                      'low_bytes':(root/'assets/environments/girder_low.glb').stat().st_size},ensure_ascii=False))


if __name__=='__main__':main()
