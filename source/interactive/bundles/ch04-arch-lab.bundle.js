(()=>{var jn={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},Qn={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Gl=0,Eo=1,Wl=2;var tl=1,ja=2,fn=3,Cn=0,Pt=1,Yt=2;var Tn=0,Mi=1,wo=2,To=3,Ao=4,Xl=5,Gn=100,ql=101,Yl=102,Ro=103,Co=104,Zl=200,$l=201,Jl=202,Kl=203,la=204,ha=205,jl=206,Ql=207,eh=208,th=209,nh=210,ih=211,sh=212,rh=213,ah=214,oh=0,ch=1,lh=2,Ds=3,hh=4,uh=5,dh=6,fh=7,nl=0,ph=1,mh=2,An=0,gh=1,_h=2,xh=3,yh=4,vh=5,Mh=6;var il=300,Ei=301,wi=302,ua=303,da=304,ur=306,fa=1e3,Zt=1001,pa=1002,Rt=1003,Po=1004;var Rr=1005;var zt=1006,Sh=1007;var Zi=1008;var Rn=1009,bh=1010,Eh=1011,Qa=1012,sl=1013,En=1014,wn=1015,$i=1016,rl=1017,al=1018,Xn=1020,wh=1021,$t=1023,Th=1024,Ah=1025,qn=1026,Ti=1027,Rh=1028,ol=1029,Ch=1030,cl=1031,ll=1033,Cr=33776,Pr=33777,Lr=33778,Ir=33779,Lo=35840,Io=35841,Do=35842,No=35843,hl=36196,Uo=37492,Fo=37496,Oo=37808,Bo=37809,zo=37810,ko=37811,Ho=37812,Vo=37813,Go=37814,Wo=37815,Xo=37816,qo=37817,Yo=37818,Zo=37819,$o=37820,Jo=37821,Dr=36492,Ko=36494,jo=36495,Ph=36283,Qo=36284,ec=36285,tc=36286;var Ns=2300,Us=2301,Nr=2302,nc=2400,ic=2401,sc=2402;var ul=3e3,Yn=3001,Lh=3200,Ih=3201,dl=0,Dh=1,kt="",dt="srgb",mn="srgb-linear",eo="display-p3",dr="display-p3-linear",Fs="linear",tt="srgb",Os="rec709",Bs="p3";var ti=7680;var rc=519,Nh=512,Uh=513,Fh=514,fl=515,Oh=516,Bh=517,zh=518,kh=519,ac=35044;var oc="300 es",ma=1035,pn=2e3,zs=2001,sn=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;let n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;let s=this._listeners[e];if(s!==void 0){let r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){if(this._listeners===void 0)return;let n=this._listeners[e.type];if(n!==void 0){e.target=this;let s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,e);e.target=null}}},St=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],cc=1234567,Vi=Math.PI/180,Ji=180/Math.PI;function Ii(){let i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(St[i&255]+St[i>>8&255]+St[i>>16&255]+St[i>>24&255]+"-"+St[e&255]+St[e>>8&255]+"-"+St[e>>16&15|64]+St[e>>24&255]+"-"+St[t&63|128]+St[t>>8&255]+"-"+St[t>>16&255]+St[t>>24&255]+St[n&255]+St[n>>8&255]+St[n>>16&255]+St[n>>24&255]).toLowerCase()}function xt(i,e,t){return Math.max(e,Math.min(t,i))}function to(i,e){return(i%e+e)%e}function Hh(i,e,t,n,s){return n+(i-e)*(s-n)/(t-e)}function Vh(i,e,t){return i!==e?(t-i)/(e-i):0}function Gi(i,e,t){return(1-t)*i+t*e}function Gh(i,e,t,n){return Gi(i,e,1-Math.exp(-t*n))}function Wh(i,e=1){return e-Math.abs(to(i,e*2)-e)}function Xh(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function qh(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function Yh(i,e){return i+Math.floor(Math.random()*(e-i+1))}function Zh(i,e){return i+Math.random()*(e-i)}function $h(i){return i*(.5-Math.random())}function Jh(i){i!==void 0&&(cc=i);let e=cc+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Kh(i){return i*Vi}function jh(i){return i*Ji}function ga(i){return(i&i-1)===0&&i!==0}function Qh(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function ks(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function eu(i,e,t,n,s){let r=Math.cos,o=Math.sin,a=r(t/2),c=o(t/2),l=r((e+n)/2),h=o((e+n)/2),u=r((e-n)/2),d=o((e-n)/2),p=r((n-e)/2),g=o((n-e)/2);switch(s){case"XYX":i.set(a*h,c*u,c*d,a*l);break;case"YZY":i.set(c*d,a*h,c*u,a*l);break;case"ZXZ":i.set(c*u,c*d,a*h,a*l);break;case"XZX":i.set(a*h,c*g,c*p,a*l);break;case"YXY":i.set(c*p,a*h,c*g,a*l);break;case"ZYZ":i.set(c*g,c*p,a*h,a*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function _i(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function Tt(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}var Ln={DEG2RAD:Vi,RAD2DEG:Ji,generateUUID:Ii,clamp:xt,euclideanModulo:to,mapLinear:Hh,inverseLerp:Vh,lerp:Gi,damp:Gh,pingpong:Wh,smoothstep:Xh,smootherstep:qh,randInt:Yh,randFloat:Zh,randFloatSpread:$h,seededRandom:Jh,degToRad:Kh,radToDeg:jh,isPowerOfTwo:ga,ceilPowerOfTwo:Qh,floorPowerOfTwo:ks,setQuaternionFromProperEuler:eu,normalize:Tt,denormalize:_i},Re=class i{constructor(e=0,t=0){i.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(xt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,o=this.y-e.y;return this.x=r*n-o*s+e.x,this.y=r*s+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Ye=class i{constructor(e,t,n,s,r,o,a,c,l){i.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,o,a,c,l)}set(e,t,n,s,r,o,a,c,l){let h=this.elements;return h[0]=e,h[1]=s,h[2]=a,h[3]=t,h[4]=r,h[5]=c,h[6]=n,h[7]=o,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,o=n[0],a=n[3],c=n[6],l=n[1],h=n[4],u=n[7],d=n[2],p=n[5],g=n[8],x=s[0],m=s[3],f=s[6],T=s[1],v=s[4],D=s[7],H=s[2],N=s[5],b=s[8];return r[0]=o*x+a*T+c*H,r[3]=o*m+a*v+c*N,r[6]=o*f+a*D+c*b,r[1]=l*x+h*T+u*H,r[4]=l*m+h*v+u*N,r[7]=l*f+h*D+u*b,r[2]=d*x+p*T+g*H,r[5]=d*m+p*v+g*N,r[8]=d*f+p*D+g*b,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],h=e[8];return t*o*h-t*a*l-n*r*h+n*a*c+s*r*l-s*o*c}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],h=e[8],u=h*o-a*l,d=a*c-h*r,p=l*r-o*c,g=t*u+n*d+s*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let x=1/g;return e[0]=u*x,e[1]=(s*l-h*n)*x,e[2]=(a*n-s*o)*x,e[3]=d*x,e[4]=(h*t-s*c)*x,e[5]=(s*r-a*t)*x,e[6]=p*x,e[7]=(n*c-l*t)*x,e[8]=(o*t-n*r)*x,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,o,a){let c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*o+l*a)+o+e,-s*l,s*c,-s*(-l*o+c*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(Ur.makeScale(e,t)),this}rotate(e){return this.premultiply(Ur.makeRotation(-e)),this}translate(e,t){return this.premultiply(Ur.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},Ur=new Ye;function pl(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function Hs(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function tu(){let i=Hs("canvas");return i.style.display="block",i}var lc={};function Wi(i){i in lc||(lc[i]=!0,console.warn(i))}var hc=new Ye().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),uc=new Ye().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),os={[mn]:{transfer:Fs,primaries:Os,toReference:i=>i,fromReference:i=>i},[dt]:{transfer:tt,primaries:Os,toReference:i=>i.convertSRGBToLinear(),fromReference:i=>i.convertLinearToSRGB()},[dr]:{transfer:Fs,primaries:Bs,toReference:i=>i.applyMatrix3(uc),fromReference:i=>i.applyMatrix3(hc)},[eo]:{transfer:tt,primaries:Bs,toReference:i=>i.convertSRGBToLinear().applyMatrix3(uc),fromReference:i=>i.applyMatrix3(hc).convertLinearToSRGB()}},nu=new Set([mn,dr]),je={enabled:!0,_workingColorSpace:mn,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(i){if(!nu.has(i))throw new Error(`Unsupported working color space, "${i}".`);this._workingColorSpace=i},convert:function(i,e,t){if(this.enabled===!1||e===t||!e||!t)return i;let n=os[e].toReference,s=os[t].fromReference;return s(n(i))},fromWorkingColorSpace:function(i,e){return this.convert(i,this._workingColorSpace,e)},toWorkingColorSpace:function(i,e){return this.convert(i,e,this._workingColorSpace)},getPrimaries:function(i){return os[i].primaries},getTransfer:function(i){return i===kt?Fs:os[i].transfer}};function Si(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Fr(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var ni,Vs=class{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{ni===void 0&&(ni=Hs("canvas")),ni.width=e.width,ni.height=e.height;let n=ni.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=ni}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=Hs("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=Si(r[o]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Si(t[n]/255)*255):t[n]=Si(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},iu=0,Gs=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:iu++}),this.uuid=Ii(),this.data=e,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(Or(s[o].image)):r.push(Or(s[o]))}else r=Or(s);n.url=r}return t||(e.images[this.uuid]=n),n}};function Or(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Vs.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var su=0,Jt=class i extends sn{constructor(e=i.DEFAULT_IMAGE,t=i.DEFAULT_MAPPING,n=Zt,s=Zt,r=zt,o=Zi,a=$t,c=Rn,l=i.DEFAULT_ANISOTROPY,h=kt){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:su++}),this.uuid=Ii(),this.name="",this.source=new Gs(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new Re(0,0),this.repeat=new Re(1,1),this.center=new Re(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ye,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof h=="string"?this.colorSpace=h:(Wi("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=h===Yn?dt:kt),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==il)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case fa:e.x=e.x-Math.floor(e.x);break;case Zt:e.x=e.x<0?0:1;break;case pa:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case fa:e.y=e.y-Math.floor(e.y);break;case Zt:e.y=e.y<0?0:1;break;case pa:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return Wi("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===dt?Yn:ul}set encoding(e){Wi("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=e===Yn?dt:kt}};Jt.DEFAULT_IMAGE=null;Jt.DEFAULT_MAPPING=il;Jt.DEFAULT_ANISOTROPY=1;var yt=class i{constructor(e=0,t=0,n=0,s=1){i.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*t+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*t+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*t+o[7]*n+o[11]*s+o[15]*r,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r,c=e.elements,l=c[0],h=c[4],u=c[8],d=c[1],p=c[5],g=c[9],x=c[2],m=c[6],f=c[10];if(Math.abs(h-d)<.01&&Math.abs(u-x)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+x)<.1&&Math.abs(g+m)<.1&&Math.abs(l+p+f-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let v=(l+1)/2,D=(p+1)/2,H=(f+1)/2,N=(h+d)/4,b=(u+x)/4,z=(g+m)/4;return v>D&&v>H?v<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(v),s=N/n,r=b/n):D>H?D<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(D),n=N/s,r=z/s):H<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(H),n=b/r,s=z/r),this.set(n,s,r,t),this}let T=Math.sqrt((m-g)*(m-g)+(u-x)*(u-x)+(d-h)*(d-h));return Math.abs(T)<.001&&(T=1),this.x=(m-g)/T,this.y=(u-x)/T,this.z=(d-h)/T,this.w=Math.acos((l+p+f-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},_a=class extends sn{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new yt(0,0,e,t),this.scissorTest=!1,this.viewport=new yt(0,0,e,t);let s={width:e,height:t,depth:1};n.encoding!==void 0&&(Wi("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),n.colorSpace=n.encoding===Yn?dt:kt),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:zt,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},n),this.texture=new Jt(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=n.generateMipmaps,this.texture.internalFormat=n.internalFormat,this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}setSize(e,t,n=1){(this.width!==e||this.height!==t||this.depth!==n)&&(this.width=e,this.height=t,this.depth=n,this.texture.image.width=e,this.texture.image.height=t,this.texture.image.depth=n,this.dispose()),this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;let t=Object.assign({},e.texture.image);return this.texture.source=new Gs(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},gn=class extends _a{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},Ws=class extends Jt{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Rt,this.minFilter=Rt,this.wrapR=Zt,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var xa=class extends Jt{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Rt,this.minFilter=Rt,this.wrapR=Zt,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Kt=class{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,o,a){let c=n[s+0],l=n[s+1],h=n[s+2],u=n[s+3],d=r[o+0],p=r[o+1],g=r[o+2],x=r[o+3];if(a===0){e[t+0]=c,e[t+1]=l,e[t+2]=h,e[t+3]=u;return}if(a===1){e[t+0]=d,e[t+1]=p,e[t+2]=g,e[t+3]=x;return}if(u!==x||c!==d||l!==p||h!==g){let m=1-a,f=c*d+l*p+h*g+u*x,T=f>=0?1:-1,v=1-f*f;if(v>Number.EPSILON){let H=Math.sqrt(v),N=Math.atan2(H,f*T);m=Math.sin(m*N)/H,a=Math.sin(a*N)/H}let D=a*T;if(c=c*m+d*D,l=l*m+p*D,h=h*m+g*D,u=u*m+x*D,m===1-a){let H=1/Math.sqrt(c*c+l*l+h*h+u*u);c*=H,l*=H,h*=H,u*=H}}e[t]=c,e[t+1]=l,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,s,r,o){let a=n[s],c=n[s+1],l=n[s+2],h=n[s+3],u=r[o],d=r[o+1],p=r[o+2],g=r[o+3];return e[t]=a*g+h*u+c*p-l*d,e[t+1]=c*g+h*d+l*u-a*p,e[t+2]=l*g+h*p+a*d-c*u,e[t+3]=h*g-a*u-c*d-l*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,s=e._y,r=e._z,o=e._order,a=Math.cos,c=Math.sin,l=a(n/2),h=a(s/2),u=a(r/2),d=c(n/2),p=c(s/2),g=c(r/2);switch(o){case"XYZ":this._x=d*h*u+l*p*g,this._y=l*p*u-d*h*g,this._z=l*h*g+d*p*u,this._w=l*h*u-d*p*g;break;case"YXZ":this._x=d*h*u+l*p*g,this._y=l*p*u-d*h*g,this._z=l*h*g-d*p*u,this._w=l*h*u+d*p*g;break;case"ZXY":this._x=d*h*u-l*p*g,this._y=l*p*u+d*h*g,this._z=l*h*g+d*p*u,this._w=l*h*u-d*p*g;break;case"ZYX":this._x=d*h*u-l*p*g,this._y=l*p*u+d*h*g,this._z=l*h*g-d*p*u,this._w=l*h*u+d*p*g;break;case"YZX":this._x=d*h*u+l*p*g,this._y=l*p*u+d*h*g,this._z=l*h*g-d*p*u,this._w=l*h*u-d*p*g;break;case"XZY":this._x=d*h*u-l*p*g,this._y=l*p*u-d*h*g,this._z=l*h*g+d*p*u,this._w=l*h*u+d*p*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],s=t[4],r=t[8],o=t[1],a=t[5],c=t[9],l=t[2],h=t[6],u=t[10],d=n+a+u;if(d>0){let p=.5/Math.sqrt(d+1);this._w=.25/p,this._x=(h-c)*p,this._y=(r-l)*p,this._z=(o-s)*p}else if(n>a&&n>u){let p=2*Math.sqrt(1+n-a-u);this._w=(h-c)/p,this._x=.25*p,this._y=(s+o)/p,this._z=(r+l)/p}else if(a>u){let p=2*Math.sqrt(1+a-n-u);this._w=(r-l)/p,this._x=(s+o)/p,this._y=.25*p,this._z=(c+h)/p}else{let p=2*Math.sqrt(1+u-n-a);this._w=(o-s)/p,this._x=(r+l)/p,this._y=(c+h)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(xt(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,s=e._y,r=e._z,o=e._w,a=t._x,c=t._y,l=t._z,h=t._w;return this._x=n*h+o*a+s*l-r*c,this._y=s*h+o*c+r*a-n*l,this._z=r*h+o*l+n*c-s*a,this._w=o*h-n*a-s*c-r*l,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);let n=this._x,s=this._y,r=this._z,o=this._w,a=o*e._w+n*e._x+s*e._y+r*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=n,this._y=s,this._z=r,this;let c=1-a*a;if(c<=Number.EPSILON){let p=1-t;return this._w=p*o+t*this._w,this._x=p*n+t*this._x,this._y=p*s+t*this._y,this._z=p*r+t*this._z,this.normalize(),this}let l=Math.sqrt(c),h=Math.atan2(l,a),u=Math.sin((1-t)*h)/l,d=Math.sin(t*h)/l;return this._w=o*u+this._w*d,this._x=n*u+this._x*d,this._y=s*u+this._y*d,this._z=r*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=Math.random(),t=Math.sqrt(1-e),n=Math.sqrt(e),s=2*Math.PI*Math.random(),r=2*Math.PI*Math.random();return this.set(t*Math.cos(s),n*Math.sin(r),n*Math.cos(r),t*Math.sin(s))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},B=class i{constructor(e=0,t=0,n=0){i.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(dc.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(dc.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=e.elements,o=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(e){let t=this.x,n=this.y,s=this.z,r=e.x,o=e.y,a=e.z,c=e.w,l=2*(o*s-a*n),h=2*(a*t-r*s),u=2*(r*n-o*t);return this.x=t+c*l+o*u-a*h,this.y=n+c*h+a*l-r*u,this.z=s+c*u+r*h-o*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,s=e.y,r=e.z,o=t.x,a=t.y,c=t.z;return this.x=s*c-r*a,this.y=r*o-n*c,this.z=n*a-s*o,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Br.copy(this).projectOnVector(e),this.sub(Br)}reflect(e){return this.sub(Br.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(xt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=(Math.random()-.5)*2,t=Math.random()*Math.PI*2,n=Math.sqrt(1-e**2);return this.x=n*Math.cos(t),this.y=n*Math.sin(t),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Br=new B,dc=new Kt,Zn=class{constructor(e=new B(1/0,1/0,1/0),t=new B(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Gt.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Gt.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=Gt.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,Gt):Gt.fromBufferAttribute(r,o),Gt.applyMatrix4(e.matrixWorld),this.expandByPoint(Gt);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),cs.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),cs.copy(n.boundingBox)),cs.applyMatrix4(e.matrixWorld),this.union(cs)}let s=e.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,Gt),Gt.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Bi),ls.subVectors(this.max,Bi),ii.subVectors(e.a,Bi),si.subVectors(e.b,Bi),ri.subVectors(e.c,Bi),yn.subVectors(si,ii),vn.subVectors(ri,si),Bn.subVectors(ii,ri);let t=[0,-yn.z,yn.y,0,-vn.z,vn.y,0,-Bn.z,Bn.y,yn.z,0,-yn.x,vn.z,0,-vn.x,Bn.z,0,-Bn.x,-yn.y,yn.x,0,-vn.y,vn.x,0,-Bn.y,Bn.x,0];return!zr(t,ii,si,ri,ls)||(t=[1,0,0,0,1,0,0,0,1],!zr(t,ii,si,ri,ls))?!1:(hs.crossVectors(yn,vn),t=[hs.x,hs.y,hs.z],zr(t,ii,si,ri,ls))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Gt).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Gt).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(cn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),cn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),cn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),cn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),cn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),cn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),cn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),cn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(cn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}},cn=[new B,new B,new B,new B,new B,new B,new B,new B],Gt=new B,cs=new Zn,ii=new B,si=new B,ri=new B,yn=new B,vn=new B,Bn=new B,Bi=new B,ls=new B,hs=new B,zn=new B;function zr(i,e,t,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){zn.fromArray(i,r);let a=s.x*Math.abs(zn.x)+s.y*Math.abs(zn.y)+s.z*Math.abs(zn.z),c=e.dot(zn),l=t.dot(zn),h=n.dot(zn);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>a)return!1}return!0}var ru=new Zn,zi=new B,kr=new B,Ai=class{constructor(e=new B,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):ru.setFromPoints(e).getCenter(n);let s=0;for(let r=0,o=e.length;r<o;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;zi.subVectors(e,this.center);let t=zi.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(zi,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(kr.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(zi.copy(e.center).add(kr)),this.expandByPoint(zi.copy(e.center).sub(kr))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}},ln=new B,Hr=new B,us=new B,Mn=new B,Vr=new B,ds=new B,Gr=new B,Ri=class{constructor(e=new B,t=new B(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,ln)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=ln.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(ln.copy(this.origin).addScaledVector(this.direction,t),ln.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){Hr.copy(e).add(t).multiplyScalar(.5),us.copy(t).sub(e).normalize(),Mn.copy(this.origin).sub(Hr);let r=e.distanceTo(t)*.5,o=-this.direction.dot(us),a=Mn.dot(this.direction),c=-Mn.dot(us),l=Mn.lengthSq(),h=Math.abs(1-o*o),u,d,p,g;if(h>0)if(u=o*c-a,d=o*a-c,g=r*h,u>=0)if(d>=-g)if(d<=g){let x=1/h;u*=x,d*=x,p=u*(u+o*d+2*a)+d*(o*u+d+2*c)+l}else d=r,u=Math.max(0,-(o*d+a)),p=-u*u+d*(d+2*c)+l;else d=-r,u=Math.max(0,-(o*d+a)),p=-u*u+d*(d+2*c)+l;else d<=-g?(u=Math.max(0,-(-o*r+a)),d=u>0?-r:Math.min(Math.max(-r,-c),r),p=-u*u+d*(d+2*c)+l):d<=g?(u=0,d=Math.min(Math.max(-r,-c),r),p=d*(d+2*c)+l):(u=Math.max(0,-(o*r+a)),d=u>0?r:Math.min(Math.max(-r,-c),r),p=-u*u+d*(d+2*c)+l);else d=o>0?-r:r,u=Math.max(0,-(o*d+a)),p=-u*u+d*(d+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(Hr).addScaledVector(us,d),p}intersectSphere(e,t){ln.subVectors(e.center,this.origin);let n=ln.dot(this.direction),s=ln.dot(ln)-n*n,r=e.radius*e.radius;if(s>r)return null;let o=Math.sqrt(r-s),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,t):this.at(a,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,o,a,c,l=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return l>=0?(n=(e.min.x-d.x)*l,s=(e.max.x-d.x)*l):(n=(e.max.x-d.x)*l,s=(e.min.x-d.x)*l),h>=0?(r=(e.min.y-d.y)*h,o=(e.max.y-d.y)*h):(r=(e.max.y-d.y)*h,o=(e.min.y-d.y)*h),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),u>=0?(a=(e.min.z-d.z)*u,c=(e.max.z-d.z)*u):(a=(e.max.z-d.z)*u,c=(e.min.z-d.z)*u),n>c||a>s)||((a>n||n!==n)&&(n=a),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,ln)!==null}intersectTriangle(e,t,n,s,r){Vr.subVectors(t,e),ds.subVectors(n,e),Gr.crossVectors(Vr,ds);let o=this.direction.dot(Gr),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Mn.subVectors(this.origin,e);let c=a*this.direction.dot(ds.crossVectors(Mn,ds));if(c<0)return null;let l=a*this.direction.dot(Vr.cross(Mn));if(l<0||c+l>o)return null;let h=-a*Mn.dot(Gr);return h<0?null:this.at(h/o,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},ht=class i{constructor(e,t,n,s,r,o,a,c,l,h,u,d,p,g,x,m){i.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,o,a,c,l,h,u,d,p,g,x,m)}set(e,t,n,s,r,o,a,c,l,h,u,d,p,g,x,m){let f=this.elements;return f[0]=e,f[4]=t,f[8]=n,f[12]=s,f[1]=r,f[5]=o,f[9]=a,f[13]=c,f[2]=l,f[6]=h,f[10]=u,f[14]=d,f[3]=p,f[7]=g,f[11]=x,f[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new i().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){let t=this.elements,n=e.elements,s=1/ai.setFromMatrixColumn(e,0).length(),r=1/ai.setFromMatrixColumn(e,1).length(),o=1/ai.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,s=e.y,r=e.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(s),l=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(e.order==="XYZ"){let d=o*h,p=o*u,g=a*h,x=a*u;t[0]=c*h,t[4]=-c*u,t[8]=l,t[1]=p+g*l,t[5]=d-x*l,t[9]=-a*c,t[2]=x-d*l,t[6]=g+p*l,t[10]=o*c}else if(e.order==="YXZ"){let d=c*h,p=c*u,g=l*h,x=l*u;t[0]=d+x*a,t[4]=g*a-p,t[8]=o*l,t[1]=o*u,t[5]=o*h,t[9]=-a,t[2]=p*a-g,t[6]=x+d*a,t[10]=o*c}else if(e.order==="ZXY"){let d=c*h,p=c*u,g=l*h,x=l*u;t[0]=d-x*a,t[4]=-o*u,t[8]=g+p*a,t[1]=p+g*a,t[5]=o*h,t[9]=x-d*a,t[2]=-o*l,t[6]=a,t[10]=o*c}else if(e.order==="ZYX"){let d=o*h,p=o*u,g=a*h,x=a*u;t[0]=c*h,t[4]=g*l-p,t[8]=d*l+x,t[1]=c*u,t[5]=x*l+d,t[9]=p*l-g,t[2]=-l,t[6]=a*c,t[10]=o*c}else if(e.order==="YZX"){let d=o*c,p=o*l,g=a*c,x=a*l;t[0]=c*h,t[4]=x-d*u,t[8]=g*u+p,t[1]=u,t[5]=o*h,t[9]=-a*h,t[2]=-l*h,t[6]=p*u+g,t[10]=d-x*u}else if(e.order==="XZY"){let d=o*c,p=o*l,g=a*c,x=a*l;t[0]=c*h,t[4]=-u,t[8]=l*h,t[1]=d*u+x,t[5]=o*h,t[9]=p*u-g,t[2]=g*u-p,t[6]=a*h,t[10]=x*u+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(au,e,ou)}lookAt(e,t,n){let s=this.elements;return Dt.subVectors(e,t),Dt.lengthSq()===0&&(Dt.z=1),Dt.normalize(),Sn.crossVectors(n,Dt),Sn.lengthSq()===0&&(Math.abs(n.z)===1?Dt.x+=1e-4:Dt.z+=1e-4,Dt.normalize(),Sn.crossVectors(n,Dt)),Sn.normalize(),fs.crossVectors(Dt,Sn),s[0]=Sn.x,s[4]=fs.x,s[8]=Dt.x,s[1]=Sn.y,s[5]=fs.y,s[9]=Dt.y,s[2]=Sn.z,s[6]=fs.z,s[10]=Dt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,o=n[0],a=n[4],c=n[8],l=n[12],h=n[1],u=n[5],d=n[9],p=n[13],g=n[2],x=n[6],m=n[10],f=n[14],T=n[3],v=n[7],D=n[11],H=n[15],N=s[0],b=s[4],z=s[8],_=s[12],M=s[1],X=s[5],ee=s[9],le=s[13],P=s[2],q=s[6],ne=s[10],C=s[14],A=s[3],F=s[7],J=s[11],Y=s[15];return r[0]=o*N+a*M+c*P+l*A,r[4]=o*b+a*X+c*q+l*F,r[8]=o*z+a*ee+c*ne+l*J,r[12]=o*_+a*le+c*C+l*Y,r[1]=h*N+u*M+d*P+p*A,r[5]=h*b+u*X+d*q+p*F,r[9]=h*z+u*ee+d*ne+p*J,r[13]=h*_+u*le+d*C+p*Y,r[2]=g*N+x*M+m*P+f*A,r[6]=g*b+x*X+m*q+f*F,r[10]=g*z+x*ee+m*ne+f*J,r[14]=g*_+x*le+m*C+f*Y,r[3]=T*N+v*M+D*P+H*A,r[7]=T*b+v*X+D*q+H*F,r[11]=T*z+v*ee+D*ne+H*J,r[15]=T*_+v*le+D*C+H*Y,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],o=e[1],a=e[5],c=e[9],l=e[13],h=e[2],u=e[6],d=e[10],p=e[14],g=e[3],x=e[7],m=e[11],f=e[15];return g*(+r*c*u-s*l*u-r*a*d+n*l*d+s*a*p-n*c*p)+x*(+t*c*p-t*l*d+r*o*d-s*o*p+s*l*h-r*c*h)+m*(+t*l*u-t*a*p-r*o*u+n*o*p+r*a*h-n*l*h)+f*(-s*a*h-t*c*u+t*a*d+s*o*u-n*o*d+n*c*h)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],h=e[8],u=e[9],d=e[10],p=e[11],g=e[12],x=e[13],m=e[14],f=e[15],T=u*m*l-x*d*l+x*c*p-a*m*p-u*c*f+a*d*f,v=g*d*l-h*m*l-g*c*p+o*m*p+h*c*f-o*d*f,D=h*x*l-g*u*l+g*a*p-o*x*p-h*a*f+o*u*f,H=g*u*c-h*x*c-g*a*d+o*x*d+h*a*m-o*u*m,N=t*T+n*v+s*D+r*H;if(N===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let b=1/N;return e[0]=T*b,e[1]=(x*d*r-u*m*r-x*s*p+n*m*p+u*s*f-n*d*f)*b,e[2]=(a*m*r-x*c*r+x*s*l-n*m*l-a*s*f+n*c*f)*b,e[3]=(u*c*r-a*d*r-u*s*l+n*d*l+a*s*p-n*c*p)*b,e[4]=v*b,e[5]=(h*m*r-g*d*r+g*s*p-t*m*p-h*s*f+t*d*f)*b,e[6]=(g*c*r-o*m*r-g*s*l+t*m*l+o*s*f-t*c*f)*b,e[7]=(o*d*r-h*c*r+h*s*l-t*d*l-o*s*p+t*c*p)*b,e[8]=D*b,e[9]=(g*u*r-h*x*r-g*n*p+t*x*p+h*n*f-t*u*f)*b,e[10]=(o*x*r-g*a*r+g*n*l-t*x*l-o*n*f+t*a*f)*b,e[11]=(h*a*r-o*u*r-h*n*l+t*u*l+o*n*p-t*a*p)*b,e[12]=H*b,e[13]=(h*x*s-g*u*s+g*n*d-t*x*d-h*n*m+t*u*m)*b,e[14]=(g*a*s-o*x*s-g*n*c+t*x*c+o*n*m-t*a*m)*b,e[15]=(o*u*s-h*a*s+h*n*c-t*u*c-o*n*d+t*a*d)*b,this}scale(e){let t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),s=Math.sin(t),r=1-n,o=e.x,a=e.y,c=e.z,l=r*o,h=r*a;return this.set(l*o+n,l*a-s*c,l*c+s*a,0,l*a+s*c,h*a+n,h*c-s*o,0,l*c-s*a,h*c+s*o,r*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,o){return this.set(1,n,r,0,e,1,o,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){let s=this.elements,r=t._x,o=t._y,a=t._z,c=t._w,l=r+r,h=o+o,u=a+a,d=r*l,p=r*h,g=r*u,x=o*h,m=o*u,f=a*u,T=c*l,v=c*h,D=c*u,H=n.x,N=n.y,b=n.z;return s[0]=(1-(x+f))*H,s[1]=(p+D)*H,s[2]=(g-v)*H,s[3]=0,s[4]=(p-D)*N,s[5]=(1-(d+f))*N,s[6]=(m+T)*N,s[7]=0,s[8]=(g+v)*b,s[9]=(m-T)*b,s[10]=(1-(d+x))*b,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){let s=this.elements,r=ai.set(s[0],s[1],s[2]).length(),o=ai.set(s[4],s[5],s[6]).length(),a=ai.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),e.x=s[12],e.y=s[13],e.z=s[14],Wt.copy(this);let l=1/r,h=1/o,u=1/a;return Wt.elements[0]*=l,Wt.elements[1]*=l,Wt.elements[2]*=l,Wt.elements[4]*=h,Wt.elements[5]*=h,Wt.elements[6]*=h,Wt.elements[8]*=u,Wt.elements[9]*=u,Wt.elements[10]*=u,t.setFromRotationMatrix(Wt),n.x=r,n.y=o,n.z=a,this}makePerspective(e,t,n,s,r,o,a=pn){let c=this.elements,l=2*r/(t-e),h=2*r/(n-s),u=(t+e)/(t-e),d=(n+s)/(n-s),p,g;if(a===pn)p=-(o+r)/(o-r),g=-2*o*r/(o-r);else if(a===zs)p=-o/(o-r),g=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=l,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=h,c[9]=d,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=g,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,s,r,o,a=pn){let c=this.elements,l=1/(t-e),h=1/(n-s),u=1/(o-r),d=(t+e)*l,p=(n+s)*h,g,x;if(a===pn)g=(o+r)*u,x=-2*u;else if(a===zs)g=r*u,x=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-d,c[1]=0,c[5]=2*h,c[9]=0,c[13]=-p,c[2]=0,c[6]=0,c[10]=x,c[14]=-g,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},ai=new B,Wt=new ht,au=new B(0,0,0),ou=new B(1,1,1),Sn=new B,fs=new B,Dt=new B,fc=new ht,pc=new Kt,Xs=class i{constructor(e=0,t=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let s=e.elements,r=s[0],o=s[4],a=s[8],c=s[1],l=s[5],h=s[9],u=s[2],d=s[6],p=s[10];switch(t){case"XYZ":this._y=Math.asin(xt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,p),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(d,l),this._z=0);break;case"YXZ":this._x=Math.asin(-xt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,p),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(xt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,p),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-xt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,p),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(xt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,p));break;case"XZY":this._z=Math.asin(-xt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,l),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return fc.makeRotationFromQuaternion(e),this.setFromRotationMatrix(fc,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return pc.setFromEuler(this),this.setFromQuaternion(pc,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Xs.DEFAULT_ORDER="XYZ";var qs=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},cu=0,mc=new B,oi=new Kt,hn=new ht,ps=new B,ki=new B,lu=new B,hu=new Kt,gc=new B(1,0,0),_c=new B(0,1,0),xc=new B(0,0,1),uu={type:"added"},du={type:"removed"},vt=class i extends sn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:cu++}),this.uuid=Ii(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let e=new B,t=new Xs,n=new Kt,s=new B(1,1,1);function r(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new ht},normalMatrix:{value:new Ye}}),this.matrix=new ht,this.matrixWorld=new ht,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new qs,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return oi.setFromAxisAngle(e,t),this.quaternion.multiply(oi),this}rotateOnWorldAxis(e,t){return oi.setFromAxisAngle(e,t),this.quaternion.premultiply(oi),this}rotateX(e){return this.rotateOnAxis(gc,e)}rotateY(e){return this.rotateOnAxis(_c,e)}rotateZ(e){return this.rotateOnAxis(xc,e)}translateOnAxis(e,t){return mc.copy(e).applyQuaternion(this.quaternion),this.position.add(mc.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(gc,e)}translateY(e){return this.translateOnAxis(_c,e)}translateZ(e){return this.translateOnAxis(xc,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(hn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?ps.copy(e):ps.set(e,t,n);let s=this.parent;this.updateWorldMatrix(!0,!1),ki.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?hn.lookAt(ki,ps,this.up):hn.lookAt(ps,ki,this.up),this.quaternion.setFromRotationMatrix(hn),s&&(hn.extractRotation(s.matrixWorld),oi.setFromRotationMatrix(hn),this.quaternion.premultiply(oi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(uu)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(du)),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),hn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),hn.multiply(e.parent.matrixWorld)),e.applyMatrix4(hn),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){let o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ki,e,lu),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ki,hu,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,s=t.length;n<s;n++){let r=t[n];(r.matrixWorldAutoUpdate===!0||e===!0)&&r.updateMatrixWorld(e)}}updateWorldMatrix(e,t){let n=this.parent;if(e===!0&&n!==null&&n.matrixWorldAutoUpdate===!0&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){let s=this.children;for(let r=0,o=s.length;r<o;r++){let a=s[r];a.matrixWorldAutoUpdate===!0&&a.updateWorldMatrix(!1,!0)}}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),s.maxGeometryCount=this._maxGeometryCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(e),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let c=a.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){let u=c[l];r(e.shapes,u)}else r(e.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(r(e.materials,this.material[c]));s.material=a}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){let c=this.animations[a];s.animations.push(r(e.animations,c))}}if(t){let a=o(e.geometries),c=o(e.materials),l=o(e.textures),h=o(e.images),u=o(e.shapes),d=o(e.skeletons),p=o(e.animations),g=o(e.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),p.length>0&&(n.animations=p),g.length>0&&(n.nodes=g)}return n.object=s,n;function o(a){let c=[];for(let l in a){let h=a[l];delete h.metadata,c.push(h)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let s=e.children[n];this.add(s.clone())}return this}};vt.DEFAULT_UP=new B(0,1,0);vt.DEFAULT_MATRIX_AUTO_UPDATE=!0;vt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Xt=new B,un=new B,Wr=new B,dn=new B,ci=new B,li=new B,yc=new B,Xr=new B,qr=new B,Yr=new B,ms=!1,xi=class i{constructor(e=new B,t=new B,n=new B){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),Xt.subVectors(e,t),s.cross(Xt);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){Xt.subVectors(s,t),un.subVectors(n,t),Wr.subVectors(e,t);let o=Xt.dot(Xt),a=Xt.dot(un),c=Xt.dot(Wr),l=un.dot(un),h=un.dot(Wr),u=o*l-a*a;if(u===0)return r.set(0,0,0),null;let d=1/u,p=(l*c-a*h)*d,g=(o*h-a*c)*d;return r.set(1-p-g,g,p)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,dn)===null?!1:dn.x>=0&&dn.y>=0&&dn.x+dn.y<=1}static getUV(e,t,n,s,r,o,a,c){return ms===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),ms=!0),this.getInterpolation(e,t,n,s,r,o,a,c)}static getInterpolation(e,t,n,s,r,o,a,c){return this.getBarycoord(e,t,n,s,dn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,dn.x),c.addScaledVector(o,dn.y),c.addScaledVector(a,dn.z),c)}static isFrontFacing(e,t,n,s){return Xt.subVectors(n,t),un.subVectors(e,t),Xt.cross(un).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Xt.subVectors(this.c,this.b),un.subVectors(this.a,this.b),Xt.cross(un).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return i.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return i.getBarycoord(e,this.a,this.b,this.c,t)}getUV(e,t,n,s,r){return ms===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),ms=!0),i.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}getInterpolation(e,t,n,s,r){return i.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return i.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return i.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,s=this.b,r=this.c,o,a;ci.subVectors(s,n),li.subVectors(r,n),Xr.subVectors(e,n);let c=ci.dot(Xr),l=li.dot(Xr);if(c<=0&&l<=0)return t.copy(n);qr.subVectors(e,s);let h=ci.dot(qr),u=li.dot(qr);if(h>=0&&u<=h)return t.copy(s);let d=c*u-h*l;if(d<=0&&c>=0&&h<=0)return o=c/(c-h),t.copy(n).addScaledVector(ci,o);Yr.subVectors(e,r);let p=ci.dot(Yr),g=li.dot(Yr);if(g>=0&&p<=g)return t.copy(r);let x=p*l-c*g;if(x<=0&&l>=0&&g<=0)return a=l/(l-g),t.copy(n).addScaledVector(li,a);let m=h*g-p*u;if(m<=0&&u-h>=0&&p-g>=0)return yc.subVectors(r,s),a=(u-h)/(u-h+(p-g)),t.copy(s).addScaledVector(yc,a);let f=1/(m+x+d);return o=x*f,a=d*f,t.copy(n).addScaledVector(ci,o).addScaledVector(li,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},ml={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},bn={h:0,s:0,l:0},gs={h:0,s:0,l:0};function Zr(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}var Oe=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=dt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,je.toWorkingColorSpace(this,t),this}setRGB(e,t,n,s=je.workingColorSpace){return this.r=e,this.g=t,this.b=n,je.toWorkingColorSpace(this,s),this}setHSL(e,t,n,s=je.workingColorSpace){if(e=to(e,1),t=xt(t,0,1),n=xt(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,o=2*n-r;this.r=Zr(o,r,e+1/3),this.g=Zr(o,r,e),this.b=Zr(o,r,e-1/3)}return je.toWorkingColorSpace(this,s),this}setStyle(e,t=dt){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r,o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){let r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=dt){let n=ml[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Si(e.r),this.g=Si(e.g),this.b=Si(e.b),this}copyLinearToSRGB(e){return this.r=Fr(e.r),this.g=Fr(e.g),this.b=Fr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=dt){return je.fromWorkingColorSpace(bt.copy(this),e),Math.round(xt(bt.r*255,0,255))*65536+Math.round(xt(bt.g*255,0,255))*256+Math.round(xt(bt.b*255,0,255))}getHexString(e=dt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=je.workingColorSpace){je.fromWorkingColorSpace(bt.copy(this),t);let n=bt.r,s=bt.g,r=bt.b,o=Math.max(n,s,r),a=Math.min(n,s,r),c,l,h=(a+o)/2;if(a===o)c=0,l=0;else{let u=o-a;switch(l=h<=.5?u/(o+a):u/(2-o-a),o){case n:c=(s-r)/u+(s<r?6:0);break;case s:c=(r-n)/u+2;break;case r:c=(n-s)/u+4;break}c/=6}return e.h=c,e.s=l,e.l=h,e}getRGB(e,t=je.workingColorSpace){return je.fromWorkingColorSpace(bt.copy(this),t),e.r=bt.r,e.g=bt.g,e.b=bt.b,e}getStyle(e=dt){je.fromWorkingColorSpace(bt.copy(this),e);let t=bt.r,n=bt.g,s=bt.b;return e!==dt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(bn),this.setHSL(bn.h+e,bn.s+t,bn.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(bn),e.getHSL(gs);let n=Gi(bn.h,gs.h,t),s=Gi(bn.s,gs.s,t),r=Gi(bn.l,gs.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},bt=new Oe;Oe.NAMES=ml;var fu=0,Pn=class extends sn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:fu++}),this.uuid=Ii(),this.name="",this.type="Material",this.blending=Mi,this.side=Cn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=la,this.blendDst=ha,this.blendEquation=Gn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Oe(0,0,0),this.blendAlpha=0,this.depthFunc=Ds,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=rc,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ti,this.stencilZFail=ti,this.stencilZPass=ti,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Mi&&(n.blending=this.blending),this.side!==Cn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==la&&(n.blendSrc=this.blendSrc),this.blendDst!==ha&&(n.blendDst=this.blendDst),this.blendEquation!==Gn&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Ds&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==rc&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ti&&(n.stencilFail=this.stencilFail),this.stencilZFail!==ti&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==ti&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let o=[];for(let a in r){let c=r[a];delete c.metadata,o.push(c)}return o}if(t){let r=s(e.textures),o=s(e.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}},$n=class extends Pn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Oe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=nl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}};var lt=new B,_s=new Re,Vt=class{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=ac,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=wn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)_s.fromBufferAttribute(this,t),_s.applyMatrix3(e),this.setXY(t,_s.x,_s.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)lt.fromBufferAttribute(this,t),lt.applyMatrix3(e),this.setXYZ(t,lt.x,lt.y,lt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)lt.fromBufferAttribute(this,t),lt.applyMatrix4(e),this.setXYZ(t,lt.x,lt.y,lt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)lt.fromBufferAttribute(this,t),lt.applyNormalMatrix(e),this.setXYZ(t,lt.x,lt.y,lt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)lt.fromBufferAttribute(this,t),lt.transformDirection(e),this.setXYZ(t,lt.x,lt.y,lt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=_i(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Tt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=_i(t,this.array)),t}setX(e,t){return this.normalized&&(t=Tt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=_i(t,this.array)),t}setY(e,t){return this.normalized&&(t=Tt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=_i(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Tt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=_i(t,this.array)),t}setW(e,t){return this.normalized&&(t=Tt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Tt(t,this.array),n=Tt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=Tt(t,this.array),n=Tt(n,this.array),s=Tt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=Tt(t,this.array),n=Tt(n,this.array),s=Tt(s,this.array),r=Tt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==ac&&(e.usage=this.usage),e}};var Ys=class extends Vt{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var Zs=class extends Vt{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var rt=class extends Vt{constructor(e,t,n){super(new Float32Array(e),t,n)}};var pu=0,Bt=new ht,$r=new vt,hi=new B,Nt=new Zn,Hi=new Zn,_t=new B,Lt=class i extends sn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:pu++}),this.uuid=Ii(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(pl(e)?Zs:Ys)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new Ye().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Bt.makeRotationFromQuaternion(e),this.applyMatrix4(Bt),this}rotateX(e){return Bt.makeRotationX(e),this.applyMatrix4(Bt),this}rotateY(e){return Bt.makeRotationY(e),this.applyMatrix4(Bt),this}rotateZ(e){return Bt.makeRotationZ(e),this.applyMatrix4(Bt),this}translate(e,t,n){return Bt.makeTranslation(e,t,n),this.applyMatrix4(Bt),this}scale(e,t,n){return Bt.makeScale(e,t,n),this.applyMatrix4(Bt),this}lookAt(e){return $r.lookAt(e),$r.updateMatrix(),this.applyMatrix4($r.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(hi).negate(),this.translate(hi.x,hi.y,hi.z),this}setFromPoints(e){let t=[];for(let n=0,s=e.length;n<s;n++){let r=e[n];t.push(r.x,r.y,r.z||0)}return this.setAttribute("position",new rt(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Zn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new B(-1/0,-1/0,-1/0),new B(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){let r=t[n];Nt.setFromBufferAttribute(r),this.morphTargetsRelative?(_t.addVectors(this.boundingBox.min,Nt.min),this.boundingBox.expandByPoint(_t),_t.addVectors(this.boundingBox.max,Nt.max),this.boundingBox.expandByPoint(_t)):(this.boundingBox.expandByPoint(Nt.min),this.boundingBox.expandByPoint(Nt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ai);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new B,1/0);return}if(e){let n=this.boundingSphere.center;if(Nt.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){let a=t[r];Hi.setFromBufferAttribute(a),this.morphTargetsRelative?(_t.addVectors(Nt.min,Hi.min),Nt.expandByPoint(_t),_t.addVectors(Nt.max,Hi.max),Nt.expandByPoint(_t)):(Nt.expandByPoint(Hi.min),Nt.expandByPoint(Hi.max))}Nt.getCenter(n);let s=0;for(let r=0,o=e.count;r<o;r++)_t.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(_t));if(t)for(let r=0,o=t.length;r<o;r++){let a=t[r],c=this.morphTargetsRelative;for(let l=0,h=a.count;l<h;l++)_t.fromBufferAttribute(a,l),c&&(hi.fromBufferAttribute(e,l),_t.add(hi)),s=Math.max(s,n.distanceToSquared(_t))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=e.array,s=t.position.array,r=t.normal.array,o=t.uv.array,a=s.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Vt(new Float32Array(4*a),4));let c=this.getAttribute("tangent").array,l=[],h=[];for(let M=0;M<a;M++)l[M]=new B,h[M]=new B;let u=new B,d=new B,p=new B,g=new Re,x=new Re,m=new Re,f=new B,T=new B;function v(M,X,ee){u.fromArray(s,M*3),d.fromArray(s,X*3),p.fromArray(s,ee*3),g.fromArray(o,M*2),x.fromArray(o,X*2),m.fromArray(o,ee*2),d.sub(u),p.sub(u),x.sub(g),m.sub(g);let le=1/(x.x*m.y-m.x*x.y);isFinite(le)&&(f.copy(d).multiplyScalar(m.y).addScaledVector(p,-x.y).multiplyScalar(le),T.copy(p).multiplyScalar(x.x).addScaledVector(d,-m.x).multiplyScalar(le),l[M].add(f),l[X].add(f),l[ee].add(f),h[M].add(T),h[X].add(T),h[ee].add(T))}let D=this.groups;D.length===0&&(D=[{start:0,count:n.length}]);for(let M=0,X=D.length;M<X;++M){let ee=D[M],le=ee.start,P=ee.count;for(let q=le,ne=le+P;q<ne;q+=3)v(n[q+0],n[q+1],n[q+2])}let H=new B,N=new B,b=new B,z=new B;function _(M){b.fromArray(r,M*3),z.copy(b);let X=l[M];H.copy(X),H.sub(b.multiplyScalar(b.dot(X))).normalize(),N.crossVectors(z,X);let le=N.dot(h[M])<0?-1:1;c[M*4]=H.x,c[M*4+1]=H.y,c[M*4+2]=H.z,c[M*4+3]=le}for(let M=0,X=D.length;M<X;++M){let ee=D[M],le=ee.start,P=ee.count;for(let q=le,ne=le+P;q<ne;q+=3)_(n[q+0]),_(n[q+1]),_(n[q+2])}}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Vt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,p=n.count;d<p;d++)n.setXYZ(d,0,0,0);let s=new B,r=new B,o=new B,a=new B,c=new B,l=new B,h=new B,u=new B;if(e)for(let d=0,p=e.count;d<p;d+=3){let g=e.getX(d+0),x=e.getX(d+1),m=e.getX(d+2);s.fromBufferAttribute(t,g),r.fromBufferAttribute(t,x),o.fromBufferAttribute(t,m),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),a.fromBufferAttribute(n,g),c.fromBufferAttribute(n,x),l.fromBufferAttribute(n,m),a.add(h),c.add(h),l.add(h),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(x,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let d=0,p=t.count;d<p;d+=3)s.fromBufferAttribute(t,d+0),r.fromBufferAttribute(t,d+1),o.fromBufferAttribute(t,d+2),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)_t.fromBufferAttribute(e,t),_t.normalize(),e.setXYZ(t,_t.x,_t.y,_t.z)}toNonIndexed(){function e(a,c){let l=a.array,h=a.itemSize,u=a.normalized,d=new l.constructor(c.length*h),p=0,g=0;for(let x=0,m=c.length;x<m;x++){a.isInterleavedBufferAttribute?p=c[x]*a.data.stride+a.offset:p=c[x]*h;for(let f=0;f<h;f++)d[g++]=l[p++]}return new Vt(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new i,n=this.index.array,s=this.attributes;for(let a in s){let c=s[a],l=e(c,n);t.setAttribute(a,l)}let r=this.morphAttributes;for(let a in r){let c=[],l=r[a];for(let h=0,u=l.length;h<u;h++){let d=l[h],p=e(d,n);c.push(p)}t.morphAttributes[a]=c}t.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,c=o.length;a<c;a++){let l=o[a];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){let e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let c in n){let l=n[c];e.data.attributes[c]=l.toJSON(e.data)}let s={},r=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],h=[];for(let u=0,d=l.length;u<d;u++){let p=l[u];h.push(p.toJSON(e.data))}h.length>0&&(s[c]=h,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone(t));let s=e.attributes;for(let l in s){let h=s[l];this.setAttribute(l,h.clone(t))}let r=e.morphAttributes;for(let l in r){let h=[],u=r[l];for(let d=0,p=u.length;d<p;d++)h.push(u[d].clone(t));this.morphAttributes[l]=h}this.morphTargetsRelative=e.morphTargetsRelative;let o=e.groups;for(let l=0,h=o.length;l<h;l++){let u=o[l];this.addGroup(u.start,u.count,u.materialIndex)}let a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());let c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},vc=new ht,kn=new Ri,xs=new Ai,Mc=new B,ui=new B,di=new B,fi=new B,Jr=new B,ys=new B,vs=new Re,Ms=new Re,Ss=new Re,Sc=new B,bc=new B,Ec=new B,bs=new B,Es=new B,nt=class extends vt{constructor(e=new Lt,t=new $n){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(s,e);let a=this.morphTargetInfluences;if(r&&a){ys.set(0,0,0);for(let c=0,l=r.length;c<l;c++){let h=a[c],u=r[c];h!==0&&(Jr.fromBufferAttribute(u,e),o?ys.addScaledVector(Jr,h):ys.addScaledVector(Jr.sub(t),h))}t.add(ys)}return t}raycast(e,t){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),xs.copy(n.boundingSphere),xs.applyMatrix4(r),kn.copy(e.ray).recast(e.near),!(xs.containsPoint(kn.origin)===!1&&(kn.intersectSphere(xs,Mc)===null||kn.origin.distanceToSquared(Mc)>(e.far-e.near)**2))&&(vc.copy(r).invert(),kn.copy(e.ray).applyMatrix4(vc),!(n.boundingBox!==null&&kn.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,kn)))}_computeIntersections(e,t,n){let s,r=this.geometry,o=this.material,a=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,d=r.groups,p=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,x=d.length;g<x;g++){let m=d[g],f=o[m.materialIndex],T=Math.max(m.start,p.start),v=Math.min(a.count,Math.min(m.start+m.count,p.start+p.count));for(let D=T,H=v;D<H;D+=3){let N=a.getX(D),b=a.getX(D+1),z=a.getX(D+2);s=ws(this,f,e,n,l,h,u,N,b,z),s&&(s.faceIndex=Math.floor(D/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{let g=Math.max(0,p.start),x=Math.min(a.count,p.start+p.count);for(let m=g,f=x;m<f;m+=3){let T=a.getX(m),v=a.getX(m+1),D=a.getX(m+2);s=ws(this,o,e,n,l,h,u,T,v,D),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(c!==void 0)if(Array.isArray(o))for(let g=0,x=d.length;g<x;g++){let m=d[g],f=o[m.materialIndex],T=Math.max(m.start,p.start),v=Math.min(c.count,Math.min(m.start+m.count,p.start+p.count));for(let D=T,H=v;D<H;D+=3){let N=D,b=D+1,z=D+2;s=ws(this,f,e,n,l,h,u,N,b,z),s&&(s.faceIndex=Math.floor(D/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{let g=Math.max(0,p.start),x=Math.min(c.count,p.start+p.count);for(let m=g,f=x;m<f;m+=3){let T=m,v=m+1,D=m+2;s=ws(this,o,e,n,l,h,u,T,v,D),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}};function mu(i,e,t,n,s,r,o,a){let c;if(e.side===Pt?c=n.intersectTriangle(o,r,s,!0,a):c=n.intersectTriangle(s,r,o,e.side===Cn,a),c===null)return null;Es.copy(a),Es.applyMatrix4(i.matrixWorld);let l=t.ray.origin.distanceTo(Es);return l<t.near||l>t.far?null:{distance:l,point:Es.clone(),object:i}}function ws(i,e,t,n,s,r,o,a,c,l){i.getVertexPosition(a,ui),i.getVertexPosition(c,di),i.getVertexPosition(l,fi);let h=mu(i,e,t,n,ui,di,fi,bs);if(h){s&&(vs.fromBufferAttribute(s,a),Ms.fromBufferAttribute(s,c),Ss.fromBufferAttribute(s,l),h.uv=xi.getInterpolation(bs,ui,di,fi,vs,Ms,Ss,new Re)),r&&(vs.fromBufferAttribute(r,a),Ms.fromBufferAttribute(r,c),Ss.fromBufferAttribute(r,l),h.uv1=xi.getInterpolation(bs,ui,di,fi,vs,Ms,Ss,new Re),h.uv2=h.uv1),o&&(Sc.fromBufferAttribute(o,a),bc.fromBufferAttribute(o,c),Ec.fromBufferAttribute(o,l),h.normal=xi.getInterpolation(bs,ui,di,fi,Sc,bc,Ec,new B),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let u={a,b:c,c:l,normal:new B,materialIndex:0};xi.getNormal(ui,di,fi,u.normal),h.face=u}return h}var Ut=class i extends Lt{constructor(e=1,t=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};let a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);let c=[],l=[],h=[],u=[],d=0,p=0;g("z","y","x",-1,-1,n,t,e,o,r,0),g("z","y","x",1,-1,n,t,-e,o,r,1),g("x","z","y",1,1,e,n,t,s,o,2),g("x","z","y",1,-1,e,n,-t,s,o,3),g("x","y","z",1,-1,e,t,n,s,r,4),g("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new rt(l,3)),this.setAttribute("normal",new rt(h,3)),this.setAttribute("uv",new rt(u,2));function g(x,m,f,T,v,D,H,N,b,z,_){let M=D/b,X=H/z,ee=D/2,le=H/2,P=N/2,q=b+1,ne=z+1,C=0,A=0,F=new B;for(let J=0;J<ne;J++){let Y=J*X-le;for(let j=0;j<q;j++){let k=j*M-ee;F[x]=k*T,F[m]=Y*v,F[f]=P,l.push(F.x,F.y,F.z),F[x]=0,F[m]=0,F[f]=N>0?1:-1,h.push(F.x,F.y,F.z),u.push(j/b),u.push(1-J/z),C+=1}}for(let J=0;J<z;J++)for(let Y=0;Y<b;Y++){let j=d+Y+q*J,k=d+Y+q*(J+1),w=d+(Y+1)+q*(J+1),R=d+(Y+1)+q*J;c.push(j,k,R),c.push(k,w,R),A+=6}a.addGroup(p,A,_),p+=A,d+=C}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};function Ci(i){let e={};for(let t in i){e[t]={};for(let n in i[t]){let s=i[t][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone():Array.isArray(s)?e[t][n]=s.slice():e[t][n]=s}}return e}function At(i){let e={};for(let t=0;t<i.length;t++){let n=Ci(i[t]);for(let s in n)e[s]=n[s]}return e}function gu(i){let e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function gl(i){return i.getRenderTarget()===null?i.outputColorSpace:je.workingColorSpace}var _u={clone:Ci,merge:At},xu=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,yu=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,_n=class extends Pn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=xu,this.fragmentShader=yu,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Ci(e.uniforms),this.uniformsGroups=gu(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let s in this.uniforms){let o=this.uniforms[s].value;o&&o.isTexture?t.uniforms[s]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[s]={type:"m4",value:o.toArray()}:t.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}},$s=class extends vt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ht,this.projectionMatrix=new ht,this.projectionMatrixInverse=new ht,this.coordinateSystem=pn}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},Ct=class extends $s{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=Ji*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(Vi*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Ji*2*Math.atan(Math.tan(Vi*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,t,n,s,r,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(Vi*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s,o=this.view;if(this.view!==null&&this.view.enabled){let c=o.fullWidth,l=o.fullHeight;r+=o.offsetX*s/c,t-=o.offsetY*n/l,s*=o.width/c,n*=o.height/l}let a=this.filmOffset;a!==0&&(r+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},pi=-90,mi=1,ya=class extends vt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new Ct(pi,mi,e,t);s.layers=this.layers,this.add(s);let r=new Ct(pi,mi,e,t);r.layers=this.layers,this.add(r);let o=new Ct(pi,mi,e,t);o.layers=this.layers,this.add(o);let a=new Ct(pi,mi,e,t);a.layers=this.layers,this.add(a);let c=new Ct(pi,mi,e,t);c.layers=this.layers,this.add(c);let l=new Ct(pi,mi,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,s,r,o,a,c]=t;for(let l of t)this.remove(l);if(e===pn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===zs)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[r,o,a,c,l,h]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;let x=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,s),e.render(t,r),e.setRenderTarget(n,1,s),e.render(t,o),e.setRenderTarget(n,2,s),e.render(t,a),e.setRenderTarget(n,3,s),e.render(t,c),e.setRenderTarget(n,4,s),e.render(t,l),n.texture.generateMipmaps=x,e.setRenderTarget(n,5,s),e.render(t,h),e.setRenderTarget(u,d,p),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}},Js=class extends Jt{constructor(e,t,n,s,r,o,a,c,l,h){e=e!==void 0?e:[],t=t!==void 0?t:Ei,super(e,t,n,s,r,o,a,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},va=class extends gn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];t.encoding!==void 0&&(Wi("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),t.colorSpace=t.encoding===Yn?dt:kt),this.texture=new Js(s,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:zt}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new Ut(5,5,5),r=new _n({name:"CubemapFromEquirect",uniforms:Ci(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Pt,blending:Tn});r.uniforms.tEquirect.value=t;let o=new nt(s,r),a=t.minFilter;return t.minFilter===Zi&&(t.minFilter=zt),new ya(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t,n,s){let r=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,s);e.setRenderTarget(r)}},Kr=new B,vu=new B,Mu=new Ye,qt=class{constructor(e=new B(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let s=Kr.subVectors(n,t).cross(vu.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){let n=e.delta(Kr),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let r=-(e.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||Mu.getNormalMatrix(e),s=this.coplanarPoint(Kr).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},Hn=new Ai,Ts=new B,Ki=class{constructor(e=new qt,t=new qt,n=new qt,s=new qt,r=new qt,o=new qt){this.planes=[e,t,n,s,r,o]}set(e,t,n,s,r,o){let a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=pn){let n=this.planes,s=e.elements,r=s[0],o=s[1],a=s[2],c=s[3],l=s[4],h=s[5],u=s[6],d=s[7],p=s[8],g=s[9],x=s[10],m=s[11],f=s[12],T=s[13],v=s[14],D=s[15];if(n[0].setComponents(c-r,d-l,m-p,D-f).normalize(),n[1].setComponents(c+r,d+l,m+p,D+f).normalize(),n[2].setComponents(c+o,d+h,m+g,D+T).normalize(),n[3].setComponents(c-o,d-h,m-g,D-T).normalize(),n[4].setComponents(c-a,d-u,m-x,D-v).normalize(),t===pn)n[5].setComponents(c+a,d+u,m+x,D+v).normalize();else if(t===zs)n[5].setComponents(a,u,x,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Hn.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Hn.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Hn)}intersectsSprite(e){return Hn.center.set(0,0,0),Hn.radius=.7071067811865476,Hn.applyMatrix4(e.matrixWorld),this.intersectsSphere(Hn)}intersectsSphere(e){let t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let s=t[n];if(Ts.x=s.normal.x>0?e.max.x:e.min.x,Ts.y=s.normal.y>0?e.max.y:e.min.y,Ts.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(Ts)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};function _l(){let i=null,e=!1,t=null,n=null;function s(r,o){t(r,o),n=i.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function Su(i,e){let t=e.isWebGL2,n=new WeakMap;function s(l,h){let u=l.array,d=l.usage,p=u.byteLength,g=i.createBuffer();i.bindBuffer(h,g),i.bufferData(h,u,d),l.onUploadCallback();let x;if(u instanceof Float32Array)x=i.FLOAT;else if(u instanceof Uint16Array)if(l.isFloat16BufferAttribute)if(t)x=i.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else x=i.UNSIGNED_SHORT;else if(u instanceof Int16Array)x=i.SHORT;else if(u instanceof Uint32Array)x=i.UNSIGNED_INT;else if(u instanceof Int32Array)x=i.INT;else if(u instanceof Int8Array)x=i.BYTE;else if(u instanceof Uint8Array)x=i.UNSIGNED_BYTE;else if(u instanceof Uint8ClampedArray)x=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+u);return{buffer:g,type:x,bytesPerElement:u.BYTES_PER_ELEMENT,version:l.version,size:p}}function r(l,h,u){let d=h.array,p=h._updateRange,g=h.updateRanges;if(i.bindBuffer(u,l),p.count===-1&&g.length===0&&i.bufferSubData(u,0,d),g.length!==0){for(let x=0,m=g.length;x<m;x++){let f=g[x];t?i.bufferSubData(u,f.start*d.BYTES_PER_ELEMENT,d,f.start,f.count):i.bufferSubData(u,f.start*d.BYTES_PER_ELEMENT,d.subarray(f.start,f.start+f.count))}h.clearUpdateRanges()}p.count!==-1&&(t?i.bufferSubData(u,p.offset*d.BYTES_PER_ELEMENT,d,p.offset,p.count):i.bufferSubData(u,p.offset*d.BYTES_PER_ELEMENT,d.subarray(p.offset,p.offset+p.count)),p.count=-1),h.onUploadCallback()}function o(l){return l.isInterleavedBufferAttribute&&(l=l.data),n.get(l)}function a(l){l.isInterleavedBufferAttribute&&(l=l.data);let h=n.get(l);h&&(i.deleteBuffer(h.buffer),n.delete(l))}function c(l,h){if(l.isGLBufferAttribute){let d=n.get(l);(!d||d.version<l.version)&&n.set(l,{buffer:l.buffer,type:l.type,bytesPerElement:l.elementSize,version:l.version});return}l.isInterleavedBufferAttribute&&(l=l.data);let u=n.get(l);if(u===void 0)n.set(l,s(l,h));else if(u.version<l.version){if(u.size!==l.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");r(u.buffer,l,h),u.version=l.version}}return{get:o,remove:a,update:c}}var ji=class i extends Lt{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};let r=e/2,o=t/2,a=Math.floor(n),c=Math.floor(s),l=a+1,h=c+1,u=e/a,d=t/c,p=[],g=[],x=[],m=[];for(let f=0;f<h;f++){let T=f*d-o;for(let v=0;v<l;v++){let D=v*u-r;g.push(D,-T,0),x.push(0,0,1),m.push(v/a),m.push(1-f/c)}}for(let f=0;f<c;f++)for(let T=0;T<a;T++){let v=T+l*f,D=T+l*(f+1),H=T+1+l*(f+1),N=T+1+l*f;p.push(v,D,N),p.push(D,H,N)}this.setIndex(p),this.setAttribute("position",new rt(g,3)),this.setAttribute("normal",new rt(x,3)),this.setAttribute("uv",new rt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.widthSegments,e.heightSegments)}},bu=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Eu=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,wu=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Tu=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Au=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,Ru=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Cu=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Pu=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Lu=`#ifdef USE_BATCHING
	attribute float batchId;
	uniform highp sampler2D batchingTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Iu=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,Du=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Nu=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Uu=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Fu=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Ou=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Bu=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#pragma unroll_loop_start
	for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
		plane = clippingPlanes[ i ];
		if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
	}
	#pragma unroll_loop_end
	#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
		bool clipped = true;
		#pragma unroll_loop_start
		for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
		}
		#pragma unroll_loop_end
		if ( clipped ) discard;
	#endif
#endif`,zu=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,ku=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Hu=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Vu=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Gu=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Wu=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,Xu=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,qu=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Yu=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Zu=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,$u=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Ju=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Ku=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,ju=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Qu="gl_FragColor = linearToOutputTexel( gl_FragColor );",ed=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return sRGBTransferOETF( value );
}`,td=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,nd=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,id=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,sd=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,rd=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,ad=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,od=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,cd=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,ld=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,hd=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,ud=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,dd=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,fd=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,pd=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,md=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	#if defined ( LEGACY_LIGHTS )
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#else
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#endif
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,gd=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,_d=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,xd=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,yd=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,vd=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Md=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Sd=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,bd=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Ed=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,wd=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Td=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Ad=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Rd=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,Cd=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,Pd=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Ld=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Id=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Dd=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Nd=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Ud=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Fd=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Od=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`,Bd=`#ifdef USE_MORPHTARGETS
	uniform float morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`,zd=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`,kd=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Hd=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Vd=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Gd=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Wd=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Xd=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,qd=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Yd=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Zd=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,$d=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Jd=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Kd=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,jd=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Qd=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,ef=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,tf=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,nf=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,sf=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,rf=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
		vec3 lightToPosition = shadowCoord.xyz;
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;
		vec3 bd3D = normalize( lightToPosition );
		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
			return (
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
			) * ( 1.0 / 9.0 );
		#else
			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
		#endif
	}
#endif`,af=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,of=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,cf=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,lf=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,hf=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,uf=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,df=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,ff=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,pf=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,mf=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,gf=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color *= toneMappingExposure;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	return color;
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,_f=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,xf=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,yf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,vf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Mf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Sf=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,bf=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Ef=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,wf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Tf=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Af=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Rf=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Cf=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Pf=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,Lf=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,If=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,Df=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Nf=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Uf=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Ff=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Of=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Bf=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,zf=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,kf=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Hf=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Vf=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Gf=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Wf=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), opacity );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Xf=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,qf=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Yf=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Zf=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,$f=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Jf=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Kf=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,jf=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Qf=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,ep=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,tp=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,np=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ve={alphahash_fragment:bu,alphahash_pars_fragment:Eu,alphamap_fragment:wu,alphamap_pars_fragment:Tu,alphatest_fragment:Au,alphatest_pars_fragment:Ru,aomap_fragment:Cu,aomap_pars_fragment:Pu,batching_pars_vertex:Lu,batching_vertex:Iu,begin_vertex:Du,beginnormal_vertex:Nu,bsdfs:Uu,iridescence_fragment:Fu,bumpmap_pars_fragment:Ou,clipping_planes_fragment:Bu,clipping_planes_pars_fragment:zu,clipping_planes_pars_vertex:ku,clipping_planes_vertex:Hu,color_fragment:Vu,color_pars_fragment:Gu,color_pars_vertex:Wu,color_vertex:Xu,common:qu,cube_uv_reflection_fragment:Yu,defaultnormal_vertex:Zu,displacementmap_pars_vertex:$u,displacementmap_vertex:Ju,emissivemap_fragment:Ku,emissivemap_pars_fragment:ju,colorspace_fragment:Qu,colorspace_pars_fragment:ed,envmap_fragment:td,envmap_common_pars_fragment:nd,envmap_pars_fragment:id,envmap_pars_vertex:sd,envmap_physical_pars_fragment:gd,envmap_vertex:rd,fog_vertex:ad,fog_pars_vertex:od,fog_fragment:cd,fog_pars_fragment:ld,gradientmap_pars_fragment:hd,lightmap_fragment:ud,lightmap_pars_fragment:dd,lights_lambert_fragment:fd,lights_lambert_pars_fragment:pd,lights_pars_begin:md,lights_toon_fragment:_d,lights_toon_pars_fragment:xd,lights_phong_fragment:yd,lights_phong_pars_fragment:vd,lights_physical_fragment:Md,lights_physical_pars_fragment:Sd,lights_fragment_begin:bd,lights_fragment_maps:Ed,lights_fragment_end:wd,logdepthbuf_fragment:Td,logdepthbuf_pars_fragment:Ad,logdepthbuf_pars_vertex:Rd,logdepthbuf_vertex:Cd,map_fragment:Pd,map_pars_fragment:Ld,map_particle_fragment:Id,map_particle_pars_fragment:Dd,metalnessmap_fragment:Nd,metalnessmap_pars_fragment:Ud,morphcolor_vertex:Fd,morphnormal_vertex:Od,morphtarget_pars_vertex:Bd,morphtarget_vertex:zd,normal_fragment_begin:kd,normal_fragment_maps:Hd,normal_pars_fragment:Vd,normal_pars_vertex:Gd,normal_vertex:Wd,normalmap_pars_fragment:Xd,clearcoat_normal_fragment_begin:qd,clearcoat_normal_fragment_maps:Yd,clearcoat_pars_fragment:Zd,iridescence_pars_fragment:$d,opaque_fragment:Jd,packing:Kd,premultiplied_alpha_fragment:jd,project_vertex:Qd,dithering_fragment:ef,dithering_pars_fragment:tf,roughnessmap_fragment:nf,roughnessmap_pars_fragment:sf,shadowmap_pars_fragment:rf,shadowmap_pars_vertex:af,shadowmap_vertex:of,shadowmask_pars_fragment:cf,skinbase_vertex:lf,skinning_pars_vertex:hf,skinning_vertex:uf,skinnormal_vertex:df,specularmap_fragment:ff,specularmap_pars_fragment:pf,tonemapping_fragment:mf,tonemapping_pars_fragment:gf,transmission_fragment:_f,transmission_pars_fragment:xf,uv_pars_fragment:yf,uv_pars_vertex:vf,uv_vertex:Mf,worldpos_vertex:Sf,background_vert:bf,background_frag:Ef,backgroundCube_vert:wf,backgroundCube_frag:Tf,cube_vert:Af,cube_frag:Rf,depth_vert:Cf,depth_frag:Pf,distanceRGBA_vert:Lf,distanceRGBA_frag:If,equirect_vert:Df,equirect_frag:Nf,linedashed_vert:Uf,linedashed_frag:Ff,meshbasic_vert:Of,meshbasic_frag:Bf,meshlambert_vert:zf,meshlambert_frag:kf,meshmatcap_vert:Hf,meshmatcap_frag:Vf,meshnormal_vert:Gf,meshnormal_frag:Wf,meshphong_vert:Xf,meshphong_frag:qf,meshphysical_vert:Yf,meshphysical_frag:Zf,meshtoon_vert:$f,meshtoon_frag:Jf,points_vert:Kf,points_frag:jf,shadow_vert:Qf,shadow_frag:ep,sprite_vert:tp,sprite_frag:np},be={common:{diffuse:{value:new Oe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ye},alphaMap:{value:null},alphaMapTransform:{value:new Ye},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ye}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ye}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ye}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ye},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ye},normalScale:{value:new Re(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ye},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ye}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ye}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ye}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Oe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Oe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ye},alphaTest:{value:0},uvTransform:{value:new Ye}},sprite:{diffuse:{value:new Oe(16777215)},opacity:{value:1},center:{value:new Re(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ye},alphaMap:{value:null},alphaMapTransform:{value:new Ye},alphaTest:{value:0}}},nn={basic:{uniforms:At([be.common,be.specularmap,be.envmap,be.aomap,be.lightmap,be.fog]),vertexShader:Ve.meshbasic_vert,fragmentShader:Ve.meshbasic_frag},lambert:{uniforms:At([be.common,be.specularmap,be.envmap,be.aomap,be.lightmap,be.emissivemap,be.bumpmap,be.normalmap,be.displacementmap,be.fog,be.lights,{emissive:{value:new Oe(0)}}]),vertexShader:Ve.meshlambert_vert,fragmentShader:Ve.meshlambert_frag},phong:{uniforms:At([be.common,be.specularmap,be.envmap,be.aomap,be.lightmap,be.emissivemap,be.bumpmap,be.normalmap,be.displacementmap,be.fog,be.lights,{emissive:{value:new Oe(0)},specular:{value:new Oe(1118481)},shininess:{value:30}}]),vertexShader:Ve.meshphong_vert,fragmentShader:Ve.meshphong_frag},standard:{uniforms:At([be.common,be.envmap,be.aomap,be.lightmap,be.emissivemap,be.bumpmap,be.normalmap,be.displacementmap,be.roughnessmap,be.metalnessmap,be.fog,be.lights,{emissive:{value:new Oe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ve.meshphysical_vert,fragmentShader:Ve.meshphysical_frag},toon:{uniforms:At([be.common,be.aomap,be.lightmap,be.emissivemap,be.bumpmap,be.normalmap,be.displacementmap,be.gradientmap,be.fog,be.lights,{emissive:{value:new Oe(0)}}]),vertexShader:Ve.meshtoon_vert,fragmentShader:Ve.meshtoon_frag},matcap:{uniforms:At([be.common,be.bumpmap,be.normalmap,be.displacementmap,be.fog,{matcap:{value:null}}]),vertexShader:Ve.meshmatcap_vert,fragmentShader:Ve.meshmatcap_frag},points:{uniforms:At([be.points,be.fog]),vertexShader:Ve.points_vert,fragmentShader:Ve.points_frag},dashed:{uniforms:At([be.common,be.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ve.linedashed_vert,fragmentShader:Ve.linedashed_frag},depth:{uniforms:At([be.common,be.displacementmap]),vertexShader:Ve.depth_vert,fragmentShader:Ve.depth_frag},normal:{uniforms:At([be.common,be.bumpmap,be.normalmap,be.displacementmap,{opacity:{value:1}}]),vertexShader:Ve.meshnormal_vert,fragmentShader:Ve.meshnormal_frag},sprite:{uniforms:At([be.sprite,be.fog]),vertexShader:Ve.sprite_vert,fragmentShader:Ve.sprite_frag},background:{uniforms:{uvTransform:{value:new Ye},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ve.background_vert,fragmentShader:Ve.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:Ve.backgroundCube_vert,fragmentShader:Ve.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ve.cube_vert,fragmentShader:Ve.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ve.equirect_vert,fragmentShader:Ve.equirect_frag},distanceRGBA:{uniforms:At([be.common,be.displacementmap,{referencePosition:{value:new B},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ve.distanceRGBA_vert,fragmentShader:Ve.distanceRGBA_frag},shadow:{uniforms:At([be.lights,be.fog,{color:{value:new Oe(0)},opacity:{value:1}}]),vertexShader:Ve.shadow_vert,fragmentShader:Ve.shadow_frag}};nn.physical={uniforms:At([nn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ye},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ye},clearcoatNormalScale:{value:new Re(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ye},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ye},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ye},sheen:{value:0},sheenColor:{value:new Oe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ye},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ye},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ye},transmissionSamplerSize:{value:new Re},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ye},attenuationDistance:{value:0},attenuationColor:{value:new Oe(0)},specularColor:{value:new Oe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ye},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ye},anisotropyVector:{value:new Re},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ye}}]),vertexShader:Ve.meshphysical_vert,fragmentShader:Ve.meshphysical_frag};var As={r:0,b:0,g:0};function ip(i,e,t,n,s,r,o){let a=new Oe(0),c=r===!0?0:1,l,h,u=null,d=0,p=null;function g(m,f){let T=!1,v=f.isScene===!0?f.background:null;v&&v.isTexture&&(v=(f.backgroundBlurriness>0?t:e).get(v)),v===null?x(a,c):v&&v.isColor&&(x(v,1),T=!0);let D=i.xr.getEnvironmentBlendMode();D==="additive"?n.buffers.color.setClear(0,0,0,1,o):D==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||T)&&i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil),v&&(v.isCubeTexture||v.mapping===ur)?(h===void 0&&(h=new nt(new Ut(1,1,1),new _n({name:"BackgroundCubeMaterial",uniforms:Ci(nn.backgroundCube.uniforms),vertexShader:nn.backgroundCube.vertexShader,fragmentShader:nn.backgroundCube.fragmentShader,side:Pt,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(H,N,b){this.matrixWorld.copyPosition(b.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),h.material.uniforms.envMap.value=v,h.material.uniforms.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=f.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=f.backgroundIntensity,h.material.toneMapped=je.getTransfer(v.colorSpace)!==tt,(u!==v||d!==v.version||p!==i.toneMapping)&&(h.material.needsUpdate=!0,u=v,d=v.version,p=i.toneMapping),h.layers.enableAll(),m.unshift(h,h.geometry,h.material,0,0,null)):v&&v.isTexture&&(l===void 0&&(l=new nt(new ji(2,2),new _n({name:"BackgroundMaterial",uniforms:Ci(nn.background.uniforms),vertexShader:nn.background.vertexShader,fragmentShader:nn.background.fragmentShader,side:Cn,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(l)),l.material.uniforms.t2D.value=v,l.material.uniforms.backgroundIntensity.value=f.backgroundIntensity,l.material.toneMapped=je.getTransfer(v.colorSpace)!==tt,v.matrixAutoUpdate===!0&&v.updateMatrix(),l.material.uniforms.uvTransform.value.copy(v.matrix),(u!==v||d!==v.version||p!==i.toneMapping)&&(l.material.needsUpdate=!0,u=v,d=v.version,p=i.toneMapping),l.layers.enableAll(),m.unshift(l,l.geometry,l.material,0,0,null))}function x(m,f){m.getRGB(As,gl(i)),n.buffers.color.setClear(As.r,As.g,As.b,f,o)}return{getClearColor:function(){return a},setClearColor:function(m,f=1){a.set(m),c=f,x(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(m){c=m,x(a,c)},render:g}}function sp(i,e,t,n){let s=i.getParameter(i.MAX_VERTEX_ATTRIBS),r=n.isWebGL2?null:e.get("OES_vertex_array_object"),o=n.isWebGL2||r!==null,a={},c=m(null),l=c,h=!1;function u(P,q,ne,C,A){let F=!1;if(o){let J=x(C,ne,q);l!==J&&(l=J,p(l.object)),F=f(P,C,ne,A),F&&T(P,C,ne,A)}else{let J=q.wireframe===!0;(l.geometry!==C.id||l.program!==ne.id||l.wireframe!==J)&&(l.geometry=C.id,l.program=ne.id,l.wireframe=J,F=!0)}A!==null&&t.update(A,i.ELEMENT_ARRAY_BUFFER),(F||h)&&(h=!1,z(P,q,ne,C),A!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(A).buffer))}function d(){return n.isWebGL2?i.createVertexArray():r.createVertexArrayOES()}function p(P){return n.isWebGL2?i.bindVertexArray(P):r.bindVertexArrayOES(P)}function g(P){return n.isWebGL2?i.deleteVertexArray(P):r.deleteVertexArrayOES(P)}function x(P,q,ne){let C=ne.wireframe===!0,A=a[P.id];A===void 0&&(A={},a[P.id]=A);let F=A[q.id];F===void 0&&(F={},A[q.id]=F);let J=F[C];return J===void 0&&(J=m(d()),F[C]=J),J}function m(P){let q=[],ne=[],C=[];for(let A=0;A<s;A++)q[A]=0,ne[A]=0,C[A]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:q,enabledAttributes:ne,attributeDivisors:C,object:P,attributes:{},index:null}}function f(P,q,ne,C){let A=l.attributes,F=q.attributes,J=0,Y=ne.getAttributes();for(let j in Y)if(Y[j].location>=0){let w=A[j],R=F[j];if(R===void 0&&(j==="instanceMatrix"&&P.instanceMatrix&&(R=P.instanceMatrix),j==="instanceColor"&&P.instanceColor&&(R=P.instanceColor)),w===void 0||w.attribute!==R||R&&w.data!==R.data)return!0;J++}return l.attributesNum!==J||l.index!==C}function T(P,q,ne,C){let A={},F=q.attributes,J=0,Y=ne.getAttributes();for(let j in Y)if(Y[j].location>=0){let w=F[j];w===void 0&&(j==="instanceMatrix"&&P.instanceMatrix&&(w=P.instanceMatrix),j==="instanceColor"&&P.instanceColor&&(w=P.instanceColor));let R={};R.attribute=w,w&&w.data&&(R.data=w.data),A[j]=R,J++}l.attributes=A,l.attributesNum=J,l.index=C}function v(){let P=l.newAttributes;for(let q=0,ne=P.length;q<ne;q++)P[q]=0}function D(P){H(P,0)}function H(P,q){let ne=l.newAttributes,C=l.enabledAttributes,A=l.attributeDivisors;ne[P]=1,C[P]===0&&(i.enableVertexAttribArray(P),C[P]=1),A[P]!==q&&((n.isWebGL2?i:e.get("ANGLE_instanced_arrays"))[n.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](P,q),A[P]=q)}function N(){let P=l.newAttributes,q=l.enabledAttributes;for(let ne=0,C=q.length;ne<C;ne++)q[ne]!==P[ne]&&(i.disableVertexAttribArray(ne),q[ne]=0)}function b(P,q,ne,C,A,F,J){J===!0?i.vertexAttribIPointer(P,q,ne,A,F):i.vertexAttribPointer(P,q,ne,C,A,F)}function z(P,q,ne,C){if(n.isWebGL2===!1&&(P.isInstancedMesh||C.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;v();let A=C.attributes,F=ne.getAttributes(),J=q.defaultAttributeValues;for(let Y in F){let j=F[Y];if(j.location>=0){let k=A[Y];if(k===void 0&&(Y==="instanceMatrix"&&P.instanceMatrix&&(k=P.instanceMatrix),Y==="instanceColor"&&P.instanceColor&&(k=P.instanceColor)),k!==void 0){let w=k.normalized,R=k.itemSize,U=t.get(k);if(U===void 0)continue;let V=U.buffer,Z=U.type,G=U.bytesPerElement,te=n.isWebGL2===!0&&(Z===i.INT||Z===i.UNSIGNED_INT||k.gpuType===sl);if(k.isInterleavedBufferAttribute){let ae=k.data,L=ae.stride,oe=k.offset;if(ae.isInstancedInterleavedBuffer){for(let Q=0;Q<j.locationSize;Q++)H(j.location+Q,ae.meshPerAttribute);P.isInstancedMesh!==!0&&C._maxInstanceCount===void 0&&(C._maxInstanceCount=ae.meshPerAttribute*ae.count)}else for(let Q=0;Q<j.locationSize;Q++)D(j.location+Q);i.bindBuffer(i.ARRAY_BUFFER,V);for(let Q=0;Q<j.locationSize;Q++)b(j.location+Q,R/j.locationSize,Z,w,L*G,(oe+R/j.locationSize*Q)*G,te)}else{if(k.isInstancedBufferAttribute){for(let ae=0;ae<j.locationSize;ae++)H(j.location+ae,k.meshPerAttribute);P.isInstancedMesh!==!0&&C._maxInstanceCount===void 0&&(C._maxInstanceCount=k.meshPerAttribute*k.count)}else for(let ae=0;ae<j.locationSize;ae++)D(j.location+ae);i.bindBuffer(i.ARRAY_BUFFER,V);for(let ae=0;ae<j.locationSize;ae++)b(j.location+ae,R/j.locationSize,Z,w,R*G,R/j.locationSize*ae*G,te)}}else if(J!==void 0){let w=J[Y];if(w!==void 0)switch(w.length){case 2:i.vertexAttrib2fv(j.location,w);break;case 3:i.vertexAttrib3fv(j.location,w);break;case 4:i.vertexAttrib4fv(j.location,w);break;default:i.vertexAttrib1fv(j.location,w)}}}}N()}function _(){ee();for(let P in a){let q=a[P];for(let ne in q){let C=q[ne];for(let A in C)g(C[A].object),delete C[A];delete q[ne]}delete a[P]}}function M(P){if(a[P.id]===void 0)return;let q=a[P.id];for(let ne in q){let C=q[ne];for(let A in C)g(C[A].object),delete C[A];delete q[ne]}delete a[P.id]}function X(P){for(let q in a){let ne=a[q];if(ne[P.id]===void 0)continue;let C=ne[P.id];for(let A in C)g(C[A].object),delete C[A];delete ne[P.id]}}function ee(){le(),h=!0,l!==c&&(l=c,p(l.object))}function le(){c.geometry=null,c.program=null,c.wireframe=!1}return{setup:u,reset:ee,resetDefaultState:le,dispose:_,releaseStatesOfGeometry:M,releaseStatesOfProgram:X,initAttributes:v,enableAttribute:D,disableUnusedAttributes:N}}function rp(i,e,t,n){let s=n.isWebGL2,r;function o(h){r=h}function a(h,u){i.drawArrays(r,h,u),t.update(u,r,1)}function c(h,u,d){if(d===0)return;let p,g;if(s)p=i,g="drawArraysInstanced";else if(p=e.get("ANGLE_instanced_arrays"),g="drawArraysInstancedANGLE",p===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}p[g](r,h,u,d),t.update(u,r,d)}function l(h,u,d){if(d===0)return;let p=e.get("WEBGL_multi_draw");if(p===null)for(let g=0;g<d;g++)this.render(h[g],u[g]);else{p.multiDrawArraysWEBGL(r,h,0,u,0,d);let g=0;for(let x=0;x<d;x++)g+=u[x];t.update(g,r,1)}}this.setMode=o,this.render=a,this.renderInstances=c,this.renderMultiDraw=l}function ap(i,e,t){let n;function s(){if(n!==void 0)return n;if(e.has("EXT_texture_filter_anisotropic")===!0){let b=e.get("EXT_texture_filter_anisotropic");n=i.getParameter(b.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function r(b){if(b==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";b="mediump"}return b==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let o=typeof WebGL2RenderingContext<"u"&&i.constructor.name==="WebGL2RenderingContext",a=t.precision!==void 0?t.precision:"highp",c=r(a);c!==a&&(console.warn("THREE.WebGLRenderer:",a,"not supported, using",c,"instead."),a=c);let l=o||e.has("WEBGL_draw_buffers"),h=t.logarithmicDepthBuffer===!0,u=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),d=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),p=i.getParameter(i.MAX_TEXTURE_SIZE),g=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),x=i.getParameter(i.MAX_VERTEX_ATTRIBS),m=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),f=i.getParameter(i.MAX_VARYING_VECTORS),T=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),v=d>0,D=o||e.has("OES_texture_float"),H=v&&D,N=o?i.getParameter(i.MAX_SAMPLES):0;return{isWebGL2:o,drawBuffers:l,getMaxAnisotropy:s,getMaxPrecision:r,precision:a,logarithmicDepthBuffer:h,maxTextures:u,maxVertexTextures:d,maxTextureSize:p,maxCubemapSize:g,maxAttributes:x,maxVertexUniforms:m,maxVaryings:f,maxFragmentUniforms:T,vertexTextures:v,floatFragmentTextures:D,floatVertexTextures:H,maxSamples:N}}function op(i){let e=this,t=null,n=0,s=!1,r=!1,o=new qt,a=new Ye,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){let p=u.length!==0||d||n!==0||s;return s=d,n=u.length,p},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,d){t=h(u,d,0)},this.setState=function(u,d,p){let g=u.clippingPlanes,x=u.clipIntersection,m=u.clipShadows,f=i.get(u);if(!s||g===null||g.length===0||r&&!m)r?h(null):l();else{let T=r?0:n,v=T*4,D=f.clippingState||null;c.value=D,D=h(g,d,v,p);for(let H=0;H!==v;++H)D[H]=t[H];f.clippingState=D,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=T}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(u,d,p,g){let x=u!==null?u.length:0,m=null;if(x!==0){if(m=c.value,g!==!0||m===null){let f=p+x*4,T=d.matrixWorldInverse;a.getNormalMatrix(T),(m===null||m.length<f)&&(m=new Float32Array(f));for(let v=0,D=p;v!==x;++v,D+=4)o.copy(u[v]).applyMatrix4(T,a),o.normal.toArray(m,D),m[D+3]=o.constant}c.value=m,c.needsUpdate=!0}return e.numPlanes=x,e.numIntersection=0,m}}function cp(i){let e=new WeakMap;function t(o,a){return a===ua?o.mapping=Ei:a===da&&(o.mapping=wi),o}function n(o){if(o&&o.isTexture){let a=o.mapping;if(a===ua||a===da)if(e.has(o)){let c=e.get(o).texture;return t(c,o.mapping)}else{let c=o.image;if(c&&c.height>0){let l=new va(c.height/2);return l.fromEquirectangularTexture(i,o),e.set(o,l),o.addEventListener("dispose",s),t(l.texture,o.mapping)}else return null}}return o}function s(o){let a=o.target;a.removeEventListener("dispose",s);let c=e.get(a);c!==void 0&&(e.delete(a),c.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}var Ks=class extends $s{constructor(e=-1,t=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-e,o=n+e,a=s+t,c=s-t;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,o=r+l*this.view.width,a-=h*this.view.offsetY,c=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},yi=4,wc=[.125,.215,.35,.446,.526,.582],Wn=20,jr=new Ks,Tc=new Oe,Qr=null,ea=0,ta=0,Vn=(1+Math.sqrt(5))/2,gi=1/Vn,Ac=[new B(1,1,1),new B(-1,1,1),new B(1,1,-1),new B(-1,1,-1),new B(0,Vn,gi),new B(0,Vn,-gi),new B(gi,0,Vn),new B(-gi,0,Vn),new B(Vn,gi,0),new B(-Vn,gi,0)],js=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,s=100){Qr=this._renderer.getRenderTarget(),ea=this._renderer.getActiveCubeFace(),ta=this._renderer.getActiveMipmapLevel(),this._setSize(256);let r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(e,n,s,r),t>0&&this._blur(r,0,0,t),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Pc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Cc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Qr,ea,ta),e.scissorTest=!1,Rs(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Ei||e.mapping===wi?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Qr=this._renderer.getRenderTarget(),ea=this._renderer.getActiveCubeFace(),ta=this._renderer.getActiveMipmapLevel();let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:zt,minFilter:zt,generateMipmaps:!1,type:$i,format:$t,colorSpace:mn,depthBuffer:!1},s=Rc(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Rc(e,t,n);let{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=lp(r)),this._blurMaterial=hp(r,e,t)}return s}_compileMaterial(e){let t=new nt(this._lodPlanes[0],e);this._renderer.compile(t,jr)}_sceneToCubeUV(e,t,n,s){let a=new Ct(90,1,t,n),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,d=h.toneMapping;h.getClearColor(Tc),h.toneMapping=An,h.autoClear=!1;let p=new $n({name:"PMREM.Background",side:Pt,depthWrite:!1,depthTest:!1}),g=new nt(new Ut,p),x=!1,m=e.background;m?m.isColor&&(p.color.copy(m),e.background=null,x=!0):(p.color.copy(Tc),x=!0);for(let f=0;f<6;f++){let T=f%3;T===0?(a.up.set(0,c[f],0),a.lookAt(l[f],0,0)):T===1?(a.up.set(0,0,c[f]),a.lookAt(0,l[f],0)):(a.up.set(0,c[f],0),a.lookAt(0,0,l[f]));let v=this._cubeSize;Rs(s,T*v,f>2?v:0,v,v),h.setRenderTarget(s),x&&h.render(g,a),h.render(e,a)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=d,h.autoClear=u,e.background=m}_textureToCubeUV(e,t){let n=this._renderer,s=e.mapping===Ei||e.mapping===wi;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Pc()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Cc());let r=s?this._cubemapMaterial:this._equirectMaterial,o=new nt(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=e;let c=this._cubeSize;Rs(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(o,jr)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;for(let s=1;s<this._lodPlanes.length;s++){let r=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),o=Ac[(s-1)%Ac.length];this._blur(e,s-1,s,r,o)}t.autoClear=n}_blur(e,t,n,s,r){let o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,s,"latitudinal",r),this._halfBlur(o,e,n,n,s,"longitudinal",r)}_halfBlur(e,t,n,s,r,o,a){let c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let h=3,u=new nt(this._lodPlanes[s],l),d=l.uniforms,p=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*p):2*Math.PI/(2*Wn-1),x=r/g,m=isFinite(r)?1+Math.floor(h*x):Wn;m>Wn&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Wn}`);let f=[],T=0;for(let b=0;b<Wn;++b){let z=b/x,_=Math.exp(-z*z/2);f.push(_),b===0?T+=_:b<m&&(T+=2*_)}for(let b=0;b<f.length;b++)f[b]=f[b]/T;d.envMap.value=e.texture,d.samples.value=m,d.weights.value=f,d.latitudinal.value=o==="latitudinal",a&&(d.poleAxis.value=a);let{_lodMax:v}=this;d.dTheta.value=g,d.mipInt.value=v-n;let D=this._sizeLods[s],H=3*D*(s>v-yi?s-v+yi:0),N=4*(this._cubeSize-D);Rs(t,H,N,3*D,2*D),c.setRenderTarget(t),c.render(u,jr)}};function lp(i){let e=[],t=[],n=[],s=i,r=i-yi+1+wc.length;for(let o=0;o<r;o++){let a=Math.pow(2,s);t.push(a);let c=1/a;o>i-yi?c=wc[o-i+yi-1]:o===0&&(c=0),n.push(c);let l=1/(a-2),h=-l,u=1+l,d=[h,h,u,h,u,u,h,h,u,u,h,u],p=6,g=6,x=3,m=2,f=1,T=new Float32Array(x*g*p),v=new Float32Array(m*g*p),D=new Float32Array(f*g*p);for(let N=0;N<p;N++){let b=N%3*2/3-1,z=N>2?0:-1,_=[b,z,0,b+2/3,z,0,b+2/3,z+1,0,b,z,0,b+2/3,z+1,0,b,z+1,0];T.set(_,x*g*N),v.set(d,m*g*N);let M=[N,N,N,N,N,N];D.set(M,f*g*N)}let H=new Lt;H.setAttribute("position",new Vt(T,x)),H.setAttribute("uv",new Vt(v,m)),H.setAttribute("faceIndex",new Vt(D,f)),e.push(H),s>yi&&s--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function Rc(i,e,t){let n=new gn(i,e,t);return n.texture.mapping=ur,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Rs(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function hp(i,e,t){let n=new Float32Array(Wn),s=new B(0,1,0);return new _n({name:"SphericalGaussianBlur",defines:{n:Wn,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:no(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Tn,depthTest:!1,depthWrite:!1})}function Cc(){return new _n({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:no(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Tn,depthTest:!1,depthWrite:!1})}function Pc(){return new _n({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:no(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Tn,depthTest:!1,depthWrite:!1})}function no(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function up(i){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){let c=a.mapping,l=c===ua||c===da,h=c===Ei||c===wi;if(l||h)if(a.isRenderTargetTexture&&a.needsPMREMUpdate===!0){a.needsPMREMUpdate=!1;let u=e.get(a);return t===null&&(t=new js(i)),u=l?t.fromEquirectangular(a,u):t.fromCubemap(a,u),e.set(a,u),u.texture}else{if(e.has(a))return e.get(a).texture;{let u=a.image;if(l&&u&&u.height>0||h&&u&&s(u)){t===null&&(t=new js(i));let d=l?t.fromEquirectangular(a):t.fromCubemap(a);return e.set(a,d),a.addEventListener("dispose",r),d.texture}else return null}}}return a}function s(a){let c=0,l=6;for(let h=0;h<l;h++)a[h]!==void 0&&c++;return c===l}function r(a){let c=a.target;c.removeEventListener("dispose",r);let l=e.get(c);l!==void 0&&(e.delete(c),l.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:o}}function dp(i){let e={};function t(n){if(e[n]!==void 0)return e[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(n){n.isWebGL2?(t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance")):(t("WEBGL_depth_texture"),t("OES_texture_float"),t("OES_texture_half_float"),t("OES_texture_half_float_linear"),t("OES_standard_derivatives"),t("OES_element_index_uint"),t("OES_vertex_array_object"),t("ANGLE_instanced_arrays")),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture")},get:function(n){let s=t(n);return s===null&&console.warn("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function fp(i,e,t,n){let s={},r=new WeakMap;function o(u){let d=u.target;d.index!==null&&e.remove(d.index);for(let g in d.attributes)e.remove(d.attributes[g]);for(let g in d.morphAttributes){let x=d.morphAttributes[g];for(let m=0,f=x.length;m<f;m++)e.remove(x[m])}d.removeEventListener("dispose",o),delete s[d.id];let p=r.get(d);p&&(e.remove(p),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function a(u,d){return s[d.id]===!0||(d.addEventListener("dispose",o),s[d.id]=!0,t.memory.geometries++),d}function c(u){let d=u.attributes;for(let g in d)e.update(d[g],i.ARRAY_BUFFER);let p=u.morphAttributes;for(let g in p){let x=p[g];for(let m=0,f=x.length;m<f;m++)e.update(x[m],i.ARRAY_BUFFER)}}function l(u){let d=[],p=u.index,g=u.attributes.position,x=0;if(p!==null){let T=p.array;x=p.version;for(let v=0,D=T.length;v<D;v+=3){let H=T[v+0],N=T[v+1],b=T[v+2];d.push(H,N,N,b,b,H)}}else if(g!==void 0){let T=g.array;x=g.version;for(let v=0,D=T.length/3-1;v<D;v+=3){let H=v+0,N=v+1,b=v+2;d.push(H,N,N,b,b,H)}}else return;let m=new(pl(d)?Zs:Ys)(d,1);m.version=x;let f=r.get(u);f&&e.remove(f),r.set(u,m)}function h(u){let d=r.get(u);if(d){let p=u.index;p!==null&&d.version<p.version&&l(u)}else l(u);return r.get(u)}return{get:a,update:c,getWireframeAttribute:h}}function pp(i,e,t,n){let s=n.isWebGL2,r;function o(p){r=p}let a,c;function l(p){a=p.type,c=p.bytesPerElement}function h(p,g){i.drawElements(r,g,a,p*c),t.update(g,r,1)}function u(p,g,x){if(x===0)return;let m,f;if(s)m=i,f="drawElementsInstanced";else if(m=e.get("ANGLE_instanced_arrays"),f="drawElementsInstancedANGLE",m===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}m[f](r,g,a,p*c,x),t.update(g,r,x)}function d(p,g,x){if(x===0)return;let m=e.get("WEBGL_multi_draw");if(m===null)for(let f=0;f<x;f++)this.render(p[f]/c,g[f]);else{m.multiDrawElementsWEBGL(r,g,0,a,p,0,x);let f=0;for(let T=0;T<x;T++)f+=g[T];t.update(f,r,1)}}this.setMode=o,this.setIndex=l,this.render=h,this.renderInstances=u,this.renderMultiDraw=d}function mp(i){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(t.calls++,o){case i.TRIANGLES:t.triangles+=a*(r/3);break;case i.LINES:t.lines+=a*(r/2);break;case i.LINE_STRIP:t.lines+=a*(r-1);break;case i.LINE_LOOP:t.lines+=a*r;break;case i.POINTS:t.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function gp(i,e){return i[0]-e[0]}function _p(i,e){return Math.abs(e[1])-Math.abs(i[1])}function xp(i,e,t){let n={},s=new Float32Array(8),r=new WeakMap,o=new yt,a=[];for(let l=0;l<8;l++)a[l]=[l,0];function c(l,h,u){let d=l.morphTargetInfluences;if(e.isWebGL2===!0){let p=h.morphAttributes.position||h.morphAttributes.normal||h.morphAttributes.color,g=p!==void 0?p.length:0,x=r.get(h);if(x===void 0||x.count!==g){let P=function(){ee.dispose(),r.delete(h),h.removeEventListener("dispose",P)};x!==void 0&&x.texture.dispose();let T=h.morphAttributes.position!==void 0,v=h.morphAttributes.normal!==void 0,D=h.morphAttributes.color!==void 0,H=h.morphAttributes.position||[],N=h.morphAttributes.normal||[],b=h.morphAttributes.color||[],z=0;T===!0&&(z=1),v===!0&&(z=2),D===!0&&(z=3);let _=h.attributes.position.count*z,M=1;_>e.maxTextureSize&&(M=Math.ceil(_/e.maxTextureSize),_=e.maxTextureSize);let X=new Float32Array(_*M*4*g),ee=new Ws(X,_,M,g);ee.type=wn,ee.needsUpdate=!0;let le=z*4;for(let q=0;q<g;q++){let ne=H[q],C=N[q],A=b[q],F=_*M*4*q;for(let J=0;J<ne.count;J++){let Y=J*le;T===!0&&(o.fromBufferAttribute(ne,J),X[F+Y+0]=o.x,X[F+Y+1]=o.y,X[F+Y+2]=o.z,X[F+Y+3]=0),v===!0&&(o.fromBufferAttribute(C,J),X[F+Y+4]=o.x,X[F+Y+5]=o.y,X[F+Y+6]=o.z,X[F+Y+7]=0),D===!0&&(o.fromBufferAttribute(A,J),X[F+Y+8]=o.x,X[F+Y+9]=o.y,X[F+Y+10]=o.z,X[F+Y+11]=A.itemSize===4?o.w:1)}}x={count:g,texture:ee,size:new Re(_,M)},r.set(h,x),h.addEventListener("dispose",P)}let m=0;for(let T=0;T<d.length;T++)m+=d[T];let f=h.morphTargetsRelative?1:1-m;u.getUniforms().setValue(i,"morphTargetBaseInfluence",f),u.getUniforms().setValue(i,"morphTargetInfluences",d),u.getUniforms().setValue(i,"morphTargetsTexture",x.texture,t),u.getUniforms().setValue(i,"morphTargetsTextureSize",x.size)}else{let p=d===void 0?0:d.length,g=n[h.id];if(g===void 0||g.length!==p){g=[];for(let v=0;v<p;v++)g[v]=[v,0];n[h.id]=g}for(let v=0;v<p;v++){let D=g[v];D[0]=v,D[1]=d[v]}g.sort(_p);for(let v=0;v<8;v++)v<p&&g[v][1]?(a[v][0]=g[v][0],a[v][1]=g[v][1]):(a[v][0]=Number.MAX_SAFE_INTEGER,a[v][1]=0);a.sort(gp);let x=h.morphAttributes.position,m=h.morphAttributes.normal,f=0;for(let v=0;v<8;v++){let D=a[v],H=D[0],N=D[1];H!==Number.MAX_SAFE_INTEGER&&N?(x&&h.getAttribute("morphTarget"+v)!==x[H]&&h.setAttribute("morphTarget"+v,x[H]),m&&h.getAttribute("morphNormal"+v)!==m[H]&&h.setAttribute("morphNormal"+v,m[H]),s[v]=N,f+=N):(x&&h.hasAttribute("morphTarget"+v)===!0&&h.deleteAttribute("morphTarget"+v),m&&h.hasAttribute("morphNormal"+v)===!0&&h.deleteAttribute("morphNormal"+v),s[v]=0)}let T=h.morphTargetsRelative?1:1-f;u.getUniforms().setValue(i,"morphTargetBaseInfluence",T),u.getUniforms().setValue(i,"morphTargetInfluences",s)}}return{update:c}}function yp(i,e,t,n){let s=new WeakMap;function r(c){let l=n.render.frame,h=c.geometry,u=e.get(c,h);if(s.get(u)!==l&&(e.update(u),s.set(u,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),s.get(c)!==l&&(t.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,i.ARRAY_BUFFER),s.set(c,l))),c.isSkinnedMesh){let d=c.skeleton;s.get(d)!==l&&(d.update(),s.set(d,l))}return u}function o(){s=new WeakMap}function a(c){let l=c.target;l.removeEventListener("dispose",a),t.remove(l.instanceMatrix),l.instanceColor!==null&&t.remove(l.instanceColor)}return{update:r,dispose:o}}var Qs=class extends Jt{constructor(e,t,n,s,r,o,a,c,l,h){if(h=h!==void 0?h:qn,h!==qn&&h!==Ti)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===qn&&(n=En),n===void 0&&h===Ti&&(n=Xn),super(null,s,r,o,a,c,h,n,l),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=a!==void 0?a:Rt,this.minFilter=c!==void 0?c:Rt,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},xl=new Jt,yl=new Qs(1,1);yl.compareFunction=fl;var vl=new Ws,Ml=new xa,Sl=new Js,Lc=[],Ic=[],Dc=new Float32Array(16),Nc=new Float32Array(9),Uc=new Float32Array(4);function Di(i,e,t){let n=i[0];if(n<=0||n>0)return i;let s=e*t,r=Lc[s];if(r===void 0&&(r=new Float32Array(s),Lc[s]=r),e!==0){n.toArray(r,0);for(let o=1,a=0;o!==e;++o)a+=t,i[o].toArray(r,a)}return r}function ft(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function pt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function fr(i,e){let t=Ic[e];t===void 0&&(t=new Int32Array(e),Ic[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function vp(i,e){let t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function Mp(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(ft(t,e))return;i.uniform2fv(this.addr,e),pt(t,e)}}function Sp(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(ft(t,e))return;i.uniform3fv(this.addr,e),pt(t,e)}}function bp(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(ft(t,e))return;i.uniform4fv(this.addr,e),pt(t,e)}}function Ep(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(ft(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),pt(t,e)}else{if(ft(t,n))return;Uc.set(n),i.uniformMatrix2fv(this.addr,!1,Uc),pt(t,n)}}function wp(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(ft(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),pt(t,e)}else{if(ft(t,n))return;Nc.set(n),i.uniformMatrix3fv(this.addr,!1,Nc),pt(t,n)}}function Tp(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(ft(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),pt(t,e)}else{if(ft(t,n))return;Dc.set(n),i.uniformMatrix4fv(this.addr,!1,Dc),pt(t,n)}}function Ap(i,e){let t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function Rp(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(ft(t,e))return;i.uniform2iv(this.addr,e),pt(t,e)}}function Cp(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(ft(t,e))return;i.uniform3iv(this.addr,e),pt(t,e)}}function Pp(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(ft(t,e))return;i.uniform4iv(this.addr,e),pt(t,e)}}function Lp(i,e){let t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function Ip(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(ft(t,e))return;i.uniform2uiv(this.addr,e),pt(t,e)}}function Dp(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(ft(t,e))return;i.uniform3uiv(this.addr,e),pt(t,e)}}function Np(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(ft(t,e))return;i.uniform4uiv(this.addr,e),pt(t,e)}}function Up(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r=this.type===i.SAMPLER_2D_SHADOW?yl:xl;t.setTexture2D(e||r,s)}function Fp(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||Ml,s)}function Op(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||Sl,s)}function Bp(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||vl,s)}function zp(i){switch(i){case 5126:return vp;case 35664:return Mp;case 35665:return Sp;case 35666:return bp;case 35674:return Ep;case 35675:return wp;case 35676:return Tp;case 5124:case 35670:return Ap;case 35667:case 35671:return Rp;case 35668:case 35672:return Cp;case 35669:case 35673:return Pp;case 5125:return Lp;case 36294:return Ip;case 36295:return Dp;case 36296:return Np;case 35678:case 36198:case 36298:case 36306:case 35682:return Up;case 35679:case 36299:case 36307:return Fp;case 35680:case 36300:case 36308:case 36293:return Op;case 36289:case 36303:case 36311:case 36292:return Bp}}function kp(i,e){i.uniform1fv(this.addr,e)}function Hp(i,e){let t=Di(e,this.size,2);i.uniform2fv(this.addr,t)}function Vp(i,e){let t=Di(e,this.size,3);i.uniform3fv(this.addr,t)}function Gp(i,e){let t=Di(e,this.size,4);i.uniform4fv(this.addr,t)}function Wp(i,e){let t=Di(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function Xp(i,e){let t=Di(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function qp(i,e){let t=Di(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function Yp(i,e){i.uniform1iv(this.addr,e)}function Zp(i,e){i.uniform2iv(this.addr,e)}function $p(i,e){i.uniform3iv(this.addr,e)}function Jp(i,e){i.uniform4iv(this.addr,e)}function Kp(i,e){i.uniform1uiv(this.addr,e)}function jp(i,e){i.uniform2uiv(this.addr,e)}function Qp(i,e){i.uniform3uiv(this.addr,e)}function em(i,e){i.uniform4uiv(this.addr,e)}function tm(i,e,t){let n=this.cache,s=e.length,r=fr(t,s);ft(n,r)||(i.uniform1iv(this.addr,r),pt(n,r));for(let o=0;o!==s;++o)t.setTexture2D(e[o]||xl,r[o])}function nm(i,e,t){let n=this.cache,s=e.length,r=fr(t,s);ft(n,r)||(i.uniform1iv(this.addr,r),pt(n,r));for(let o=0;o!==s;++o)t.setTexture3D(e[o]||Ml,r[o])}function im(i,e,t){let n=this.cache,s=e.length,r=fr(t,s);ft(n,r)||(i.uniform1iv(this.addr,r),pt(n,r));for(let o=0;o!==s;++o)t.setTextureCube(e[o]||Sl,r[o])}function sm(i,e,t){let n=this.cache,s=e.length,r=fr(t,s);ft(n,r)||(i.uniform1iv(this.addr,r),pt(n,r));for(let o=0;o!==s;++o)t.setTexture2DArray(e[o]||vl,r[o])}function rm(i){switch(i){case 5126:return kp;case 35664:return Hp;case 35665:return Vp;case 35666:return Gp;case 35674:return Wp;case 35675:return Xp;case 35676:return qp;case 5124:case 35670:return Yp;case 35667:case 35671:return Zp;case 35668:case 35672:return $p;case 35669:case 35673:return Jp;case 5125:return Kp;case 36294:return jp;case 36295:return Qp;case 36296:return em;case 35678:case 36198:case 36298:case 36306:case 35682:return tm;case 35679:case 36299:case 36307:return nm;case 35680:case 36300:case 36308:case 36293:return im;case 36289:case 36303:case 36311:case 36292:return sm}}var Ma=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=zp(t.type)}},Sa=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=rm(t.type)}},ba=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let s=this.seq;for(let r=0,o=s.length;r!==o;++r){let a=s[r];a.setValue(e,t[a.id],n)}}},na=/(\w+)(\])?(\[|\.)?/g;function Fc(i,e){i.seq.push(e),i.map[e.id]=e}function am(i,e,t){let n=i.name,s=n.length;for(na.lastIndex=0;;){let r=na.exec(n),o=na.lastIndex,a=r[1],c=r[2]==="]",l=r[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===s){Fc(t,l===void 0?new Ma(a,i,e):new Sa(a,i,e));break}else{let u=t.map[a];u===void 0&&(u=new ba(a),Fc(t,u)),t=u}}}var bi=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){let r=e.getActiveUniform(t,s),o=e.getUniformLocation(t,r.name);am(r,o,this)}}setValue(e,t,n,s){let r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){let s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,o=t.length;r!==o;++r){let a=t[r],c=n[a.id];c.needsUpdate!==!1&&a.setValue(e,c.value,s)}}static seqWithValue(e,t){let n=[];for(let s=0,r=e.length;s!==r;++s){let o=e[s];o.id in t&&n.push(o)}return n}};function Oc(i,e,t){let n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}var om=37297,cm=0;function lm(i,e){let t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let o=s;o<r;o++){let a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}function hm(i){let e=je.getPrimaries(je.workingColorSpace),t=je.getPrimaries(i),n;switch(e===t?n="":e===Bs&&t===Os?n="LinearDisplayP3ToLinearSRGB":e===Os&&t===Bs&&(n="LinearSRGBToLinearDisplayP3"),i){case mn:case dr:return[n,"LinearTransferOETF"];case dt:case eo:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",i),[n,"LinearTransferOETF"]}}function Bc(i,e,t){let n=i.getShaderParameter(e,i.COMPILE_STATUS),s=i.getShaderInfoLog(e).trim();if(n&&s==="")return"";let r=/ERROR: 0:(\d+)/.exec(s);if(r){let o=parseInt(r[1]);return t.toUpperCase()+`

`+s+`

`+lm(i.getShaderSource(e),o)}else return s}function um(i,e){let t=hm(e);return`vec4 ${i}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function dm(i,e){let t;switch(e){case gh:t="Linear";break;case _h:t="Reinhard";break;case xh:t="OptimizedCineon";break;case yh:t="ACESFilmic";break;case Mh:t="AgX";break;case vh:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function fm(i){return[i.extensionDerivatives||i.envMapCubeUVHeight||i.bumpMap||i.normalMapTangentSpace||i.clearcoatNormalMap||i.flatShading||i.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(i.extensionFragDepth||i.logarithmicDepthBuffer)&&i.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",i.extensionDrawBuffers&&i.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(i.extensionShaderTextureLOD||i.envMap||i.transmission)&&i.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(vi).join(`
`)}function pm(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter(vi).join(`
`)}function mm(i){let e=[];for(let t in i){let n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function gm(i,e){let t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(e,s),o=r.name,a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),t[o]={type:r.type,location:i.getAttribLocation(e,o),locationSize:a}}return t}function vi(i){return i!==""}function zc(i,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function kc(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var _m=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ea(i){return i.replace(_m,ym)}var xm=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function ym(i,e){let t=Ve[e];if(t===void 0){let n=xm.get(e);if(n!==void 0)t=Ve[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Ea(t)}var vm=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Hc(i){return i.replace(vm,Mm)}function Mm(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Vc(i){let e="precision "+i.precision+` float;
precision `+i.precision+" int;";return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function Sm(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===tl?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===ja?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===fn&&(e="SHADOWMAP_TYPE_VSM"),e}function bm(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Ei:case wi:e="ENVMAP_TYPE_CUBE";break;case ur:e="ENVMAP_TYPE_CUBE_UV";break}return e}function Em(i){let e="ENVMAP_MODE_REFLECTION";return i.envMap&&i.envMapMode===wi&&(e="ENVMAP_MODE_REFRACTION"),e}function wm(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case nl:e="ENVMAP_BLENDING_MULTIPLY";break;case ph:e="ENVMAP_BLENDING_MIX";break;case mh:e="ENVMAP_BLENDING_ADD";break}return e}function Tm(i){let e=i.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function Am(i,e,t,n){let s=i.getContext(),r=t.defines,o=t.vertexShader,a=t.fragmentShader,c=Sm(t),l=bm(t),h=Em(t),u=wm(t),d=Tm(t),p=t.isWebGL2?"":fm(t),g=pm(t),x=mm(r),m=s.createProgram(),f,T,v=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(f=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x].filter(vi).join(`
`),f.length>0&&(f+=`
`),T=[p,"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x].filter(vi).join(`
`),T.length>0&&(T+=`
`)):(f=[Vc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors&&t.isWebGL2?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(vi).join(`
`),T=[p,Vc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==An?"#define TONE_MAPPING":"",t.toneMapping!==An?Ve.tonemapping_pars_fragment:"",t.toneMapping!==An?dm("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ve.colorspace_pars_fragment,um("linearToOutputTexel",t.outputColorSpace),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(vi).join(`
`)),o=Ea(o),o=zc(o,t),o=kc(o,t),a=Ea(a),a=zc(a,t),a=kc(a,t),o=Hc(o),a=Hc(a),t.isWebGL2&&t.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,f=[g,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+f,T=["precision mediump sampler2DArray;","#define varying in",t.glslVersion===oc?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===oc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+T);let D=v+f+o,H=v+T+a,N=Oc(s,s.VERTEX_SHADER,D),b=Oc(s,s.FRAGMENT_SHADER,H);s.attachShader(m,N),s.attachShader(m,b),t.index0AttributeName!==void 0?s.bindAttribLocation(m,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(m,0,"position"),s.linkProgram(m);function z(ee){if(i.debug.checkShaderErrors){let le=s.getProgramInfoLog(m).trim(),P=s.getShaderInfoLog(N).trim(),q=s.getShaderInfoLog(b).trim(),ne=!0,C=!0;if(s.getProgramParameter(m,s.LINK_STATUS)===!1)if(ne=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,m,N,b);else{let A=Bc(s,N,"vertex"),F=Bc(s,b,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(m,s.VALIDATE_STATUS)+`

Program Info Log: `+le+`
`+A+`
`+F)}else le!==""?console.warn("THREE.WebGLProgram: Program Info Log:",le):(P===""||q==="")&&(C=!1);C&&(ee.diagnostics={runnable:ne,programLog:le,vertexShader:{log:P,prefix:f},fragmentShader:{log:q,prefix:T}})}s.deleteShader(N),s.deleteShader(b),_=new bi(s,m),M=gm(s,m)}let _;this.getUniforms=function(){return _===void 0&&z(this),_};let M;this.getAttributes=function(){return M===void 0&&z(this),M};let X=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return X===!1&&(X=s.getProgramParameter(m,om)),X},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(m),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=cm++,this.cacheKey=e,this.usedTimes=1,this.program=m,this.vertexShader=N,this.fragmentShader=b,this}var Rm=0,wa=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){let t=e.vertexShader,n=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new Ta(e),t.set(e,n)),n}},Ta=class{constructor(e){this.id=Rm++,this.code=e,this.usedTimes=0}};function Cm(i,e,t,n,s,r,o){let a=new qs,c=new wa,l=[],h=s.isWebGL2,u=s.logarithmicDepthBuffer,d=s.vertexTextures,p=s.precision,g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(_){return _===0?"uv":`uv${_}`}function m(_,M,X,ee,le){let P=ee.fog,q=le.geometry,ne=_.isMeshStandardMaterial?ee.environment:null,C=(_.isMeshStandardMaterial?t:e).get(_.envMap||ne),A=C&&C.mapping===ur?C.image.height:null,F=g[_.type];_.precision!==null&&(p=s.getMaxPrecision(_.precision),p!==_.precision&&console.warn("THREE.WebGLProgram.getParameters:",_.precision,"not supported, using",p,"instead."));let J=q.morphAttributes.position||q.morphAttributes.normal||q.morphAttributes.color,Y=J!==void 0?J.length:0,j=0;q.morphAttributes.position!==void 0&&(j=1),q.morphAttributes.normal!==void 0&&(j=2),q.morphAttributes.color!==void 0&&(j=3);let k,w,R,U;if(F){let Et=nn[F];k=Et.vertexShader,w=Et.fragmentShader}else k=_.vertexShader,w=_.fragmentShader,c.update(_),R=c.getVertexShaderID(_),U=c.getFragmentShaderID(_);let V=i.getRenderTarget(),Z=le.isInstancedMesh===!0,G=le.isBatchedMesh===!0,te=!!_.map,ae=!!_.matcap,L=!!C,oe=!!_.aoMap,Q=!!_.lightMap,ce=!!_.bumpMap,$=!!_.normalMap,fe=!!_.displacementMap,ge=!!_.emissiveMap,S=!!_.metalnessMap,y=!!_.roughnessMap,W=_.anisotropy>0,he=_.clearcoat>0,ue=_.iridescence>0,pe=_.sheen>0,Te=_.transmission>0,ve=W&&!!_.anisotropyMap,Ee=he&&!!_.clearcoatMap,Pe=he&&!!_.clearcoatNormalMap,Fe=he&&!!_.clearcoatRoughnessMap,de=ue&&!!_.iridescenceMap,ze=ue&&!!_.iridescenceThicknessMap,I=pe&&!!_.sheenColorMap,me=pe&&!!_.sheenRoughnessMap,Se=!!_.specularMap,_e=!!_.specularColorMap,Ce=!!_.specularIntensityMap,Xe=Te&&!!_.transmissionMap,$e=Te&&!!_.thicknessMap,Ge=!!_.gradientMap,Me=!!_.alphaMap,O=_.alphaTest>0,xe=!!_.alphaHash,ye=!!_.extensions,Ne=!!q.attributes.uv1,Le=!!q.attributes.uv2,Je=!!q.attributes.uv3,Ke=An;return _.toneMapped&&(V===null||V.isXRRenderTarget===!0)&&(Ke=i.toneMapping),{isWebGL2:h,shaderID:F,shaderType:_.type,shaderName:_.name,vertexShader:k,fragmentShader:w,defines:_.defines,customVertexShaderID:R,customFragmentShaderID:U,isRawShaderMaterial:_.isRawShaderMaterial===!0,glslVersion:_.glslVersion,precision:p,batching:G,instancing:Z,instancingColor:Z&&le.instanceColor!==null,supportsVertexTextures:d,outputColorSpace:V===null?i.outputColorSpace:V.isXRRenderTarget===!0?V.texture.colorSpace:mn,map:te,matcap:ae,envMap:L,envMapMode:L&&C.mapping,envMapCubeUVHeight:A,aoMap:oe,lightMap:Q,bumpMap:ce,normalMap:$,displacementMap:d&&fe,emissiveMap:ge,normalMapObjectSpace:$&&_.normalMapType===Dh,normalMapTangentSpace:$&&_.normalMapType===dl,metalnessMap:S,roughnessMap:y,anisotropy:W,anisotropyMap:ve,clearcoat:he,clearcoatMap:Ee,clearcoatNormalMap:Pe,clearcoatRoughnessMap:Fe,iridescence:ue,iridescenceMap:de,iridescenceThicknessMap:ze,sheen:pe,sheenColorMap:I,sheenRoughnessMap:me,specularMap:Se,specularColorMap:_e,specularIntensityMap:Ce,transmission:Te,transmissionMap:Xe,thicknessMap:$e,gradientMap:Ge,opaque:_.transparent===!1&&_.blending===Mi,alphaMap:Me,alphaTest:O,alphaHash:xe,combine:_.combine,mapUv:te&&x(_.map.channel),aoMapUv:oe&&x(_.aoMap.channel),lightMapUv:Q&&x(_.lightMap.channel),bumpMapUv:ce&&x(_.bumpMap.channel),normalMapUv:$&&x(_.normalMap.channel),displacementMapUv:fe&&x(_.displacementMap.channel),emissiveMapUv:ge&&x(_.emissiveMap.channel),metalnessMapUv:S&&x(_.metalnessMap.channel),roughnessMapUv:y&&x(_.roughnessMap.channel),anisotropyMapUv:ve&&x(_.anisotropyMap.channel),clearcoatMapUv:Ee&&x(_.clearcoatMap.channel),clearcoatNormalMapUv:Pe&&x(_.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Fe&&x(_.clearcoatRoughnessMap.channel),iridescenceMapUv:de&&x(_.iridescenceMap.channel),iridescenceThicknessMapUv:ze&&x(_.iridescenceThicknessMap.channel),sheenColorMapUv:I&&x(_.sheenColorMap.channel),sheenRoughnessMapUv:me&&x(_.sheenRoughnessMap.channel),specularMapUv:Se&&x(_.specularMap.channel),specularColorMapUv:_e&&x(_.specularColorMap.channel),specularIntensityMapUv:Ce&&x(_.specularIntensityMap.channel),transmissionMapUv:Xe&&x(_.transmissionMap.channel),thicknessMapUv:$e&&x(_.thicknessMap.channel),alphaMapUv:Me&&x(_.alphaMap.channel),vertexTangents:!!q.attributes.tangent&&($||W),vertexColors:_.vertexColors,vertexAlphas:_.vertexColors===!0&&!!q.attributes.color&&q.attributes.color.itemSize===4,vertexUv1s:Ne,vertexUv2s:Le,vertexUv3s:Je,pointsUvs:le.isPoints===!0&&!!q.attributes.uv&&(te||Me),fog:!!P,useFog:_.fog===!0,fogExp2:P&&P.isFogExp2,flatShading:_.flatShading===!0,sizeAttenuation:_.sizeAttenuation===!0,logarithmicDepthBuffer:u,skinning:le.isSkinnedMesh===!0,morphTargets:q.morphAttributes.position!==void 0,morphNormals:q.morphAttributes.normal!==void 0,morphColors:q.morphAttributes.color!==void 0,morphTargetsCount:Y,morphTextureStride:j,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:_.dithering,shadowMapEnabled:i.shadowMap.enabled&&X.length>0,shadowMapType:i.shadowMap.type,toneMapping:Ke,useLegacyLights:i._useLegacyLights,decodeVideoTexture:te&&_.map.isVideoTexture===!0&&je.getTransfer(_.map.colorSpace)===tt,premultipliedAlpha:_.premultipliedAlpha,doubleSided:_.side===Yt,flipSided:_.side===Pt,useDepthPacking:_.depthPacking>=0,depthPacking:_.depthPacking||0,index0AttributeName:_.index0AttributeName,extensionDerivatives:ye&&_.extensions.derivatives===!0,extensionFragDepth:ye&&_.extensions.fragDepth===!0,extensionDrawBuffers:ye&&_.extensions.drawBuffers===!0,extensionShaderTextureLOD:ye&&_.extensions.shaderTextureLOD===!0,extensionClipCullDistance:ye&&_.extensions.clipCullDistance&&n.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:h||n.has("EXT_frag_depth"),rendererExtensionDrawBuffers:h||n.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:h||n.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:_.customProgramCacheKey()}}function f(_){let M=[];if(_.shaderID?M.push(_.shaderID):(M.push(_.customVertexShaderID),M.push(_.customFragmentShaderID)),_.defines!==void 0)for(let X in _.defines)M.push(X),M.push(_.defines[X]);return _.isRawShaderMaterial===!1&&(T(M,_),v(M,_),M.push(i.outputColorSpace)),M.push(_.customProgramCacheKey),M.join()}function T(_,M){_.push(M.precision),_.push(M.outputColorSpace),_.push(M.envMapMode),_.push(M.envMapCubeUVHeight),_.push(M.mapUv),_.push(M.alphaMapUv),_.push(M.lightMapUv),_.push(M.aoMapUv),_.push(M.bumpMapUv),_.push(M.normalMapUv),_.push(M.displacementMapUv),_.push(M.emissiveMapUv),_.push(M.metalnessMapUv),_.push(M.roughnessMapUv),_.push(M.anisotropyMapUv),_.push(M.clearcoatMapUv),_.push(M.clearcoatNormalMapUv),_.push(M.clearcoatRoughnessMapUv),_.push(M.iridescenceMapUv),_.push(M.iridescenceThicknessMapUv),_.push(M.sheenColorMapUv),_.push(M.sheenRoughnessMapUv),_.push(M.specularMapUv),_.push(M.specularColorMapUv),_.push(M.specularIntensityMapUv),_.push(M.transmissionMapUv),_.push(M.thicknessMapUv),_.push(M.combine),_.push(M.fogExp2),_.push(M.sizeAttenuation),_.push(M.morphTargetsCount),_.push(M.morphAttributeCount),_.push(M.numDirLights),_.push(M.numPointLights),_.push(M.numSpotLights),_.push(M.numSpotLightMaps),_.push(M.numHemiLights),_.push(M.numRectAreaLights),_.push(M.numDirLightShadows),_.push(M.numPointLightShadows),_.push(M.numSpotLightShadows),_.push(M.numSpotLightShadowsWithMaps),_.push(M.numLightProbes),_.push(M.shadowMapType),_.push(M.toneMapping),_.push(M.numClippingPlanes),_.push(M.numClipIntersection),_.push(M.depthPacking)}function v(_,M){a.disableAll(),M.isWebGL2&&a.enable(0),M.supportsVertexTextures&&a.enable(1),M.instancing&&a.enable(2),M.instancingColor&&a.enable(3),M.matcap&&a.enable(4),M.envMap&&a.enable(5),M.normalMapObjectSpace&&a.enable(6),M.normalMapTangentSpace&&a.enable(7),M.clearcoat&&a.enable(8),M.iridescence&&a.enable(9),M.alphaTest&&a.enable(10),M.vertexColors&&a.enable(11),M.vertexAlphas&&a.enable(12),M.vertexUv1s&&a.enable(13),M.vertexUv2s&&a.enable(14),M.vertexUv3s&&a.enable(15),M.vertexTangents&&a.enable(16),M.anisotropy&&a.enable(17),M.alphaHash&&a.enable(18),M.batching&&a.enable(19),_.push(a.mask),a.disableAll(),M.fog&&a.enable(0),M.useFog&&a.enable(1),M.flatShading&&a.enable(2),M.logarithmicDepthBuffer&&a.enable(3),M.skinning&&a.enable(4),M.morphTargets&&a.enable(5),M.morphNormals&&a.enable(6),M.morphColors&&a.enable(7),M.premultipliedAlpha&&a.enable(8),M.shadowMapEnabled&&a.enable(9),M.useLegacyLights&&a.enable(10),M.doubleSided&&a.enable(11),M.flipSided&&a.enable(12),M.useDepthPacking&&a.enable(13),M.dithering&&a.enable(14),M.transmission&&a.enable(15),M.sheen&&a.enable(16),M.opaque&&a.enable(17),M.pointsUvs&&a.enable(18),M.decodeVideoTexture&&a.enable(19),_.push(a.mask)}function D(_){let M=g[_.type],X;if(M){let ee=nn[M];X=_u.clone(ee.uniforms)}else X=_.uniforms;return X}function H(_,M){let X;for(let ee=0,le=l.length;ee<le;ee++){let P=l[ee];if(P.cacheKey===M){X=P,++X.usedTimes;break}}return X===void 0&&(X=new Am(i,M,_,r),l.push(X)),X}function N(_){if(--_.usedTimes===0){let M=l.indexOf(_);l[M]=l[l.length-1],l.pop(),_.destroy()}}function b(_){c.remove(_)}function z(){c.dispose()}return{getParameters:m,getProgramCacheKey:f,getUniforms:D,acquireProgram:H,releaseProgram:N,releaseShaderCache:b,programs:l,dispose:z}}function Pm(){let i=new WeakMap;function e(r){let o=i.get(r);return o===void 0&&(o={},i.set(r,o)),o}function t(r){i.delete(r)}function n(r,o,a){i.get(r)[o]=a}function s(){i=new WeakMap}return{get:e,remove:t,update:n,dispose:s}}function Lm(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function Gc(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function Wc(){let i=[],e=0,t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function o(u,d,p,g,x,m){let f=i[e];return f===void 0?(f={id:u.id,object:u,geometry:d,material:p,groupOrder:g,renderOrder:u.renderOrder,z:x,group:m},i[e]=f):(f.id=u.id,f.object=u,f.geometry=d,f.material=p,f.groupOrder=g,f.renderOrder=u.renderOrder,f.z=x,f.group=m),e++,f}function a(u,d,p,g,x,m){let f=o(u,d,p,g,x,m);p.transmission>0?n.push(f):p.transparent===!0?s.push(f):t.push(f)}function c(u,d,p,g,x,m){let f=o(u,d,p,g,x,m);p.transmission>0?n.unshift(f):p.transparent===!0?s.unshift(f):t.unshift(f)}function l(u,d){t.length>1&&t.sort(u||Lm),n.length>1&&n.sort(d||Gc),s.length>1&&s.sort(d||Gc)}function h(){for(let u=e,d=i.length;u<d;u++){let p=i[u];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:a,unshift:c,finish:h,sort:l}}function Im(){let i=new WeakMap;function e(n,s){let r=i.get(n),o;return r===void 0?(o=new Wc,i.set(n,[o])):s>=r.length?(o=new Wc,r.push(o)):o=r[s],o}function t(){i=new WeakMap}return{get:e,dispose:t}}function Dm(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new B,color:new Oe};break;case"SpotLight":t={position:new B,direction:new B,color:new Oe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new B,color:new Oe,distance:0,decay:0};break;case"HemisphereLight":t={direction:new B,skyColor:new Oe,groundColor:new Oe};break;case"RectAreaLight":t={color:new Oe,position:new B,halfWidth:new B,halfHeight:new B};break}return i[e.id]=t,t}}}function Nm(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Re};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Re};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Re,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}var Um=0;function Fm(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function Om(i,e){let t=new Dm,n=Nm(),s={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let h=0;h<9;h++)s.probe.push(new B);let r=new B,o=new ht,a=new ht;function c(h,u){let d=0,p=0,g=0;for(let ee=0;ee<9;ee++)s.probe[ee].set(0,0,0);let x=0,m=0,f=0,T=0,v=0,D=0,H=0,N=0,b=0,z=0,_=0;h.sort(Fm);let M=u===!0?Math.PI:1;for(let ee=0,le=h.length;ee<le;ee++){let P=h[ee],q=P.color,ne=P.intensity,C=P.distance,A=P.shadow&&P.shadow.map?P.shadow.map.texture:null;if(P.isAmbientLight)d+=q.r*ne*M,p+=q.g*ne*M,g+=q.b*ne*M;else if(P.isLightProbe){for(let F=0;F<9;F++)s.probe[F].addScaledVector(P.sh.coefficients[F],ne);_++}else if(P.isDirectionalLight){let F=t.get(P);if(F.color.copy(P.color).multiplyScalar(P.intensity*M),P.castShadow){let J=P.shadow,Y=n.get(P);Y.shadowBias=J.bias,Y.shadowNormalBias=J.normalBias,Y.shadowRadius=J.radius,Y.shadowMapSize=J.mapSize,s.directionalShadow[x]=Y,s.directionalShadowMap[x]=A,s.directionalShadowMatrix[x]=P.shadow.matrix,D++}s.directional[x]=F,x++}else if(P.isSpotLight){let F=t.get(P);F.position.setFromMatrixPosition(P.matrixWorld),F.color.copy(q).multiplyScalar(ne*M),F.distance=C,F.coneCos=Math.cos(P.angle),F.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),F.decay=P.decay,s.spot[f]=F;let J=P.shadow;if(P.map&&(s.spotLightMap[b]=P.map,b++,J.updateMatrices(P),P.castShadow&&z++),s.spotLightMatrix[f]=J.matrix,P.castShadow){let Y=n.get(P);Y.shadowBias=J.bias,Y.shadowNormalBias=J.normalBias,Y.shadowRadius=J.radius,Y.shadowMapSize=J.mapSize,s.spotShadow[f]=Y,s.spotShadowMap[f]=A,N++}f++}else if(P.isRectAreaLight){let F=t.get(P);F.color.copy(q).multiplyScalar(ne),F.halfWidth.set(P.width*.5,0,0),F.halfHeight.set(0,P.height*.5,0),s.rectArea[T]=F,T++}else if(P.isPointLight){let F=t.get(P);if(F.color.copy(P.color).multiplyScalar(P.intensity*M),F.distance=P.distance,F.decay=P.decay,P.castShadow){let J=P.shadow,Y=n.get(P);Y.shadowBias=J.bias,Y.shadowNormalBias=J.normalBias,Y.shadowRadius=J.radius,Y.shadowMapSize=J.mapSize,Y.shadowCameraNear=J.camera.near,Y.shadowCameraFar=J.camera.far,s.pointShadow[m]=Y,s.pointShadowMap[m]=A,s.pointShadowMatrix[m]=P.shadow.matrix,H++}s.point[m]=F,m++}else if(P.isHemisphereLight){let F=t.get(P);F.skyColor.copy(P.color).multiplyScalar(ne*M),F.groundColor.copy(P.groundColor).multiplyScalar(ne*M),s.hemi[v]=F,v++}}T>0&&(e.isWebGL2?i.has("OES_texture_float_linear")===!0?(s.rectAreaLTC1=be.LTC_FLOAT_1,s.rectAreaLTC2=be.LTC_FLOAT_2):(s.rectAreaLTC1=be.LTC_HALF_1,s.rectAreaLTC2=be.LTC_HALF_2):i.has("OES_texture_float_linear")===!0?(s.rectAreaLTC1=be.LTC_FLOAT_1,s.rectAreaLTC2=be.LTC_FLOAT_2):i.has("OES_texture_half_float_linear")===!0?(s.rectAreaLTC1=be.LTC_HALF_1,s.rectAreaLTC2=be.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),s.ambient[0]=d,s.ambient[1]=p,s.ambient[2]=g;let X=s.hash;(X.directionalLength!==x||X.pointLength!==m||X.spotLength!==f||X.rectAreaLength!==T||X.hemiLength!==v||X.numDirectionalShadows!==D||X.numPointShadows!==H||X.numSpotShadows!==N||X.numSpotMaps!==b||X.numLightProbes!==_)&&(s.directional.length=x,s.spot.length=f,s.rectArea.length=T,s.point.length=m,s.hemi.length=v,s.directionalShadow.length=D,s.directionalShadowMap.length=D,s.pointShadow.length=H,s.pointShadowMap.length=H,s.spotShadow.length=N,s.spotShadowMap.length=N,s.directionalShadowMatrix.length=D,s.pointShadowMatrix.length=H,s.spotLightMatrix.length=N+b-z,s.spotLightMap.length=b,s.numSpotLightShadowsWithMaps=z,s.numLightProbes=_,X.directionalLength=x,X.pointLength=m,X.spotLength=f,X.rectAreaLength=T,X.hemiLength=v,X.numDirectionalShadows=D,X.numPointShadows=H,X.numSpotShadows=N,X.numSpotMaps=b,X.numLightProbes=_,s.version=Um++)}function l(h,u){let d=0,p=0,g=0,x=0,m=0,f=u.matrixWorldInverse;for(let T=0,v=h.length;T<v;T++){let D=h[T];if(D.isDirectionalLight){let H=s.directional[d];H.direction.setFromMatrixPosition(D.matrixWorld),r.setFromMatrixPosition(D.target.matrixWorld),H.direction.sub(r),H.direction.transformDirection(f),d++}else if(D.isSpotLight){let H=s.spot[g];H.position.setFromMatrixPosition(D.matrixWorld),H.position.applyMatrix4(f),H.direction.setFromMatrixPosition(D.matrixWorld),r.setFromMatrixPosition(D.target.matrixWorld),H.direction.sub(r),H.direction.transformDirection(f),g++}else if(D.isRectAreaLight){let H=s.rectArea[x];H.position.setFromMatrixPosition(D.matrixWorld),H.position.applyMatrix4(f),a.identity(),o.copy(D.matrixWorld),o.premultiply(f),a.extractRotation(o),H.halfWidth.set(D.width*.5,0,0),H.halfHeight.set(0,D.height*.5,0),H.halfWidth.applyMatrix4(a),H.halfHeight.applyMatrix4(a),x++}else if(D.isPointLight){let H=s.point[p];H.position.setFromMatrixPosition(D.matrixWorld),H.position.applyMatrix4(f),p++}else if(D.isHemisphereLight){let H=s.hemi[m];H.direction.setFromMatrixPosition(D.matrixWorld),H.direction.transformDirection(f),m++}}}return{setup:c,setupView:l,state:s}}function Xc(i,e){let t=new Om(i,e),n=[],s=[];function r(){n.length=0,s.length=0}function o(u){n.push(u)}function a(u){s.push(u)}function c(u){t.setup(n,u)}function l(u){t.setupView(n,u)}return{init:r,state:{lightsArray:n,shadowsArray:s,lights:t},setupLights:c,setupLightsView:l,pushLight:o,pushShadow:a}}function Bm(i,e){let t=new WeakMap;function n(r,o=0){let a=t.get(r),c;return a===void 0?(c=new Xc(i,e),t.set(r,[c])):o>=a.length?(c=new Xc(i,e),a.push(c)):c=a[o],c}function s(){t=new WeakMap}return{get:n,dispose:s}}var Aa=class extends Pn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Lh,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},Ra=class extends Pn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}},zm=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,km=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function Hm(i,e,t){let n=new Ki,s=new Re,r=new Re,o=new yt,a=new Aa({depthPacking:Ih}),c=new Ra,l={},h=t.maxTextureSize,u={[Cn]:Pt,[Pt]:Cn,[Yt]:Yt},d=new _n({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Re},radius:{value:4}},vertexShader:zm,fragmentShader:km}),p=d.clone();p.defines.HORIZONTAL_PASS=1;let g=new Lt;g.setAttribute("position",new Vt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let x=new nt(g,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=tl;let f=this.type;this.render=function(N,b,z){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||N.length===0)return;let _=i.getRenderTarget(),M=i.getActiveCubeFace(),X=i.getActiveMipmapLevel(),ee=i.state;ee.setBlending(Tn),ee.buffers.color.setClear(1,1,1,1),ee.buffers.depth.setTest(!0),ee.setScissorTest(!1);let le=f!==fn&&this.type===fn,P=f===fn&&this.type!==fn;for(let q=0,ne=N.length;q<ne;q++){let C=N[q],A=C.shadow;if(A===void 0){console.warn("THREE.WebGLShadowMap:",C,"has no shadow.");continue}if(A.autoUpdate===!1&&A.needsUpdate===!1)continue;s.copy(A.mapSize);let F=A.getFrameExtents();if(s.multiply(F),r.copy(A.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/F.x),s.x=r.x*F.x,A.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/F.y),s.y=r.y*F.y,A.mapSize.y=r.y)),A.map===null||le===!0||P===!0){let Y=this.type!==fn?{minFilter:Rt,magFilter:Rt}:{};A.map!==null&&A.map.dispose(),A.map=new gn(s.x,s.y,Y),A.map.texture.name=C.name+".shadowMap",A.camera.updateProjectionMatrix()}i.setRenderTarget(A.map),i.clear();let J=A.getViewportCount();for(let Y=0;Y<J;Y++){let j=A.getViewport(Y);o.set(r.x*j.x,r.y*j.y,r.x*j.z,r.y*j.w),ee.viewport(o),A.updateMatrices(C,Y),n=A.getFrustum(),D(b,z,A.camera,C,this.type)}A.isPointLightShadow!==!0&&this.type===fn&&T(A,z),A.needsUpdate=!1}f=this.type,m.needsUpdate=!1,i.setRenderTarget(_,M,X)};function T(N,b){let z=e.update(x);d.defines.VSM_SAMPLES!==N.blurSamples&&(d.defines.VSM_SAMPLES=N.blurSamples,p.defines.VSM_SAMPLES=N.blurSamples,d.needsUpdate=!0,p.needsUpdate=!0),N.mapPass===null&&(N.mapPass=new gn(s.x,s.y)),d.uniforms.shadow_pass.value=N.map.texture,d.uniforms.resolution.value=N.mapSize,d.uniforms.radius.value=N.radius,i.setRenderTarget(N.mapPass),i.clear(),i.renderBufferDirect(b,null,z,d,x,null),p.uniforms.shadow_pass.value=N.mapPass.texture,p.uniforms.resolution.value=N.mapSize,p.uniforms.radius.value=N.radius,i.setRenderTarget(N.map),i.clear(),i.renderBufferDirect(b,null,z,p,x,null)}function v(N,b,z,_){let M=null,X=z.isPointLight===!0?N.customDistanceMaterial:N.customDepthMaterial;if(X!==void 0)M=X;else if(M=z.isPointLight===!0?c:a,i.localClippingEnabled&&b.clipShadows===!0&&Array.isArray(b.clippingPlanes)&&b.clippingPlanes.length!==0||b.displacementMap&&b.displacementScale!==0||b.alphaMap&&b.alphaTest>0||b.map&&b.alphaTest>0){let ee=M.uuid,le=b.uuid,P=l[ee];P===void 0&&(P={},l[ee]=P);let q=P[le];q===void 0&&(q=M.clone(),P[le]=q,b.addEventListener("dispose",H)),M=q}if(M.visible=b.visible,M.wireframe=b.wireframe,_===fn?M.side=b.shadowSide!==null?b.shadowSide:b.side:M.side=b.shadowSide!==null?b.shadowSide:u[b.side],M.alphaMap=b.alphaMap,M.alphaTest=b.alphaTest,M.map=b.map,M.clipShadows=b.clipShadows,M.clippingPlanes=b.clippingPlanes,M.clipIntersection=b.clipIntersection,M.displacementMap=b.displacementMap,M.displacementScale=b.displacementScale,M.displacementBias=b.displacementBias,M.wireframeLinewidth=b.wireframeLinewidth,M.linewidth=b.linewidth,z.isPointLight===!0&&M.isMeshDistanceMaterial===!0){let ee=i.properties.get(M);ee.light=z}return M}function D(N,b,z,_,M){if(N.visible===!1)return;if(N.layers.test(b.layers)&&(N.isMesh||N.isLine||N.isPoints)&&(N.castShadow||N.receiveShadow&&M===fn)&&(!N.frustumCulled||n.intersectsObject(N))){N.modelViewMatrix.multiplyMatrices(z.matrixWorldInverse,N.matrixWorld);let le=e.update(N),P=N.material;if(Array.isArray(P)){let q=le.groups;for(let ne=0,C=q.length;ne<C;ne++){let A=q[ne],F=P[A.materialIndex];if(F&&F.visible){let J=v(N,F,_,M);N.onBeforeShadow(i,N,b,z,le,J,A),i.renderBufferDirect(z,null,le,J,N,A),N.onAfterShadow(i,N,b,z,le,J,A)}}}else if(P.visible){let q=v(N,P,_,M);N.onBeforeShadow(i,N,b,z,le,q,null),i.renderBufferDirect(z,null,le,q,N,null),N.onAfterShadow(i,N,b,z,le,q,null)}}let ee=N.children;for(let le=0,P=ee.length;le<P;le++)D(ee[le],b,z,_,M)}function H(N){N.target.removeEventListener("dispose",H);for(let z in l){let _=l[z],M=N.target.uuid;M in _&&(_[M].dispose(),delete _[M])}}}function Vm(i,e,t){let n=t.isWebGL2;function s(){let O=!1,xe=new yt,ye=null,Ne=new yt(0,0,0,0);return{setMask:function(Le){ye!==Le&&!O&&(i.colorMask(Le,Le,Le,Le),ye=Le)},setLocked:function(Le){O=Le},setClear:function(Le,Je,Ke,mt,Et){Et===!0&&(Le*=mt,Je*=mt,Ke*=mt),xe.set(Le,Je,Ke,mt),Ne.equals(xe)===!1&&(i.clearColor(Le,Je,Ke,mt),Ne.copy(xe))},reset:function(){O=!1,ye=null,Ne.set(-1,0,0,0)}}}function r(){let O=!1,xe=null,ye=null,Ne=null;return{setTest:function(Le){Le?G(i.DEPTH_TEST):te(i.DEPTH_TEST)},setMask:function(Le){xe!==Le&&!O&&(i.depthMask(Le),xe=Le)},setFunc:function(Le){if(ye!==Le){switch(Le){case oh:i.depthFunc(i.NEVER);break;case ch:i.depthFunc(i.ALWAYS);break;case lh:i.depthFunc(i.LESS);break;case Ds:i.depthFunc(i.LEQUAL);break;case hh:i.depthFunc(i.EQUAL);break;case uh:i.depthFunc(i.GEQUAL);break;case dh:i.depthFunc(i.GREATER);break;case fh:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}ye=Le}},setLocked:function(Le){O=Le},setClear:function(Le){Ne!==Le&&(i.clearDepth(Le),Ne=Le)},reset:function(){O=!1,xe=null,ye=null,Ne=null}}}function o(){let O=!1,xe=null,ye=null,Ne=null,Le=null,Je=null,Ke=null,mt=null,Et=null;return{setTest:function(et){O||(et?G(i.STENCIL_TEST):te(i.STENCIL_TEST))},setMask:function(et){xe!==et&&!O&&(i.stencilMask(et),xe=et)},setFunc:function(et,wt,tn){(ye!==et||Ne!==wt||Le!==tn)&&(i.stencilFunc(et,wt,tn),ye=et,Ne=wt,Le=tn)},setOp:function(et,wt,tn){(Je!==et||Ke!==wt||mt!==tn)&&(i.stencilOp(et,wt,tn),Je=et,Ke=wt,mt=tn)},setLocked:function(et){O=et},setClear:function(et){Et!==et&&(i.clearStencil(et),Et=et)},reset:function(){O=!1,xe=null,ye=null,Ne=null,Le=null,Je=null,Ke=null,mt=null,Et=null}}}let a=new s,c=new r,l=new o,h=new WeakMap,u=new WeakMap,d={},p={},g=new WeakMap,x=[],m=null,f=!1,T=null,v=null,D=null,H=null,N=null,b=null,z=null,_=new Oe(0,0,0),M=0,X=!1,ee=null,le=null,P=null,q=null,ne=null,C=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),A=!1,F=0,J=i.getParameter(i.VERSION);J.indexOf("WebGL")!==-1?(F=parseFloat(/^WebGL (\d)/.exec(J)[1]),A=F>=1):J.indexOf("OpenGL ES")!==-1&&(F=parseFloat(/^OpenGL ES (\d)/.exec(J)[1]),A=F>=2);let Y=null,j={},k=i.getParameter(i.SCISSOR_BOX),w=i.getParameter(i.VIEWPORT),R=new yt().fromArray(k),U=new yt().fromArray(w);function V(O,xe,ye,Ne){let Le=new Uint8Array(4),Je=i.createTexture();i.bindTexture(O,Je),i.texParameteri(O,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(O,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Ke=0;Ke<ye;Ke++)n&&(O===i.TEXTURE_3D||O===i.TEXTURE_2D_ARRAY)?i.texImage3D(xe,0,i.RGBA,1,1,Ne,0,i.RGBA,i.UNSIGNED_BYTE,Le):i.texImage2D(xe+Ke,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,Le);return Je}let Z={};Z[i.TEXTURE_2D]=V(i.TEXTURE_2D,i.TEXTURE_2D,1),Z[i.TEXTURE_CUBE_MAP]=V(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),n&&(Z[i.TEXTURE_2D_ARRAY]=V(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Z[i.TEXTURE_3D]=V(i.TEXTURE_3D,i.TEXTURE_3D,1,1)),a.setClear(0,0,0,1),c.setClear(1),l.setClear(0),G(i.DEPTH_TEST),c.setFunc(Ds),ge(!1),S(Eo),G(i.CULL_FACE),$(Tn);function G(O){d[O]!==!0&&(i.enable(O),d[O]=!0)}function te(O){d[O]!==!1&&(i.disable(O),d[O]=!1)}function ae(O,xe){return p[O]!==xe?(i.bindFramebuffer(O,xe),p[O]=xe,n&&(O===i.DRAW_FRAMEBUFFER&&(p[i.FRAMEBUFFER]=xe),O===i.FRAMEBUFFER&&(p[i.DRAW_FRAMEBUFFER]=xe)),!0):!1}function L(O,xe){let ye=x,Ne=!1;if(O)if(ye=g.get(xe),ye===void 0&&(ye=[],g.set(xe,ye)),O.isWebGLMultipleRenderTargets){let Le=O.texture;if(ye.length!==Le.length||ye[0]!==i.COLOR_ATTACHMENT0){for(let Je=0,Ke=Le.length;Je<Ke;Je++)ye[Je]=i.COLOR_ATTACHMENT0+Je;ye.length=Le.length,Ne=!0}}else ye[0]!==i.COLOR_ATTACHMENT0&&(ye[0]=i.COLOR_ATTACHMENT0,Ne=!0);else ye[0]!==i.BACK&&(ye[0]=i.BACK,Ne=!0);Ne&&(t.isWebGL2?i.drawBuffers(ye):e.get("WEBGL_draw_buffers").drawBuffersWEBGL(ye))}function oe(O){return m!==O?(i.useProgram(O),m=O,!0):!1}let Q={[Gn]:i.FUNC_ADD,[ql]:i.FUNC_SUBTRACT,[Yl]:i.FUNC_REVERSE_SUBTRACT};if(n)Q[Ro]=i.MIN,Q[Co]=i.MAX;else{let O=e.get("EXT_blend_minmax");O!==null&&(Q[Ro]=O.MIN_EXT,Q[Co]=O.MAX_EXT)}let ce={[Zl]:i.ZERO,[$l]:i.ONE,[Jl]:i.SRC_COLOR,[la]:i.SRC_ALPHA,[nh]:i.SRC_ALPHA_SATURATE,[eh]:i.DST_COLOR,[jl]:i.DST_ALPHA,[Kl]:i.ONE_MINUS_SRC_COLOR,[ha]:i.ONE_MINUS_SRC_ALPHA,[th]:i.ONE_MINUS_DST_COLOR,[Ql]:i.ONE_MINUS_DST_ALPHA,[ih]:i.CONSTANT_COLOR,[sh]:i.ONE_MINUS_CONSTANT_COLOR,[rh]:i.CONSTANT_ALPHA,[ah]:i.ONE_MINUS_CONSTANT_ALPHA};function $(O,xe,ye,Ne,Le,Je,Ke,mt,Et,et){if(O===Tn){f===!0&&(te(i.BLEND),f=!1);return}if(f===!1&&(G(i.BLEND),f=!0),O!==Xl){if(O!==T||et!==X){if((v!==Gn||N!==Gn)&&(i.blendEquation(i.FUNC_ADD),v=Gn,N=Gn),et)switch(O){case Mi:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case wo:i.blendFunc(i.ONE,i.ONE);break;case To:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Ao:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",O);break}else switch(O){case Mi:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case wo:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case To:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Ao:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",O);break}D=null,H=null,b=null,z=null,_.set(0,0,0),M=0,T=O,X=et}return}Le=Le||xe,Je=Je||ye,Ke=Ke||Ne,(xe!==v||Le!==N)&&(i.blendEquationSeparate(Q[xe],Q[Le]),v=xe,N=Le),(ye!==D||Ne!==H||Je!==b||Ke!==z)&&(i.blendFuncSeparate(ce[ye],ce[Ne],ce[Je],ce[Ke]),D=ye,H=Ne,b=Je,z=Ke),(mt.equals(_)===!1||Et!==M)&&(i.blendColor(mt.r,mt.g,mt.b,Et),_.copy(mt),M=Et),T=O,X=!1}function fe(O,xe){O.side===Yt?te(i.CULL_FACE):G(i.CULL_FACE);let ye=O.side===Pt;xe&&(ye=!ye),ge(ye),O.blending===Mi&&O.transparent===!1?$(Tn):$(O.blending,O.blendEquation,O.blendSrc,O.blendDst,O.blendEquationAlpha,O.blendSrcAlpha,O.blendDstAlpha,O.blendColor,O.blendAlpha,O.premultipliedAlpha),c.setFunc(O.depthFunc),c.setTest(O.depthTest),c.setMask(O.depthWrite),a.setMask(O.colorWrite);let Ne=O.stencilWrite;l.setTest(Ne),Ne&&(l.setMask(O.stencilWriteMask),l.setFunc(O.stencilFunc,O.stencilRef,O.stencilFuncMask),l.setOp(O.stencilFail,O.stencilZFail,O.stencilZPass)),W(O.polygonOffset,O.polygonOffsetFactor,O.polygonOffsetUnits),O.alphaToCoverage===!0?G(i.SAMPLE_ALPHA_TO_COVERAGE):te(i.SAMPLE_ALPHA_TO_COVERAGE)}function ge(O){ee!==O&&(O?i.frontFace(i.CW):i.frontFace(i.CCW),ee=O)}function S(O){O!==Gl?(G(i.CULL_FACE),O!==le&&(O===Eo?i.cullFace(i.BACK):O===Wl?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):te(i.CULL_FACE),le=O}function y(O){O!==P&&(A&&i.lineWidth(O),P=O)}function W(O,xe,ye){O?(G(i.POLYGON_OFFSET_FILL),(q!==xe||ne!==ye)&&(i.polygonOffset(xe,ye),q=xe,ne=ye)):te(i.POLYGON_OFFSET_FILL)}function he(O){O?G(i.SCISSOR_TEST):te(i.SCISSOR_TEST)}function ue(O){O===void 0&&(O=i.TEXTURE0+C-1),Y!==O&&(i.activeTexture(O),Y=O)}function pe(O,xe,ye){ye===void 0&&(Y===null?ye=i.TEXTURE0+C-1:ye=Y);let Ne=j[ye];Ne===void 0&&(Ne={type:void 0,texture:void 0},j[ye]=Ne),(Ne.type!==O||Ne.texture!==xe)&&(Y!==ye&&(i.activeTexture(ye),Y=ye),i.bindTexture(O,xe||Z[O]),Ne.type=O,Ne.texture=xe)}function Te(){let O=j[Y];O!==void 0&&O.type!==void 0&&(i.bindTexture(O.type,null),O.type=void 0,O.texture=void 0)}function ve(){try{i.compressedTexImage2D.apply(i,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function Ee(){try{i.compressedTexImage3D.apply(i,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function Pe(){try{i.texSubImage2D.apply(i,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function Fe(){try{i.texSubImage3D.apply(i,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function de(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function ze(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function I(){try{i.texStorage2D.apply(i,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function me(){try{i.texStorage3D.apply(i,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function Se(){try{i.texImage2D.apply(i,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function _e(){try{i.texImage3D.apply(i,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function Ce(O){R.equals(O)===!1&&(i.scissor(O.x,O.y,O.z,O.w),R.copy(O))}function Xe(O){U.equals(O)===!1&&(i.viewport(O.x,O.y,O.z,O.w),U.copy(O))}function $e(O,xe){let ye=u.get(xe);ye===void 0&&(ye=new WeakMap,u.set(xe,ye));let Ne=ye.get(O);Ne===void 0&&(Ne=i.getUniformBlockIndex(xe,O.name),ye.set(O,Ne))}function Ge(O,xe){let Ne=u.get(xe).get(O);h.get(xe)!==Ne&&(i.uniformBlockBinding(xe,Ne,O.__bindingPointIndex),h.set(xe,Ne))}function Me(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),n===!0&&(i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null)),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),d={},Y=null,j={},p={},g=new WeakMap,x=[],m=null,f=!1,T=null,v=null,D=null,H=null,N=null,b=null,z=null,_=new Oe(0,0,0),M=0,X=!1,ee=null,le=null,P=null,q=null,ne=null,R.set(0,0,i.canvas.width,i.canvas.height),U.set(0,0,i.canvas.width,i.canvas.height),a.reset(),c.reset(),l.reset()}return{buffers:{color:a,depth:c,stencil:l},enable:G,disable:te,bindFramebuffer:ae,drawBuffers:L,useProgram:oe,setBlending:$,setMaterial:fe,setFlipSided:ge,setCullFace:S,setLineWidth:y,setPolygonOffset:W,setScissorTest:he,activeTexture:ue,bindTexture:pe,unbindTexture:Te,compressedTexImage2D:ve,compressedTexImage3D:Ee,texImage2D:Se,texImage3D:_e,updateUBOMapping:$e,uniformBlockBinding:Ge,texStorage2D:I,texStorage3D:me,texSubImage2D:Pe,texSubImage3D:Fe,compressedTexSubImage2D:de,compressedTexSubImage3D:ze,scissor:Ce,viewport:Xe,reset:Me}}function Gm(i,e,t,n,s,r,o){let a=s.isWebGL2,c=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),h=new WeakMap,u,d=new WeakMap,p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(S,y){return p?new OffscreenCanvas(S,y):Hs("canvas")}function x(S,y,W,he){let ue=1;if((S.width>he||S.height>he)&&(ue=he/Math.max(S.width,S.height)),ue<1||y===!0)if(typeof HTMLImageElement<"u"&&S instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&S instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&S instanceof ImageBitmap){let pe=y?ks:Math.floor,Te=pe(ue*S.width),ve=pe(ue*S.height);u===void 0&&(u=g(Te,ve));let Ee=W?g(Te,ve):u;return Ee.width=Te,Ee.height=ve,Ee.getContext("2d").drawImage(S,0,0,Te,ve),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+S.width+"x"+S.height+") to ("+Te+"x"+ve+")."),Ee}else return"data"in S&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+S.width+"x"+S.height+")."),S;return S}function m(S){return ga(S.width)&&ga(S.height)}function f(S){return a?!1:S.wrapS!==Zt||S.wrapT!==Zt||S.minFilter!==Rt&&S.minFilter!==zt}function T(S,y){return S.generateMipmaps&&y&&S.minFilter!==Rt&&S.minFilter!==zt}function v(S){i.generateMipmap(S)}function D(S,y,W,he,ue=!1){if(a===!1)return y;if(S!==null){if(i[S]!==void 0)return i[S];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+S+"'")}let pe=y;if(y===i.RED&&(W===i.FLOAT&&(pe=i.R32F),W===i.HALF_FLOAT&&(pe=i.R16F),W===i.UNSIGNED_BYTE&&(pe=i.R8)),y===i.RED_INTEGER&&(W===i.UNSIGNED_BYTE&&(pe=i.R8UI),W===i.UNSIGNED_SHORT&&(pe=i.R16UI),W===i.UNSIGNED_INT&&(pe=i.R32UI),W===i.BYTE&&(pe=i.R8I),W===i.SHORT&&(pe=i.R16I),W===i.INT&&(pe=i.R32I)),y===i.RG&&(W===i.FLOAT&&(pe=i.RG32F),W===i.HALF_FLOAT&&(pe=i.RG16F),W===i.UNSIGNED_BYTE&&(pe=i.RG8)),y===i.RGBA){let Te=ue?Fs:je.getTransfer(he);W===i.FLOAT&&(pe=i.RGBA32F),W===i.HALF_FLOAT&&(pe=i.RGBA16F),W===i.UNSIGNED_BYTE&&(pe=Te===tt?i.SRGB8_ALPHA8:i.RGBA8),W===i.UNSIGNED_SHORT_4_4_4_4&&(pe=i.RGBA4),W===i.UNSIGNED_SHORT_5_5_5_1&&(pe=i.RGB5_A1)}return(pe===i.R16F||pe===i.R32F||pe===i.RG16F||pe===i.RG32F||pe===i.RGBA16F||pe===i.RGBA32F)&&e.get("EXT_color_buffer_float"),pe}function H(S,y,W){return T(S,W)===!0||S.isFramebufferTexture&&S.minFilter!==Rt&&S.minFilter!==zt?Math.log2(Math.max(y.width,y.height))+1:S.mipmaps!==void 0&&S.mipmaps.length>0?S.mipmaps.length:S.isCompressedTexture&&Array.isArray(S.image)?y.mipmaps.length:1}function N(S){return S===Rt||S===Po||S===Rr?i.NEAREST:i.LINEAR}function b(S){let y=S.target;y.removeEventListener("dispose",b),_(y),y.isVideoTexture&&h.delete(y)}function z(S){let y=S.target;y.removeEventListener("dispose",z),X(y)}function _(S){let y=n.get(S);if(y.__webglInit===void 0)return;let W=S.source,he=d.get(W);if(he){let ue=he[y.__cacheKey];ue.usedTimes--,ue.usedTimes===0&&M(S),Object.keys(he).length===0&&d.delete(W)}n.remove(S)}function M(S){let y=n.get(S);i.deleteTexture(y.__webglTexture);let W=S.source,he=d.get(W);delete he[y.__cacheKey],o.memory.textures--}function X(S){let y=S.texture,W=n.get(S),he=n.get(y);if(he.__webglTexture!==void 0&&(i.deleteTexture(he.__webglTexture),o.memory.textures--),S.depthTexture&&S.depthTexture.dispose(),S.isWebGLCubeRenderTarget)for(let ue=0;ue<6;ue++){if(Array.isArray(W.__webglFramebuffer[ue]))for(let pe=0;pe<W.__webglFramebuffer[ue].length;pe++)i.deleteFramebuffer(W.__webglFramebuffer[ue][pe]);else i.deleteFramebuffer(W.__webglFramebuffer[ue]);W.__webglDepthbuffer&&i.deleteRenderbuffer(W.__webglDepthbuffer[ue])}else{if(Array.isArray(W.__webglFramebuffer))for(let ue=0;ue<W.__webglFramebuffer.length;ue++)i.deleteFramebuffer(W.__webglFramebuffer[ue]);else i.deleteFramebuffer(W.__webglFramebuffer);if(W.__webglDepthbuffer&&i.deleteRenderbuffer(W.__webglDepthbuffer),W.__webglMultisampledFramebuffer&&i.deleteFramebuffer(W.__webglMultisampledFramebuffer),W.__webglColorRenderbuffer)for(let ue=0;ue<W.__webglColorRenderbuffer.length;ue++)W.__webglColorRenderbuffer[ue]&&i.deleteRenderbuffer(W.__webglColorRenderbuffer[ue]);W.__webglDepthRenderbuffer&&i.deleteRenderbuffer(W.__webglDepthRenderbuffer)}if(S.isWebGLMultipleRenderTargets)for(let ue=0,pe=y.length;ue<pe;ue++){let Te=n.get(y[ue]);Te.__webglTexture&&(i.deleteTexture(Te.__webglTexture),o.memory.textures--),n.remove(y[ue])}n.remove(y),n.remove(S)}let ee=0;function le(){ee=0}function P(){let S=ee;return S>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+S+" texture units while this GPU supports only "+s.maxTextures),ee+=1,S}function q(S){let y=[];return y.push(S.wrapS),y.push(S.wrapT),y.push(S.wrapR||0),y.push(S.magFilter),y.push(S.minFilter),y.push(S.anisotropy),y.push(S.internalFormat),y.push(S.format),y.push(S.type),y.push(S.generateMipmaps),y.push(S.premultiplyAlpha),y.push(S.flipY),y.push(S.unpackAlignment),y.push(S.colorSpace),y.join()}function ne(S,y){let W=n.get(S);if(S.isVideoTexture&&fe(S),S.isRenderTargetTexture===!1&&S.version>0&&W.__version!==S.version){let he=S.image;if(he===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(he.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{R(W,S,y);return}}t.bindTexture(i.TEXTURE_2D,W.__webglTexture,i.TEXTURE0+y)}function C(S,y){let W=n.get(S);if(S.version>0&&W.__version!==S.version){R(W,S,y);return}t.bindTexture(i.TEXTURE_2D_ARRAY,W.__webglTexture,i.TEXTURE0+y)}function A(S,y){let W=n.get(S);if(S.version>0&&W.__version!==S.version){R(W,S,y);return}t.bindTexture(i.TEXTURE_3D,W.__webglTexture,i.TEXTURE0+y)}function F(S,y){let W=n.get(S);if(S.version>0&&W.__version!==S.version){U(W,S,y);return}t.bindTexture(i.TEXTURE_CUBE_MAP,W.__webglTexture,i.TEXTURE0+y)}let J={[fa]:i.REPEAT,[Zt]:i.CLAMP_TO_EDGE,[pa]:i.MIRRORED_REPEAT},Y={[Rt]:i.NEAREST,[Po]:i.NEAREST_MIPMAP_NEAREST,[Rr]:i.NEAREST_MIPMAP_LINEAR,[zt]:i.LINEAR,[Sh]:i.LINEAR_MIPMAP_NEAREST,[Zi]:i.LINEAR_MIPMAP_LINEAR},j={[Nh]:i.NEVER,[kh]:i.ALWAYS,[Uh]:i.LESS,[fl]:i.LEQUAL,[Fh]:i.EQUAL,[zh]:i.GEQUAL,[Oh]:i.GREATER,[Bh]:i.NOTEQUAL};function k(S,y,W){if(W?(i.texParameteri(S,i.TEXTURE_WRAP_S,J[y.wrapS]),i.texParameteri(S,i.TEXTURE_WRAP_T,J[y.wrapT]),(S===i.TEXTURE_3D||S===i.TEXTURE_2D_ARRAY)&&i.texParameteri(S,i.TEXTURE_WRAP_R,J[y.wrapR]),i.texParameteri(S,i.TEXTURE_MAG_FILTER,Y[y.magFilter]),i.texParameteri(S,i.TEXTURE_MIN_FILTER,Y[y.minFilter])):(i.texParameteri(S,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(S,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE),(S===i.TEXTURE_3D||S===i.TEXTURE_2D_ARRAY)&&i.texParameteri(S,i.TEXTURE_WRAP_R,i.CLAMP_TO_EDGE),(y.wrapS!==Zt||y.wrapT!==Zt)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),i.texParameteri(S,i.TEXTURE_MAG_FILTER,N(y.magFilter)),i.texParameteri(S,i.TEXTURE_MIN_FILTER,N(y.minFilter)),y.minFilter!==Rt&&y.minFilter!==zt&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),y.compareFunction&&(i.texParameteri(S,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(S,i.TEXTURE_COMPARE_FUNC,j[y.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){let he=e.get("EXT_texture_filter_anisotropic");if(y.magFilter===Rt||y.minFilter!==Rr&&y.minFilter!==Zi||y.type===wn&&e.has("OES_texture_float_linear")===!1||a===!1&&y.type===$i&&e.has("OES_texture_half_float_linear")===!1)return;(y.anisotropy>1||n.get(y).__currentAnisotropy)&&(i.texParameterf(S,he.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(y.anisotropy,s.getMaxAnisotropy())),n.get(y).__currentAnisotropy=y.anisotropy)}}function w(S,y){let W=!1;S.__webglInit===void 0&&(S.__webglInit=!0,y.addEventListener("dispose",b));let he=y.source,ue=d.get(he);ue===void 0&&(ue={},d.set(he,ue));let pe=q(y);if(pe!==S.__cacheKey){ue[pe]===void 0&&(ue[pe]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,W=!0),ue[pe].usedTimes++;let Te=ue[S.__cacheKey];Te!==void 0&&(ue[S.__cacheKey].usedTimes--,Te.usedTimes===0&&M(y)),S.__cacheKey=pe,S.__webglTexture=ue[pe].texture}return W}function R(S,y,W){let he=i.TEXTURE_2D;(y.isDataArrayTexture||y.isCompressedArrayTexture)&&(he=i.TEXTURE_2D_ARRAY),y.isData3DTexture&&(he=i.TEXTURE_3D);let ue=w(S,y),pe=y.source;t.bindTexture(he,S.__webglTexture,i.TEXTURE0+W);let Te=n.get(pe);if(pe.version!==Te.__version||ue===!0){t.activeTexture(i.TEXTURE0+W);let ve=je.getPrimaries(je.workingColorSpace),Ee=y.colorSpace===kt?null:je.getPrimaries(y.colorSpace),Pe=y.colorSpace===kt||ve===Ee?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,y.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,y.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Pe);let Fe=f(y)&&m(y.image)===!1,de=x(y.image,Fe,!1,s.maxTextureSize);de=ge(y,de);let ze=m(de)||a,I=r.convert(y.format,y.colorSpace),me=r.convert(y.type),Se=D(y.internalFormat,I,me,y.colorSpace,y.isVideoTexture);k(he,y,ze);let _e,Ce=y.mipmaps,Xe=a&&y.isVideoTexture!==!0&&Se!==hl,$e=Te.__version===void 0||ue===!0,Ge=H(y,de,ze);if(y.isDepthTexture)Se=i.DEPTH_COMPONENT,a?y.type===wn?Se=i.DEPTH_COMPONENT32F:y.type===En?Se=i.DEPTH_COMPONENT24:y.type===Xn?Se=i.DEPTH24_STENCIL8:Se=i.DEPTH_COMPONENT16:y.type===wn&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),y.format===qn&&Se===i.DEPTH_COMPONENT&&y.type!==Qa&&y.type!==En&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),y.type=En,me=r.convert(y.type)),y.format===Ti&&Se===i.DEPTH_COMPONENT&&(Se=i.DEPTH_STENCIL,y.type!==Xn&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),y.type=Xn,me=r.convert(y.type))),$e&&(Xe?t.texStorage2D(i.TEXTURE_2D,1,Se,de.width,de.height):t.texImage2D(i.TEXTURE_2D,0,Se,de.width,de.height,0,I,me,null));else if(y.isDataTexture)if(Ce.length>0&&ze){Xe&&$e&&t.texStorage2D(i.TEXTURE_2D,Ge,Se,Ce[0].width,Ce[0].height);for(let Me=0,O=Ce.length;Me<O;Me++)_e=Ce[Me],Xe?t.texSubImage2D(i.TEXTURE_2D,Me,0,0,_e.width,_e.height,I,me,_e.data):t.texImage2D(i.TEXTURE_2D,Me,Se,_e.width,_e.height,0,I,me,_e.data);y.generateMipmaps=!1}else Xe?($e&&t.texStorage2D(i.TEXTURE_2D,Ge,Se,de.width,de.height),t.texSubImage2D(i.TEXTURE_2D,0,0,0,de.width,de.height,I,me,de.data)):t.texImage2D(i.TEXTURE_2D,0,Se,de.width,de.height,0,I,me,de.data);else if(y.isCompressedTexture)if(y.isCompressedArrayTexture){Xe&&$e&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Ge,Se,Ce[0].width,Ce[0].height,de.depth);for(let Me=0,O=Ce.length;Me<O;Me++)_e=Ce[Me],y.format!==$t?I!==null?Xe?t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,Me,0,0,0,_e.width,_e.height,de.depth,I,_e.data,0,0):t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,Me,Se,_e.width,_e.height,de.depth,0,_e.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Xe?t.texSubImage3D(i.TEXTURE_2D_ARRAY,Me,0,0,0,_e.width,_e.height,de.depth,I,me,_e.data):t.texImage3D(i.TEXTURE_2D_ARRAY,Me,Se,_e.width,_e.height,de.depth,0,I,me,_e.data)}else{Xe&&$e&&t.texStorage2D(i.TEXTURE_2D,Ge,Se,Ce[0].width,Ce[0].height);for(let Me=0,O=Ce.length;Me<O;Me++)_e=Ce[Me],y.format!==$t?I!==null?Xe?t.compressedTexSubImage2D(i.TEXTURE_2D,Me,0,0,_e.width,_e.height,I,_e.data):t.compressedTexImage2D(i.TEXTURE_2D,Me,Se,_e.width,_e.height,0,_e.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Xe?t.texSubImage2D(i.TEXTURE_2D,Me,0,0,_e.width,_e.height,I,me,_e.data):t.texImage2D(i.TEXTURE_2D,Me,Se,_e.width,_e.height,0,I,me,_e.data)}else if(y.isDataArrayTexture)Xe?($e&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Ge,Se,de.width,de.height,de.depth),t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,de.width,de.height,de.depth,I,me,de.data)):t.texImage3D(i.TEXTURE_2D_ARRAY,0,Se,de.width,de.height,de.depth,0,I,me,de.data);else if(y.isData3DTexture)Xe?($e&&t.texStorage3D(i.TEXTURE_3D,Ge,Se,de.width,de.height,de.depth),t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,de.width,de.height,de.depth,I,me,de.data)):t.texImage3D(i.TEXTURE_3D,0,Se,de.width,de.height,de.depth,0,I,me,de.data);else if(y.isFramebufferTexture){if($e)if(Xe)t.texStorage2D(i.TEXTURE_2D,Ge,Se,de.width,de.height);else{let Me=de.width,O=de.height;for(let xe=0;xe<Ge;xe++)t.texImage2D(i.TEXTURE_2D,xe,Se,Me,O,0,I,me,null),Me>>=1,O>>=1}}else if(Ce.length>0&&ze){Xe&&$e&&t.texStorage2D(i.TEXTURE_2D,Ge,Se,Ce[0].width,Ce[0].height);for(let Me=0,O=Ce.length;Me<O;Me++)_e=Ce[Me],Xe?t.texSubImage2D(i.TEXTURE_2D,Me,0,0,I,me,_e):t.texImage2D(i.TEXTURE_2D,Me,Se,I,me,_e);y.generateMipmaps=!1}else Xe?($e&&t.texStorage2D(i.TEXTURE_2D,Ge,Se,de.width,de.height),t.texSubImage2D(i.TEXTURE_2D,0,0,0,I,me,de)):t.texImage2D(i.TEXTURE_2D,0,Se,I,me,de);T(y,ze)&&v(he),Te.__version=pe.version,y.onUpdate&&y.onUpdate(y)}S.__version=y.version}function U(S,y,W){if(y.image.length!==6)return;let he=w(S,y),ue=y.source;t.bindTexture(i.TEXTURE_CUBE_MAP,S.__webglTexture,i.TEXTURE0+W);let pe=n.get(ue);if(ue.version!==pe.__version||he===!0){t.activeTexture(i.TEXTURE0+W);let Te=je.getPrimaries(je.workingColorSpace),ve=y.colorSpace===kt?null:je.getPrimaries(y.colorSpace),Ee=y.colorSpace===kt||Te===ve?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,y.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,y.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ee);let Pe=y.isCompressedTexture||y.image[0].isCompressedTexture,Fe=y.image[0]&&y.image[0].isDataTexture,de=[];for(let Me=0;Me<6;Me++)!Pe&&!Fe?de[Me]=x(y.image[Me],!1,!0,s.maxCubemapSize):de[Me]=Fe?y.image[Me].image:y.image[Me],de[Me]=ge(y,de[Me]);let ze=de[0],I=m(ze)||a,me=r.convert(y.format,y.colorSpace),Se=r.convert(y.type),_e=D(y.internalFormat,me,Se,y.colorSpace),Ce=a&&y.isVideoTexture!==!0,Xe=pe.__version===void 0||he===!0,$e=H(y,ze,I);k(i.TEXTURE_CUBE_MAP,y,I);let Ge;if(Pe){Ce&&Xe&&t.texStorage2D(i.TEXTURE_CUBE_MAP,$e,_e,ze.width,ze.height);for(let Me=0;Me<6;Me++){Ge=de[Me].mipmaps;for(let O=0;O<Ge.length;O++){let xe=Ge[O];y.format!==$t?me!==null?Ce?t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Me,O,0,0,xe.width,xe.height,me,xe.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Me,O,_e,xe.width,xe.height,0,xe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ce?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Me,O,0,0,xe.width,xe.height,me,Se,xe.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Me,O,_e,xe.width,xe.height,0,me,Se,xe.data)}}}else{Ge=y.mipmaps,Ce&&Xe&&(Ge.length>0&&$e++,t.texStorage2D(i.TEXTURE_CUBE_MAP,$e,_e,de[0].width,de[0].height));for(let Me=0;Me<6;Me++)if(Fe){Ce?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Me,0,0,0,de[Me].width,de[Me].height,me,Se,de[Me].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Me,0,_e,de[Me].width,de[Me].height,0,me,Se,de[Me].data);for(let O=0;O<Ge.length;O++){let ye=Ge[O].image[Me].image;Ce?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Me,O+1,0,0,ye.width,ye.height,me,Se,ye.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Me,O+1,_e,ye.width,ye.height,0,me,Se,ye.data)}}else{Ce?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Me,0,0,0,me,Se,de[Me]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Me,0,_e,me,Se,de[Me]);for(let O=0;O<Ge.length;O++){let xe=Ge[O];Ce?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Me,O+1,0,0,me,Se,xe.image[Me]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Me,O+1,_e,me,Se,xe.image[Me])}}}T(y,I)&&v(i.TEXTURE_CUBE_MAP),pe.__version=ue.version,y.onUpdate&&y.onUpdate(y)}S.__version=y.version}function V(S,y,W,he,ue,pe){let Te=r.convert(W.format,W.colorSpace),ve=r.convert(W.type),Ee=D(W.internalFormat,Te,ve,W.colorSpace);if(!n.get(y).__hasExternalTextures){let Fe=Math.max(1,y.width>>pe),de=Math.max(1,y.height>>pe);ue===i.TEXTURE_3D||ue===i.TEXTURE_2D_ARRAY?t.texImage3D(ue,pe,Ee,Fe,de,y.depth,0,Te,ve,null):t.texImage2D(ue,pe,Ee,Fe,de,0,Te,ve,null)}t.bindFramebuffer(i.FRAMEBUFFER,S),$(y)?c.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,he,ue,n.get(W).__webglTexture,0,ce(y)):(ue===i.TEXTURE_2D||ue>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&ue<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,he,ue,n.get(W).__webglTexture,pe),t.bindFramebuffer(i.FRAMEBUFFER,null)}function Z(S,y,W){if(i.bindRenderbuffer(i.RENDERBUFFER,S),y.depthBuffer&&!y.stencilBuffer){let he=a===!0?i.DEPTH_COMPONENT24:i.DEPTH_COMPONENT16;if(W||$(y)){let ue=y.depthTexture;ue&&ue.isDepthTexture&&(ue.type===wn?he=i.DEPTH_COMPONENT32F:ue.type===En&&(he=i.DEPTH_COMPONENT24));let pe=ce(y);$(y)?c.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,pe,he,y.width,y.height):i.renderbufferStorageMultisample(i.RENDERBUFFER,pe,he,y.width,y.height)}else i.renderbufferStorage(i.RENDERBUFFER,he,y.width,y.height);i.framebufferRenderbuffer(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.RENDERBUFFER,S)}else if(y.depthBuffer&&y.stencilBuffer){let he=ce(y);W&&$(y)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,he,i.DEPTH24_STENCIL8,y.width,y.height):$(y)?c.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,he,i.DEPTH24_STENCIL8,y.width,y.height):i.renderbufferStorage(i.RENDERBUFFER,i.DEPTH_STENCIL,y.width,y.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.RENDERBUFFER,S)}else{let he=y.isWebGLMultipleRenderTargets===!0?y.texture:[y.texture];for(let ue=0;ue<he.length;ue++){let pe=he[ue],Te=r.convert(pe.format,pe.colorSpace),ve=r.convert(pe.type),Ee=D(pe.internalFormat,Te,ve,pe.colorSpace),Pe=ce(y);W&&$(y)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Pe,Ee,y.width,y.height):$(y)?c.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Pe,Ee,y.width,y.height):i.renderbufferStorage(i.RENDERBUFFER,Ee,y.width,y.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function G(S,y){if(y&&y.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,S),!(y.depthTexture&&y.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(y.depthTexture).__webglTexture||y.depthTexture.image.width!==y.width||y.depthTexture.image.height!==y.height)&&(y.depthTexture.image.width=y.width,y.depthTexture.image.height=y.height,y.depthTexture.needsUpdate=!0),ne(y.depthTexture,0);let he=n.get(y.depthTexture).__webglTexture,ue=ce(y);if(y.depthTexture.format===qn)$(y)?c.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,he,0,ue):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,he,0);else if(y.depthTexture.format===Ti)$(y)?c.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,he,0,ue):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,he,0);else throw new Error("Unknown depthTexture format")}function te(S){let y=n.get(S),W=S.isWebGLCubeRenderTarget===!0;if(S.depthTexture&&!y.__autoAllocateDepthBuffer){if(W)throw new Error("target.depthTexture not supported in Cube render targets");G(y.__webglFramebuffer,S)}else if(W){y.__webglDepthbuffer=[];for(let he=0;he<6;he++)t.bindFramebuffer(i.FRAMEBUFFER,y.__webglFramebuffer[he]),y.__webglDepthbuffer[he]=i.createRenderbuffer(),Z(y.__webglDepthbuffer[he],S,!1)}else t.bindFramebuffer(i.FRAMEBUFFER,y.__webglFramebuffer),y.__webglDepthbuffer=i.createRenderbuffer(),Z(y.__webglDepthbuffer,S,!1);t.bindFramebuffer(i.FRAMEBUFFER,null)}function ae(S,y,W){let he=n.get(S);y!==void 0&&V(he.__webglFramebuffer,S,S.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),W!==void 0&&te(S)}function L(S){let y=S.texture,W=n.get(S),he=n.get(y);S.addEventListener("dispose",z),S.isWebGLMultipleRenderTargets!==!0&&(he.__webglTexture===void 0&&(he.__webglTexture=i.createTexture()),he.__version=y.version,o.memory.textures++);let ue=S.isWebGLCubeRenderTarget===!0,pe=S.isWebGLMultipleRenderTargets===!0,Te=m(S)||a;if(ue){W.__webglFramebuffer=[];for(let ve=0;ve<6;ve++)if(a&&y.mipmaps&&y.mipmaps.length>0){W.__webglFramebuffer[ve]=[];for(let Ee=0;Ee<y.mipmaps.length;Ee++)W.__webglFramebuffer[ve][Ee]=i.createFramebuffer()}else W.__webglFramebuffer[ve]=i.createFramebuffer()}else{if(a&&y.mipmaps&&y.mipmaps.length>0){W.__webglFramebuffer=[];for(let ve=0;ve<y.mipmaps.length;ve++)W.__webglFramebuffer[ve]=i.createFramebuffer()}else W.__webglFramebuffer=i.createFramebuffer();if(pe)if(s.drawBuffers){let ve=S.texture;for(let Ee=0,Pe=ve.length;Ee<Pe;Ee++){let Fe=n.get(ve[Ee]);Fe.__webglTexture===void 0&&(Fe.__webglTexture=i.createTexture(),o.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(a&&S.samples>0&&$(S)===!1){let ve=pe?y:[y];W.__webglMultisampledFramebuffer=i.createFramebuffer(),W.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,W.__webglMultisampledFramebuffer);for(let Ee=0;Ee<ve.length;Ee++){let Pe=ve[Ee];W.__webglColorRenderbuffer[Ee]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,W.__webglColorRenderbuffer[Ee]);let Fe=r.convert(Pe.format,Pe.colorSpace),de=r.convert(Pe.type),ze=D(Pe.internalFormat,Fe,de,Pe.colorSpace,S.isXRRenderTarget===!0),I=ce(S);i.renderbufferStorageMultisample(i.RENDERBUFFER,I,ze,S.width,S.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ee,i.RENDERBUFFER,W.__webglColorRenderbuffer[Ee])}i.bindRenderbuffer(i.RENDERBUFFER,null),S.depthBuffer&&(W.__webglDepthRenderbuffer=i.createRenderbuffer(),Z(W.__webglDepthRenderbuffer,S,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(ue){t.bindTexture(i.TEXTURE_CUBE_MAP,he.__webglTexture),k(i.TEXTURE_CUBE_MAP,y,Te);for(let ve=0;ve<6;ve++)if(a&&y.mipmaps&&y.mipmaps.length>0)for(let Ee=0;Ee<y.mipmaps.length;Ee++)V(W.__webglFramebuffer[ve][Ee],S,y,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ve,Ee);else V(W.__webglFramebuffer[ve],S,y,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ve,0);T(y,Te)&&v(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(pe){let ve=S.texture;for(let Ee=0,Pe=ve.length;Ee<Pe;Ee++){let Fe=ve[Ee],de=n.get(Fe);t.bindTexture(i.TEXTURE_2D,de.__webglTexture),k(i.TEXTURE_2D,Fe,Te),V(W.__webglFramebuffer,S,Fe,i.COLOR_ATTACHMENT0+Ee,i.TEXTURE_2D,0),T(Fe,Te)&&v(i.TEXTURE_2D)}t.unbindTexture()}else{let ve=i.TEXTURE_2D;if((S.isWebGL3DRenderTarget||S.isWebGLArrayRenderTarget)&&(a?ve=S.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),t.bindTexture(ve,he.__webglTexture),k(ve,y,Te),a&&y.mipmaps&&y.mipmaps.length>0)for(let Ee=0;Ee<y.mipmaps.length;Ee++)V(W.__webglFramebuffer[Ee],S,y,i.COLOR_ATTACHMENT0,ve,Ee);else V(W.__webglFramebuffer,S,y,i.COLOR_ATTACHMENT0,ve,0);T(y,Te)&&v(ve),t.unbindTexture()}S.depthBuffer&&te(S)}function oe(S){let y=m(S)||a,W=S.isWebGLMultipleRenderTargets===!0?S.texture:[S.texture];for(let he=0,ue=W.length;he<ue;he++){let pe=W[he];if(T(pe,y)){let Te=S.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:i.TEXTURE_2D,ve=n.get(pe).__webglTexture;t.bindTexture(Te,ve),v(Te),t.unbindTexture()}}}function Q(S){if(a&&S.samples>0&&$(S)===!1){let y=S.isWebGLMultipleRenderTargets?S.texture:[S.texture],W=S.width,he=S.height,ue=i.COLOR_BUFFER_BIT,pe=[],Te=S.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ve=n.get(S),Ee=S.isWebGLMultipleRenderTargets===!0;if(Ee)for(let Pe=0;Pe<y.length;Pe++)t.bindFramebuffer(i.FRAMEBUFFER,ve.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Pe,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,ve.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Pe,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,ve.__webglMultisampledFramebuffer),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ve.__webglFramebuffer);for(let Pe=0;Pe<y.length;Pe++){pe.push(i.COLOR_ATTACHMENT0+Pe),S.depthBuffer&&pe.push(Te);let Fe=ve.__ignoreDepthValues!==void 0?ve.__ignoreDepthValues:!1;if(Fe===!1&&(S.depthBuffer&&(ue|=i.DEPTH_BUFFER_BIT),S.stencilBuffer&&(ue|=i.STENCIL_BUFFER_BIT)),Ee&&i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,ve.__webglColorRenderbuffer[Pe]),Fe===!0&&(i.invalidateFramebuffer(i.READ_FRAMEBUFFER,[Te]),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[Te])),Ee){let de=n.get(y[Pe]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,de,0)}i.blitFramebuffer(0,0,W,he,0,0,W,he,ue,i.NEAREST),l&&i.invalidateFramebuffer(i.READ_FRAMEBUFFER,pe)}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),Ee)for(let Pe=0;Pe<y.length;Pe++){t.bindFramebuffer(i.FRAMEBUFFER,ve.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Pe,i.RENDERBUFFER,ve.__webglColorRenderbuffer[Pe]);let Fe=n.get(y[Pe]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,ve.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Pe,i.TEXTURE_2D,Fe,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ve.__webglMultisampledFramebuffer)}}function ce(S){return Math.min(s.maxSamples,S.samples)}function $(S){let y=n.get(S);return a&&S.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&y.__useRenderToTexture!==!1}function fe(S){let y=o.render.frame;h.get(S)!==y&&(h.set(S,y),S.update())}function ge(S,y){let W=S.colorSpace,he=S.format,ue=S.type;return S.isCompressedTexture===!0||S.isVideoTexture===!0||S.format===ma||W!==mn&&W!==kt&&(je.getTransfer(W)===tt?a===!1?e.has("EXT_sRGB")===!0&&he===$t?(S.format=ma,S.minFilter=zt,S.generateMipmaps=!1):y=Vs.sRGBToLinear(y):(he!==$t||ue!==Rn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",W)),y}this.allocateTextureUnit=P,this.resetTextureUnits=le,this.setTexture2D=ne,this.setTexture2DArray=C,this.setTexture3D=A,this.setTextureCube=F,this.rebindTextures=ae,this.setupRenderTarget=L,this.updateRenderTargetMipmap=oe,this.updateMultisampleRenderTarget=Q,this.setupDepthRenderbuffer=te,this.setupFrameBufferTexture=V,this.useMultisampledRTT=$}function Wm(i,e,t){let n=t.isWebGL2;function s(r,o=kt){let a,c=je.getTransfer(o);if(r===Rn)return i.UNSIGNED_BYTE;if(r===rl)return i.UNSIGNED_SHORT_4_4_4_4;if(r===al)return i.UNSIGNED_SHORT_5_5_5_1;if(r===bh)return i.BYTE;if(r===Eh)return i.SHORT;if(r===Qa)return i.UNSIGNED_SHORT;if(r===sl)return i.INT;if(r===En)return i.UNSIGNED_INT;if(r===wn)return i.FLOAT;if(r===$i)return n?i.HALF_FLOAT:(a=e.get("OES_texture_half_float"),a!==null?a.HALF_FLOAT_OES:null);if(r===wh)return i.ALPHA;if(r===$t)return i.RGBA;if(r===Th)return i.LUMINANCE;if(r===Ah)return i.LUMINANCE_ALPHA;if(r===qn)return i.DEPTH_COMPONENT;if(r===Ti)return i.DEPTH_STENCIL;if(r===ma)return a=e.get("EXT_sRGB"),a!==null?a.SRGB_ALPHA_EXT:null;if(r===Rh)return i.RED;if(r===ol)return i.RED_INTEGER;if(r===Ch)return i.RG;if(r===cl)return i.RG_INTEGER;if(r===ll)return i.RGBA_INTEGER;if(r===Cr||r===Pr||r===Lr||r===Ir)if(c===tt)if(a=e.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(r===Cr)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(r===Pr)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(r===Lr)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(r===Ir)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=e.get("WEBGL_compressed_texture_s3tc"),a!==null){if(r===Cr)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(r===Pr)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(r===Lr)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(r===Ir)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(r===Lo||r===Io||r===Do||r===No)if(a=e.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(r===Lo)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(r===Io)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(r===Do)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(r===No)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(r===hl)return a=e.get("WEBGL_compressed_texture_etc1"),a!==null?a.COMPRESSED_RGB_ETC1_WEBGL:null;if(r===Uo||r===Fo)if(a=e.get("WEBGL_compressed_texture_etc"),a!==null){if(r===Uo)return c===tt?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(r===Fo)return c===tt?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(r===Oo||r===Bo||r===zo||r===ko||r===Ho||r===Vo||r===Go||r===Wo||r===Xo||r===qo||r===Yo||r===Zo||r===$o||r===Jo)if(a=e.get("WEBGL_compressed_texture_astc"),a!==null){if(r===Oo)return c===tt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(r===Bo)return c===tt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(r===zo)return c===tt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(r===ko)return c===tt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(r===Ho)return c===tt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(r===Vo)return c===tt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(r===Go)return c===tt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(r===Wo)return c===tt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(r===Xo)return c===tt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(r===qo)return c===tt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(r===Yo)return c===tt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(r===Zo)return c===tt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(r===$o)return c===tt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(r===Jo)return c===tt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(r===Dr||r===Ko||r===jo)if(a=e.get("EXT_texture_compression_bptc"),a!==null){if(r===Dr)return c===tt?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(r===Ko)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(r===jo)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(r===Ph||r===Qo||r===ec||r===tc)if(a=e.get("EXT_texture_compression_rgtc"),a!==null){if(r===Dr)return a.COMPRESSED_RED_RGTC1_EXT;if(r===Qo)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(r===ec)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(r===tc)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return r===Xn?n?i.UNSIGNED_INT_24_8:(a=e.get("WEBGL_depth_texture"),a!==null?a.UNSIGNED_INT_24_8_WEBGL:null):i[r]!==void 0?i[r]:null}return{convert:s}}var Ca=class extends Ct{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}},Ht=class extends vt{constructor(){super(),this.isGroup=!0,this.type="Group"}},Xm={type:"move"},Xi=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ht,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ht,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new B,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new B),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ht,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new B,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new B),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,o=null,a=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){o=!0;for(let x of e.hand.values()){let m=t.getJointPose(x,n),f=this._getHandJoint(l,x);m!==null&&(f.matrix.fromArray(m.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=m.radius),f.visible=m!==null}let h=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],d=h.position.distanceTo(u.position),p=.02,g=.005;l.inputState.pinching&&d>p+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&d<=p-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Xm)))}return a!==null&&(a.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new Ht;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},Pa=class extends sn{constructor(e,t){super();let n=this,s=null,r=1,o=null,a="local-floor",c=1,l=null,h=null,u=null,d=null,p=null,g=null,x=t.getContextAttributes(),m=null,f=null,T=[],v=[],D=new Re,H=null,N=new Ct;N.layers.enable(1),N.viewport=new yt;let b=new Ct;b.layers.enable(2),b.viewport=new yt;let z=[N,b],_=new Ca;_.layers.enable(1),_.layers.enable(2);let M=null,X=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(k){let w=T[k];return w===void 0&&(w=new Xi,T[k]=w),w.getTargetRaySpace()},this.getControllerGrip=function(k){let w=T[k];return w===void 0&&(w=new Xi,T[k]=w),w.getGripSpace()},this.getHand=function(k){let w=T[k];return w===void 0&&(w=new Xi,T[k]=w),w.getHandSpace()};function ee(k){let w=v.indexOf(k.inputSource);if(w===-1)return;let R=T[w];R!==void 0&&(R.update(k.inputSource,k.frame,l||o),R.dispatchEvent({type:k.type,data:k.inputSource}))}function le(){s.removeEventListener("select",ee),s.removeEventListener("selectstart",ee),s.removeEventListener("selectend",ee),s.removeEventListener("squeeze",ee),s.removeEventListener("squeezestart",ee),s.removeEventListener("squeezeend",ee),s.removeEventListener("end",le),s.removeEventListener("inputsourceschange",P);for(let k=0;k<T.length;k++){let w=v[k];w!==null&&(v[k]=null,T[k].disconnect(w))}M=null,X=null,e.setRenderTarget(m),p=null,d=null,u=null,s=null,f=null,j.stop(),n.isPresenting=!1,e.setPixelRatio(H),e.setSize(D.width,D.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(k){r=k,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(k){a=k,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(k){l=k},this.getBaseLayer=function(){return d!==null?d:p},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(k){if(s=k,s!==null){if(m=e.getRenderTarget(),s.addEventListener("select",ee),s.addEventListener("selectstart",ee),s.addEventListener("selectend",ee),s.addEventListener("squeeze",ee),s.addEventListener("squeezestart",ee),s.addEventListener("squeezeend",ee),s.addEventListener("end",le),s.addEventListener("inputsourceschange",P),x.xrCompatible!==!0&&await t.makeXRCompatible(),H=e.getPixelRatio(),e.getSize(D),s.renderState.layers===void 0||e.capabilities.isWebGL2===!1){let w={antialias:s.renderState.layers===void 0?x.antialias:!0,alpha:!0,depth:x.depth,stencil:x.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(s,t,w),s.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),f=new gn(p.framebufferWidth,p.framebufferHeight,{format:$t,type:Rn,colorSpace:e.outputColorSpace,stencilBuffer:x.stencil})}else{let w=null,R=null,U=null;x.depth&&(U=x.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,w=x.stencil?Ti:qn,R=x.stencil?Xn:En);let V={colorFormat:t.RGBA8,depthFormat:U,scaleFactor:r};u=new XRWebGLBinding(s,t),d=u.createProjectionLayer(V),s.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),f=new gn(d.textureWidth,d.textureHeight,{format:$t,type:Rn,depthTexture:new Qs(d.textureWidth,d.textureHeight,R,void 0,void 0,void 0,void 0,void 0,void 0,w),stencilBuffer:x.stencil,colorSpace:e.outputColorSpace,samples:x.antialias?4:0});let Z=e.properties.get(f);Z.__ignoreDepthValues=d.ignoreDepthValues}f.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await s.requestReferenceSpace(a),j.setContext(s),j.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode};function P(k){for(let w=0;w<k.removed.length;w++){let R=k.removed[w],U=v.indexOf(R);U>=0&&(v[U]=null,T[U].disconnect(R))}for(let w=0;w<k.added.length;w++){let R=k.added[w],U=v.indexOf(R);if(U===-1){for(let Z=0;Z<T.length;Z++)if(Z>=v.length){v.push(R),U=Z;break}else if(v[Z]===null){v[Z]=R,U=Z;break}if(U===-1)break}let V=T[U];V&&V.connect(R)}}let q=new B,ne=new B;function C(k,w,R){q.setFromMatrixPosition(w.matrixWorld),ne.setFromMatrixPosition(R.matrixWorld);let U=q.distanceTo(ne),V=w.projectionMatrix.elements,Z=R.projectionMatrix.elements,G=V[14]/(V[10]-1),te=V[14]/(V[10]+1),ae=(V[9]+1)/V[5],L=(V[9]-1)/V[5],oe=(V[8]-1)/V[0],Q=(Z[8]+1)/Z[0],ce=G*oe,$=G*Q,fe=U/(-oe+Q),ge=fe*-oe;w.matrixWorld.decompose(k.position,k.quaternion,k.scale),k.translateX(ge),k.translateZ(fe),k.matrixWorld.compose(k.position,k.quaternion,k.scale),k.matrixWorldInverse.copy(k.matrixWorld).invert();let S=G+fe,y=te+fe,W=ce-ge,he=$+(U-ge),ue=ae*te/y*S,pe=L*te/y*S;k.projectionMatrix.makePerspective(W,he,ue,pe,S,y),k.projectionMatrixInverse.copy(k.projectionMatrix).invert()}function A(k,w){w===null?k.matrixWorld.copy(k.matrix):k.matrixWorld.multiplyMatrices(w.matrixWorld,k.matrix),k.matrixWorldInverse.copy(k.matrixWorld).invert()}this.updateCamera=function(k){if(s===null)return;_.near=b.near=N.near=k.near,_.far=b.far=N.far=k.far,(M!==_.near||X!==_.far)&&(s.updateRenderState({depthNear:_.near,depthFar:_.far}),M=_.near,X=_.far);let w=k.parent,R=_.cameras;A(_,w);for(let U=0;U<R.length;U++)A(R[U],w);R.length===2?C(_,N,b):_.projectionMatrix.copy(N.projectionMatrix),F(k,_,w)};function F(k,w,R){R===null?k.matrix.copy(w.matrixWorld):(k.matrix.copy(R.matrixWorld),k.matrix.invert(),k.matrix.multiply(w.matrixWorld)),k.matrix.decompose(k.position,k.quaternion,k.scale),k.updateMatrixWorld(!0),k.projectionMatrix.copy(w.projectionMatrix),k.projectionMatrixInverse.copy(w.projectionMatrixInverse),k.isPerspectiveCamera&&(k.fov=Ji*2*Math.atan(1/k.projectionMatrix.elements[5]),k.zoom=1)}this.getCamera=function(){return _},this.getFoveation=function(){if(!(d===null&&p===null))return c},this.setFoveation=function(k){c=k,d!==null&&(d.fixedFoveation=k),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=k)};let J=null;function Y(k,w){if(h=w.getViewerPose(l||o),g=w,h!==null){let R=h.views;p!==null&&(e.setRenderTargetFramebuffer(f,p.framebuffer),e.setRenderTarget(f));let U=!1;R.length!==_.cameras.length&&(_.cameras.length=0,U=!0);for(let V=0;V<R.length;V++){let Z=R[V],G=null;if(p!==null)G=p.getViewport(Z);else{let ae=u.getViewSubImage(d,Z);G=ae.viewport,V===0&&(e.setRenderTargetTextures(f,ae.colorTexture,d.ignoreDepthValues?void 0:ae.depthStencilTexture),e.setRenderTarget(f))}let te=z[V];te===void 0&&(te=new Ct,te.layers.enable(V),te.viewport=new yt,z[V]=te),te.matrix.fromArray(Z.transform.matrix),te.matrix.decompose(te.position,te.quaternion,te.scale),te.projectionMatrix.fromArray(Z.projectionMatrix),te.projectionMatrixInverse.copy(te.projectionMatrix).invert(),te.viewport.set(G.x,G.y,G.width,G.height),V===0&&(_.matrix.copy(te.matrix),_.matrix.decompose(_.position,_.quaternion,_.scale)),U===!0&&_.cameras.push(te)}}for(let R=0;R<T.length;R++){let U=v[R],V=T[R];U!==null&&V!==void 0&&V.update(U,w,l||o)}J&&J(k,w),w.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:w}),g=null}let j=new _l;j.setAnimationLoop(Y),this.setAnimationLoop=function(k){J=k},this.dispose=function(){}}};function qm(i,e){function t(m,f){m.matrixAutoUpdate===!0&&m.updateMatrix(),f.value.copy(m.matrix)}function n(m,f){f.color.getRGB(m.fogColor.value,gl(i)),f.isFog?(m.fogNear.value=f.near,m.fogFar.value=f.far):f.isFogExp2&&(m.fogDensity.value=f.density)}function s(m,f,T,v,D){f.isMeshBasicMaterial||f.isMeshLambertMaterial?r(m,f):f.isMeshToonMaterial?(r(m,f),u(m,f)):f.isMeshPhongMaterial?(r(m,f),h(m,f)):f.isMeshStandardMaterial?(r(m,f),d(m,f),f.isMeshPhysicalMaterial&&p(m,f,D)):f.isMeshMatcapMaterial?(r(m,f),g(m,f)):f.isMeshDepthMaterial?r(m,f):f.isMeshDistanceMaterial?(r(m,f),x(m,f)):f.isMeshNormalMaterial?r(m,f):f.isLineBasicMaterial?(o(m,f),f.isLineDashedMaterial&&a(m,f)):f.isPointsMaterial?c(m,f,T,v):f.isSpriteMaterial?l(m,f):f.isShadowMaterial?(m.color.value.copy(f.color),m.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function r(m,f){m.opacity.value=f.opacity,f.color&&m.diffuse.value.copy(f.color),f.emissive&&m.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(m.map.value=f.map,t(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.bumpMap&&(m.bumpMap.value=f.bumpMap,t(f.bumpMap,m.bumpMapTransform),m.bumpScale.value=f.bumpScale,f.side===Pt&&(m.bumpScale.value*=-1)),f.normalMap&&(m.normalMap.value=f.normalMap,t(f.normalMap,m.normalMapTransform),m.normalScale.value.copy(f.normalScale),f.side===Pt&&m.normalScale.value.negate()),f.displacementMap&&(m.displacementMap.value=f.displacementMap,t(f.displacementMap,m.displacementMapTransform),m.displacementScale.value=f.displacementScale,m.displacementBias.value=f.displacementBias),f.emissiveMap&&(m.emissiveMap.value=f.emissiveMap,t(f.emissiveMap,m.emissiveMapTransform)),f.specularMap&&(m.specularMap.value=f.specularMap,t(f.specularMap,m.specularMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest);let T=e.get(f).envMap;if(T&&(m.envMap.value=T,m.flipEnvMap.value=T.isCubeTexture&&T.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=f.reflectivity,m.ior.value=f.ior,m.refractionRatio.value=f.refractionRatio),f.lightMap){m.lightMap.value=f.lightMap;let v=i._useLegacyLights===!0?Math.PI:1;m.lightMapIntensity.value=f.lightMapIntensity*v,t(f.lightMap,m.lightMapTransform)}f.aoMap&&(m.aoMap.value=f.aoMap,m.aoMapIntensity.value=f.aoMapIntensity,t(f.aoMap,m.aoMapTransform))}function o(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,f.map&&(m.map.value=f.map,t(f.map,m.mapTransform))}function a(m,f){m.dashSize.value=f.dashSize,m.totalSize.value=f.dashSize+f.gapSize,m.scale.value=f.scale}function c(m,f,T,v){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.size.value=f.size*T,m.scale.value=v*.5,f.map&&(m.map.value=f.map,t(f.map,m.uvTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function l(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.rotation.value=f.rotation,f.map&&(m.map.value=f.map,t(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function h(m,f){m.specular.value.copy(f.specular),m.shininess.value=Math.max(f.shininess,1e-4)}function u(m,f){f.gradientMap&&(m.gradientMap.value=f.gradientMap)}function d(m,f){m.metalness.value=f.metalness,f.metalnessMap&&(m.metalnessMap.value=f.metalnessMap,t(f.metalnessMap,m.metalnessMapTransform)),m.roughness.value=f.roughness,f.roughnessMap&&(m.roughnessMap.value=f.roughnessMap,t(f.roughnessMap,m.roughnessMapTransform)),e.get(f).envMap&&(m.envMapIntensity.value=f.envMapIntensity)}function p(m,f,T){m.ior.value=f.ior,f.sheen>0&&(m.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),m.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(m.sheenColorMap.value=f.sheenColorMap,t(f.sheenColorMap,m.sheenColorMapTransform)),f.sheenRoughnessMap&&(m.sheenRoughnessMap.value=f.sheenRoughnessMap,t(f.sheenRoughnessMap,m.sheenRoughnessMapTransform))),f.clearcoat>0&&(m.clearcoat.value=f.clearcoat,m.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(m.clearcoatMap.value=f.clearcoatMap,t(f.clearcoatMap,m.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,t(f.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(m.clearcoatNormalMap.value=f.clearcoatNormalMap,t(f.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===Pt&&m.clearcoatNormalScale.value.negate())),f.iridescence>0&&(m.iridescence.value=f.iridescence,m.iridescenceIOR.value=f.iridescenceIOR,m.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(m.iridescenceMap.value=f.iridescenceMap,t(f.iridescenceMap,m.iridescenceMapTransform)),f.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=f.iridescenceThicknessMap,t(f.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),f.transmission>0&&(m.transmission.value=f.transmission,m.transmissionSamplerMap.value=T.texture,m.transmissionSamplerSize.value.set(T.width,T.height),f.transmissionMap&&(m.transmissionMap.value=f.transmissionMap,t(f.transmissionMap,m.transmissionMapTransform)),m.thickness.value=f.thickness,f.thicknessMap&&(m.thicknessMap.value=f.thicknessMap,t(f.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=f.attenuationDistance,m.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(m.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(m.anisotropyMap.value=f.anisotropyMap,t(f.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=f.specularIntensity,m.specularColor.value.copy(f.specularColor),f.specularColorMap&&(m.specularColorMap.value=f.specularColorMap,t(f.specularColorMap,m.specularColorMapTransform)),f.specularIntensityMap&&(m.specularIntensityMap.value=f.specularIntensityMap,t(f.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,f){f.matcap&&(m.matcap.value=f.matcap)}function x(m,f){let T=e.get(f).light;m.referencePosition.value.setFromMatrixPosition(T.matrixWorld),m.nearDistance.value=T.shadow.camera.near,m.farDistance.value=T.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function Ym(i,e,t,n){let s={},r={},o=[],a=t.isWebGL2?i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS):0;function c(T,v){let D=v.program;n.uniformBlockBinding(T,D)}function l(T,v){let D=s[T.id];D===void 0&&(g(T),D=h(T),s[T.id]=D,T.addEventListener("dispose",m));let H=v.program;n.updateUBOMapping(T,H);let N=e.render.frame;r[T.id]!==N&&(d(T),r[T.id]=N)}function h(T){let v=u();T.__bindingPointIndex=v;let D=i.createBuffer(),H=T.__size,N=T.usage;return i.bindBuffer(i.UNIFORM_BUFFER,D),i.bufferData(i.UNIFORM_BUFFER,H,N),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,v,D),D}function u(){for(let T=0;T<a;T++)if(o.indexOf(T)===-1)return o.push(T),T;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(T){let v=s[T.id],D=T.uniforms,H=T.__cache;i.bindBuffer(i.UNIFORM_BUFFER,v);for(let N=0,b=D.length;N<b;N++){let z=Array.isArray(D[N])?D[N]:[D[N]];for(let _=0,M=z.length;_<M;_++){let X=z[_];if(p(X,N,_,H)===!0){let ee=X.__offset,le=Array.isArray(X.value)?X.value:[X.value],P=0;for(let q=0;q<le.length;q++){let ne=le[q],C=x(ne);typeof ne=="number"||typeof ne=="boolean"?(X.__data[0]=ne,i.bufferSubData(i.UNIFORM_BUFFER,ee+P,X.__data)):ne.isMatrix3?(X.__data[0]=ne.elements[0],X.__data[1]=ne.elements[1],X.__data[2]=ne.elements[2],X.__data[3]=0,X.__data[4]=ne.elements[3],X.__data[5]=ne.elements[4],X.__data[6]=ne.elements[5],X.__data[7]=0,X.__data[8]=ne.elements[6],X.__data[9]=ne.elements[7],X.__data[10]=ne.elements[8],X.__data[11]=0):(ne.toArray(X.__data,P),P+=C.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,ee,X.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function p(T,v,D,H){let N=T.value,b=v+"_"+D;if(H[b]===void 0)return typeof N=="number"||typeof N=="boolean"?H[b]=N:H[b]=N.clone(),!0;{let z=H[b];if(typeof N=="number"||typeof N=="boolean"){if(z!==N)return H[b]=N,!0}else if(z.equals(N)===!1)return z.copy(N),!0}return!1}function g(T){let v=T.uniforms,D=0,H=16;for(let b=0,z=v.length;b<z;b++){let _=Array.isArray(v[b])?v[b]:[v[b]];for(let M=0,X=_.length;M<X;M++){let ee=_[M],le=Array.isArray(ee.value)?ee.value:[ee.value];for(let P=0,q=le.length;P<q;P++){let ne=le[P],C=x(ne),A=D%H;A!==0&&H-A<C.boundary&&(D+=H-A),ee.__data=new Float32Array(C.storage/Float32Array.BYTES_PER_ELEMENT),ee.__offset=D,D+=C.storage}}}let N=D%H;return N>0&&(D+=H-N),T.__size=D,T.__cache={},this}function x(T){let v={boundary:0,storage:0};return typeof T=="number"||typeof T=="boolean"?(v.boundary=4,v.storage=4):T.isVector2?(v.boundary=8,v.storage=8):T.isVector3||T.isColor?(v.boundary=16,v.storage=12):T.isVector4?(v.boundary=16,v.storage=16):T.isMatrix3?(v.boundary=48,v.storage=48):T.isMatrix4?(v.boundary=64,v.storage=64):T.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",T),v}function m(T){let v=T.target;v.removeEventListener("dispose",m);let D=o.indexOf(v.__bindingPointIndex);o.splice(D,1),i.deleteBuffer(s[v.id]),delete s[v.id],delete r[v.id]}function f(){for(let T in s)i.deleteBuffer(s[T]);o=[],s={},r={}}return{bind:c,update:l,dispose:f}}var Qi=class{constructor(e={}){let{canvas:t=tu(),context:n=null,depth:s=!0,stencil:r=!0,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1}=e;this.isWebGLRenderer=!0;let d;n!==null?d=n.getContextAttributes().alpha:d=o;let p=new Uint32Array(4),g=new Int32Array(4),x=null,m=null,f=[],T=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=dt,this._useLegacyLights=!1,this.toneMapping=An,this.toneMappingExposure=1;let v=this,D=!1,H=0,N=0,b=null,z=-1,_=null,M=new yt,X=new yt,ee=null,le=new Oe(0),P=0,q=t.width,ne=t.height,C=1,A=null,F=null,J=new yt(0,0,q,ne),Y=new yt(0,0,q,ne),j=!1,k=new Ki,w=!1,R=!1,U=null,V=new ht,Z=new Re,G=new B,te={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function ae(){return b===null?C:1}let L=n;function oe(E,K){for(let se=0;se<E.length;se++){let re=E[se],ie=t.getContext(re,K);if(ie!==null)return ie}return null}try{let E={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine","three.js r160"),t.addEventListener("webglcontextlost",Me,!1),t.addEventListener("webglcontextrestored",O,!1),t.addEventListener("webglcontextcreationerror",xe,!1),L===null){let K=["webgl2","webgl","experimental-webgl"];if(v.isWebGL1Renderer===!0&&K.shift(),L=oe(K,E),L===null)throw oe(K)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&L instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),L.getShaderPrecisionFormat===void 0&&(L.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(E){throw console.error("THREE.WebGLRenderer: "+E.message),E}let Q,ce,$,fe,ge,S,y,W,he,ue,pe,Te,ve,Ee,Pe,Fe,de,ze,I,me,Se,_e,Ce,Xe;function $e(){Q=new dp(L),ce=new ap(L,Q,e),Q.init(ce),_e=new Wm(L,Q,ce),$=new Vm(L,Q,ce),fe=new mp(L),ge=new Pm,S=new Gm(L,Q,$,ge,ce,_e,fe),y=new cp(v),W=new up(v),he=new Su(L,ce),Ce=new sp(L,Q,he,ce),ue=new fp(L,he,fe,Ce),pe=new yp(L,ue,he,fe),I=new xp(L,ce,S),Fe=new op(ge),Te=new Cm(v,y,W,Q,ce,Ce,Fe),ve=new qm(v,ge),Ee=new Im,Pe=new Bm(Q,ce),ze=new ip(v,y,W,$,pe,d,c),de=new Hm(v,pe,ce),Xe=new Ym(L,fe,ce,$),me=new rp(L,Q,fe,ce),Se=new pp(L,Q,fe,ce),fe.programs=Te.programs,v.capabilities=ce,v.extensions=Q,v.properties=ge,v.renderLists=Ee,v.shadowMap=de,v.state=$,v.info=fe}$e();let Ge=new Pa(v,L);this.xr=Ge,this.getContext=function(){return L},this.getContextAttributes=function(){return L.getContextAttributes()},this.forceContextLoss=function(){let E=Q.get("WEBGL_lose_context");E&&E.loseContext()},this.forceContextRestore=function(){let E=Q.get("WEBGL_lose_context");E&&E.restoreContext()},this.getPixelRatio=function(){return C},this.setPixelRatio=function(E){E!==void 0&&(C=E,this.setSize(q,ne,!1))},this.getSize=function(E){return E.set(q,ne)},this.setSize=function(E,K,se=!0){if(Ge.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}q=E,ne=K,t.width=Math.floor(E*C),t.height=Math.floor(K*C),se===!0&&(t.style.width=E+"px",t.style.height=K+"px"),this.setViewport(0,0,E,K)},this.getDrawingBufferSize=function(E){return E.set(q*C,ne*C).floor()},this.setDrawingBufferSize=function(E,K,se){q=E,ne=K,C=se,t.width=Math.floor(E*se),t.height=Math.floor(K*se),this.setViewport(0,0,E,K)},this.getCurrentViewport=function(E){return E.copy(M)},this.getViewport=function(E){return E.copy(J)},this.setViewport=function(E,K,se,re){E.isVector4?J.set(E.x,E.y,E.z,E.w):J.set(E,K,se,re),$.viewport(M.copy(J).multiplyScalar(C).floor())},this.getScissor=function(E){return E.copy(Y)},this.setScissor=function(E,K,se,re){E.isVector4?Y.set(E.x,E.y,E.z,E.w):Y.set(E,K,se,re),$.scissor(X.copy(Y).multiplyScalar(C).floor())},this.getScissorTest=function(){return j},this.setScissorTest=function(E){$.setScissorTest(j=E)},this.setOpaqueSort=function(E){A=E},this.setTransparentSort=function(E){F=E},this.getClearColor=function(E){return E.copy(ze.getClearColor())},this.setClearColor=function(){ze.setClearColor.apply(ze,arguments)},this.getClearAlpha=function(){return ze.getClearAlpha()},this.setClearAlpha=function(){ze.setClearAlpha.apply(ze,arguments)},this.clear=function(E=!0,K=!0,se=!0){let re=0;if(E){let ie=!1;if(b!==null){let we=b.texture.format;ie=we===ll||we===cl||we===ol}if(ie){let we=b.texture.type,Ie=we===Rn||we===En||we===Qa||we===Xn||we===rl||we===al,Ue=ze.getClearColor(),Be=ze.getClearAlpha(),We=Ue.r,ke=Ue.g,He=Ue.b;Ie?(p[0]=We,p[1]=ke,p[2]=He,p[3]=Be,L.clearBufferuiv(L.COLOR,0,p)):(g[0]=We,g[1]=ke,g[2]=He,g[3]=Be,L.clearBufferiv(L.COLOR,0,g))}else re|=L.COLOR_BUFFER_BIT}K&&(re|=L.DEPTH_BUFFER_BIT),se&&(re|=L.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),L.clear(re)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",Me,!1),t.removeEventListener("webglcontextrestored",O,!1),t.removeEventListener("webglcontextcreationerror",xe,!1),Ee.dispose(),Pe.dispose(),ge.dispose(),y.dispose(),W.dispose(),pe.dispose(),Ce.dispose(),Xe.dispose(),Te.dispose(),Ge.dispose(),Ge.removeEventListener("sessionstart",Et),Ge.removeEventListener("sessionend",et),U&&(U.dispose(),U=null),wt.stop()};function Me(E){E.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),D=!0}function O(){console.log("THREE.WebGLRenderer: Context Restored."),D=!1;let E=fe.autoReset,K=de.enabled,se=de.autoUpdate,re=de.needsUpdate,ie=de.type;$e(),fe.autoReset=E,de.enabled=K,de.autoUpdate=se,de.needsUpdate=re,de.type=ie}function xe(E){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",E.statusMessage)}function ye(E){let K=E.target;K.removeEventListener("dispose",ye),Ne(K)}function Ne(E){Le(E),ge.remove(E)}function Le(E){let K=ge.get(E).programs;K!==void 0&&(K.forEach(function(se){Te.releaseProgram(se)}),E.isShaderMaterial&&Te.releaseShaderCache(E))}this.renderBufferDirect=function(E,K,se,re,ie,we){K===null&&(K=te);let Ie=ie.isMesh&&ie.matrixWorld.determinant()<0,Ue=zl(E,K,se,re,ie);$.setMaterial(re,Ie);let Be=se.index,We=1;if(re.wireframe===!0){if(Be=ue.getWireframeAttribute(se),Be===void 0)return;We=2}let ke=se.drawRange,He=se.attributes.position,ct=ke.start*We,It=(ke.start+ke.count)*We;we!==null&&(ct=Math.max(ct,we.start*We),It=Math.min(It,(we.start+we.count)*We)),Be!==null?(ct=Math.max(ct,0),It=Math.min(It,Be.count)):He!=null&&(ct=Math.max(ct,0),It=Math.min(It,He.count));let gt=It-ct;if(gt<0||gt===1/0)return;Ce.setup(ie,re,Ue,se,Be);let on,st=me;if(Be!==null&&(on=he.get(Be),st=Se,st.setIndex(on)),ie.isMesh)re.wireframe===!0?($.setLineWidth(re.wireframeLinewidth*ae()),st.setMode(L.LINES)):st.setMode(L.TRIANGLES);else if(ie.isLine){let qe=re.linewidth;qe===void 0&&(qe=1),$.setLineWidth(qe*ae()),ie.isLineSegments?st.setMode(L.LINES):ie.isLineLoop?st.setMode(L.LINE_LOOP):st.setMode(L.LINE_STRIP)}else ie.isPoints?st.setMode(L.POINTS):ie.isSprite&&st.setMode(L.TRIANGLES);if(ie.isBatchedMesh)st.renderMultiDraw(ie._multiDrawStarts,ie._multiDrawCounts,ie._multiDrawCount);else if(ie.isInstancedMesh)st.renderInstances(ct,gt,ie.count);else if(se.isInstancedBufferGeometry){let qe=se._maxInstanceCount!==void 0?se._maxInstanceCount:1/0,Er=Math.min(se.instanceCount,qe);st.renderInstances(ct,gt,Er)}else st.render(ct,gt)};function Je(E,K,se){E.transparent===!0&&E.side===Yt&&E.forceSinglePass===!1?(E.side=Pt,E.needsUpdate=!0,as(E,K,se),E.side=Cn,E.needsUpdate=!0,as(E,K,se),E.side=Yt):as(E,K,se)}this.compile=function(E,K,se=null){se===null&&(se=E),m=Pe.get(se),m.init(),T.push(m),se.traverseVisible(function(ie){ie.isLight&&ie.layers.test(K.layers)&&(m.pushLight(ie),ie.castShadow&&m.pushShadow(ie))}),E!==se&&E.traverseVisible(function(ie){ie.isLight&&ie.layers.test(K.layers)&&(m.pushLight(ie),ie.castShadow&&m.pushShadow(ie))}),m.setupLights(v._useLegacyLights);let re=new Set;return E.traverse(function(ie){let we=ie.material;if(we)if(Array.isArray(we))for(let Ie=0;Ie<we.length;Ie++){let Ue=we[Ie];Je(Ue,se,ie),re.add(Ue)}else Je(we,se,ie),re.add(we)}),T.pop(),m=null,re},this.compileAsync=function(E,K,se=null){let re=this.compile(E,K,se);return new Promise(ie=>{function we(){if(re.forEach(function(Ie){ge.get(Ie).currentProgram.isReady()&&re.delete(Ie)}),re.size===0){ie(E);return}setTimeout(we,10)}Q.get("KHR_parallel_shader_compile")!==null?we():setTimeout(we,10)})};let Ke=null;function mt(E){Ke&&Ke(E)}function Et(){wt.stop()}function et(){wt.start()}let wt=new _l;wt.setAnimationLoop(mt),typeof self<"u"&&wt.setContext(self),this.setAnimationLoop=function(E){Ke=E,Ge.setAnimationLoop(E),E===null?wt.stop():wt.start()},Ge.addEventListener("sessionstart",Et),Ge.addEventListener("sessionend",et),this.render=function(E,K){if(K!==void 0&&K.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(D===!0)return;E.matrixWorldAutoUpdate===!0&&E.updateMatrixWorld(),K.parent===null&&K.matrixWorldAutoUpdate===!0&&K.updateMatrixWorld(),Ge.enabled===!0&&Ge.isPresenting===!0&&(Ge.cameraAutoUpdate===!0&&Ge.updateCamera(K),K=Ge.getCamera()),E.isScene===!0&&E.onBeforeRender(v,E,K,b),m=Pe.get(E,T.length),m.init(),T.push(m),V.multiplyMatrices(K.projectionMatrix,K.matrixWorldInverse),k.setFromProjectionMatrix(V),R=this.localClippingEnabled,w=Fe.init(this.clippingPlanes,R),x=Ee.get(E,f.length),x.init(),f.push(x),tn(E,K,0,v.sortObjects),x.finish(),v.sortObjects===!0&&x.sort(A,F),this.info.render.frame++,w===!0&&Fe.beginShadows();let se=m.state.shadowsArray;if(de.render(se,E,K),w===!0&&Fe.endShadows(),this.info.autoReset===!0&&this.info.reset(),ze.render(x,E),m.setupLights(v._useLegacyLights),K.isArrayCamera){let re=K.cameras;for(let ie=0,we=re.length;ie<we;ie++){let Ie=re[ie];xo(x,E,Ie,Ie.viewport)}}else xo(x,E,K);b!==null&&(S.updateMultisampleRenderTarget(b),S.updateRenderTargetMipmap(b)),E.isScene===!0&&E.onAfterRender(v,E,K),Ce.resetDefaultState(),z=-1,_=null,T.pop(),T.length>0?m=T[T.length-1]:m=null,f.pop(),f.length>0?x=f[f.length-1]:x=null};function tn(E,K,se,re){if(E.visible===!1)return;if(E.layers.test(K.layers)){if(E.isGroup)se=E.renderOrder;else if(E.isLOD)E.autoUpdate===!0&&E.update(K);else if(E.isLight)m.pushLight(E),E.castShadow&&m.pushShadow(E);else if(E.isSprite){if(!E.frustumCulled||k.intersectsSprite(E)){re&&G.setFromMatrixPosition(E.matrixWorld).applyMatrix4(V);let Ie=pe.update(E),Ue=E.material;Ue.visible&&x.push(E,Ie,Ue,se,G.z,null)}}else if((E.isMesh||E.isLine||E.isPoints)&&(!E.frustumCulled||k.intersectsObject(E))){let Ie=pe.update(E),Ue=E.material;if(re&&(E.boundingSphere!==void 0?(E.boundingSphere===null&&E.computeBoundingSphere(),G.copy(E.boundingSphere.center)):(Ie.boundingSphere===null&&Ie.computeBoundingSphere(),G.copy(Ie.boundingSphere.center)),G.applyMatrix4(E.matrixWorld).applyMatrix4(V)),Array.isArray(Ue)){let Be=Ie.groups;for(let We=0,ke=Be.length;We<ke;We++){let He=Be[We],ct=Ue[He.materialIndex];ct&&ct.visible&&x.push(E,Ie,ct,se,G.z,He)}}else Ue.visible&&x.push(E,Ie,Ue,se,G.z,null)}}let we=E.children;for(let Ie=0,Ue=we.length;Ie<Ue;Ie++)tn(we[Ie],K,se,re)}function xo(E,K,se,re){let ie=E.opaque,we=E.transmissive,Ie=E.transparent;m.setupLightsView(se),w===!0&&Fe.setGlobalState(v.clippingPlanes,se),we.length>0&&Bl(ie,we,K,se),re&&$.viewport(M.copy(re)),ie.length>0&&rs(ie,K,se),we.length>0&&rs(we,K,se),Ie.length>0&&rs(Ie,K,se),$.buffers.depth.setTest(!0),$.buffers.depth.setMask(!0),$.buffers.color.setMask(!0),$.setPolygonOffset(!1)}function Bl(E,K,se,re){if((se.isScene===!0?se.overrideMaterial:null)!==null)return;let we=ce.isWebGL2;U===null&&(U=new gn(1,1,{generateMipmaps:!0,type:Q.has("EXT_color_buffer_half_float")?$i:Rn,minFilter:Zi,samples:we?4:0})),v.getDrawingBufferSize(Z),we?U.setSize(Z.x,Z.y):U.setSize(ks(Z.x),ks(Z.y));let Ie=v.getRenderTarget();v.setRenderTarget(U),v.getClearColor(le),P=v.getClearAlpha(),P<1&&v.setClearColor(16777215,.5),v.clear();let Ue=v.toneMapping;v.toneMapping=An,rs(E,se,re),S.updateMultisampleRenderTarget(U),S.updateRenderTargetMipmap(U);let Be=!1;for(let We=0,ke=K.length;We<ke;We++){let He=K[We],ct=He.object,It=He.geometry,gt=He.material,on=He.group;if(gt.side===Yt&&ct.layers.test(re.layers)){let st=gt.side;gt.side=Pt,gt.needsUpdate=!0,yo(ct,se,re,It,gt,on),gt.side=st,gt.needsUpdate=!0,Be=!0}}Be===!0&&(S.updateMultisampleRenderTarget(U),S.updateRenderTargetMipmap(U)),v.setRenderTarget(Ie),v.setClearColor(le,P),v.toneMapping=Ue}function rs(E,K,se){let re=K.isScene===!0?K.overrideMaterial:null;for(let ie=0,we=E.length;ie<we;ie++){let Ie=E[ie],Ue=Ie.object,Be=Ie.geometry,We=re===null?Ie.material:re,ke=Ie.group;Ue.layers.test(se.layers)&&yo(Ue,K,se,Be,We,ke)}}function yo(E,K,se,re,ie,we){E.onBeforeRender(v,K,se,re,ie,we),E.modelViewMatrix.multiplyMatrices(se.matrixWorldInverse,E.matrixWorld),E.normalMatrix.getNormalMatrix(E.modelViewMatrix),ie.onBeforeRender(v,K,se,re,E,we),ie.transparent===!0&&ie.side===Yt&&ie.forceSinglePass===!1?(ie.side=Pt,ie.needsUpdate=!0,v.renderBufferDirect(se,K,re,ie,E,we),ie.side=Cn,ie.needsUpdate=!0,v.renderBufferDirect(se,K,re,ie,E,we),ie.side=Yt):v.renderBufferDirect(se,K,re,ie,E,we),E.onAfterRender(v,K,se,re,ie,we)}function as(E,K,se){K.isScene!==!0&&(K=te);let re=ge.get(E),ie=m.state.lights,we=m.state.shadowsArray,Ie=ie.state.version,Ue=Te.getParameters(E,ie.state,we,K,se),Be=Te.getProgramCacheKey(Ue),We=re.programs;re.environment=E.isMeshStandardMaterial?K.environment:null,re.fog=K.fog,re.envMap=(E.isMeshStandardMaterial?W:y).get(E.envMap||re.environment),We===void 0&&(E.addEventListener("dispose",ye),We=new Map,re.programs=We);let ke=We.get(Be);if(ke!==void 0){if(re.currentProgram===ke&&re.lightsStateVersion===Ie)return Mo(E,Ue),ke}else Ue.uniforms=Te.getUniforms(E),E.onBuild(se,Ue,v),E.onBeforeCompile(Ue,v),ke=Te.acquireProgram(Ue,Be),We.set(Be,ke),re.uniforms=Ue.uniforms;let He=re.uniforms;return(!E.isShaderMaterial&&!E.isRawShaderMaterial||E.clipping===!0)&&(He.clippingPlanes=Fe.uniform),Mo(E,Ue),re.needsLights=Hl(E),re.lightsStateVersion=Ie,re.needsLights&&(He.ambientLightColor.value=ie.state.ambient,He.lightProbe.value=ie.state.probe,He.directionalLights.value=ie.state.directional,He.directionalLightShadows.value=ie.state.directionalShadow,He.spotLights.value=ie.state.spot,He.spotLightShadows.value=ie.state.spotShadow,He.rectAreaLights.value=ie.state.rectArea,He.ltc_1.value=ie.state.rectAreaLTC1,He.ltc_2.value=ie.state.rectAreaLTC2,He.pointLights.value=ie.state.point,He.pointLightShadows.value=ie.state.pointShadow,He.hemisphereLights.value=ie.state.hemi,He.directionalShadowMap.value=ie.state.directionalShadowMap,He.directionalShadowMatrix.value=ie.state.directionalShadowMatrix,He.spotShadowMap.value=ie.state.spotShadowMap,He.spotLightMatrix.value=ie.state.spotLightMatrix,He.spotLightMap.value=ie.state.spotLightMap,He.pointShadowMap.value=ie.state.pointShadowMap,He.pointShadowMatrix.value=ie.state.pointShadowMatrix),re.currentProgram=ke,re.uniformsList=null,ke}function vo(E){if(E.uniformsList===null){let K=E.currentProgram.getUniforms();E.uniformsList=bi.seqWithValue(K.seq,E.uniforms)}return E.uniformsList}function Mo(E,K){let se=ge.get(E);se.outputColorSpace=K.outputColorSpace,se.batching=K.batching,se.instancing=K.instancing,se.instancingColor=K.instancingColor,se.skinning=K.skinning,se.morphTargets=K.morphTargets,se.morphNormals=K.morphNormals,se.morphColors=K.morphColors,se.morphTargetsCount=K.morphTargetsCount,se.numClippingPlanes=K.numClippingPlanes,se.numIntersection=K.numClipIntersection,se.vertexAlphas=K.vertexAlphas,se.vertexTangents=K.vertexTangents,se.toneMapping=K.toneMapping}function zl(E,K,se,re,ie){K.isScene!==!0&&(K=te),S.resetTextureUnits();let we=K.fog,Ie=re.isMeshStandardMaterial?K.environment:null,Ue=b===null?v.outputColorSpace:b.isXRRenderTarget===!0?b.texture.colorSpace:mn,Be=(re.isMeshStandardMaterial?W:y).get(re.envMap||Ie),We=re.vertexColors===!0&&!!se.attributes.color&&se.attributes.color.itemSize===4,ke=!!se.attributes.tangent&&(!!re.normalMap||re.anisotropy>0),He=!!se.morphAttributes.position,ct=!!se.morphAttributes.normal,It=!!se.morphAttributes.color,gt=An;re.toneMapped&&(b===null||b.isXRRenderTarget===!0)&&(gt=v.toneMapping);let on=se.morphAttributes.position||se.morphAttributes.normal||se.morphAttributes.color,st=on!==void 0?on.length:0,qe=ge.get(re),Er=m.state.lights;if(w===!0&&(R===!0||E!==_)){let Ot=E===_&&re.id===z;Fe.setState(re,E,Ot)}let at=!1;re.version===qe.__version?(qe.needsLights&&qe.lightsStateVersion!==Er.state.version||qe.outputColorSpace!==Ue||ie.isBatchedMesh&&qe.batching===!1||!ie.isBatchedMesh&&qe.batching===!0||ie.isInstancedMesh&&qe.instancing===!1||!ie.isInstancedMesh&&qe.instancing===!0||ie.isSkinnedMesh&&qe.skinning===!1||!ie.isSkinnedMesh&&qe.skinning===!0||ie.isInstancedMesh&&qe.instancingColor===!0&&ie.instanceColor===null||ie.isInstancedMesh&&qe.instancingColor===!1&&ie.instanceColor!==null||qe.envMap!==Be||re.fog===!0&&qe.fog!==we||qe.numClippingPlanes!==void 0&&(qe.numClippingPlanes!==Fe.numPlanes||qe.numIntersection!==Fe.numIntersection)||qe.vertexAlphas!==We||qe.vertexTangents!==ke||qe.morphTargets!==He||qe.morphNormals!==ct||qe.morphColors!==It||qe.toneMapping!==gt||ce.isWebGL2===!0&&qe.morphTargetsCount!==st)&&(at=!0):(at=!0,qe.__version=re.version);let Fn=qe.currentProgram;at===!0&&(Fn=as(re,K,ie));let So=!1,Oi=!1,wr=!1,Mt=Fn.getUniforms(),On=qe.uniforms;if($.useProgram(Fn.program)&&(So=!0,Oi=!0,wr=!0),re.id!==z&&(z=re.id,Oi=!0),So||_!==E){Mt.setValue(L,"projectionMatrix",E.projectionMatrix),Mt.setValue(L,"viewMatrix",E.matrixWorldInverse);let Ot=Mt.map.cameraPosition;Ot!==void 0&&Ot.setValue(L,G.setFromMatrixPosition(E.matrixWorld)),ce.logarithmicDepthBuffer&&Mt.setValue(L,"logDepthBufFC",2/(Math.log(E.far+1)/Math.LN2)),(re.isMeshPhongMaterial||re.isMeshToonMaterial||re.isMeshLambertMaterial||re.isMeshBasicMaterial||re.isMeshStandardMaterial||re.isShaderMaterial)&&Mt.setValue(L,"isOrthographic",E.isOrthographicCamera===!0),_!==E&&(_=E,Oi=!0,wr=!0)}if(ie.isSkinnedMesh){Mt.setOptional(L,ie,"bindMatrix"),Mt.setOptional(L,ie,"bindMatrixInverse");let Ot=ie.skeleton;Ot&&(ce.floatVertexTextures?(Ot.boneTexture===null&&Ot.computeBoneTexture(),Mt.setValue(L,"boneTexture",Ot.boneTexture,S)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}ie.isBatchedMesh&&(Mt.setOptional(L,ie,"batchingTexture"),Mt.setValue(L,"batchingTexture",ie._matricesTexture,S));let Tr=se.morphAttributes;if((Tr.position!==void 0||Tr.normal!==void 0||Tr.color!==void 0&&ce.isWebGL2===!0)&&I.update(ie,se,Fn),(Oi||qe.receiveShadow!==ie.receiveShadow)&&(qe.receiveShadow=ie.receiveShadow,Mt.setValue(L,"receiveShadow",ie.receiveShadow)),re.isMeshGouraudMaterial&&re.envMap!==null&&(On.envMap.value=Be,On.flipEnvMap.value=Be.isCubeTexture&&Be.isRenderTargetTexture===!1?-1:1),Oi&&(Mt.setValue(L,"toneMappingExposure",v.toneMappingExposure),qe.needsLights&&kl(On,wr),we&&re.fog===!0&&ve.refreshFogUniforms(On,we),ve.refreshMaterialUniforms(On,re,C,ne,U),bi.upload(L,vo(qe),On,S)),re.isShaderMaterial&&re.uniformsNeedUpdate===!0&&(bi.upload(L,vo(qe),On,S),re.uniformsNeedUpdate=!1),re.isSpriteMaterial&&Mt.setValue(L,"center",ie.center),Mt.setValue(L,"modelViewMatrix",ie.modelViewMatrix),Mt.setValue(L,"normalMatrix",ie.normalMatrix),Mt.setValue(L,"modelMatrix",ie.matrixWorld),re.isShaderMaterial||re.isRawShaderMaterial){let Ot=re.uniformsGroups;for(let Ar=0,Vl=Ot.length;Ar<Vl;Ar++)if(ce.isWebGL2){let bo=Ot[Ar];Xe.update(bo,Fn),Xe.bind(bo,Fn)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return Fn}function kl(E,K){E.ambientLightColor.needsUpdate=K,E.lightProbe.needsUpdate=K,E.directionalLights.needsUpdate=K,E.directionalLightShadows.needsUpdate=K,E.pointLights.needsUpdate=K,E.pointLightShadows.needsUpdate=K,E.spotLights.needsUpdate=K,E.spotLightShadows.needsUpdate=K,E.rectAreaLights.needsUpdate=K,E.hemisphereLights.needsUpdate=K}function Hl(E){return E.isMeshLambertMaterial||E.isMeshToonMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isShadowMaterial||E.isShaderMaterial&&E.lights===!0}this.getActiveCubeFace=function(){return H},this.getActiveMipmapLevel=function(){return N},this.getRenderTarget=function(){return b},this.setRenderTargetTextures=function(E,K,se){ge.get(E.texture).__webglTexture=K,ge.get(E.depthTexture).__webglTexture=se;let re=ge.get(E);re.__hasExternalTextures=!0,re.__hasExternalTextures&&(re.__autoAllocateDepthBuffer=se===void 0,re.__autoAllocateDepthBuffer||Q.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),re.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(E,K){let se=ge.get(E);se.__webglFramebuffer=K,se.__useDefaultFramebuffer=K===void 0},this.setRenderTarget=function(E,K=0,se=0){b=E,H=K,N=se;let re=!0,ie=null,we=!1,Ie=!1;if(E){let Be=ge.get(E);Be.__useDefaultFramebuffer!==void 0?($.bindFramebuffer(L.FRAMEBUFFER,null),re=!1):Be.__webglFramebuffer===void 0?S.setupRenderTarget(E):Be.__hasExternalTextures&&S.rebindTextures(E,ge.get(E.texture).__webglTexture,ge.get(E.depthTexture).__webglTexture);let We=E.texture;(We.isData3DTexture||We.isDataArrayTexture||We.isCompressedArrayTexture)&&(Ie=!0);let ke=ge.get(E).__webglFramebuffer;E.isWebGLCubeRenderTarget?(Array.isArray(ke[K])?ie=ke[K][se]:ie=ke[K],we=!0):ce.isWebGL2&&E.samples>0&&S.useMultisampledRTT(E)===!1?ie=ge.get(E).__webglMultisampledFramebuffer:Array.isArray(ke)?ie=ke[se]:ie=ke,M.copy(E.viewport),X.copy(E.scissor),ee=E.scissorTest}else M.copy(J).multiplyScalar(C).floor(),X.copy(Y).multiplyScalar(C).floor(),ee=j;if($.bindFramebuffer(L.FRAMEBUFFER,ie)&&ce.drawBuffers&&re&&$.drawBuffers(E,ie),$.viewport(M),$.scissor(X),$.setScissorTest(ee),we){let Be=ge.get(E.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_CUBE_MAP_POSITIVE_X+K,Be.__webglTexture,se)}else if(Ie){let Be=ge.get(E.texture),We=K||0;L.framebufferTextureLayer(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,Be.__webglTexture,se||0,We)}z=-1},this.readRenderTargetPixels=function(E,K,se,re,ie,we,Ie){if(!(E&&E.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ue=ge.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&Ie!==void 0&&(Ue=Ue[Ie]),Ue){$.bindFramebuffer(L.FRAMEBUFFER,Ue);try{let Be=E.texture,We=Be.format,ke=Be.type;if(We!==$t&&_e.convert(We)!==L.getParameter(L.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}let He=ke===$i&&(Q.has("EXT_color_buffer_half_float")||ce.isWebGL2&&Q.has("EXT_color_buffer_float"));if(ke!==Rn&&_e.convert(ke)!==L.getParameter(L.IMPLEMENTATION_COLOR_READ_TYPE)&&!(ke===wn&&(ce.isWebGL2||Q.has("OES_texture_float")||Q.has("WEBGL_color_buffer_float")))&&!He){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}K>=0&&K<=E.width-re&&se>=0&&se<=E.height-ie&&L.readPixels(K,se,re,ie,_e.convert(We),_e.convert(ke),we)}finally{let Be=b!==null?ge.get(b).__webglFramebuffer:null;$.bindFramebuffer(L.FRAMEBUFFER,Be)}}},this.copyFramebufferToTexture=function(E,K,se=0){let re=Math.pow(2,-se),ie=Math.floor(K.image.width*re),we=Math.floor(K.image.height*re);S.setTexture2D(K,0),L.copyTexSubImage2D(L.TEXTURE_2D,se,0,0,E.x,E.y,ie,we),$.unbindTexture()},this.copyTextureToTexture=function(E,K,se,re=0){let ie=K.image.width,we=K.image.height,Ie=_e.convert(se.format),Ue=_e.convert(se.type);S.setTexture2D(se,0),L.pixelStorei(L.UNPACK_FLIP_Y_WEBGL,se.flipY),L.pixelStorei(L.UNPACK_PREMULTIPLY_ALPHA_WEBGL,se.premultiplyAlpha),L.pixelStorei(L.UNPACK_ALIGNMENT,se.unpackAlignment),K.isDataTexture?L.texSubImage2D(L.TEXTURE_2D,re,E.x,E.y,ie,we,Ie,Ue,K.image.data):K.isCompressedTexture?L.compressedTexSubImage2D(L.TEXTURE_2D,re,E.x,E.y,K.mipmaps[0].width,K.mipmaps[0].height,Ie,K.mipmaps[0].data):L.texSubImage2D(L.TEXTURE_2D,re,E.x,E.y,Ie,Ue,K.image),re===0&&se.generateMipmaps&&L.generateMipmap(L.TEXTURE_2D),$.unbindTexture()},this.copyTextureToTexture3D=function(E,K,se,re,ie=0){if(v.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}let we=E.max.x-E.min.x+1,Ie=E.max.y-E.min.y+1,Ue=E.max.z-E.min.z+1,Be=_e.convert(re.format),We=_e.convert(re.type),ke;if(re.isData3DTexture)S.setTexture3D(re,0),ke=L.TEXTURE_3D;else if(re.isDataArrayTexture||re.isCompressedArrayTexture)S.setTexture2DArray(re,0),ke=L.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}L.pixelStorei(L.UNPACK_FLIP_Y_WEBGL,re.flipY),L.pixelStorei(L.UNPACK_PREMULTIPLY_ALPHA_WEBGL,re.premultiplyAlpha),L.pixelStorei(L.UNPACK_ALIGNMENT,re.unpackAlignment);let He=L.getParameter(L.UNPACK_ROW_LENGTH),ct=L.getParameter(L.UNPACK_IMAGE_HEIGHT),It=L.getParameter(L.UNPACK_SKIP_PIXELS),gt=L.getParameter(L.UNPACK_SKIP_ROWS),on=L.getParameter(L.UNPACK_SKIP_IMAGES),st=se.isCompressedTexture?se.mipmaps[ie]:se.image;L.pixelStorei(L.UNPACK_ROW_LENGTH,st.width),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,st.height),L.pixelStorei(L.UNPACK_SKIP_PIXELS,E.min.x),L.pixelStorei(L.UNPACK_SKIP_ROWS,E.min.y),L.pixelStorei(L.UNPACK_SKIP_IMAGES,E.min.z),se.isDataTexture||se.isData3DTexture?L.texSubImage3D(ke,ie,K.x,K.y,K.z,we,Ie,Ue,Be,We,st.data):se.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),L.compressedTexSubImage3D(ke,ie,K.x,K.y,K.z,we,Ie,Ue,Be,st.data)):L.texSubImage3D(ke,ie,K.x,K.y,K.z,we,Ie,Ue,Be,We,st),L.pixelStorei(L.UNPACK_ROW_LENGTH,He),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,ct),L.pixelStorei(L.UNPACK_SKIP_PIXELS,It),L.pixelStorei(L.UNPACK_SKIP_ROWS,gt),L.pixelStorei(L.UNPACK_SKIP_IMAGES,on),ie===0&&re.generateMipmaps&&L.generateMipmap(ke),$.unbindTexture()},this.initTexture=function(E){E.isCubeTexture?S.setTextureCube(E,0):E.isData3DTexture?S.setTexture3D(E,0):E.isDataArrayTexture||E.isCompressedArrayTexture?S.setTexture2DArray(E,0):S.setTexture2D(E,0),$.unbindTexture()},this.resetState=function(){H=0,N=0,b=null,$.reset(),Ce.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return pn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=e===eo?"display-p3":"srgb",t.unpackColorSpace=je.workingColorSpace===dr?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===dt?Yn:ul}set outputEncoding(e){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=e===Yn?dt:mn}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(e){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=e}},La=class extends Qi{};La.prototype.isWebGL1Renderer=!0;var er=class i{constructor(e,t=1,n=1e3){this.isFog=!0,this.name="",this.color=new Oe(e),this.near=t,this.far=n}clone(){return new i(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},tr=class extends vt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t}};var es=class extends Pn{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Oe(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},qc=new B,Yc=new B,Zc=new ht,ia=new Ri,Cs=new Ai,nr=class extends vt{constructor(e=new Lt,t=new es){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let s=1,r=t.count;s<r;s++)qc.fromBufferAttribute(t,s-1),Yc.fromBufferAttribute(t,s),n[s]=n[s-1],n[s]+=qc.distanceTo(Yc);e.setAttribute("lineDistance",new rt(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){let n=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Cs.copy(n.boundingSphere),Cs.applyMatrix4(s),Cs.radius+=r,e.ray.intersectsSphere(Cs)===!1)return;Zc.copy(s).invert(),ia.copy(e.ray).applyMatrix4(Zc);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=new B,h=new B,u=new B,d=new B,p=this.isLineSegments?2:1,g=n.index,m=n.attributes.position;if(g!==null){let f=Math.max(0,o.start),T=Math.min(g.count,o.start+o.count);for(let v=f,D=T-1;v<D;v+=p){let H=g.getX(v),N=g.getX(v+1);if(l.fromBufferAttribute(m,H),h.fromBufferAttribute(m,N),ia.distanceSqToSegment(l,h,d,u)>c)continue;d.applyMatrix4(this.matrixWorld);let z=e.ray.origin.distanceTo(d);z<e.near||z>e.far||t.push({distance:z,point:u.clone().applyMatrix4(this.matrixWorld),index:v,face:null,faceIndex:null,object:this})}}else{let f=Math.max(0,o.start),T=Math.min(m.count,o.start+o.count);for(let v=f,D=T-1;v<D;v+=p){if(l.fromBufferAttribute(m,v),h.fromBufferAttribute(m,v+1),ia.distanceSqToSegment(l,h,d,u)>c)continue;d.applyMatrix4(this.matrixWorld);let N=e.ray.origin.distanceTo(d);N<e.near||N>e.far||t.push({distance:N,point:u.clone().applyMatrix4(this.matrixWorld),index:v,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}},$c=new B,Jc=new B,Ia=class extends nr{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let s=0,r=t.count;s<r;s+=2)$c.fromBufferAttribute(t,s),Jc.fromBufferAttribute(t,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+$c.distanceTo(Jc);e.setAttribute("lineDistance",new rt(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}};var jt=class{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,s=this.getPoint(0),r=0;t.push(0);for(let o=1;o<=e;o++)n=this.getPoint(o/e),r+=n.distanceTo(s),t.push(r),s=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t){let n=this.getLengths(),s=0,r=n.length,o;t?o=t:o=e*n[r-1];let a=0,c=r-1,l;for(;a<=c;)if(s=Math.floor(a+(c-a)/2),l=n[s]-o,l<0)a=s+1;else if(l>0)c=s-1;else{c=s;break}if(s=c,n[s]===o)return s/(r-1);let h=n[s],d=n[s+1]-h,p=(o-h)/d;return(s+p)/(r-1)}getTangent(e,t){let s=e-1e-4,r=e+1e-4;s<0&&(s=0),r>1&&(r=1);let o=this.getPoint(s),a=this.getPoint(r),c=t||(o.isVector2?new Re:new B);return c.copy(a).sub(o).normalize(),c}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t){let n=new B,s=[],r=[],o=[],a=new B,c=new ht;for(let p=0;p<=e;p++){let g=p/e;s[p]=this.getTangentAt(g,new B)}r[0]=new B,o[0]=new B;let l=Number.MAX_VALUE,h=Math.abs(s[0].x),u=Math.abs(s[0].y),d=Math.abs(s[0].z);h<=l&&(l=h,n.set(1,0,0)),u<=l&&(l=u,n.set(0,1,0)),d<=l&&n.set(0,0,1),a.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],a),o[0].crossVectors(s[0],r[0]);for(let p=1;p<=e;p++){if(r[p]=r[p-1].clone(),o[p]=o[p-1].clone(),a.crossVectors(s[p-1],s[p]),a.length()>Number.EPSILON){a.normalize();let g=Math.acos(xt(s[p-1].dot(s[p]),-1,1));r[p].applyMatrix4(c.makeRotationAxis(a,g))}o[p].crossVectors(s[p],r[p])}if(t===!0){let p=Math.acos(xt(r[0].dot(r[e]),-1,1));p/=e,s[0].dot(a.crossVectors(r[0],r[e]))>0&&(p=-p);for(let g=1;g<=e;g++)r[g].applyMatrix4(c.makeRotationAxis(s[g],p*g)),o[g].crossVectors(s[g],r[g])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},ir=class extends jt{constructor(e=0,t=0,n=1,s=1,r=0,o=Math.PI*2,a=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=c}getPoint(e,t){let n=t||new Re,s=Math.PI*2,r=this.aEndAngle-this.aStartAngle,o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(o?r=0:r=s),this.aClockwise===!0&&!o&&(r===s?r=-s:r=r-s);let a=this.aStartAngle+e*r,c=this.aX+this.xRadius*Math.cos(a),l=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){let h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=c-this.aX,p=l-this.aY;c=d*h-p*u+this.aX,l=d*u+p*h+this.aY}return n.set(c,l)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},Da=class extends ir{constructor(e,t,n,s,r,o){super(e,t,n,n,s,r,o),this.isArcCurve=!0,this.type="ArcCurve"}};function io(){let i=0,e=0,t=0,n=0;function s(r,o,a,c){i=r,e=a,t=-3*r+3*o-2*a-c,n=2*r-2*o+a+c}return{initCatmullRom:function(r,o,a,c,l){s(o,a,l*(a-r),l*(c-o))},initNonuniformCatmullRom:function(r,o,a,c,l,h,u){let d=(o-r)/l-(a-r)/(l+h)+(a-o)/h,p=(a-o)/h-(c-o)/(h+u)+(c-a)/u;d*=h,p*=h,s(o,a,d,p)},calc:function(r){let o=r*r,a=o*r;return i+e*r+t*o+n*a}}}var Ps=new B,sa=new io,ra=new io,aa=new io,ts=class extends jt{constructor(e=[],t=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=s}getPoint(e,t=new B){let n=t,s=this.points,r=s.length,o=(r-(this.closed?0:1))*e,a=Math.floor(o),c=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:c===0&&a===r-1&&(a=r-2,c=1);let l,h;this.closed||a>0?l=s[(a-1)%r]:(Ps.subVectors(s[0],s[1]).add(s[0]),l=Ps);let u=s[a%r],d=s[(a+1)%r];if(this.closed||a+2<r?h=s[(a+2)%r]:(Ps.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=Ps),this.curveType==="centripetal"||this.curveType==="chordal"){let p=this.curveType==="chordal"?.5:.25,g=Math.pow(l.distanceToSquared(u),p),x=Math.pow(u.distanceToSquared(d),p),m=Math.pow(d.distanceToSquared(h),p);x<1e-4&&(x=1),g<1e-4&&(g=x),m<1e-4&&(m=x),sa.initNonuniformCatmullRom(l.x,u.x,d.x,h.x,g,x,m),ra.initNonuniformCatmullRom(l.y,u.y,d.y,h.y,g,x,m),aa.initNonuniformCatmullRom(l.z,u.z,d.z,h.z,g,x,m)}else this.curveType==="catmullrom"&&(sa.initCatmullRom(l.x,u.x,d.x,h.x,this.tension),ra.initCatmullRom(l.y,u.y,d.y,h.y,this.tension),aa.initCatmullRom(l.z,u.z,d.z,h.z,this.tension));return n.set(sa.calc(c),ra.calc(c),aa.calc(c)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(s.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let s=this.points[t];e.points.push(s.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(new B().fromArray(s))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function Kc(i,e,t,n,s){let r=(n-e)*.5,o=(s-t)*.5,a=i*i,c=i*a;return(2*t-2*n+r+o)*c+(-3*t+3*n-2*r-o)*a+r*i+t}function Zm(i,e){let t=1-i;return t*t*e}function $m(i,e){return 2*(1-i)*i*e}function Jm(i,e){return i*i*e}function qi(i,e,t,n){return Zm(i,e)+$m(i,t)+Jm(i,n)}function Km(i,e){let t=1-i;return t*t*t*e}function jm(i,e){let t=1-i;return 3*t*t*i*e}function Qm(i,e){return 3*(1-i)*i*i*e}function eg(i,e){return i*i*i*e}function Yi(i,e,t,n,s){return Km(i,e)+jm(i,t)+Qm(i,n)+eg(i,s)}var Na=class extends jt{constructor(e=new Re,t=new Re,n=new Re,s=new Re){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new Re){let n=t,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Yi(e,s.x,r.x,o.x,a.x),Yi(e,s.y,r.y,o.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Ua=class extends jt{constructor(e=new B,t=new B,n=new B,s=new B){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new B){let n=t,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Yi(e,s.x,r.x,o.x,a.x),Yi(e,s.y,r.y,o.y,a.y),Yi(e,s.z,r.z,o.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Fa=class extends jt{constructor(e=new Re,t=new Re){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new Re){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new Re){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Oa=class extends jt{constructor(e=new B,t=new B){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new B){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new B){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Ba=class extends jt{constructor(e=new Re,t=new Re,n=new Re){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new Re){let n=t,s=this.v0,r=this.v1,o=this.v2;return n.set(qi(e,s.x,r.x,o.x),qi(e,s.y,r.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},sr=class extends jt{constructor(e=new B,t=new B,n=new B){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new B){let n=t,s=this.v0,r=this.v1,o=this.v2;return n.set(qi(e,s.x,r.x,o.x),qi(e,s.y,r.y,o.y),qi(e,s.z,r.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},za=class extends jt{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new Re){let n=t,s=this.points,r=(s.length-1)*e,o=Math.floor(r),a=r-o,c=s[o===0?o:o-1],l=s[o],h=s[o>s.length-2?s.length-1:o+1],u=s[o>s.length-3?s.length-1:o+2];return n.set(Kc(a,c.x,l.x,h.x,u.x),Kc(a,c.y,l.y,h.y,u.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(s.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let s=this.points[t];e.points.push(s.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(new Re().fromArray(s))}return this}},tg=Object.freeze({__proto__:null,ArcCurve:Da,CatmullRomCurve3:ts,CubicBezierCurve:Na,CubicBezierCurve3:Ua,EllipseCurve:ir,LineCurve:Fa,LineCurve3:Oa,QuadraticBezierCurve:Ba,QuadraticBezierCurve3:sr,SplineCurve:za});var Pi=class i extends Lt{constructor(e=1,t=1,n=1,s=32,r=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:c};let l=this;s=Math.floor(s),r=Math.floor(r);let h=[],u=[],d=[],p=[],g=0,x=[],m=n/2,f=0;T(),o===!1&&(e>0&&v(!0),t>0&&v(!1)),this.setIndex(h),this.setAttribute("position",new rt(u,3)),this.setAttribute("normal",new rt(d,3)),this.setAttribute("uv",new rt(p,2));function T(){let D=new B,H=new B,N=0,b=(t-e)/n;for(let z=0;z<=r;z++){let _=[],M=z/r,X=M*(t-e)+e;for(let ee=0;ee<=s;ee++){let le=ee/s,P=le*c+a,q=Math.sin(P),ne=Math.cos(P);H.x=X*q,H.y=-M*n+m,H.z=X*ne,u.push(H.x,H.y,H.z),D.set(q,b,ne).normalize(),d.push(D.x,D.y,D.z),p.push(le,1-M),_.push(g++)}x.push(_)}for(let z=0;z<s;z++)for(let _=0;_<r;_++){let M=x[_][z],X=x[_+1][z],ee=x[_+1][z+1],le=x[_][z+1];h.push(M,X,le),h.push(X,ee,le),N+=6}l.addGroup(f,N,0),f+=N}function v(D){let H=g,N=new Re,b=new B,z=0,_=D===!0?e:t,M=D===!0?1:-1;for(let ee=1;ee<=s;ee++)u.push(0,m*M,0),d.push(0,M,0),p.push(.5,.5),g++;let X=g;for(let ee=0;ee<=s;ee++){let P=ee/s*c+a,q=Math.cos(P),ne=Math.sin(P);b.x=_*ne,b.y=m*M,b.z=_*q,u.push(b.x,b.y,b.z),d.push(0,M,0),N.x=q*.5+.5,N.y=ne*.5*M+.5,p.push(N.x,N.y),g++}for(let ee=0;ee<s;ee++){let le=H+ee,P=X+ee;D===!0?h.push(P,P+1,le):h.push(P+1,P,le),z+=3}l.addGroup(f,z,D===!0?1:2),f+=z}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}};var rr=class i extends Lt{constructor(e=new sr(new B(-1,-1,0),new B(-1,1,0),new B(1,1,0)),t=64,n=1,s=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:s,closed:r};let o=e.computeFrenetFrames(t,r);this.tangents=o.tangents,this.normals=o.normals,this.binormals=o.binormals;let a=new B,c=new B,l=new Re,h=new B,u=[],d=[],p=[],g=[];x(),this.setIndex(g),this.setAttribute("position",new rt(u,3)),this.setAttribute("normal",new rt(d,3)),this.setAttribute("uv",new rt(p,2));function x(){for(let v=0;v<t;v++)m(v);m(r===!1?t:0),T(),f()}function m(v){h=e.getPointAt(v/t,h);let D=o.normals[v],H=o.binormals[v];for(let N=0;N<=s;N++){let b=N/s*Math.PI*2,z=Math.sin(b),_=-Math.cos(b);c.x=_*D.x+z*H.x,c.y=_*D.y+z*H.y,c.z=_*D.z+z*H.z,c.normalize(),d.push(c.x,c.y,c.z),a.x=h.x+n*c.x,a.y=h.y+n*c.y,a.z=h.z+n*c.z,u.push(a.x,a.y,a.z)}}function f(){for(let v=1;v<=t;v++)for(let D=1;D<=s;D++){let H=(s+1)*(v-1)+(D-1),N=(s+1)*v+(D-1),b=(s+1)*v+D,z=(s+1)*(v-1)+D;g.push(H,N,z),g.push(N,b,z)}}function T(){for(let v=0;v<=t;v++)for(let D=0;D<=s;D++)l.x=v/t,l.y=D/s,p.push(l.x,l.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new i(new tg[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}};var ut=class extends Pn{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new Oe(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Oe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=dl,this.normalScale=new Re(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}};function Ls(i,e,t){return!i||!t&&i.constructor===e?i:typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i)}function ng(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}var Li=class{constructor(e,t,n,s){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,s=t[n],r=t[n-1];n:{e:{let o;t:{i:if(!(e<s)){for(let a=n+2;;){if(s===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=s,s=t[++n],e<s)break e}o=t.length;break t}if(!(e>=r)){let a=t[1];e<a&&(n=2,r=a);for(let c=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(s=r,r=t[--n-1],e>=r)break e}o=n,n=0;break t}break n}for(;n<o;){let a=n+o>>>1;e<t[a]?o=a:n=a+1}if(s=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,e,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s;for(let o=0;o!==s;++o)t[o]=n[r+o];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},ka=class extends Li{constructor(e,t,n,s){super(e,t,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:nc,endingEnd:nc}}intervalChanged_(e,t,n){let s=this.parameterPositions,r=e-2,o=e+1,a=s[r],c=s[o];if(a===void 0)switch(this.getSettings_().endingStart){case ic:r=e,a=2*t-n;break;case sc:r=s.length-2,a=t+s[r]-s[r+1];break;default:r=e,a=n}if(c===void 0)switch(this.getSettings_().endingEnd){case ic:o=e,c=2*n-t;break;case sc:o=1,c=n+s[1]-s[0];break;default:o=e-1,c=t}let l=(n-t)*.5,h=this.valueSize;this._weightPrev=l/(t-a),this._weightNext=l/(c-n),this._offsetPrev=r*h,this._offsetNext=o*h}interpolate_(e,t,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,p=this._weightNext,g=(n-t)/(s-t),x=g*g,m=x*g,f=-d*m+2*d*x-d*g,T=(1+d)*m+(-1.5-2*d)*x+(-.5+d)*g+1,v=(-1-p)*m+(1.5+p)*x+.5*g,D=p*m-p*x;for(let H=0;H!==a;++H)r[H]=f*o[h+H]+T*o[l+H]+v*o[c+H]+D*o[u+H];return r}},Ha=class extends Li{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,h=(n-t)/(s-t),u=1-h;for(let d=0;d!==a;++d)r[d]=o[l+d]*u+o[c+d]*h;return r}},Va=class extends Li{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e){return this.copySampleValue_(e-1)}},Qt=class{constructor(e,t,n,s){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Ls(t,this.TimeBufferType),this.values=Ls(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Ls(e.times,Array),values:Ls(e.values,Array)};let s=e.getInterpolation();s!==e.DefaultInterpolation&&(n.interpolation=s)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Va(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Ha(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new ka(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case Ns:t=this.InterpolantFactoryMethodDiscrete;break;case Us:t=this.InterpolantFactoryMethodLinear;break;case Nr:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Ns;case this.InterpolantFactoryMethodLinear:return Us;case this.InterpolantFactoryMethodSmooth:return Nr}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]*=e}return this}trim(e,t){let n=this.times,s=n.length,r=0,o=s-1;for(;r!==s&&n[r]<e;)++r;for(;o!==-1&&n[o]>t;)--o;if(++o,r!==0||o!==s){r>=o&&(o=Math.max(o,1),r=o-1);let a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,s=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==r;a++){let c=n[a];if(typeof c=="number"&&isNaN(c)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,c),e=!1;break}if(o!==null&&o>c){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,c,o),e=!1;break}o=c}if(s!==void 0&&ng(s))for(let a=0,c=s.length;a!==c;++a){let l=s[a];if(isNaN(l)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,l),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===Nr,r=e.length-1,o=1;for(let a=1;a<r;++a){let c=!1,l=e[a],h=e[a+1];if(l!==h&&(a!==1||l!==e[0]))if(s)c=!0;else{let u=a*n,d=u-n,p=u+n;for(let g=0;g!==n;++g){let x=t[u+g];if(x!==t[d+g]||x!==t[p+g]){c=!0;break}}}if(c){if(a!==o){e[o]=e[a];let u=a*n,d=o*n;for(let p=0;p!==n;++p)t[d+p]=t[u+p]}++o}}if(r>0){e[o]=e[r];for(let a=r*n,c=o*n,l=0;l!==n;++l)t[c+l]=t[a+l];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,s=new n(this.name,e,t);return s.createInterpolant=this.createInterpolant,s}};Qt.prototype.TimeBufferType=Float32Array;Qt.prototype.ValueBufferType=Float32Array;Qt.prototype.DefaultInterpolation=Us;var Jn=class extends Qt{};Jn.prototype.ValueTypeName="bool";Jn.prototype.ValueBufferType=Array;Jn.prototype.DefaultInterpolation=Ns;Jn.prototype.InterpolantFactoryMethodLinear=void 0;Jn.prototype.InterpolantFactoryMethodSmooth=void 0;var Ga=class extends Qt{};Ga.prototype.ValueTypeName="color";var Wa=class extends Qt{};Wa.prototype.ValueTypeName="number";var Xa=class extends Li{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=(n-t)/(s-t),l=e*a;for(let h=l+a;l!==h;l+=4)Kt.slerpFlat(r,0,o,l-a,o,l,c);return r}},ns=class extends Qt{InterpolantFactoryMethodLinear(e){return new Xa(this.times,this.values,this.getValueSize(),e)}};ns.prototype.ValueTypeName="quaternion";ns.prototype.DefaultInterpolation=Us;ns.prototype.InterpolantFactoryMethodSmooth=void 0;var Kn=class extends Qt{};Kn.prototype.ValueTypeName="string";Kn.prototype.ValueBufferType=Array;Kn.prototype.DefaultInterpolation=Ns;Kn.prototype.InterpolantFactoryMethodLinear=void 0;Kn.prototype.InterpolantFactoryMethodSmooth=void 0;var qa=class extends Qt{};qa.prototype.ValueTypeName="vector";var Ya=class{constructor(e,t,n){let s=this,r=!1,o=0,a=0,c,l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(h){a++,r===!1&&s.onStart!==void 0&&s.onStart(h,o,a),r=!0},this.itemEnd=function(h){o++,s.onProgress!==void 0&&s.onProgress(h,o,a),o===a&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return c?c(h):h},this.setURLModifier=function(h){return c=h,this},this.addHandler=function(h,u){return l.push(h,u),this},this.removeHandler=function(h){let u=l.indexOf(h);return u!==-1&&l.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=l.length;u<d;u+=2){let p=l[u],g=l[u+1];if(p.global&&(p.lastIndex=0),p.test(h))return g}return null}}},ig=new Ya,Za=class{constructor(e){this.manager=e!==void 0?e:ig,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){let n=this;return new Promise(function(s,r){n.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}};Za.DEFAULT_MATERIAL_NAME="__DEFAULT";var ar=class extends vt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Oe(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),t}},or=class extends ar{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(vt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Oe(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}},oa=new ht,jc=new B,Qc=new B,$a=class{constructor(e){this.camera=e,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Re(512,512),this.map=null,this.mapPass=null,this.matrix=new ht,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ki,this._frameExtents=new Re(1,1),this._viewportCount=1,this._viewports=[new yt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,n=this.matrix;jc.setFromMatrixPosition(e.matrixWorld),t.position.copy(jc),Qc.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Qc),t.updateMatrixWorld(),oa.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(oa),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(oa)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}};var Ja=class extends $a{constructor(){super(new Ks(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},cr=class extends ar{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(vt.DEFAULT_UP),this.updateMatrix(),this.target=new vt,this.shadow=new Ja}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}};var so="\\[\\]\\.:\\/",sg=new RegExp("["+so+"]","g"),ro="[^"+so+"]",rg="[^"+so.replace("\\.","")+"]",ag=/((?:WC+[\/:])*)/.source.replace("WC",ro),og=/(WCOD+)?/.source.replace("WCOD",rg),cg=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",ro),lg=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",ro),hg=new RegExp("^"+ag+og+cg+lg+"$"),ug=["material","materials","bones","map"],Ka=class{constructor(e,t,n){let s=n||it.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,s)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},it=class i{constructor(e,t,n){this.path=t,this.parsedPath=n||i.parseTrackName(t),this.node=i.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new i.Composite(e,t,n):new i(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(sg,"")}static parseTrackName(e){let t=hg.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);ug.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(r){for(let o=0;o<r.length;o++){let a=r[o];if(a.name===t||a.uuid===t)return a;let c=n(a.children);if(c)return c}return null},s=n(e.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)e[t++]=n[s]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,s=t.propertyName,r=t.propertyIndex;if(e||(e=i.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===l){l=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(l!==void 0){if(e[l]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[l]}}let o=e[s];if(o===void 0){let l=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+l+"."+s+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.needsUpdate!==void 0?a=this.Versioning.NeedsUpdate:e.matrixWorldNeedsUpdate!==void 0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=s;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};it.Composite=Ka;it.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};it.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};it.prototype.GetterByBindingType=[it.prototype._getValue_direct,it.prototype._getValue_array,it.prototype._getValue_arrayElement,it.prototype._getValue_toArray];it.prototype.SetterByBindingTypeAndVersioning=[[it.prototype._setValue_direct,it.prototype._setValue_direct_setNeedsUpdate,it.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[it.prototype._setValue_array,it.prototype._setValue_array_setNeedsUpdate,it.prototype._setValue_array_setMatrixWorldNeedsUpdate],[it.prototype._setValue_arrayElement,it.prototype._setValue_arrayElement_setNeedsUpdate,it.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[it.prototype._setValue_fromArray,it.prototype._setValue_fromArray_setNeedsUpdate,it.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Og=new Float32Array(1);var is=class{constructor(e=1,t=0,n=0){return this.radius=e,this.phi=t,this.theta=n,this}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(xt(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}};var lr=class extends Ia{constructor(e=10,t=10,n=4473924,s=8947848){n=new Oe(n),s=new Oe(s);let r=t/2,o=e/t,a=e/2,c=[],l=[];for(let d=0,p=0,g=-a;d<=t;d++,g+=o){c.push(-a,0,g,a,0,g),c.push(g,0,-a,g,0,a);let x=d===r?n:s;x.toArray(l,p),p+=3,x.toArray(l,p),p+=3,x.toArray(l,p),p+=3,x.toArray(l,p),p+=3}let h=new Lt;h.setAttribute("position",new rt(c,3)),h.setAttribute("color",new rt(l,3));let u=new es({vertexColors:!0,toneMapped:!1});super(h,u),this.type="GridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}};var el=new B,Is,ca,hr=class extends vt{constructor(e=new B(0,0,1),t=new B(0,0,0),n=1,s=16776960,r=n*.2,o=r*.2){super(),this.type="ArrowHelper",Is===void 0&&(Is=new Lt,Is.setAttribute("position",new rt([0,0,0,0,1,0],3)),ca=new Pi(0,.5,1,5,1),ca.translate(0,-.5,0)),this.position.copy(t),this.line=new nr(Is,new es({color:s,toneMapped:!1})),this.line.matrixAutoUpdate=!1,this.add(this.line),this.cone=new nt(ca,new $n({color:s,toneMapped:!1})),this.cone.matrixAutoUpdate=!1,this.add(this.cone),this.setDirection(e),this.setLength(n,r,o)}setDirection(e){if(e.y>.99999)this.quaternion.set(0,0,0,1);else if(e.y<-.99999)this.quaternion.set(1,0,0,0);else{el.set(e.z,0,-e.x).normalize();let t=Math.acos(e.y);this.quaternion.setFromAxisAngle(el,t)}}setLength(e,t=e*.2,n=t*.2){this.line.scale.set(1,Math.max(1e-4,e-t),1),this.line.updateMatrix(),this.cone.scale.set(n,t,n),this.cone.position.y=e,this.cone.updateMatrix()}setColor(e){this.line.material.color.set(e),this.cone.material.color.set(e)}copy(e){return super.copy(e,!1),this.line.copy(e.line),this.cone.copy(e.cone),this}dispose(){this.line.geometry.dispose(),this.line.material.dispose(),this.cone.geometry.dispose(),this.cone.material.dispose()}};typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"160"}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="160");var bl={type:"change"},ao={type:"start"},El={type:"end"},pr=new Ri,wl=new qt,fg=Math.cos(70*Ln.DEG2RAD),mr=class extends sn{constructor(e,t){super(),this.object=e,this.domElement=t,this.domElement.style.touchAction="none",this.enabled=!0,this.target=new B,this.cursor=new B,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:jn.ROTATE,MIDDLE:jn.DOLLY,RIGHT:jn.PAN},this.touches={ONE:Qn.ROTATE,TWO:Qn.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this.getPolarAngle=function(){return a.phi},this.getAzimuthalAngle=function(){return a.theta},this.getDistance=function(){return this.object.position.distanceTo(this.target)},this.listenToKeyEvents=function(I){I.addEventListener("keydown",pe),this._domElementKeyEvents=I},this.stopListenToKeyEvents=function(){this._domElementKeyEvents.removeEventListener("keydown",pe),this._domElementKeyEvents=null},this.saveState=function(){n.target0.copy(n.target),n.position0.copy(n.object.position),n.zoom0=n.object.zoom},this.reset=function(){n.target.copy(n.target0),n.object.position.copy(n.position0),n.object.zoom=n.zoom0,n.object.updateProjectionMatrix(),n.dispatchEvent(bl),n.update(),r=s.NONE},this.update=(function(){let I=new B,me=new Kt().setFromUnitVectors(e.up,new B(0,1,0)),Se=me.clone().invert(),_e=new B,Ce=new Kt,Xe=new B,$e=2*Math.PI;return function(Me=null){let O=n.object.position;I.copy(O).sub(n.target),I.applyQuaternion(me),a.setFromVector3(I),n.autoRotate&&r===s.NONE&&X(_(Me)),n.enableDamping?(a.theta+=c.theta*n.dampingFactor,a.phi+=c.phi*n.dampingFactor):(a.theta+=c.theta,a.phi+=c.phi);let xe=n.minAzimuthAngle,ye=n.maxAzimuthAngle;isFinite(xe)&&isFinite(ye)&&(xe<-Math.PI?xe+=$e:xe>Math.PI&&(xe-=$e),ye<-Math.PI?ye+=$e:ye>Math.PI&&(ye-=$e),xe<=ye?a.theta=Math.max(xe,Math.min(ye,a.theta)):a.theta=a.theta>(xe+ye)/2?Math.max(xe,a.theta):Math.min(ye,a.theta)),a.phi=Math.max(n.minPolarAngle,Math.min(n.maxPolarAngle,a.phi)),a.makeSafe(),n.enableDamping===!0?n.target.addScaledVector(h,n.dampingFactor):n.target.add(h),n.target.sub(n.cursor),n.target.clampLength(n.minTargetRadius,n.maxTargetRadius),n.target.add(n.cursor),n.zoomToCursor&&N||n.object.isOrthographicCamera?a.radius=F(a.radius):a.radius=F(a.radius*l),I.setFromSpherical(a),I.applyQuaternion(Se),O.copy(n.target).add(I),n.object.lookAt(n.target),n.enableDamping===!0?(c.theta*=1-n.dampingFactor,c.phi*=1-n.dampingFactor,h.multiplyScalar(1-n.dampingFactor)):(c.set(0,0,0),h.set(0,0,0));let Ne=!1;if(n.zoomToCursor&&N){let Le=null;if(n.object.isPerspectiveCamera){let Je=I.length();Le=F(Je*l);let Ke=Je-Le;n.object.position.addScaledVector(D,Ke),n.object.updateMatrixWorld()}else if(n.object.isOrthographicCamera){let Je=new B(H.x,H.y,0);Je.unproject(n.object),n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom/l)),n.object.updateProjectionMatrix(),Ne=!0;let Ke=new B(H.x,H.y,0);Ke.unproject(n.object),n.object.position.sub(Ke).add(Je),n.object.updateMatrixWorld(),Le=I.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),n.zoomToCursor=!1;Le!==null&&(this.screenSpacePanning?n.target.set(0,0,-1).transformDirection(n.object.matrix).multiplyScalar(Le).add(n.object.position):(pr.origin.copy(n.object.position),pr.direction.set(0,0,-1).transformDirection(n.object.matrix),Math.abs(n.object.up.dot(pr.direction))<fg?e.lookAt(n.target):(wl.setFromNormalAndCoplanarPoint(n.object.up,n.target),pr.intersectPlane(wl,n.target))))}else n.object.isOrthographicCamera&&(n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom/l)),n.object.updateProjectionMatrix(),Ne=!0);return l=1,N=!1,Ne||_e.distanceToSquared(n.object.position)>o||8*(1-Ce.dot(n.object.quaternion))>o||Xe.distanceToSquared(n.target)>0?(n.dispatchEvent(bl),_e.copy(n.object.position),Ce.copy(n.object.quaternion),Xe.copy(n.target),!0):!1}})(),this.dispose=function(){n.domElement.removeEventListener("contextmenu",Ee),n.domElement.removeEventListener("pointerdown",ge),n.domElement.removeEventListener("pointercancel",y),n.domElement.removeEventListener("wheel",ue),n.domElement.removeEventListener("pointermove",S),n.domElement.removeEventListener("pointerup",y),n._domElementKeyEvents!==null&&(n._domElementKeyEvents.removeEventListener("keydown",pe),n._domElementKeyEvents=null)};let n=this,s={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},r=s.NONE,o=1e-6,a=new is,c=new is,l=1,h=new B,u=new Re,d=new Re,p=new Re,g=new Re,x=new Re,m=new Re,f=new Re,T=new Re,v=new Re,D=new B,H=new Re,N=!1,b=[],z={};function _(I){return I!==null?2*Math.PI/60*n.autoRotateSpeed*I:2*Math.PI/60/60*n.autoRotateSpeed}function M(I){let me=Math.abs(I)/(100*(window.devicePixelRatio|0));return Math.pow(.95,n.zoomSpeed*me)}function X(I){c.theta-=I}function ee(I){c.phi-=I}let le=(function(){let I=new B;return function(Se,_e){I.setFromMatrixColumn(_e,0),I.multiplyScalar(-Se),h.add(I)}})(),P=(function(){let I=new B;return function(Se,_e){n.screenSpacePanning===!0?I.setFromMatrixColumn(_e,1):(I.setFromMatrixColumn(_e,0),I.crossVectors(n.object.up,I)),I.multiplyScalar(Se),h.add(I)}})(),q=(function(){let I=new B;return function(Se,_e){let Ce=n.domElement;if(n.object.isPerspectiveCamera){let Xe=n.object.position;I.copy(Xe).sub(n.target);let $e=I.length();$e*=Math.tan(n.object.fov/2*Math.PI/180),le(2*Se*$e/Ce.clientHeight,n.object.matrix),P(2*_e*$e/Ce.clientHeight,n.object.matrix)}else n.object.isOrthographicCamera?(le(Se*(n.object.right-n.object.left)/n.object.zoom/Ce.clientWidth,n.object.matrix),P(_e*(n.object.top-n.object.bottom)/n.object.zoom/Ce.clientHeight,n.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),n.enablePan=!1)}})();function ne(I){n.object.isPerspectiveCamera||n.object.isOrthographicCamera?l/=I:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),n.enableZoom=!1)}function C(I){n.object.isPerspectiveCamera||n.object.isOrthographicCamera?l*=I:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),n.enableZoom=!1)}function A(I,me){if(!n.zoomToCursor)return;N=!0;let Se=n.domElement.getBoundingClientRect(),_e=I-Se.left,Ce=me-Se.top,Xe=Se.width,$e=Se.height;H.x=_e/Xe*2-1,H.y=-(Ce/$e)*2+1,D.set(H.x,H.y,1).unproject(n.object).sub(n.object.position).normalize()}function F(I){return Math.max(n.minDistance,Math.min(n.maxDistance,I))}function J(I){u.set(I.clientX,I.clientY)}function Y(I){A(I.clientX,I.clientX),f.set(I.clientX,I.clientY)}function j(I){g.set(I.clientX,I.clientY)}function k(I){d.set(I.clientX,I.clientY),p.subVectors(d,u).multiplyScalar(n.rotateSpeed);let me=n.domElement;X(2*Math.PI*p.x/me.clientHeight),ee(2*Math.PI*p.y/me.clientHeight),u.copy(d),n.update()}function w(I){T.set(I.clientX,I.clientY),v.subVectors(T,f),v.y>0?ne(M(v.y)):v.y<0&&C(M(v.y)),f.copy(T),n.update()}function R(I){x.set(I.clientX,I.clientY),m.subVectors(x,g).multiplyScalar(n.panSpeed),q(m.x,m.y),g.copy(x),n.update()}function U(I){A(I.clientX,I.clientY),I.deltaY<0?C(M(I.deltaY)):I.deltaY>0&&ne(M(I.deltaY)),n.update()}function V(I){let me=!1;switch(I.code){case n.keys.UP:I.ctrlKey||I.metaKey||I.shiftKey?ee(2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):q(0,n.keyPanSpeed),me=!0;break;case n.keys.BOTTOM:I.ctrlKey||I.metaKey||I.shiftKey?ee(-2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):q(0,-n.keyPanSpeed),me=!0;break;case n.keys.LEFT:I.ctrlKey||I.metaKey||I.shiftKey?X(2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):q(n.keyPanSpeed,0),me=!0;break;case n.keys.RIGHT:I.ctrlKey||I.metaKey||I.shiftKey?X(-2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):q(-n.keyPanSpeed,0),me=!0;break}me&&(I.preventDefault(),n.update())}function Z(I){if(b.length===1)u.set(I.pageX,I.pageY);else{let me=ze(I),Se=.5*(I.pageX+me.x),_e=.5*(I.pageY+me.y);u.set(Se,_e)}}function G(I){if(b.length===1)g.set(I.pageX,I.pageY);else{let me=ze(I),Se=.5*(I.pageX+me.x),_e=.5*(I.pageY+me.y);g.set(Se,_e)}}function te(I){let me=ze(I),Se=I.pageX-me.x,_e=I.pageY-me.y,Ce=Math.sqrt(Se*Se+_e*_e);f.set(0,Ce)}function ae(I){n.enableZoom&&te(I),n.enablePan&&G(I)}function L(I){n.enableZoom&&te(I),n.enableRotate&&Z(I)}function oe(I){if(b.length==1)d.set(I.pageX,I.pageY);else{let Se=ze(I),_e=.5*(I.pageX+Se.x),Ce=.5*(I.pageY+Se.y);d.set(_e,Ce)}p.subVectors(d,u).multiplyScalar(n.rotateSpeed);let me=n.domElement;X(2*Math.PI*p.x/me.clientHeight),ee(2*Math.PI*p.y/me.clientHeight),u.copy(d)}function Q(I){if(b.length===1)x.set(I.pageX,I.pageY);else{let me=ze(I),Se=.5*(I.pageX+me.x),_e=.5*(I.pageY+me.y);x.set(Se,_e)}m.subVectors(x,g).multiplyScalar(n.panSpeed),q(m.x,m.y),g.copy(x)}function ce(I){let me=ze(I),Se=I.pageX-me.x,_e=I.pageY-me.y,Ce=Math.sqrt(Se*Se+_e*_e);T.set(0,Ce),v.set(0,Math.pow(T.y/f.y,n.zoomSpeed)),ne(v.y),f.copy(T);let Xe=(I.pageX+me.x)*.5,$e=(I.pageY+me.y)*.5;A(Xe,$e)}function $(I){n.enableZoom&&ce(I),n.enablePan&&Q(I)}function fe(I){n.enableZoom&&ce(I),n.enableRotate&&oe(I)}function ge(I){n.enabled!==!1&&(b.length===0&&(n.domElement.setPointerCapture(I.pointerId),n.domElement.addEventListener("pointermove",S),n.domElement.addEventListener("pointerup",y)),Pe(I),I.pointerType==="touch"?Te(I):W(I))}function S(I){n.enabled!==!1&&(I.pointerType==="touch"?ve(I):he(I))}function y(I){Fe(I),b.length===0&&(n.domElement.releasePointerCapture(I.pointerId),n.domElement.removeEventListener("pointermove",S),n.domElement.removeEventListener("pointerup",y)),n.dispatchEvent(El),r=s.NONE}function W(I){let me;switch(I.button){case 0:me=n.mouseButtons.LEFT;break;case 1:me=n.mouseButtons.MIDDLE;break;case 2:me=n.mouseButtons.RIGHT;break;default:me=-1}switch(me){case jn.DOLLY:if(n.enableZoom===!1)return;Y(I),r=s.DOLLY;break;case jn.ROTATE:if(I.ctrlKey||I.metaKey||I.shiftKey){if(n.enablePan===!1)return;j(I),r=s.PAN}else{if(n.enableRotate===!1)return;J(I),r=s.ROTATE}break;case jn.PAN:if(I.ctrlKey||I.metaKey||I.shiftKey){if(n.enableRotate===!1)return;J(I),r=s.ROTATE}else{if(n.enablePan===!1)return;j(I),r=s.PAN}break;default:r=s.NONE}r!==s.NONE&&n.dispatchEvent(ao)}function he(I){switch(r){case s.ROTATE:if(n.enableRotate===!1)return;k(I);break;case s.DOLLY:if(n.enableZoom===!1)return;w(I);break;case s.PAN:if(n.enablePan===!1)return;R(I);break}}function ue(I){n.enabled===!1||n.enableZoom===!1||r!==s.NONE||(I.preventDefault(),n.dispatchEvent(ao),U(I),n.dispatchEvent(El))}function pe(I){n.enabled===!1||n.enablePan===!1||V(I)}function Te(I){switch(de(I),b.length){case 1:switch(n.touches.ONE){case Qn.ROTATE:if(n.enableRotate===!1)return;Z(I),r=s.TOUCH_ROTATE;break;case Qn.PAN:if(n.enablePan===!1)return;G(I),r=s.TOUCH_PAN;break;default:r=s.NONE}break;case 2:switch(n.touches.TWO){case Qn.DOLLY_PAN:if(n.enableZoom===!1&&n.enablePan===!1)return;ae(I),r=s.TOUCH_DOLLY_PAN;break;case Qn.DOLLY_ROTATE:if(n.enableZoom===!1&&n.enableRotate===!1)return;L(I),r=s.TOUCH_DOLLY_ROTATE;break;default:r=s.NONE}break;default:r=s.NONE}r!==s.NONE&&n.dispatchEvent(ao)}function ve(I){switch(de(I),r){case s.TOUCH_ROTATE:if(n.enableRotate===!1)return;oe(I),n.update();break;case s.TOUCH_PAN:if(n.enablePan===!1)return;Q(I),n.update();break;case s.TOUCH_DOLLY_PAN:if(n.enableZoom===!1&&n.enablePan===!1)return;$(I),n.update();break;case s.TOUCH_DOLLY_ROTATE:if(n.enableZoom===!1&&n.enableRotate===!1)return;fe(I),n.update();break;default:r=s.NONE}}function Ee(I){n.enabled!==!1&&I.preventDefault()}function Pe(I){b.push(I.pointerId)}function Fe(I){delete z[I.pointerId];for(let me=0;me<b.length;me++)if(b[me]==I.pointerId){b.splice(me,1);return}}function de(I){let me=z[I.pointerId];me===void 0&&(me=new Re,z[I.pointerId]=me),me.set(I.pageX,I.pageY)}function ze(I){let me=I.pointerId===b[0]?b[1]:b[0];return z[me]}n.domElement.addEventListener("contextmenu",Ee),n.domElement.addEventListener("pointerdown",ge),n.domElement.addEventListener("pointercancel",y),n.domElement.addEventListener("wheel",ue,{passive:!1}),this.update()}};var pg=(()=>{let e=["ux","uy","uz","rx","ry","rz"],n=1/Math.sqrt(3);function s(w,R=w){return Array.from({length:w},()=>new Float64Array(R))}function r(w){return new Float64Array(w)}function o(w,R){return w[0]*R[0]+w[1]*R[1]+w[2]*R[2]}function a(w,R){return[w[0]-R[0],w[1]-R[1],w[2]-R[2]]}function c(w,R){return[w[1]*R[2]-w[2]*R[1],w[2]*R[0]-w[0]*R[2],w[0]*R[1]-w[1]*R[0]]}function l(w){return Math.sqrt(o(w,w))}function h(w,R){let U=l(w);if(U<1e-12)throw new Error(`${R} has near-zero length`);return w.map(V=>V/U)}function u(w){return[Number(w.x),Number(w.y??0),Number(w.z??0)]}function d(w,R){if(!Array.isArray(w)||w.length!==4)throw new Error("shell4 requires four nodes ordered counter-clockwise");for(let[G,te]of w.entries())if(!u(te).every(Number.isFinite))throw new Error(`shell4 node ${G} is invalid`);let{E:U,nu:V,t:Z}=R;if(!(U>0))throw new Error("shell4 material E must be positive");if(!(Z>0))throw new Error("shell4 thickness t must be positive");if(!(V>-.999&&V<.499))throw new Error("shell4 Poisson ratio nu must be between -0.999 and 0.499")}function p(w,R=1e-5){let U=w.map(u),V=h(a(U[1],U[0]),"shell local x axis"),Z=c(a(U[1],U[0]),a(U[3],U[0])),G=h(Z,"shell normal"),te=h(c(G,V),"shell local y axis"),ae=[l(a(U[1],U[0])),l(a(U[2],U[1])),l(a(U[3],U[2])),l(a(U[0],U[3]))],L=Math.max(...ae,1),oe=Math.max(...U.map(ce=>Math.abs(o(a(ce,U[0]),G))));if(oe>R*L)throw new Error(`shell4 is not planar: warping=${oe.toExponential(3)}, limit=${(R*L).toExponential(3)}`);let Q=U.map(ce=>{let $=a(ce,U[0]);return[o($,V),o($,te)]});return{origin:U[0],ex:V,ey:te,ez:G,localXY:Q,warping:oe,lengthScale:L}}function g(w,R){return{N:new Float64Array([.25*(1-w)*(1-R),.25*(1+w)*(1-R),.25*(1+w)*(1+R),.25*(1-w)*(1+R)]),dXi:new Float64Array([-.25*(1-R),.25*(1-R),.25*(1+R),-.25*(1+R)]),dEta:new Float64Array([-.25*(1-w),-.25*(1+w),.25*(1+w),.25*(1-w)])}}function x(w,R,U){let{N:V,dXi:Z,dEta:G}=g(R,U),te=0,ae=0,L=0,oe=0;for(let W=0;W<4;W++)te+=Z[W]*w[W][0],ae+=Z[W]*w[W][1],L+=G[W]*w[W][0],oe+=G[W]*w[W][1];let Q=te*oe-ae*L;if(!(Q>1e-12))throw new Error(`shell4 has non-positive Jacobian detJ=${Q}`);let ce=oe/Q,$=-ae/Q,fe=-L/Q,ge=te/Q,S=new Float64Array(4),y=new Float64Array(4);for(let W=0;W<4;W++)S[W]=ce*Z[W]+$*G[W],y[W]=fe*Z[W]+ge*G[W];return{N:V,dXi:Z,dEta:G,dX:S,dY:y,detJ:Q,jacobian:[[te,ae],[L,oe]],inverseJacobian:[[ce,$],[fe,ge]]}}function m(w,R){let U=w/(1-R*R);return[new Float64Array([U,U*R,0]),new Float64Array([U*R,U,0]),new Float64Array([0,0,U*(1-R)/2])]}function f(w){let{N:R,dX:U,dY:V}=w,Z=s(3,24),G=s(3,24),te=s(2,24),ae=s(1,24);for(let L=0;L<4;L++){let oe=6*L;Z[0][oe]=U[L],Z[1][oe+1]=V[L],Z[2][oe]=V[L],Z[2][oe+1]=U[L],G[0][oe+4]=U[L],G[1][oe+3]=-V[L],G[2][oe+3]=-U[L],G[2][oe+4]=V[L],te[0][oe+2]=U[L],te[0][oe+4]=R[L],te[1][oe+2]=V[L],te[1][oe+3]=-R[L],ae[0][oe]=.5*V[L],ae[0][oe+1]=-.5*U[L],ae[0][oe+5]=R[L]}return{Bm:Z,Bb:G,Bs:te,Bd:ae}}function T(w,R,U,V){let Z=x(w,R,U),{Bs:G}=f(Z),[[te,ae],[L,oe]]=Z.jacobian,Q=V==="xi"?te:L,ce=V==="xi"?ae:oe,$=new Float64Array(24);for(let fe=0;fe<24;fe++)$[fe]=Q*G[0][fe]+ce*G[1][fe];return $}function v(w,R,U){let V=T(w,0,-1,"xi"),Z=T(w,0,1,"xi"),G=T(w,-1,0,"eta"),te=T(w,1,0,"eta"),ae=new Float64Array(24),L=new Float64Array(24);for(let S=0;S<24;S++)ae[S]=.5*((1-U)*V[S]+(1+U)*Z[S]),L[S]=.5*((1-R)*G[S]+(1+R)*te[S]);let oe=x(w,R,U),[[Q,ce],[$,fe]]=oe.inverseJacobian,ge=s(2,24);for(let S=0;S<24;S++)ge[0][S]=Q*ae[S]+ce*L[S],ge[1][S]=$*ae[S]+fe*L[S];return ge}function D(w,R,U,V){let Z=w.length,G=R.length,te=s(G,Z);for(let ae=0;ae<G;ae++)for(let L=0;L<Z;L++){let oe=0;for(let Q=0;Q<G;Q++)oe+=U[ae][Q]*R[Q][L];te[ae][L]=oe}for(let ae=0;ae<Z;ae++)for(let L=0;L<Z;L++){let oe=0;for(let Q=0;Q<G;Q++)oe+=R[Q][ae]*te[Q][L];w[ae][L]+=V*oe}}function H(w,R,U){for(let V=0;V<R.length;V++)if(R[V]!==0)for(let Z=0;Z<R.length;Z++)R[Z]!==0&&(w[V][Z]+=U*R[V]*R[Z])}function N(w){let R=s(24),U=[w.ex,w.ey,w.ez];for(let V=0;V<4;V++){let Z=6*V;for(let G=0;G<2;G++){let te=Z+3*G;for(let ae=0;ae<3;ae++)for(let L=0;L<3;L++)R[te+ae][te+L]=U[ae][L]}}return R}function b(w,R){let U=w.length,V=s(U),Z=s(U);for(let G=0;G<U;G++)for(let te=0;te<U;te++){let ae=w[G][te];if(ae!==0)for(let L=0;L<U;L++)V[G][L]+=ae*R[te][L]}for(let G=0;G<U;G++)for(let te=0;te<U;te++){let ae=R[te][G];if(ae!==0)for(let L=0;L<U;L++)Z[G][L]+=ae*V[te][L]}return Z}function z(w,R){let U=new Float64Array(w.length);for(let V=0;V<w.length;V++)for(let Z=0;Z<R.length;Z++)U[V]+=w[V][Z]*R[Z];return U}function _(w,R){let U=new Float64Array(w.length);for(let V=0;V<w.length;V++)for(let Z=0;Z<R.length;Z++)U[V]+=w[Z][V]*R[Z];return U}function M(w,R){d(w,R);let U=p(w,R.planarityTolerance??1e-5),{E:V,nu:Z,t:G}=R,te=R.shearCorrection??5/6,ae=R.drillFactor??.001,L=m(V,Z),oe=V/(2*(1+Z)),Q=[new Float64Array([te*oe*G,0]),new Float64Array([0,te*oe*G])],ce=s(24),$=[-n,n],fe=0;for(let y of $)for(let W of $){let he=x(U.localXY,y,W),{Bm:ue,Bb:pe,Bd:Te}=f(he),ve=v(U.localXY,y,W);fe+=he.detJ,D(ce,ue,L,G*he.detJ),D(ce,pe,L,G**3/12*he.detJ),D(ce,ve,Q,he.detJ),H(ce,Te[0],ae*V*G*he.detJ)}let ge=N(U);return{K:b(ce,ge),Klocal:ce,T:ge,frame:U,area:fe,diagnostics:{shearCorrection:te,shearInterpolation:"MITC4",drillFactor:ae}}}function X(w,R){let U=p(w),V=new Float64Array(24);for(let Z of[-n,n])for(let G of[-n,n]){let te=x(U.localXY,Z,G);for(let ae=0;ae<4;ae++)V[6*ae+2]+=R*te.N[ae]*te.detJ}return _(N(U),V)}function ee(w,R,U=1e-7){let V=p(w),Z=Array.isArray(R)?R:u(R),G=a(Z,V.origin),te=o(G,V.ex),ae=o(G,V.ey),L=o(G,V.ez),oe=0,Q=0,ce=!1;for(let fe=0;fe<15;fe++){let ge=x(V.localXY,oe,Q),S=0,y=0;for(let de=0;de<4;de++)S+=ge.N[de]*V.localXY[de][0],y+=ge.N[de]*V.localXY[de][1];let W=S-te,he=y-ae,[[ue,pe],[Te,ve]]=ge.jacobian,Ee=ue*ve-Te*pe,Pe=(ve*W-Te*he)/Ee,Fe=(-pe*W+ue*he)/Ee;if(oe-=Pe,Q-=Fe,Math.hypot(Pe,Fe)<1e-11){ce=!0;break}}return{inside:ce&&Math.abs(oe)<=1+U&&Math.abs(Q)<=1+U,xi:oe,eta:Q,distance:L,N:g(oe,Q).N,frame:V}}function le(w,R,U){let V=ee(w,R);if(!V.inside)return null;let Z=new Float64Array(24);for(let G=0;G<4;G++)Z[6*G]=V.N[G]*U[0],Z[6*G+1]=V.N[G]*U[1],Z[6*G+2]=V.N[G]*U[2];return{load:Z,mapping:V}}function P(w,R){let U=new Float64Array(w.length);for(let V=0;V<w.length;V++)for(let Z=0;Z<R.length;Z++)U[V]+=w[V][Z]*R[Z];return U}function q(w){let[R,U,V]=w;return Math.sqrt(R*R-R*U+U*U+3*V*V)}function ne(w,R,U){if(U.length!==24)throw new Error("shell4Response expects 24 global DOFs");let V=M(w,R);return C(V,R,U)}function C(w,R,U){if(U.length!==24)throw new Error("shell4ResponseFromElement expects 24 global DOFs");let V=z(w.T,U),Z=m(R.E,R.nu),G=R.E/(2*(1+R.nu)),te=R.shearCorrection??5/6,ae=[[-n,-n],[n,-n],[n,n],[-n,n],[0,0]],L=[],oe=0;for(let[Q,ce]of ae){let $=x(w.frame.localXY,Q,ce),{Bm:fe,Bb:ge}=f($),S=v(w.frame.localXY,Q,ce),y=P(fe,V),W=P(ge,V),he=P(S,V),ue=new Float64Array(3),pe=new Float64Array(3);for(let ze=0;ze<3;ze++)ue[ze]=y[ze]+.5*R.t*W[ze],pe[ze]=y[ze]-.5*R.t*W[ze];let Te=P(Z,ue),ve=P(Z,pe),Ee=new Float64Array([te*G*he[0],te*G*he[1]]),Pe=q(Te),Fe=q(ve),de=Math.hypot(...Ee);oe=Math.max(oe,Pe,Fe),L.push({xi:Q,eta:ce,membraneStrain:y,curvature:W,shearStrain:he,topStress:Te,bottomStress:ve,transverseShear:Ee,transverseShearMagnitude:de,vonMisesTop:Pe,vonMisesBottom:Fe})}return{...w,uLocal:V,points:L,center:L[4],maxVonMises:oe}}function A(w){let R=w.nodes.length*6,U=s(R),V=[];for(let Z of w.elements){if(Z.type&&Z.type!=="shell4")continue;let G=Z.nodes??[Z.n1,Z.n2,Z.n3,Z.n4];if(G.length!==4)throw new Error(`element ${Z.id??"?"} needs four nodes`);let te=G.map(Q=>w.nodes[Q]),ae=w.properties[Z.group]??w.properties.default;if(!ae)throw new Error(`no material for shell group ${Z.group}`);let L=M(te,ae),oe=G.flatMap(Q=>Array.from({length:6},(ce,$)=>6*Q+$));for(let Q=0;Q<24;Q++)for(let ce=0;ce<24;ce++)U[oe[Q]][oe[ce]]+=L.K[Q][ce];V.push({element:Z,indices:G,nodes:te,material:ae,dofs:oe,...L})}return{K:U,ndof:R,elementData:V}}function F(w,R=[]){for(let U of R){let V=6*U.node,Z=[U.fx,U.fy,U.fz,U.mx,U.my,U.mz];for(let G=0;G<6;G++)w[V+G]+=Number(Z[G]??0)}return w}function J(w=[]){let R=new Set;for(let U of w){let V=6*U.node;for(let Z=0;Z<6;Z++)U[e[Z]]&&R.add(V+Z)}return[...R].sort((U,V)=>U-V)}function Y(w,R,U=1e-13){let V=new Set(R),Z=Array.from({length:w.length},(oe,Q)=>Q).filter(oe=>!V.has(oe)),G=Z.length,te=s(G),ae=0;for(let oe=0;oe<G;oe++)ae=Math.max(ae,Math.abs(w[Z[oe]][Z[oe]]));let L=Math.max(ae*U,1e-12);for(let oe=0;oe<G;oe++)for(let Q=0;Q<=oe;Q++){let ce=w[Z[oe]][Z[Q]];for(let $=0;$<Q;$++)ce-=te[oe][$]*te[Q][$];if(oe===Q){if(!(ce>L))throw new Error(`shell system is singular/indefinite at reduced DOF ${oe}: ${ce}`);te[oe][Q]=Math.sqrt(ce)}else te[oe][Q]=ce/te[Q][Q]}return{L:te,free:Z,totalDofs:w.length}}function j(w,R){let{L:U,free:V,totalDofs:Z}=w,G=V.length,te=new Float64Array(G),ae=new Float64Array(G);for(let oe=0;oe<G;oe++){let Q=R[V[oe]];for(let ce=0;ce<oe;ce++)Q-=U[oe][ce]*te[ce];te[oe]=Q/U[oe][oe]}for(let oe=G-1;oe>=0;oe--){let Q=te[oe];for(let ce=oe+1;ce<G;ce++)Q-=U[ce][oe]*ae[ce];ae[oe]=Q/U[oe][oe]}let L=new Float64Array(Z);for(let oe=0;oe<G;oe++)L[V[oe]]=ae[oe];return L}function k(w,R){return Float64Array.from(R,U=>w[U])}return{DOF_PER_NODE:6,DOF_NAMES:e,zeros:s,vecZeros:r,shellLocalFrame:p,q4Shape:g,q4Geometry:x,shellStrainMatrices:f,mitc4ShearMatrix:v,transformVector:z,transformVectorTranspose:_,shell4Stiffness:M,shell4PressureLoad:X,mapPointToShell4:ee,shell4PointLoad:le,shell4Response:ne,shell4ResponseFromElement:C,assembleShellModel:A,applyNodalLoads:F,constrainedDofs:J,factorConstrainedSystem:Y,solveFactoredSystem:j,elementDisplacements:k}})(),{DOF_PER_NODE:Hg,DOF_NAMES:Vg,zeros:Gg,vecZeros:mg,shellLocalFrame:Wg,q4Shape:Xg,q4Geometry:qg,shellStrainMatrices:Yg,mitc4ShearMatrix:Zg,transformVector:$g,transformVectorTranspose:Jg,shell4Stiffness:Kg,shell4PressureLoad:jg,mapPointToShell4:Qg,shell4PointLoad:gg,shell4Response:e0,shell4ResponseFromElement:_g,assembleShellModel:xg,applyNodalLoads:t0,constrainedDofs:yg,factorConstrainedSystem:vg,solveFactoredSystem:Mg,elementDisplacements:Sg}=pg,bg=(()=>{let e=["ux","uy","uz","rx","ry","rz"],t=["Fx1","Fy1","Fz1","Mx1","My1","Mz1","Fx2","Fy2","Fz2","Mx2","My2","Mz2"];function s(C,A=C){return Array.from({length:C},()=>new Float64Array(A))}function r(C){return Array.isArray(C)||ArrayBuffer.isView(C)?[Number(C[0]),Number(C[1]??0),Number(C[2]??0)]:[Number(C.x),Number(C.y??0),Number(C.z??0)]}function o(C,A){return C[0]*A[0]+C[1]*A[1]+C[2]*A[2]}function a(C,A){return[C[1]*A[2]-C[2]*A[1],C[2]*A[0]-C[0]*A[2],C[0]*A[1]-C[1]*A[0]]}function c(C,A){return[C[0]-A[0],C[1]-A[1],C[2]-A[2]]}function l(C,A){return[C[0]*A,C[1]*A,C[2]*A]}function h(C){return Math.sqrt(o(C,C))}function u(C,A){let F=h(C);if(!(F>1e-12))throw new Error(`${A} has near-zero length`);return l(C,1/F)}function d(C,A){let F=new Float64Array(C.length);for(let J=0;J<C.length;J++)for(let Y=0;Y<A.length;Y++)F[J]+=C[J][Y]*A[Y];return F}function p(C,A){let F=C.length,J=s(F),Y=s(F);for(let j=0;j<F;j++)for(let k=0;k<F;k++){let w=C[j][k];if(w!==0)for(let R=0;R<F;R++)A[k][R]!==0&&(J[j][R]+=w*A[k][R])}for(let j=0;j<F;j++)for(let k=0;k<F;k++){let w=A[k][j];if(w!==0)for(let R=0;R<F;R++)Y[j][R]+=w*J[k][R]}return Y}function g(C,A){if(!Array.isArray(C)||C.length!==2)throw new Error(`${A} requires exactly two nodes`);let F=C.map(r);if(!F.every(J=>J.every(Number.isFinite)))throw new Error(`${A} node coordinates must be finite`);return F}function x(C,A){if(!(Number(C)>0))throw new Error(`${A} must be positive`);return Number(C)}function m(C,A=[0,1,0]){let[F,J]=g(C,"frame3dLocalAxes"),Y=c(J,F),j=h(Y);if(!(j>1e-12))throw new Error("frame3d member has near-zero length");let k=l(Y,1/j),w=r(A);if(!w.every(Number.isFinite)||h(w)<=1e-12)throw new Error("frame3d localY reference must be a finite non-zero vector");let R=c(w,l(k,o(w,k))),U=!1;h(R)<=1e-10*Math.max(h(w),1)&&(w=[[1,0,0],[0,1,0],[0,0,1]].reduce((te,ae)=>Math.abs(o(ae,k))<Math.abs(o(te,k))?ae:te),R=c(w,l(k,o(w,k))),U=!0);let V=u(R,"frame3d local y axis"),Z=u(a(k,V),"frame3d local z axis");return{origin:F,length:j,ex:k,ey:V,ez:Z,usedFallback:U,localYReference:w}}function f(C){let A=s(12),F=[C.ex,C.ey,C.ez];for(let J=0;J<2;J++){let Y=6*J;for(let j=0;j<2;j++){let k=Y+3*j;for(let w=0;w<3;w++)for(let R=0;R<3;R++)A[k+w][k+R]=F[w][R]}}return A}function T(C,A){let F=x(C,"frame3d length"),J=x(A.E,"frame3d E"),Y=x(A.G,"frame3d G"),j=x(A.A,"frame3d A"),k=x(A.Iy,"frame3d Iy"),w=x(A.Iz,"frame3d Iz"),R=x(A.J,"frame3d J"),U=s(12),V=(G,te,ae)=>{U[G][G]+=ae,U[G][te]-=ae,U[te][G]-=ae,U[te][te]+=ae};V(0,6,J*j/F),V(3,9,Y*R/F);let Z=(G,te,ae)=>{let[L,oe,Q,ce]=G,$=12*te/F**3,fe=ae*6*te/F**2,ge=4*te/F,S=2*te/F,y=[[$,fe,-$,fe],[fe,ge,-fe,S],[-$,-fe,$,-fe],[fe,S,-fe,ge]],W=[L,oe,Q,ce];for(let he=0;he<4;he++)for(let ue=0;ue<4;ue++)U[W[he]][W[ue]]+=y[he][ue]};return Z([1,5,7,11],J*w,1),Z([2,4,8,10],J*k,-1),U}function v(C,A,F={}){let J=F.localY??A.localY??[0,1,0],Y=m(C,J),j=T(Y.length,A),k=f(Y);return{K:p(j,k),Klocal:j,T:k,axes:Y,length:Y.length,section:A}}function D(C,A){let[F,J]=g(C,"truss3dStiffness"),Y=c(J,F),j=h(Y);if(!(j>1e-12))throw new Error("truss3d member has near-zero length");let k=x(A.E,"truss3d E"),w=x(A.A,"truss3d A"),R=l(Y,1/j),U=s(12),V=k*w/j;for(let Z=0;Z<3;Z++)for(let G=0;G<3;G++){let te=V*R[Z]*R[G];U[Z][G]+=te,U[Z][6+G]-=te,U[6+Z][G]-=te,U[6+Z][6+G]+=te}return{K:U,length:j,ex:R,section:A,nodes:[F,J]}}function H(C,A){if(A.length!==12)throw new Error("frame3d vector must have 12 entries");return d(C,A)}function N(C,A){if(A.length!==12)throw new Error("frame3d vector must have 12 entries");let F=new Float64Array(12);for(let J=0;J<12;J++)for(let Y=0;Y<12;Y++)F[J]+=C[Y][J]*A[Y];return F}function b(C,A,F=0,J=0){let Y=C.N/A.A,j=C.My*J/A.Iy,k=-C.Mz*F/A.Iz,w=Y+j+k,R=Number(A.Wt)>0?C.T/A.Wt:null;return{y:F,z:J,sigmaX:w,sigmaAxial:Y,sigmaBendingY:j,sigmaBendingZ:k,tauTorsion:R}}function z(C){let A=(F,J)=>({N:J*C[F],Vy:J*C[F+1],Vz:J*C[F+2],T:J*C[F+3],My:J*C[F+4],Mz:J*C[F+5]});return{node1:A(0,-1),node2:A(6,1)}}function _(C,A,F,J={}){if(F.length!==12)throw new Error("frame3dResponse expects 12 global DOFs");let Y=J.element??v(C,A,J),j=H(Y.T,F),k=d(Y.Klocal,j),w=J.equivalentNodalLoadLocal;if(w){if(w.length!==12)throw new Error("equivalentNodalLoadLocal must have 12 entries");for(let G=0;G<12;G++)k[G]-=w[G]}let R=N(Y.T,k),U=z(k),V=A.fibers??(Number(A.yMax)>=0&&Number(A.zMax)>=0?[{name:"+y+z",y:A.yMax,z:A.zMax},{name:"-y+z",y:-A.yMax,z:A.zMax},{name:"-y-z",y:-A.yMax,z:-A.zMax},{name:"+y-z",y:A.yMax,z:-A.zMax}]:[]),Z={};for(let[G,te]of Object.entries(U))Z[G]=V.map((ae,L)=>({name:ae.name??`fiber-${L+1}`,...b(te,A,ae.y,ae.z)}));return{...Y,uGlobal:Float64Array.from(F),uLocal:j,qLocal:k,qGlobal:R,forceNames:t,sectionResultants:U,stresses:Z}}function M(C,A,F,J={}){if(F.length!==12)throw new Error("truss3dResponse expects 12 global DOFs");let Y=J.element??D(C,A),j=[F[6]-F[0],F[7]-F[1],F[8]-F[2]],k=o(j,Y.ex),w=k/Y.length,R=A.E*w,U=A.A*R,V=d(Y.K,F);return{...Y,uGlobal:Float64Array.from(F),extension:k,strain:w,stress:R,axialForce:U,qGlobal:V,tension:U>=0}}function X(C){if(!Array.isArray(C)||C.length!==2)throw new Error("line element needs two node indices");return C.flatMap(A=>Array.from({length:6},(F,J)=>6*A+J))}function ee(C,A,F,J=1){if(A.length!==F.length)throw new Error("element DOF/matrix size mismatch");for(let Y=0;Y<A.length;Y++){if(!C[A[Y]])throw new Error(`global matrix is missing row ${A[Y]}`);for(let j=0;j<A.length;j++){if(A[j]>=C.length)throw new Error(`global matrix is missing column ${A[j]}`);C[A[Y]][A[j]]+=J*F[Y][j]}}return C}function le(C){let A=C.nodes??[C.n1,C.n2];if(!Array.isArray(A)||A.length!==2)throw new Error(`line element ${C.id??"?"} needs two nodes`);return A}function P(C,A){let F=A.nodes.length*6;if(!Array.isArray(C)||C.length<F)throw new Error(`global matrix needs at least ${F} rows`);let J=[];for(let Y of A.elements??[]){let j=(Y.type??"").toLowerCase();if(!["frame3d","truss3d"].includes(j))continue;let k=le(Y),w=k.map(Z=>{if(!A.nodes[Z])throw new Error(`line element node ${Z} does not exist`);return A.nodes[Z]}),R=A.properties?.[Y.group]??A.properties?.default;if(!R)throw new Error(`no property for line group ${Y.group??"default"}`);let U=j==="frame3d"?v(w,R,{localY:Y.localY??R.localY}):D(w,R),V=X(k);ee(C,V,U.K),J.push({element:Y,type:j,indices:k,nodes:w,property:R,dofs:V,...U})}return{K:C,ndof:C.length,elementData:J}}function q(C,A=null){let F=C.nodes.length*6,J=A??s(F);return P(J,C)}function ne(C,A){return Float64Array.from(A,F=>C[F])}return{LINE_DOF_PER_NODE:6,FRAME3D_DOF_NAMES:e,FRAME3D_FORCE_NAMES:t,frameZeros:s,frame3dLocalAxes:m,frame3dTransformation:f,frame3dLocalStiffness:T,frame3dStiffness:v,truss3dStiffness:D,frame3dTransformVector:H,frame3dTransformVectorTranspose:N,frame3dFiberStress:b,frame3dResponse:_,truss3dResponse:M,lineElementDofs:X,addLineElementMatrix:ee,assembleFrameTrussInto:P,assembleFrameTrussModel:q,lineElementDisplacements:ne}})(),{LINE_DOF_PER_NODE:n0,FRAME3D_DOF_NAMES:i0,FRAME3D_FORCE_NAMES:s0,frameZeros:r0,frame3dLocalAxes:a0,frame3dTransformation:o0,frame3dLocalStiffness:c0,frame3dStiffness:l0,truss3dStiffness:h0,frame3dTransformVector:u0,frame3dTransformVectorTranspose:d0,frame3dFiberStress:f0,frame3dResponse:Tl,truss3dResponse:p0,lineElementDofs:m0,addLineElementMatrix:g0,assembleFrameTrussInto:Eg,assembleFrameTrussModel:_0,lineElementDisplacements:Al}=bg,wg=(()=>{let i=Object.freeze({connected:!0,formulation:"MITC4 shell + 3D Euler-Bernoulli frame",analysis:"linear small-displacement quasi-static moving-load influence history",structuralSystem:"deck arch: deck/girders -> spandrel columns -> twin arch ribs -> arch-spring supports"}),e=21e10,t=e/(2*(1+.3)),n=1e-9;function s(b,z){let _=Number(b);return Number.isFinite(_)?_:z}function r(b,z,_){return Math.max(z,Math.min(_,b))}function o(b={}){let z=Math.max(4,Math.round(s(b.mesh?.nx,12))),_=Math.max(2,Math.round(s(b.mesh?.ny??b.mesh?.nz,4))),M=Math.max(4,s(b.bridge?.length,64)),X=Math.max(2,s(b.bridge?.width,10)),ee=(b.train?.axleOffsets??[]).map(Number).filter(Number.isFinite);return{bridge:{length:M,width:X,archRise:Math.max(.5,s(b.bridge?.archRise,12.8)),crownClearance:Math.max(.25,s(b.bridge?.crownClearance,2.5))},material:{E:Math.max(1e6,s(b.material?.E,345e8)),nu:r(s(b.material?.nu,.2),-.95,.49)},sections:{archArea:Math.max(1e-4,s(b.sections?.archArea,.85)),deckThickness:Math.max(.02,s(b.sections?.deckThickness,.42)),columnArea:Math.max(1e-4,s(b.sections?.columnArea,.22))},mesh:{nx:z,ny:_},train:{axleLoad:Math.max(0,s(b.train?.axleLoad,16e4)),axleOffsets:ee.length?ee:[1.8,4.3,14.2,16.7],trackOffset:r(s(b.train?.trackOffset,0),-.45*X,.45*X),loadSpread:Math.max(0,s(b.train?.loadSpread,.55))},positions:{count:Math.max(2,Math.round(s(b.positions?.count,121))),headStart:s(b.positions?.headStart,-2),headEnd:s(b.positions?.headEnd,M+Math.max(...ee,0)+2)}}}function a(b,z,_){let M=z/_;return{...b,A:z,Iy:b.Iy*M*M,Iz:b.Iz*M*M,J:b.J*M*M,yMax:b.yMax*Math.sqrt(M),zMax:b.zMax*Math.sqrt(M),Wt:b.Wt*M**1.5}}function c(b,z,_,M,X,ee=[0,1,0],le={}){b.push({id:z,type:"frame3d",nodes:[_,M],group:X,localY:ee,...le})}function l(b={}){let z=o(b),{length:_,width:M,archRise:X,crownClearance:ee}=z.bridge,le=X+ee,{nx:P,ny:q}=z.mesh,ne=[],C=[],A=Array.from({length:q+1},()=>Array(P+1)),F=($,fe,ge,S={})=>{let y=ne.length,W=Object.assign({index:y,x:$,y:fe,z:ge},S);return ne.push(W),W};for(let $=0;$<=q;$++)for(let fe=0;fe<=P;fe++)A[$][fe]=F(_*fe/P,-M/2+M*$/q,le,{kind:"deck",i:fe,j:$}).index;let J=ne.length,Y=Array.from({length:q},()=>Array(P));for(let $=0;$<q;$++)for(let fe=0;fe<P;fe++){let ge={id:`deck-${fe}-${$}`,type:"shell4",nodes:[A[$][fe],A[$][fe+1],A[$+1][fe+1],A[$+1][fe]],group:"deck",cell:[fe,$]};Y[$][fe]=C.length,C.push(ge)}let j=[[],[]];for(let $=0;$<2;$++)for(let fe=0;fe<=P;fe++){let ge=_*fe/P,S=4*X*ge*(_-ge)/(_*_);j[$][fe]=F(ge,$===0?-M/2:M/2,S,{kind:"arch",sideIndex:$,i:fe,spring:fe===0||fe===P}).index}for(let $=0;$<2;$++){let fe=$===0?0:q;for(let ge=0;ge<P;ge++)c(C,`girder-${$}-${ge}`,A[fe][ge],A[fe][ge+1],"girder",[0,1,0],{sideIndex:$,station:ge})}for(let $=0;$<=P;$++)for(let fe=0;fe<q;fe++)c(C,`floor-${$}-${fe}`,A[fe][$],A[fe+1][$],"floor",[-1,0,0],{station:$});let k=[];for(let $=0;$<2;$++)for(let fe=0;fe<P;fe++){let ge=`arch-${$}-${fe}`;c(C,ge,j[$][fe],j[$][fe+1],"arch",[0,1,0],{sideIndex:$,station:fe}),k.push(ge)}let w=[];for(let $=0;$<2;$++){let fe=$===0?0:q;for(let ge=0;ge<=P;ge++){let S=`column-${$}-${ge}`;c(C,S,j[$][ge],A[fe][ge],"column",[1,0,0],{sideIndex:$,station:ge,deckEnd:1}),w.push(S)}}for(let $=2;$<P-1;$+=2)c(C,`portal-${$}`,j[0][$],j[1][$],"brace",[-1,0,0],{station:$});let R={deck:{E:z.material.E,nu:z.material.nu,t:z.sections.deckThickness,shearCorrection:5/6,drillFactor:.001},arch:a({E:e,G:t,A:.42,Iy:.105,Iz:.105,J:.16,yMax:.45,zMax:.45,Wt:.17},z.sections.archArea,.42),girder:{E:e,G:t,A:.34,Iy:.08,Iz:.12,J:.06,yMax:.28,zMax:.42,Wt:.07},floor:{E:e,G:t,A:.2,Iy:.036,Iz:.055,J:.025,yMax:.24,zMax:.34,Wt:.032},column:a({E:e,G:t,A:.22,Iy:.025,Iz:.025,J:.012,yMax:.25,zMax:.25,Wt:.018},z.sections.columnArea,.22),brace:{E:e,G:t,A:.1,Iy:.01,Iz:.01,J:.006,yMax:.16,zMax:.16,Wt:.01}},U=[j[0][0],j[1][0],j[0][P],j[1][P]],V=[{node:U[0],ux:!0,uy:!0,uz:!0},{node:U[1],ux:!0,uy:!0,uz:!0},{node:U[2],ux:!0,uz:!0},{node:U[3],ux:!0,uz:!0}],Z={nodes:ne,elements:C,properties:R,supports:V},G=xg(Z),te=Eg(G.K,Z),ae=yg(V),L=vg(G.K,ae),oe=new Map(te.elementData.map($=>[$.element.id,$])),Q=Array.from({length:q},()=>Array(P));for(let $ of G.elementData){let[fe,ge]=$.element.cell;Q[ge][fe]=$}let ce=A[Math.round(q/2)][Math.round(P/2)];return{input:z,model:Z,K:G.K,factor:L,fixedDofs:ae,shellElementData:G.elementData,lineElementData:te.elementData,topology:{nx:P,ny:q,deckElevation:le,deckNodeGrid:A,deckNodeCount:J,archNodeGrid:j,shellByCell:Q,archSpringSupportNodes:U,archElementData:k.map($=>oe.get($)),columnElementData:w.map($=>oe.get($)),middleNode:ce}}}function h(b,z,_){for(let M=0;M<z.length;M++)b[z[M]]+=_[M]}function u(b){return b<=1e-12?[{offset:0,weight:1}]:[{offset:-b,weight:.25},{offset:0,weight:.5},{offset:b,weight:.25}]}function d(b,z){let{input:_,topology:M}=b,{length:X,width:ee}=_.bridge,{nx:le,ny:P,shellByCell:q,deckElevation:ne}=M,C=X/le,A=ee/P,F=mg(b.model.nodes.length*6),J=[],Y=[];for(let j of _.train.axleOffsets){let k=z-j;if(k<-1e-10||k>X+1e-10)continue;let w=r(k,0,X),R=_.train.trackOffset,U=Math.min(_.train.loadSpread,w,X-w),V=Math.min(.7*_.train.loadSpread,R+ee/2,ee/2-R);J.push(w);for(let Z of u(U))for(let G of u(V)){let te=r(w+Z.offset,0,X),ae=r(R+G.offset,-ee/2,ee/2),L=Math.min(le-1,Math.max(0,Math.floor(te/C))),oe=Math.min(P-1,Math.max(0,Math.floor((ae+ee/2)/A))),Q=q[oe][L],ce=-_.train.axleLoad*Z.weight*G.weight,$=gg(Q.nodes,[te,ae,ne],[0,0,ce]);if(!$)throw new Error(`wheel-load point (${te}, ${ae}) missed deck shell ${L},${oe}`);h(F,Q.dofs,$.load),Y.push({x:te,y:ae,z:ne,force:ce})}}return{F,active:J,samples:Y,head:z}}function p(b,z){let _=1/0,M=-1/0;for(let X of b){let ee=X[z],le=Array.isArray(ee)||ArrayBuffer.isView(ee)?ee:[ee];for(let P of le)P!=null&&(_=Math.min(_,P),M=Math.max(M,P))}return Number.isFinite(_)?{min:_,max:M}:{min:0,max:0}}function g(b){let z=0;for(let _=2;_<b.length;_+=6)z+=b[_];return z}function x(b,z,_){let{topology:M}=b,X=new Array(M.deckNodeCount);for(let Q=0;Q<M.deckNodeCount;Q++)X[Q]=z[6*Q+2];let ee=new Float64Array(M.deckNodeCount),le=new Uint16Array(M.deckNodeCount),P=0;for(let Q of b.shellElementData){let ce=_g(Q,Q.material,Sg(z,Q.dofs));P=Math.max(P,ce.maxVonMises);for(let $ of Q.indices)ee[$]+=ce.maxVonMises,le[$]+=1}let q=Array.from(ee,(Q,ce)=>le[ce]?Q/le[ce]/1e6:0),ne=[],C=0,A=0;for(let Q of M.archElementData){let ce=Tl(Q.nodes,Q.property,Al(z,Q.dofs),{element:Q}),$=0;for(let ge of Object.values(ce.stresses))for(let S of ge)$=Math.max($,Math.abs(S.sigmaX));let fe=.5*(ce.sectionResultants.node1.N+ce.sectionResultants.node2.N);A=Math.max(A,-fe,0),C=Math.max(C,$),ne.push($/1e6)}let F=[],J=0,Y=0,j=0;for(let Q of M.columnElementData){let ce=Tl(Q.nodes,Q.property,Al(z,Q.dofs),{element:Q}),$=.5*(ce.sectionResultants.node1.N+ce.sectionResultants.node2.N);F.push($/1e3),J=Math.max(J,-$,0),j=Math.max(j,Math.abs(ce.sectionResultants.node1.N-ce.sectionResultants.node2.N)),Y+=ce.qGlobal[8]}let k=g(_.F),w=Math.abs(k)<=n?null:Y/k,R=D(b,z,_.F),U=R.supportReactions.filter(Q=>b.model.nodes[Q.node].x<.5*b.input.bridge.length).reduce((Q,ce)=>Q+ce.force[0],0),V=R.supportReactions.filter(Q=>b.model.nodes[Q.node].x>.5*b.input.bridge.length).reduce((Q,ce)=>Q+ce.force[0],0),Z=.5*(Math.abs(U)+Math.abs(V))/1e3,G=v(R.appliedForce),te=v(R.appliedMoment),ae={hasAppliedLoad:_.active.length>0,appliedForceNorm:G,appliedMomentNorm:te,forceImbalanceNorm:R.forceImbalanceNorm,momentImbalanceNorm:R.momentImbalanceNorm,forceRelativeResidual:G>n?R.forceImbalanceNorm/G:null,momentRelativeResidual:te>n?R.momentImbalanceNorm/te:null,maximumFreeTranslationResidual:R.maximumFreeTranslationResidual,maximumFreeRotationResidual:R.maximumFreeRotationResidual},L=1e3*z[6*M.middleNode+2],oe=1e3*Math.min(...X);return{head:_.head,active:_.active,midDisp:L,minimumDisp:oe,deckRawPeak:P/1e6,archPeak:C/1e6,deckDisp:X,deckStress:q,archStress:ne,archCompressionPeak:A/1e3,columnForces:F,columnCompressionPeak:J/1e3,columnEndResidual:j/1e3,columnDeckEndVertical:Y/1e3,appliedVerticalLoad:k/1e3,transferRatio:w,archHorizontalThrust:Z,archSpringHorizontalReactions:[U/1e3,V/1e3],balance:ae}}function m(b,z){let _=d(b,z),M=Mg(b.factor,_.F);return{frame:x(b,M,_),displacement:M,loadState:_}}function f(b,z){return[b[1]*z[2]-b[2]*z[1],b[2]*z[0]-b[0]*z[2],b[0]*z[1]-b[1]*z[0]]}function T(b,z){for(let _=0;_<3;_++)b[_]+=z[_]}function v(b){return Math.hypot(b[0],b[1],b[2])}function D(b,z,_){let M=new Float64Array(_.length);for(let Y=0;Y<b.K.length;Y++){let j=-_[Y];for(let k=0;k<b.K.length;k++)j+=b.K[Y][k]*z[k];M[Y]=j}let X=new Set(b.fixedDofs),ee=[0,0,0],le=[0,0,0],P=[0,0,0],q=[0,0,0],ne=0,C=0;for(let Y=0;Y<b.model.nodes.length;Y++){let j=b.model.nodes[Y],k=[j.x,j.y,j.z],w=6*Y,R=[_[w],_[w+1],_[w+2]],U=[_[w+3],_[w+4],_[w+5]];T(ee,R),T(P,f(k,R)),T(P,U);let V=[0,0,0],Z=[0,0,0];for(let G=0;G<3;G++)X.has(w+G)&&(V[G]=M[w+G]),X.has(w+3+G)&&(Z[G]=M[w+3+G]);T(le,V),T(q,f(k,V)),T(q,Z);for(let G=0;G<3;G++){let te=w+G,ae=w+3+G;X.has(te)||(ne=Math.max(ne,Math.abs(M[te]))),X.has(ae)||(C=Math.max(C,Math.abs(M[ae])))}}let A=ee.map((Y,j)=>Y+le[j]),F=P.map((Y,j)=>Y+q[j]),J=b.model.supports.map(Y=>{let j=6*Y.node;return{node:Y.node,force:[X.has(j)?M[j]:0,X.has(j+1)?M[j+1]:0,X.has(j+2)?M[j+2]:0],moment:[X.has(j+3)?M[j+3]:0,X.has(j+4)?M[j+4]:0,X.has(j+5)?M[j+5]:0]}});return{appliedForce:ee,reactionForce:le,forceImbalanceVector:A,forceImbalanceNorm:v(A),appliedMoment:P,reactionMoment:q,momentImbalanceVector:F,momentImbalanceNorm:v(F),supportReactions:J,appliedZ:ee[2],reactionZ:le[2],forceImbalance:A[2],maximumFreeTranslationResidual:ne,maximumFreeRotationResidual:C}}function H(){return typeof requestAnimationFrame=="function"?new Promise(b=>requestAnimationFrame(()=>b())):Promise.resolve()}async function N(b={}){let z=l(b),_=[],{count:M,headStart:X,headEnd:ee}=z.input.positions,le=null;for(let C=0;C<M;C++){let A=X+(ee-X)*C/(M-1),F=m(z,A);_.push(F.frame),F.loadState.active.length&&(!le||F.frame.active.length>le.activeAxles)&&(le={head:F.frame.head,activeAxles:F.frame.active.length,appliedVerticalLoadkN:F.frame.appliedVerticalLoad,columnDeckEndVerticalkN:F.frame.columnDeckEndVertical,transferRatio:F.frame.transferRatio,relativeImbalance:Math.abs(F.frame.transferRatio-1)}),C>0&&C%16===0&&await H()}let P={deckDisp:p(_,"deckDisp"),deckStress:p(_,"deckStress"),archStress:p(_,"archStress"),columnForces:p(_,"columnForces"),archHorizontalThrust:p(_,"archHorizontalThrust")},q=new Set(z.topology.deckNodeGrid.flat()),ne=z.model.supports.filter(C=>q.has(C.node)).length;return{frames:_,ranges:P,source:"hybrid-fem",diagnostics:{formulation:i.formulation,structuralSystem:i.structuralSystem,nodes:z.model.nodes.length,shellElements:z.shellElementData.length,frameElements:z.lineElementData.filter(C=>C.type==="frame3d").length,trussElements:z.lineElementData.filter(C=>C.type==="truss3d").length,columnElements:z.topology.columnElementData.length,deckSupportCount:ne,archSpringSupportNodes:[...z.topology.archSpringSupportNodes],freeDofs:z.factor.free.length,fixedDofs:z.fixedDofs.length,frameBalance:"each frame stores its own force/moment balance and free-DOF residual summary",representativeTransfer:le,maximumColumnEndResidualkN:Math.max(..._.map(C=>C.columnEndResidual)),emptyLoadTransferRatio:null,visualStress:"nodal average of raw element maxima",readoutStress:"raw element/Gauss maximum",columnForceConvention:"kN; compression negative",compressionPeakConvention:"positive kN magnitude"}}}return{HYBRID_FRAME_CORE_STATUS:i,normalizeHybridArchInput:o,createHybridArchSystem:l,buildMovingLoadVector:d,recoverHybridArchFrame:x,solveHybridArchFrame:m,globalEquilibriumCheck:D,solveHybridArchModel:N}})(),{HYBRID_FRAME_CORE_STATUS:Tg,normalizeHybridArchInput:x0,createHybridArchSystem:y0,buildMovingLoadVector:v0,recoverHybridArchFrame:M0,solveHybridArchFrame:S0,globalEquilibriumCheck:b0,solveHybridArchModel:Pl}=wg,co=Object.freeze({archRise:12.8,crownClearance:2.4,ribArea:.85,columnArea:.18,deckThickness:.42,elasticity:34.5,mesh:"12x4",axleLoad:160,bogieSpacing:2.5,trackOffset:0,loadSpread:.55,deformScale:130,playbackRate:1}),Qe={...co},ot=Object.freeze({length:64,width:10,railGauge:1.5,ribY:5}),Ae={analysis:null,frame:0,playing:!1,resultMode:"deck-stress",chartMode:"deckDisp",view:"elevation",token:0,lastTick:performance.now(),accumulator:0},De=i=>document.querySelector(i),en=i=>[...document.querySelectorAll(i)],Ag=De("#loading"),E0=De("#toast");function oo(i,e,t){e&&(De("#loading-title").textContent=e),t&&(De("#loading-detail").textContent=t),Ag.classList.toggle("hidden",!i)}function Ze(i,e,t){return new B(i,t,-e)}function vr(){let[i,e]=Qe.mesh.split("x").map(Number);return{nx:i,ny:e}}function xn(){return Qe.archRise+Qe.crownClearance}function ei(i){return 4*Qe.archRise*i*(ot.length-i)/(ot.length*ot.length)}function Ll(){let i=[];for(let e=0;e<3;e++){let t=1.8+e*17.2;i.push(t,t+Qe.bogieSpacing,t+12.4,t+12.4+Qe.bogieSpacing)}return i}var ss=new tr;ss.fog=new er(12110283,72,155);var Nn=new Qi({antialias:!0,alpha:!0});Nn.setPixelRatio(Math.min(devicePixelRatio,2));Nn.outputColorSpace=dt;Nn.shadowMap.enabled=!0;Nn.shadowMap.type=ja;De("#scene").appendChild(Nn.domElement);var In=new Ct(38,1,.1,260);In.position.copy(Ze(32,-74,7.6));var Dn=new mr(In,Nn.domElement);Dn.target.copy(Ze(32,0,7.6));Dn.enableDamping=!0;Dn.minDistance=28;Dn.maxDistance=145;Dn.maxPolarAngle=Math.PI*.49;ss.add(new or(15201266,6650231,2.1));var Un=new cr(16774362,3.2);Un.position.set(-30,55,35);Un.castShadow=!0;Un.shadow.mapSize.set(2048,2048);Un.shadow.camera.left=-75;Un.shadow.camera.right=75;Un.shadow.camera.top=55;Un.shadow.camera.bottom=-35;ss.add(Un);var xr=new Ht,Ft=new Ht,Ui=new Ht,Mr=new Ht;ss.add(xr,Ft,Ui,Mr);var rn,gr,lo,ho=[],uo=[],fo=[],Rl=[],Il=new Oe(3233895),yr=new Oe(11451068),Dl=new Oe(11565891);function po(i){for(;i.children.length;)i.children.pop().traverse(t=>{t.geometry?.dispose(),Array.isArray(t.material)?t.material.forEach(n=>n.dispose()):t.material?.dispose()})}function Fi(i,e,t,n,s=10){let r=new B().subVectors(e,i),o=new nt(new Pi(t,t,r.length(),s),n);return o.position.copy(i).add(e).multiplyScalar(.5),o.quaternion.setFromUnitVectors(new B(0,1,0),r.clone().normalize()),o}function Rg(i,e,t,n){return Fi(i,e,t,new ut({color:n,metalness:.35,roughness:.42}),10)}function Cg(){let i=new nt(new ji(150,70),new ut({color:7442324,roughness:.76,metalness:.06}));i.rotation.x=-Math.PI/2,i.position.copy(Ze(32,0,-1.4)),i.receiveShadow=!0,xr.add(i);let e=new ut({color:8159606,roughness:1}),t=new ut({color:6450536,roughness:1});for(let s of[-1,1])for(let r=0;r<7;r++){let o=s<0?-18+r*3.1:82-r*3.1,a=12+3*Math.sin(r*.9),c=new nt(new Ut(8,a,34-r*1.4),r%2?e:t);c.position.copy(Ze(o,0,-1.1+a/2)),c.rotation.y=(r-3)*.035*s,c.receiveShadow=!0,c.castShadow=!0,xr.add(c)}let n=new lr(150,30,5796730,9347745);n.position.copy(Ze(32,0,-1.28)),n.material.opacity=.18,n.material.transparent=!0,xr.add(n)}Cg();function Pg(){let{nx:i,ny:e}=vr(),t=[],n=[],s=[];ho=[];let r=xn();for(let u=0;u<=e;u++)for(let d=0;d<=i;d++){let p=ot.length*d/i,g=-ot.width/2+ot.width*u/e,x=Ze(p,g,r);t.push(x.x,x.y,x.z),n.push(yr.r,yr.g,yr.b),ho.push({x:p,y:g,z:r})}let o=(u,d)=>d*(i+1)+u;for(let u=0;u<e;u++)for(let d=0;d<i;d++)s.push(o(d,u),o(d+1,u),o(d+1,u+1),o(d,u),o(d+1,u+1),o(d,u+1));rn=new Lt,rn.setAttribute("position",new rt(t,3)),rn.setAttribute("color",new rt(n,3)),rn.setIndex(s),rn.computeVertexNormals(),gr=new nt(rn,new ut({vertexColors:!0,side:Yt,metalness:.08,roughness:.72,polygonOffset:!0,polygonOffsetFactor:1})),gr.castShadow=!0,gr.receiveShadow=!0,Ft.add(gr),lo=new nt(rn,new $n({color:3166041,wireframe:!0,transparent:!0,opacity:.34})),Ft.add(lo);let a=2309961;for(let u of[-ot.ribY,ot.ribY])Ft.add(Rg(Ze(0,u,r-.38),Ze(64,u,r-.38),.31,a));let c=new ut({color:5204336,metalness:.35,roughness:.5});for(let u=0;u<=64;u+=64/i)Ft.add(Fi(Ze(u,-5,r-.42),Ze(u,5,r-.42),.11,c,8));let l=new ut({color:3753033,metalness:.82,roughness:.27});for(let u of[-ot.railGauge/2,ot.railGauge/2])Ft.add(Fi(Ze(0,u,r+.19),Ze(64,u,r+.19),.055,l,10));let h=new ut({color:6115652,roughness:.9});for(let u=.5;u<64;u+=1.15){let d=new nt(new Ut(.16,.09,2.45),h);d.position.copy(Ze(u,0,r+.11)),Ft.add(d)}}function Lg(){uo=[],fo=[],Rl=[];let i=vr().nx;for(let r of[-1,1])for(let o=0;o<i;o++){let a=64*o/i,c=64*(o+1)/i,l=(a+c)/2,h=new ts([Ze(a,r*ot.ribY,ei(a)),Ze(l,r*ot.ribY,ei(l)),Ze(c,r*ot.ribY,ei(c))]),u=new ut({color:Il.clone(),metalness:.46,roughness:.36}),d=new nt(new rr(h,5,.34,12,!1),u);d.castShadow=!0,Ft.add(d),uo.push({mesh:d,x:l,side:r})}let e=Ln.clamp(Math.sqrt(Qe.columnArea/Math.PI)*.42,.09,.19),t=()=>new ut({color:Dl.clone(),metalness:.42,roughness:.42});for(let r of[-1,1])for(let o=0;o<=i;o++){let a=64*o/i,c=Ze(a,r*ot.ribY,ei(a)+.18),l=Ze(a,r*ot.ribY,xn()-.48),h=Fi(c,l,e,t(),10);h.castShadow=!0,Ft.add(h),fo.push({mesh:h,x:a,side:r,baseRadius:e})}let n=new ut({color:5993596,metalness:.42,roughness:.42});for(let r=2;r<i;r+=2){let o=64*r/i,a=ei(o),c=Fi(Ze(o,-ot.ribY,a),Ze(o,ot.ribY,a),.1,n,8);Ft.add(c),Rl.push(c)}let s=new ut({color:7175550,metalness:.2,roughness:.65});for(let r of[0,64]){let o=new nt(new Ut(4.8,4.2,13),new ut({color:12895159,roughness:.9}));o.position.copy(Ze(r,0,ei(r)-1.1)),o.receiveShadow=!0,o.castShadow=!0,Ft.add(o);for(let a of[-1,1]){let c=new nt(new Ut(1.6,1.5,1.6),s);c.position.copy(Ze(r,a*ot.ribY,ei(r)-.45)),Ft.add(c)}}}function mo(){po(Ft),Pg(),Lg()}function go(){po(Ui);let i=new ut({color:15197144,metalness:.3,roughness:.34}),e=new ut({color:14049092,metalness:.2,roughness:.5}),t=new ut({color:1587525,metalness:.55,roughness:.22}),n=new ut({color:2501936,metalness:.78,roughness:.26}),s=xn();for(let r=0;r<3;r++){let o=new Ht,a=-8.1-r*17.2,c=new nt(new Ut(15.8,1.75,3.05),i);c.position.copy(Ze(a,Qe.trackOffset,s+1.35)),c.castShadow=!0,o.add(c);let l=new nt(new Ut(15.9,.16,3.08),e);l.position.copy(Ze(a,Qe.trackOffset,s+1.2)),o.add(l);for(let h of[-1,1]){let u=new nt(new Ut(12.2,.52,.025),t);u.position.copy(Ze(a,Qe.trackOffset+h*1.535,s+1.65)),o.add(u)}Ui.add(o)}for(let r of Ll()){let o=Fi(Ze(-r,Qe.trackOffset-1.05,s+.37),Ze(-r,Qe.trackOffset+1.05,s+.37),.09,n,12);Ui.add(o);for(let a of[-.83,.83]){let c=new nt(new Pi(.33,.33,.14,16),n);c.rotation.x=Math.PI/2,c.position.copy(Ze(-r,Qe.trackOffset+a,s+.37)),c.castShadow=!0,Ui.add(c)}}}function Nl(){return{bridge:{length:ot.length,width:ot.width,deckElevation:xn(),archRise:Qe.archRise,crownClearance:Qe.crownClearance,ribY:ot.ribY},material:{E:Qe.elasticity*1e9,nu:.2},sections:{archArea:Qe.ribArea,columnArea:Qe.columnArea,deckThickness:Qe.deckThickness},columns:{countPerRib:vr().nx+1,compressionNegative:!0},mesh:vr(),train:{axleLoad:Qe.axleLoad*1e3,axleOffsets:Ll(),trackOffset:Qe.trackOffset,loadSpread:Qe.loadSpread},positions:{count:121,headStart:-2,headEnd:118},coordinates:{model:"x longitudinal, y transverse, z vertical",three:"V(x,y,z) = (x,z,-y)"}}}async function Sr(){let i=++Ae.token;Ae.playing=!1,De("#play-button").textContent="\u64AD\u653E",oo(!0,"\u6B63\u5728\u5206\u89E3\u4E0A\u627F\u5F0F\u62F1\u6865\u6881\u58F3\u521A\u5EA6\u77E9\u9635","MITC4 \u6865\u9762\u58F3 / \u4E3B\u6881 \xB7 \u4E3B\u62F1\u7A7A\u95F4\u6881 \xB7 \u62F1\u4E0A\u7ACB\u67F1\u7A7A\u95F4\u6881\u67F1 \xB7 121 \u4E2A\u8F66\u4F4D"),await new Promise(e=>setTimeout(e,35));try{let e=await Pl(Nl());if(!e?.frames||e.frames.length!==121)throw new Error("\u6DF7\u5408\u6838\u5FC3\u5FC5\u987B\u8FD4\u56DE 121 \u4E2A\u771F\u5B9E\u8F66\u4F4D\uFF1B\u672A\u751F\u6210\u4EFB\u4F55\u9884\u6F14\u5047\u6570\u636E\u3002");if(i!==Ae.token)return;Ae.analysis=e,De("#solver-chip").textContent="\u4E0A\u627F\u5F0F\u62F1\u6865\u6881\u58F3\u6709\u9650\u5143 \xB7 \u5DF2\u6C42\u89E3",Ae.frame=Math.min(Ae.frame,Ae.analysis.frames.length-1),De("#position-slider").max=120,De("#position-slider").disabled=!1,oo(!1),Ae.playing=!matchMedia("(prefers-reduced-motion: reduce)").matches,De("#play-button").textContent=Ae.playing?"\u6682\u505C":"\u64AD\u653E",an()}catch(e){if(console.error(e),i!==Ae.token)return;Ae.analysis=null,Ae.playing=!1,De("#position-slider").disabled=!0,oo(!0,"\u771F\u5B9E\u6709\u9650\u5143\u6C42\u89E3\u672A\u5B8C\u6210",`${e.message}\u3000\u9875\u9762\u4E0D\u4F1A\u751F\u6210\u9884\u6F14\u5047\u6570\u636E\u3002`),De("#solver-chip").textContent="\u7B49\u5F85\u771F\u5B9E\u6881\u58F3\u6DF7\u5408\u6838\u5FC3",br()}}var Cl=0;function Ig(i=!1){clearTimeout(Cl),i&&(mo(),go()),Cl=setTimeout(Sr,80)}function _r(i,e,t){let n=Ln.clamp((i-e)/Math.max(1e-12,t-e),0,1),s=[[0,new Oe(1326205)],[.38,new Oe(2861233)],[.7,new Oe(14731855)],[1,new Oe(13586495)]];for(let r=0;r<s.length-1;r++)if(n<=s[r+1][0]){let o=(n-s[r][0])/(s[r+1][0]-s[r][0]);return s[r][1].clone().lerp(s[r+1][1],o)}return s.at(-1)[1].clone()}function Dg(){po(Mr)}function Ng(i){Dg(),Mr.visible=De("#toggle-loads").checked;for(let e of i.active||[]){let t=new hr(new B(0,-1,0),Ze(e,Qe.trackOffset,xn()+4.4),2.6,14049092,.45,.25);Mr.add(t)}}var Ug={"deck-stress":{title:"\u76F8\u90BB\u5355\u5143\u5CF0\u503C\u7684\u8282\u70B9\u89C6\u89C9\u5E73\u6ED1\uFF08\u975E\u8282\u70B9\u5916\u63A8\u5E94\u529B\uFF09",unit:"MPa",field:"deckStress",range:"deckStress"},"deck-displacement":{title:"\u6865\u9762\u7AD6\u5411\u4F4D\u79FB",unit:"mm",field:"deckDisp",range:"deckDisp"},"arch-stress":{title:"\u4E3B\u62F1\u5E94\u529B |\u03C3|",unit:"MPa",field:"archStress",range:"archStress",absolute:!0},"column-force":{title:"\u62F1\u4E0A\u7ACB\u67F1\u8F74\u538B |N|\uFF08\u539F\u59CB\u538B\u4E3A\u8D1F\uFF09",unit:"kN",field:"columnForces",range:"columnForces",absolute:!0}};function an(){if(!Ae.analysis)return;let i=Ae.analysis.frames[Ae.frame],e=Ug[Ae.resultMode],t=Ae.analysis.ranges[e.range];Ui.position.x=i.head;let n=rn.getAttribute("position"),s=rn.getAttribute("color"),r=xn();for(let u=0;u<ho.length;u++){let d=i.deckDisp?.[u];n.setY(u,r+(Number.isFinite(d)?d*Qe.deformScale:0));let p=yr;Ae.resultMode==="deck-stress"&&Number.isFinite(i.deckStress?.[u])?p=_r(i.deckStress[u],t.min,t.max):Ae.resultMode==="deck-displacement"&&Number.isFinite(d)&&(p=_r(d*1e3,t.min*1e3,t.max*1e3)),s.setXYZ(u,p.r,p.g,p.b)}n.needsUpdate=!0,s.needsUpdate=!0,rn.computeVertexNormals(),lo.visible=De("#toggle-mesh").checked,uo.forEach((u,d)=>{let p=i.archStress?.[d],g=Ae.analysis.ranges.archStress;u.mesh.material.color.copy(Ae.resultMode==="arch-stress"&&Number.isFinite(p)?_r(Math.abs(p),0,Math.max(Math.abs(g.min),Math.abs(g.max))):Il)}),fo.forEach((u,d)=>{let p=i.columnForces?.[d],g=Ae.analysis.ranges.columnForces,x=Math.max(Math.abs(g.min),Math.abs(g.max));u.mesh.material.color.copy(Ae.resultMode==="column-force"&&Number.isFinite(p)?_r(Math.abs(p),0,x):Dl),u.mesh.visible=De("#toggle-columns").checked;let m=Ae.resultMode==="column-force"&&Number.isFinite(p)?Ln.mapLinear(Math.abs(p),0,x,.85,1.55):1;u.mesh.scale.set(m,1,m)}),Ng(i),De("#r-disp").textContent=Math.abs(i.minimumDisp).toFixed(2),De("#r-deck").textContent=i.deckRawPeak.toFixed(3),De("#r-arch").textContent=Math.abs(i.archCompressionPeak).toFixed(0),De("#r-column").textContent=Math.abs(i.columnCompressionPeak).toFixed(0);let o=(i.active?.length||0)>0,a=100*i.transferRatio;De("#r-transfer").textContent=o?`${a.toFixed(1)}%`:"\u2014",De("#closure-bar").style.width=o?`${Ln.clamp(a,0,100)}%`:"0%",De("#r-thrust").textContent=o&&Number.isFinite(i.archHorizontalThrust)?Math.abs(i.archHorizontalThrust).toFixed(0):"\u2014";let c=i.balance;De("#balance-loaded").hidden=!o,De("#balance-empty").hidden=o,o&&c&&(De("#r-force-balance").textContent=Number.isFinite(c.forceRelativeResidual)?c.forceRelativeResidual.toExponential(1):"\u2014",De("#r-moment-balance").textContent=Number.isFinite(c.momentRelativeResidual)?c.momentRelativeResidual.toExponential(1):"\u2014",De("#r-free-force-residual").textContent=Number.isFinite(c.maximumFreeTranslationResidual)?(c.maximumFreeTranslationResidual/1e3).toExponential(1):"\u2014",De("#r-free-moment-residual").textContent=Number.isFinite(c.maximumFreeRotationResidual)?(c.maximumFreeRotationResidual/1e3).toExponential(1):"\u2014"),De("#position-slider").value=Ae.frame,De("#position-readout").textContent=`\u8F66\u5934 ${i.head.toFixed(1)} m`,De("#legend-title").textContent=e.title,De("#legend-unit").textContent=e.unit;let l=t.min,h=t.max;e.field==="deckDisp"&&(l*=1e3,h*=1e3),e.absolute&&(h=Math.max(Math.abs(l),Math.abs(h)),l=0),De("#legend-min").textContent=l.toFixed(e.unit==="kN"?0:1),De("#legend-mid").textContent=((l+h)/2).toFixed(e.unit==="kN"?0:1),De("#legend-max").textContent=h.toFixed(e.unit==="kN"?0:1),br()}var Ni=De("#response-chart"),Fg={deckDisp:{value:i=>Math.abs(i.minimumDisp),label:"\u6865\u9762\u6700\u5927\u4E0B\u6320",unit:"mm"},deckStress:{value:i=>i.deckRawPeak,label:"\u6865\u9762\u58F3\u539F\u59CB\u5355\u5143 / \u79EF\u5206\u70B9\u5CF0\u503C",unit:"MPa"},archCompression:{value:i=>Math.abs(i.archCompressionPeak),label:"\u4E3B\u62F1\u6700\u5927\u8F74\u538B",unit:"kN"},columnCompression:{value:i=>Math.abs(i.columnCompressionPeak),label:"\u62F1\u4E0A\u7ACB\u67F1\u6700\u5927\u8F74\u538B",unit:"kN"}};function br(){let i=Ni.getBoundingClientRect(),e=Math.min(devicePixelRatio,2);(Ni.width!==Math.round(i.width*e)||Ni.height!==Math.round(i.height*e))&&(Ni.width=Math.round(i.width*e),Ni.height=Math.round(i.height*e));let t=Ni.getContext("2d");t.setTransform(e,0,0,e,0,0);let n=i.width,s=i.height,r={l:48,r:16,t:30,b:23};if(t.clearRect(0,0,n,s),!Ae.analysis){t.fillStyle="#647880",t.font="11px Microsoft YaHei",t.fillText("\u7B49\u5F85\u771F\u5B9E\u6881\u58F3\u6DF7\u5408\u6838\u5FC3\u8FD4\u56DE 121 \u4E2A\u8F66\u4F4D\uFF1B\u4E0D\u751F\u6210\u9884\u6F14\u5047\u6570\u636E\u3002",r.l,r.t+24);return}let o=Fg[Ae.chartMode],a=Ae.analysis.frames.map(o.value),c=Math.min(...a),l=Math.max(...a);Math.abs(l-c)<1e-8&&(c-=1,l+=1);let h=(l-c)*.12;c-=h,l+=h,t.strokeStyle="rgba(23,44,52,.12)",t.lineWidth=1;for(let d=0;d<=3;d++){let p=r.t+(s-r.t-r.b)*d/3;t.beginPath(),t.moveTo(r.l,p),t.lineTo(n-r.r,p),t.stroke()}t.fillStyle="#647880",t.font="9px Consolas",t.fillText(`${o.label} / ${o.unit}`,r.l,r.t-9),t.textAlign="right",t.fillText(l.toFixed(o.unit==="kN"?0:1),r.l-7,r.t+3),t.fillText(c.toFixed(o.unit==="kN"?0:1),r.l-7,s-r.b),t.textAlign="left",t.strokeStyle="#d65f44",t.lineWidth=2,t.beginPath(),a.forEach((d,p)=>{let g=r.l+(n-r.l-r.r)*p/(a.length-1),x=r.t+(s-r.t-r.b)*(l-d)/(l-c);p?t.lineTo(g,x):t.moveTo(g,x)}),t.stroke();let u=r.l+(n-r.l-r.r)*Ae.frame/(a.length-1);t.strokeStyle="#172c34",t.lineWidth=1,t.beginPath(),t.moveTo(u,r.t),t.lineTo(u,s-r.b),t.stroke(),t.fillStyle="#172c34",t.beginPath(),t.arc(u,r.t+(s-r.t-r.b)*(l-a[Ae.frame])/(l-c),3,0,Math.PI*2),t.fill()}function Ul(i){let e=xn()/2,t=Math.min(140,Math.max(74,36/(Math.tan(Ln.degToRad(In.fov/2))*Math.max(.55,In.aspect)))),s={elevation:{p:Ze(32,-t,e),t:Ze(32,0,e)},perspective:{p:Ze(72,-48,e+14),t:Ze(32,0,e)},deck:{p:Ze(32,0,xn()+52),t:Ze(32,0,xn())},transfer:{p:Ze(36,-34,e+2),t:Ze(32,0,e)}}[i];In.position.copy(s.p),Dn.target.copy(s.t),Dn.update(),Ae.view=i,en("[data-view]").forEach(r=>r.classList.toggle("active",r.dataset.view===i))}function Fl(i,e){let t={archRise:n=>`${(+n).toFixed(1)} m`,crownClearance:n=>`${(+n).toFixed(2)} m`,ribArea:n=>`${(+n).toFixed(2)} m\xB2`,columnArea:n=>`${(+n).toFixed(2)} m\xB2`,deckThickness:n=>`${(+n).toFixed(2)} m`,elasticity:n=>`${(+n).toFixed(1)} GPa`,axleLoad:n=>`${n} kN`,bogieSpacing:n=>`${(+n).toFixed(2)} m`,trackOffset:n=>`${(+n).toFixed(2)} m`,loadSpread:n=>`${(+n).toFixed(2)} m`,deformScale:n=>`${n}\xD7`,playbackRate:n=>`${(+n).toFixed(2)}\xD7`};return t[i]?t[i](e):e}en("[data-param]").forEach(i=>i.addEventListener("input",()=>{let e=i.dataset.param;Qe[e]=i.tagName==="SELECT"?i.value:+i.value;let t=De(`[data-output="${e}"]`);if(t&&(t.textContent=Fl(e,i.value)),e==="deformScale"||e==="playbackRate"){e==="deformScale"&&an();return}Ig(i.hasAttribute("data-rebuild"))}));en(".panel-tabs button").forEach(i=>i.addEventListener("click",()=>{en(".panel-tabs button").forEach(e=>e.classList.toggle("active",e===i)),en(".tab-page").forEach(e=>e.classList.toggle("active",e.dataset.page===i.dataset.tab))}));en("[data-result]").forEach(i=>i.addEventListener("click",()=>{Ae.resultMode=i.dataset.result,en("[data-result]").forEach(e=>e.classList.toggle("active",e===i)),an()}));en("[data-chart]").forEach(i=>i.addEventListener("click",()=>{Ae.chartMode=i.dataset.chart,en("[data-chart]").forEach(e=>e.classList.toggle("active",e===i)),br()}));en("[data-view]").forEach(i=>i.addEventListener("click",()=>Ul(i.dataset.view)));De("#play-button").addEventListener("click",()=>{Ae.analysis&&(Ae.playing=!Ae.playing,De("#play-button").textContent=Ae.playing?"\u6682\u505C":"\u64AD\u653E")});De("#step-back").addEventListener("click",()=>{Ae.analysis&&(Ae.playing=!1,Ae.frame=(Ae.frame-1+Ae.analysis.frames.length)%Ae.analysis.frames.length,De("#play-button").textContent="\u64AD\u653E",an())});De("#step-forward").addEventListener("click",()=>{Ae.analysis&&(Ae.playing=!1,Ae.frame=(Ae.frame+1)%Ae.analysis.frames.length,De("#play-button").textContent="\u64AD\u653E",an())});De("#position-slider").addEventListener("input",i=>{Ae.analysis&&(Ae.playing=!1,Ae.frame=+i.target.value,De("#play-button").textContent="\u64AD\u653E",an())});De("#toggle-mesh").addEventListener("change",an);De("#toggle-loads").addEventListener("change",an);De("#toggle-columns").addEventListener("change",an);De("#reset-params").addEventListener("click",()=>{Object.assign(Qe,co),en("[data-param]").forEach(i=>{i.value=co[i.dataset.param];let e=De(`[data-output="${i.dataset.param}"]`);e&&(e.textContent=Fl(i.dataset.param,i.value))}),mo(),go(),Sr()});De(".panel-head").addEventListener("click",i=>{innerWidth<=760&&!i.target.closest("button")&&De("#control-panel").classList.toggle("open")});function _o(){let i=De("#scene-wrap"),e=i.getBoundingClientRect();Nn.setSize(e.width,e.height,!1),In.aspect=e.width/Math.max(1,e.height),In.updateProjectionMatrix(),br()}addEventListener("resize",_o);new ResizeObserver(_o).observe(De("#scene-wrap"));function Ol(i){requestAnimationFrame(Ol);let e=Math.min(.08,(i-Ae.lastTick)/1e3);Ae.lastTick=i,Ae.playing&&Ae.analysis&&(Ae.accumulator+=e*16*Qe.playbackRate,Ae.accumulator>=1&&(Ae.frame=(Ae.frame+Math.floor(Ae.accumulator))%Ae.analysis.frames.length,Ae.accumulator%=1,an())),Dn.update(),Nn.render(ss,In)}window.archBridgeLab={params:Qe,state:Ae,bridge:ot,buildHybridInput:Nl,analyze:Sr,solveCase:Pl,getFrame:()=>Ae.analysis?.frames[Ae.frame],coreStatus:()=>Tg};mo();go();_o();Ul("elevation");Sr();requestAnimationFrame(Ol);})();
/*! For license information please see ch04-arch-lab.bundle.js.LEGAL.txt */
