import*as t from"three";import{BufferGeometry as e,Float32BufferAttribute as r}from"three";function o(t){return!!t.constructor&&"function"==typeof t.constructor.isBuffer&&t.constructor.isBuffer(t)}var n=function(t){for(var e=new Array(t),r=0;r<t;++r)e[r]=r;return e},i=function(t){return null!=t&&(o(t)||function(t){return"function"==typeof t.readFloatLE&&"function"==typeof t.slice&&o(t.slice(0,0))}(t)||!!t._isBuffer)},a="undefined"!=typeof Float64Array;function s(t,e){return t[0]-e[0]}function u(){var t,e=this.stride,r=new Array(e.length);for(t=0;t<r.length;++t)r[t]=[Math.abs(e[t]),t];r.sort(s);var o=new Array(r.length);for(t=0;t<o.length;++t)o[t]=r[t][1];return o}function l(t,e){var r=["View",e,"d",t].join("");e<0&&(r="View_Nil"+t);var o="generic"===t;if(-1===e){var i="function "+r+"(a){this.data=a;};var proto="+r+".prototype;proto.dtype='"+t+"';proto.index=function(){return -1};proto.size=0;proto.dimension=-1;proto.shape=proto.stride=proto.order=[];proto.lo=proto.hi=proto.transpose=proto.step=function(){return new "+r+"(this.data);};proto.get=proto.set=function(){};proto.pick=function(){return null};return function construct_"+r+"(a){return new "+r+"(a);}";return new Function(i)()}if(0===e){i="function "+r+"(a,d) {this.data = a;this.offset = d};var proto="+r+".prototype;proto.dtype='"+t+"';proto.index=function(){return this.offset};proto.dimension=0;proto.size=1;proto.shape=proto.stride=proto.order=[];proto.lo=proto.hi=proto.transpose=proto.step=function "+r+"_copy() {return new "+r+"(this.data,this.offset)};proto.pick=function "+r+"_pick(){return TrivialArray(this.data);};proto.valueOf=proto.get=function "+r+"_get(){return "+(o?"this.data.get(this.offset)":"this.data[this.offset]")+"};proto.set=function "+r+"_set(v){return "+(o?"this.data.set(this.offset,v)":"this.data[this.offset]=v")+"};return function construct_"+r+"(a,b,c,d){return new "+r+"(a,d)}";return new Function("TrivialArray",i)(h[t][0])}i=["'use strict'"];var a=n(e),s=a.map((function(t){return"i"+t})),l="this.offset+"+a.map((function(t){return"this.stride["+t+"]*i"+t})).join("+"),c=a.map((function(t){return"b"+t})).join(","),f=a.map((function(t){return"c"+t})).join(",");i.push("function "+r+"(a,"+c+","+f+",d){this.data=a","this.shape=["+c+"]","this.stride=["+f+"]","this.offset=d|0}","var proto="+r+".prototype","proto.dtype='"+t+"'","proto.dimension="+e),i.push("Object.defineProperty(proto,'size',{get:function "+r+"_size(){return "+a.map((function(t){return"this.shape["+t+"]"})).join("*"),"}})"),1===e?i.push("proto.order=[0]"):(i.push("Object.defineProperty(proto,'order',{get:"),e<4?(i.push("function "+r+"_order(){"),2===e?i.push("return (Math.abs(this.stride[0])>Math.abs(this.stride[1]))?[1,0]:[0,1]}})"):3===e&&i.push("var s0=Math.abs(this.stride[0]),s1=Math.abs(this.stride[1]),s2=Math.abs(this.stride[2]);if(s0>s1){if(s1>s2){return [2,1,0];}else if(s0>s2){return [1,2,0];}else{return [1,0,2];}}else if(s0>s2){return [2,0,1];}else if(s2>s1){return [0,1,2];}else{return [0,2,1];}}})")):i.push("ORDER})")),i.push("proto.set=function "+r+"_set("+s.join(",")+",v){"),o?i.push("return this.data.set("+l+",v)}"):i.push("return this.data["+l+"]=v}"),i.push("proto.get=function "+r+"_get("+s.join(",")+"){"),o?i.push("return this.data.get("+l+")}"):i.push("return this.data["+l+"]}"),i.push("proto.index=function "+r+"_index(",s.join(),"){return "+l+"}"),i.push("proto.hi=function "+r+"_hi("+s.join(",")+"){return new "+r+"(this.data,"+a.map((function(t){return["(typeof i",t,"!=='number'||i",t,"<0)?this.shape[",t,"]:i",t,"|0"].join("")})).join(",")+","+a.map((function(t){return"this.stride["+t+"]"})).join(",")+",this.offset)}");var p=a.map((function(t){return"a"+t+"=this.shape["+t+"]"})),d=a.map((function(t){return"c"+t+"=this.stride["+t+"]"}));i.push("proto.lo=function "+r+"_lo("+s.join(",")+"){var b=this.offset,d=0,"+p.join(",")+","+d.join(","));for(var g=0;g<e;++g)i.push("if(typeof i"+g+"==='number'&&i"+g+">=0){d=i"+g+"|0;b+=c"+g+"*d;a"+g+"-=d}");i.push("return new "+r+"(this.data,"+a.map((function(t){return"a"+t})).join(",")+","+a.map((function(t){return"c"+t})).join(",")+",b)}"),i.push("proto.step=function "+r+"_step("+s.join(",")+"){var "+a.map((function(t){return"a"+t+"=this.shape["+t+"]"})).join(",")+","+a.map((function(t){return"b"+t+"=this.stride["+t+"]"})).join(",")+",c=this.offset,d=0,ceil=Math.ceil");for(g=0;g<e;++g)i.push("if(typeof i"+g+"==='number'){d=i"+g+"|0;if(d<0){c+=b"+g+"*(a"+g+"-1);a"+g+"=ceil(-a"+g+"/d)}else{a"+g+"=ceil(a"+g+"/d)}b"+g+"*=d}");i.push("return new "+r+"(this.data,"+a.map((function(t){return"a"+t})).join(",")+","+a.map((function(t){return"b"+t})).join(",")+",c)}");var m=new Array(e),v=new Array(e);for(g=0;g<e;++g)m[g]="a[i"+g+"]",v[g]="b[i"+g+"]";i.push("proto.transpose=function "+r+"_transpose("+s+"){"+s.map((function(t,e){return t+"=("+t+"===undefined?"+e+":"+t+"|0)"})).join(";"),"var a=this.shape,b=this.stride;return new "+r+"(this.data,"+m.join(",")+","+v.join(",")+",this.offset)}"),i.push("proto.pick=function "+r+"_pick("+s+"){var a=[],b=[],c=this.offset");for(g=0;g<e;++g)i.push("if(typeof i"+g+"==='number'&&i"+g+">=0){c=(c+this.stride["+g+"]*i"+g+")|0}else{a.push(this.shape["+g+"]);b.push(this.stride["+g+"])}");return i.push("var ctor=CTOR_LIST[a.length+1];return ctor(this.data,a,b,c)}"),i.push("return function construct_"+r+"(data,shape,stride,offset){return new "+r+"(data,"+a.map((function(t){return"shape["+t+"]"})).join(",")+","+a.map((function(t){return"stride["+t+"]"})).join(",")+",offset)}"),new Function("CTOR_LIST","ORDER",i.join("\n"))(h[t],u)}var h={float32:[],float64:[],int8:[],int16:[],int32:[],uint8:[],uint16:[],uint32:[],array:[],uint8_clamped:[],bigint64:[],biguint64:[],buffer:[],generic:[]};var c=function(t,e,r,o){if(void 0===t)return(0,h.array[0])([]);"number"==typeof t&&(t=[t]),void 0===e&&(e=[t.length]);var n=e.length;if(void 0===r){r=new Array(n);for(var s=n-1,u=1;s>=0;--s)r[s]=u,u*=e[s]}if(void 0===o){o=0;for(s=0;s<n;++s)r[s]<0&&(o-=(e[s]-1)*r[s])}for(var c=function(t){if(i(t))return"buffer";if(a)switch(Object.prototype.toString.call(t)){case"[object Float64Array]":return"float64";case"[object Float32Array]":return"float32";case"[object Int8Array]":return"int8";case"[object Int16Array]":return"int16";case"[object Int32Array]":return"int32";case"[object Uint8Array]":return"uint8";case"[object Uint16Array]":return"uint16";case"[object Uint32Array]":return"uint32";case"[object Uint8ClampedArray]":return"uint8_clamped";case"[object BigInt64Array]":return"bigint64";case"[object BigUint64Array]":return"biguint64"}return Array.isArray(t)?"array":"generic"}(t),f=h[c];f.length<=n+1;)f.push(l(c,f.length-1));return(0,f[n+1])(t,e,r,o)};var f={centimeters:637100880,centimetres:637100880,degrees:6371008.8/111325,feet:20902260.511392,inches:6371008.8*39.37,kilometers:6371.0088,kilometres:6371.0088,meters:6371008.8,metres:6371008.8,miles:3958.761333810546,millimeters:6371008800,millimetres:6371008800,nauticalmiles:6371008.8/1852,radians:1,yards:6371008.8*1.0936};function p(t,e,r){if(void 0===r&&(r={}),!t)throw new Error("coordinates is required");if(!Array.isArray(t))throw new Error("coordinates must be an Array");if(t.length<2)throw new Error("coordinates must be at least 2 numbers long");if(!m(t[0])||!m(t[1]))throw new Error("coordinates must contain numbers");return function(t,e,r){void 0===r&&(r={});var o={type:"Feature"};return(0===r.id||r.id)&&(o.id=r.id),r.bbox&&(o.bbox=r.bbox),o.properties=e||{},o.geometry=t,o}({type:"Point",coordinates:t},e,r)}function d(t){return 180*(t%(2*Math.PI))/Math.PI}function g(t){return t%360*Math.PI/180}function m(t){return!isNaN(t)&&null!==t&&!Array.isArray(t)}function v(t,e,r,o){void 0===o&&(o={});var n=function(t){if(!t)throw new Error("coord is required");if(!Array.isArray(t)){if("Feature"===t.type&&null!==t.geometry&&"Point"===t.geometry.type)return t.geometry.coordinates;if("Point"===t.type)return t.coordinates}if(Array.isArray(t)&&t.length>=2&&!Array.isArray(t[0])&&!Array.isArray(t[1]))return t;throw new Error("coord must be GeoJSON Point or an Array of numbers")}(t),i=g(n[0]),a=g(n[1]),s=g(r),u=function(t,e){void 0===e&&(e="kilometers");var r=f[e];if(!r)throw new Error(e+" units is invalid");return t/r}(e,o.units),l=Math.asin(Math.sin(a)*Math.cos(u)+Math.cos(a)*Math.sin(u)*Math.cos(s));return p([d(i+Math.atan2(Math.sin(s)*Math.sin(u)*Math.cos(a),Math.cos(u)-Math.sin(a)*Math.sin(l))),d(l)],o.properties)}function y(t){return`${t[0]}/${t[1]}/${t[2]}`}function b([t,e,r]){return[40075016.68557849*e/Math.pow(2,t)-20037508.342789244,20037508.342789244-40075016.68557849*r/Math.pow(2,t)]}function w(t){for(var e=t.length,r=1/0;e--;)t[e]<r&&(r=t[e]);return r}function M(t){for(var e=t.length,r=-1/0;e--;)t[e]>r&&(r=t[e]);return r}class x{constructor(t,e,r){this.config=t,this.elevationZoom=e,this.textureZoom=r,this.subDivisions=Math.pow(2,this.textureZoom-this.elevationZoom),this.ranges=this.getRanges(t.size,this.subDivisions)}getRanges(t,e){let r=t,o=t,n=[];for(let i=0;i<e;i++)for(let t=0;t<e;t++)n.push([[t*(o/e-1)+t,(t+1)*o/e],[i*(r/e-1)+i,(i+1)*r/e]]);return n}async getDataFromElevationTiles(t,e){let r=t.map((({aIdElevationTile:t,aIdTextureTiles:r})=>new Promise((o=>{this.getDataFromElevationTile(t,r,e,o)})))),o=await Promise.all(r),n=[].concat(...o),i=n.filter((t=>t.elevations));return this.addSouthEastData(i,n),i.forEach((t=>{})),i}joinNormals(t){let e=[],r=[];t.sort(((t,e)=>t.aId[2]===e.aId[2]?t.aId[1]>e.aId[1]:t.aId[2]>e.aId[2])).forEach(((t,r,o)=>{t.aId[1]!==o[0].aId[1]&&e.push([o[r-1],t])})),t.sort(((t,e)=>t.id>e.id)).forEach(((t,e,o)=>{t.aId[2]!==o[0].aId[2]&&r.push([o[e-1],t])}));let o=e[0][0].segments+1;e.forEach((([t,e])=>{let r=t.geom.attributes.normal,n=e.geom.attributes.normal;for(let i=0;i<o;i++){let t=o*i*3;for(let e=0;e<3;e++){let i=(r.array[t+3*(o-1)+e]+n.array[t+e])/2;r.array[t+3*(o-1)+e]=n.array[t+e]=i}}})),r.forEach((([t,e])=>{let r=t.geom.attributes.normal,n=e.geom.attributes.normal,i=(o-1)*o*3;for(let a=0;a<o;a++)for(let t=0;t<3;t++){let e=(r.array[i+3*a+t]+n.array[3*a+t])/2;r.array[i+3*a+t]=n.array[3*a+t]=e}}))}addSouthEastData(t,e){let r={};e.forEach(((t,e)=>{r[t.id]=e})),t.forEach((t=>{let o=y([t.aId[0],t.aId[1]+1,t.aId[2]]),n=y([t.aId[0],t.aId[1],t.aId[2]+1]),i=y([t.aId[0],t.aId[1]+1,t.aId[2]+1]),a=t.segments+1;for(let s=0;s<t.segments;s++)t.elevations[s*a+a-1]=e[r[o]].west[s];for(let s=0;s<t.segments;s++)t.elevations[(a-1)*a+s]=e[r[n]].north[s];t.east=e[r[o]].west,t.south=e[r[n]].north,r[i]?(t.se=e[r[i]].nw,t.elevations[t.elevations.length-1]=e[r[i]].nw):(t.se=(t.east[t.east.length-1]+t.south[t.south.length-1])/2,t.elevations[t.elevations.length-1]=t.se),t.min=w(t.elevations),t.max=M(t.elevations)}))}getDataFromElevationTile(t,e,r,o){let n=e.map((t=>y(t))),i=this.config.url(...t,this.config.token),a=[];for(let s=0;s<this.subDivisions;s++)for(let e=0;e<this.subDivisions;e++)a.push([this.textureZoom,t[1]*this.subDivisions+e,t[2]*this.subDivisions+s].join("/"));!function(t,e){var r=new Image;r.crossOrigin="Anonymous",r.onload=function(){let{width:t,height:o}=r;var n=document.createElement("canvas");n.width=t,n.height=o;var i=n.getContext("2d");i.drawImage(r,0,0);var a=i.getImageData(0,0,t,o);e(null,c(a.data,[o,t,4]),[t,o])},r.onerror=function(t){e(t)},r.src=t}(i,((t,e,i)=>{let s;t&&console.error(t);let u=[];a.forEach(((t,o)=>{if(!n.includes(t))return;let i=this.ranges[o],a=i[0][1]-i[0][0],l=null;if(!r.includes(t)){s=0,l=new Float32Array((a+1)*(a+1));for(let t=i[1][0];t<i[1][1];t++)for(let r=i[0][0];r<i[0][1];r++){let o=e.get(t,r,0),n=e.get(t,r,1),a=e.get(t,r,2);l[s]=256*o+n+a/256-32768,s++,r===i[0][1]-1&&(l[s]=0,s++)}}s=0;let h=new Float32Array(a);for(let r=i[0][0];r<i[0][1];r++){let t=e.get(i[1][0],r,0),o=e.get(i[1][0],r,1),n=e.get(i[1][0],r,2);h[s]=256*t+o+n/256-32768,s++}s=0;let c=new Float32Array(a);for(let r=i[1][0];r<i[1][1];r++){let t=e.get(r,i[0][0],0),o=e.get(r,i[0][0],1),n=e.get(r,i[0][0],2);c[s]=256*t+o+n/256-32768,s++}var f;u.push({id:t,aId:(f=t,f.split("/").map((t=>parseInt(t)))),elevations:l,north:h,west:c,nw:h[0],segments:a})})),o(u)}))}}class $ extends e{constructor({segments:t,elevations:e,se:o,south:n,east:i},a,s){super(),this.type="TileGeometry";let u=t,l=t;this.parameters={width:1,height:1,widthSegments:u,heightSegments:l};const h=Math.floor(u),c=Math.floor(l),f=h+1,p=c+1,d=1/h,g=1/c,m=[],v=[],y=[],b=[];let w=0;for(let r=0;r<p;r++){const t=r*g;for(let o=0;o<f;o++){const n=o*d;v.push(n,-t,e[w]*a-s),w++,y.push(0,0,1),b.push(o/h),b.push(1-r/c)}}for(let r=0;r<c;r++)for(let t=0;t<h;t++){const e=t+f*r,o=t+f*(r+1),n=t+1+f*(r+1),i=t+1+f*r;m.push(e,o,i),m.push(o,n,i)}this.setIndex(m),this.setAttribute("position",new r(v,3)),this.setAttribute("normal",new r(y,3)),this.setAttribute("uv",new r(b,2))}}var I={},j=Math.PI/180,T=180/Math.PI;function A(t){var e=E(t[0]+1,t[2]);return[E(t[0],t[2]),S(t[1]+1,t[2]),e,S(t[1],t[2])]}function E(t,e){return t/Math.pow(2,e)*360-180}function S(t,e){var r=Math.PI-2*Math.PI*t/Math.pow(2,e);return T*Math.atan(.5*(Math.exp(r)-Math.exp(-r)))}function F(t,e,r){var o=B(t,e,r);return o[0]=Math.floor(o[0]),o[1]=Math.floor(o[1]),o}function z(t){return[[2*t[0],2*t[1],t[2]+1],[2*t[0]+1,2*t[1],t[2]+1],[2*t[0]+1,2*t[1]+1,t[2]+1],[2*t[0],2*t[1]+1,t[2]+1]]}function k(t){return[t[0]>>1,t[1]>>1,t[2]-1]}function _(t){return z(k(t))}function O(t,e){for(var r=0;r<t.length;r++)if(P(t[r],e))return!0;return!1}function P(t,e){return t[0]===e[0]&&t[1]===e[1]&&t[2]===e[2]}function B(t,e,r){var o=Math.sin(e*j),n=Math.pow(2,r),i=n*(t/360+.5);return(i%=n)<0&&(i+=n),[i,n*(.5-.25*Math.log((1+o)/(1-o))/Math.PI),r]}var G={tileToGeoJSON:function(t){var e=A(t);return{type:"Polygon",coordinates:[[[e[0],e[3]],[e[0],e[1]],[e[2],e[1]],[e[2],e[3]],[e[0],e[3]]]]}},tileToBBOX:A,getChildren:z,getParent:k,getSiblings:_,hasTile:O,hasSiblings:function(t,e){for(var r=_(t),o=0;o<r.length;o++)if(!O(e,r[o]))return!1;return!0},tilesEqual:P,tileToQuadkey:function(t){for(var e="",r=t[2];r>0;r--){var o=0,n=1<<r-1;0!=(t[0]&n)&&o++,0!=(t[1]&n)&&(o+=2),e+=o.toString()}return e},quadkeyToTile:function(t){for(var e=0,r=0,o=t.length,n=o;n>0;n--){var i=1<<n-1,a=+t[o-n];1===a&&(e|=i),2===a&&(r|=i),3===a&&(e|=i,r|=i)}return[e,r,o]},pointToTile:F,bboxToTile:function(t){var e=F(t[0],t[1],32),r=F(t[2],t[3],32),o=[e[0],e[1],r[0],r[1]],n=function(t){for(var e=28,r=0;r<e;r++){var o=1<<32-(r+1);if((t[0]&o)!=(t[2]&o)||(t[1]&o)!=(t[3]&o))return r}return e}(o);return 0===n?[0,0,0]:[o[0]>>>32-n,o[1]>>>32-n,n]},pointToTileFraction:B};function C(t){return{type:"Feature",geometry:G.tileToGeoJSON(t),properties:{}}}function R(t,e){var r,o,n=t.coordinates,i=e.max_zoom,a={},s=[];if("Point"===t.type)return[G.pointToTile(n[0],n[1],i)];if("MultiPoint"===t.type)for(r=0;r<n.length;r++)a[Z((o=G.pointToTile(n[r][0],n[r][1],i))[0],o[1],o[2])]=!0;else if("LineString"===t.type)L(a,n,i);else if("MultiLineString"===t.type)for(r=0;r<n.length;r++)L(a,n[r],i);else if("Polygon"===t.type)D(a,s,n,i);else{if("MultiPolygon"!==t.type)throw new Error("Geometry type not implemented");for(r=0;r<n.length;r++)D(a,s,n[r],i)}if(e.min_zoom!==i){var u=s.length;for(Q(a,s),r=0;r<u;r++){var l=s[r];a[Z(l[0],l[1],l[2])]=!0}return function(t,e,r){for(var o=[],n=r.max_zoom;n>r.min_zoom;n--){for(var i={},a=[],s=0;s<e.length;s++){var u=e[s];if(u[0]%2==0&&u[1]%2==0){var l=Z(u[0]+1,u[1],n),h=Z(u[0],u[1]+1,n),c=Z(u[0]+1,u[1]+1,n);if(t[l]&&t[h]&&t[c]){t[Z(u[0],u[1],u[2])]=!1,t[l]=!1,t[h]=!1,t[c]=!1;var f=[u[0]/2,u[1]/2,n-1];n-1===r.min_zoom?o.push(f):(i[Z(u[0]/2,u[1]/2,n-1)]=!0,a.push(f))}}}for(s=0;s<e.length;s++)t[Z((u=e[s])[0],u[1],u[2])]&&o.push(u);t=i,e=a}return o}(a,s,e)}return Q(a,s),s}function D(t,e,r,o){for(var n=[],i=0;i<r.length;i++){var a=[];L(t,r[i],o,a);for(var s=0,u=a.length,l=u-1;s<u;l=s++){var h=(s+1)%u,c=a[s][1];(c>a[l][1]||c>a[h][1])&&(c<a[l][1]||c<a[h][1])&&c!==a[h][1]&&n.push(a[s])}}for(n.sort(N),i=0;i<n.length;i+=2){c=n[i][1];for(var f=n[i][0]+1;f<n[i+1][0];f++){t[Z(f,c,o)]||e.push([f,c,o])}}}function N(t,e){return t[1]-e[1]||t[0]-e[0]}function L(t,e,r,o){for(var n,i,a=0;a<e.length-1;a++){var s=G.pointToTileFraction(e[a][0],e[a][1],r),u=G.pointToTileFraction(e[a+1][0],e[a+1][1],r),l=s[0],h=s[1],c=u[0]-l,f=u[1]-h;if(0!==f||0!==c){var p=c>0?1:-1,d=f>0?1:-1,g=Math.floor(l),m=Math.floor(h),v=0===c?1/0:Math.abs(((c>0?1:0)+g-l)/c),y=0===f?1/0:Math.abs(((f>0?1:0)+m-h)/f),b=Math.abs(p/c),w=Math.abs(d/f);for(g===n&&m===i||(t[Z(g,m,r)]=!0,o&&m!==i&&o.push([g,m]),n=g,i=m);v<1||y<1;)v<y?(v+=b,g+=p):(y+=w,m+=d),t[Z(g,m,r)]=!0,o&&m!==i&&o.push([g,m]),n=g,i=m}}o&&m===o[0][1]&&o.pop()}function Q(t,e){for(var r,o,n,i,a,s=Object.keys(t),u=0;u<s.length;u++)e.push((r=+s[u],o=void 0,n=void 0,i=void 0,a=void 0,void 0,[a=(i=(r-(o=r%32))/32)%(n=2*(1<<o)),(i-a)/n%n,o]))}function Z(t,e,r){return 32*(2*(1<<r)*e+t)+r}I.geojson=function(t,e){return{type:"FeatureCollection",features:R(t,e).map(C)}},I.tiles=R,I.indexes=function(t,e){return R(t,e).map(G.tileToQuadkey)};var q={elevation:{terrarium:{url:(t,e,r)=>`https://s3.amazonaws.com/elevation-tiles-prod/terrarium/${t}/${e}/${r}.png`,size:256,maxZoom:15},mapboxElevation:{url:(t,e,r,o)=>`https://api.mapbox.com/v4/mapbox.terrain-rgb/${t}/${e}/${r}@2x.pngraw?access_token=${o}`,token:"pk.eyJ1IjoibGhhcGFpcGFpIiwiYSI6IkdfVFF6NTgifQ.oqzkNQOTByLWb9Q0EgNr3A",size:512,maxZoom:15},localElevation:{url:(t,e,r)=>`http://map-tiles.local/terrarium/${t}/${e}/${r}.png`,size:256,maxZoom:15},mapboxTerrainVector:{url:(t,e,r,o)=>`https://api.mapbox.com/v4/mapbox.mapbox-terrain-v2/${t}/${e}/${r}.vector.pbf?access_token=${o}`,token:"pk.eyJ1IjoibGhhcGFpcGFpIiwiYSI6IkdfVFF6NTgifQ.oqzkNQOTByLWb9Q0EgNr3A"}},texture:{localOSM:(t,e,r)=>`http://map-tiles.local/osm/${t}/${e}/${r}.png`,localIgn25:(t,e,r)=>`http://map-tiles.local/ign-25/${t}/${e}/${r}.jpg`,localIgnSatellite:(t,e,r)=>`http://map-tiles.local/ign-satellite/${t}/${e}/${r}.jpg`,localSwiss25:(t,e,r)=>`http://map-tiles.local/swiss-25/${t}/${e}/${r}.jpeg`,localGoogleSatellite:(t,e,r)=>`http://map-tiles.local/google-satellite/${t}/${e}/${r}.jpg`,osm:(t,e,r)=>`https://c.tile.openstreetmap.org/${t}/${e}/${r}.png`,googleSatellite:(t,e,r)=>`https://mt3.google.com/vt/lyrs=s&hl=fr&x=${e}&y=${r}&z=${t}&s=Ga`,ign25:{url:(t,e,r,o)=>`https://wxs.ign.fr/${o}/wmts?layer=GEOGRAPHICALGRIDSYSTEMS.MAPS.SCAN25TOUR&style=normal&tilematrixset=PM&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image/jpeg&TileMatrix=${t}&TileCol=${e}&TileRow=${r}`,size:256,token:"9nc6c2p7hhsijjg2wtd46sgr"},ignSatellite:{url:(t,e,r,o)=>`https://wxs.ign.fr/${o}/wmts?layer=ORTHOIMAGERY.ORTHOPHOTOS&style=normal&tilematrixset=PM&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image/jpeg&TileMatrix=${t}&TileCol=${e}&TileRow=${r}`,size:256,token:"9nc6c2p7hhsijjg2wtd46sgr"},swiss25:(t,e,r)=>`https://wmts5.geo.admin.ch/1.0.0/ch.swisstopo.pixelkarte-farbe-pk25.noscale/default/current/3857/${t}/${e}/${r}.jpeg`,swissSatellite:(t,e,r)=>`https://wmts5.geo.admin.ch/1.0.0/ch.swisstopo.swissimage/default/current/3857/${t}/${e}/${r}.jpeg`,mapboxSatellite:{url:(t,e,r,o)=>`https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/${t}/${e}/${r}?access_token=${o}`,token:"pk.eyJ1IjoibGhhcGFpcGFpIiwiYSI6IkdfVFF6NTgifQ.oqzkNQOTByLWb9Q0EgNr3A",size:256}}};class V extends t.EventDispatcher{constructor(e){super(),this.config=Object.assign({},V.defaultConfig,e),"string"==typeof this.config.elevationSource&&(this.config.elevationSource=q.elevation[this.config.elevationSource]),this.loadManager=new t.LoadingManager,this.textureLoader=new t.TextureLoader(this.loadManager)}async getMap(e){let{textureSource:r,tileSegments:o,textureZoom:n,center:i,distanceFromCenter:a}=Object.assign({},V.mapDefaultConfig,e),s=this.config.tileUnits*Math.pow(2,n)/40075016.68557849,u=n-Math.log2(this.config.elevationSource.size/o);if(u>this.config.elevationSource.maxZoom)throw new Exception(`elevation segments: ${o} unavailables for this zoom: ${n}, choose less segments`);this.elevationManager=new x(this.config.elevationSource,u,n),"string"==typeof r&&(r=q.texture[r]),"function"==typeof r&&(r={url:r,size:256});const l=function(t,e){const r={type:"Feature",properties:{},geometry:{type:"Polygon",coordinates:[[]]}};let o=p(t);const[n,i]=v(o,e,-45).geometry.coordinates,[a,s]=v(o,e,135).geometry.coordinates;return r.geometry.coordinates[0]=[[n,i],[a,i],[a,s],[n,s],[n,i]],{feature:r,northWest:[n,i],southEast:[a,s]}}(i,a),h=I.tiles(l.feature.geometry,{min_zoom:n,max_zoom:n}).map((([t,e,r])=>[r,t,e])).sort(),c={north:h[0][2],south:h[h.length-1][2],west:h[0][1],east:h[h.length-1][1]};let f=h[0];this.objectContainer=new t.Group;const d=function(t){let e=t.map((t=>y(t))),r=[];return t.forEach((t=>{let o=[t[0],t[1],t[2]+1],n=[t[0],t[1]+1,t[2]];e.includes(y(o))||r.push(o),e.includes(y(n))||r.push(n)})),r}(h),g=function(t,e,r){let o=e-r;const n={};return t.forEach((t=>{let e=[r,Math.floor(t[1]/Math.pow(2,o)),Math.floor(t[2]/Math.pow(2,o))],i=y(e);n[i]?n[i].aIdTextureTiles.push(t):n[i]={aIdElevationTile:e,aIdTextureTiles:[t]}})),Object.values(n)}(h.concat(d),n,u),m=await this.elevationManager.getDataFromElevationTiles(g,d.map((t=>y(t))));let j=w(m.map((t=>t.min))),T=M(m.map((t=>t.max))),A=s*this.config.zScaleFactor,E=j*A-this.config.basementHeight;return this.objectContainer.userData={mapBox:{x:h[h.length-1][1]-f[1]+1,y:h[h.length-1][2]-f[2]+1,z:(T-j)*A+this.config.basementHeight},zOffset:E,origin:b(f),resolution:s,zResolution:A},(this.config.debug||this.config.dryRun)&&this.log(i,c,f,l,h,d,g,m,j,s),m.forEach((t=>{t.geom=new $(t,A,E),t.geom.computeVertexNormals()})),this.elevationManager.joinNormals(m),m.forEach((e=>{let o=this.textureLoader.load(r.url(...e.aId,r.token)),n=new t.MeshLambertMaterial({map:o,color:16777215}),i=new t.Mesh(e.geom,n);this.config.debug&&i.add(new t.AxesHelper(1));let a=e.aId[1]-f[1],s=f[2]-e.aId[2];i.position.set(a,s,0),i.userData.id=e.id,this.objectContainer.add(i)})),class{static computeBasement(e,r,o,n){let i=[],a=r.south-r.north+1,s=r.east-r.west+1,u=new t.MeshLambertMaterial({emissive:10066329});["north","south"].forEach((s=>{let l="north"===s?0:-a,h="north"===s?1:-1,c=[],f=[],p=[];e.filter((t=>t.aId[2]===r[s])).sort(((t,e)=>t.aId[1]>e.aId[1])).forEach(((t,e,r)=>{let i;t[s].forEach(((t,r,a)=>{let s=e+r/a.length;i=c.length/3,c.push(s,l,t*o-n),c.push(s,l,0),f.push(0,h,0,0,h,0),0===e&&0===r?p.push(i,i+1):p.push(i,i,i-1,i+1,i,i+1)})),e===r.length-1&&(i=c.length/3,c.push(e+1,l,("north"===s?t.east[0]:t.se)*o-n),c.push(e+1,l,0),f.push(0,h,0,0,h,0),p.push(i,i,i-1,i+1))})),"north"===s&&p.reverse();let d=new t.BufferGeometry;d.setAttribute("position",new t.BufferAttribute(new Float32Array(c),3)),d.setAttribute("normal",new t.BufferAttribute(new Float32Array(f),3)),d.setIndex(p),console.log(c,"indexes",p,d.attributes.normal.array);let g=new t.Mesh(d,u);i.push(g)})),["west","east"].forEach((a=>{let l="west"===a?0:s,h="west"===a?-1:1,c=[],f=[],p=[];e.filter((t=>t.aId[1]===r[a])).sort(((t,e)=>t.aId[2]>e.aId[2])).forEach(((t,e,r)=>{let i;t[a].forEach(((t,r,a)=>{let s=-e-r/a.length;i=c.length/3,c.push(l,s,t*o-n),c.push(l,s,0),f.push(h,0,0,h,0,0),0===e&&0===r?p.push(i,i+1):p.push(i,i,i-1,i+1,i,i+1)})),e===r.length-1&&(i=c.length/3,c.push(l,-e-1,("west"===a?t.south[0]:t.se)*o-n),c.push(l,-e-1,0),f.push(h,0,0,h,0,0),p.push(i,i,i-1,i+1))})),"east"===a&&p.reverse();let d=new t.BufferGeometry;d.setAttribute("position",new t.BufferAttribute(new Float32Array(c),3)),d.setAttribute("normal",new t.BufferAttribute(new Float32Array(f),3)),d.setIndex(p);let g=new t.Mesh(d,u);i.push(g)}));{let e=new t.PlaneBufferGeometry(s,a,1,1),r=new t.Mesh(e,u);r.position.set(s/2,-a/2,0),r.rotation.x=Math.PI,i.push(r),console.log("face",e)}return i}}.computeBasement(m,c,A,E).forEach((t=>this.objectContainer.add(t))),this.$loader=document.getElementById("loader"),this.$loaderContent=document.getElementById("loader-content"),this.loadManager.onLoad=()=>{this.$loader.classList.add("hidden"),this.dispatchEvent({type:"dispose"})},this.loadManager.onProgress=(t,e,r)=>{this.$loaderContent.innerText=e+"/"+r},this.objectContainer}log(t,e,r,o,n,i,a,s,u,l){let h=this.objectContainer.userData;if(console.info(`location: (${t}), origin tile: ${y(r)}, bbox tiles: (n:${e.north},s:${e.south},w:${e.west},e:${e.east})`),console.info(`bbox: (nw: ${o.northWest}, se: ${o.southEast})`),console.info(`textures tiles: ${n.length}, neighbours: ${i.length}, elevationsTiles: ${a.length}`,n.map((t=>y(t))),i.map((t=>y(t))),a.map((t=>y(t.aIdElevationTile)))),console.info("texture tiles fullfilled:",s,"min elevation: ",u),console.info(`mapBBox: (${h.mapBox.x},${h.mapBox.y},${h.mapBox.z})`,`zOffset: (${h.zOffset})`,`origin: (${h.origin})`,`xyResolution: ${l}`),this.config.dryRun)return console.info("textures tiles load\n",n.concat(i).map((t=>y(t))).join("\n")),void console.info("elevation tiles\n",a.map((t=>y(t.aIdElevationTile))).join("\n"))}}V.defaultConfig={elevationSource:"terrarium",zScaleFactor:1.6,tileUnits:1,debug:!1,dryRun:!1,basementHeight:.05},V.mapDefaultConfig={textureSource:"osm",tileSegments:32,textureZoom:15,center:[6.4751,46.1024],distanceFromCenter:1};export default V;