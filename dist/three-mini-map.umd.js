!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e(require("three")):"function"==typeof define&&define.amd?define(["three"],e):(t="undefined"!=typeof globalThis?globalThis:t||self).MiniMapManager=e(t.THREE)}(this,(function(t){"use strict";function e(t){if(t&&t.__esModule)return t;var e={__proto__:null,[Symbol.toStringTag]:"Module"};return t&&Object.keys(t).forEach((function(r){if("default"!==r){var o=Object.getOwnPropertyDescriptor(t,r);Object.defineProperty(e,r,o.get?o:{enumerable:!0,get:function(){return t[r]}})}})),e.default=t,Object.freeze(e)}var r=e(t);function o(t){return!!t.constructor&&"function"==typeof t.constructor.isBuffer&&t.constructor.isBuffer(t)}var n=function(t){for(var e=new Array(t),r=0;r<t;++r)e[r]=r;return e},i=function(t){return null!=t&&(o(t)||function(t){return"function"==typeof t.readFloatLE&&"function"==typeof t.slice&&o(t.slice(0,0))}(t)||!!t._isBuffer)},a="undefined"!=typeof Float64Array;function s(t,e){return t[0]-e[0]}function u(){var t,e=this.stride,r=new Array(e.length);for(t=0;t<r.length;++t)r[t]=[Math.abs(e[t]),t];r.sort(s);var o=new Array(r.length);for(t=0;t<o.length;++t)o[t]=r[t][1];return o}function l(t,e){var r=["View",e,"d",t].join("");e<0&&(r="View_Nil"+t);var o="generic"===t;if(-1===e){var i="function "+r+"(a){this.data=a;};var proto="+r+".prototype;proto.dtype='"+t+"';proto.index=function(){return -1};proto.size=0;proto.dimension=-1;proto.shape=proto.stride=proto.order=[];proto.lo=proto.hi=proto.transpose=proto.step=function(){return new "+r+"(this.data);};proto.get=proto.set=function(){};proto.pick=function(){return null};return function construct_"+r+"(a){return new "+r+"(a);}";return new Function(i)()}if(0===e){i="function "+r+"(a,d) {this.data = a;this.offset = d};var proto="+r+".prototype;proto.dtype='"+t+"';proto.index=function(){return this.offset};proto.dimension=0;proto.size=1;proto.shape=proto.stride=proto.order=[];proto.lo=proto.hi=proto.transpose=proto.step=function "+r+"_copy() {return new "+r+"(this.data,this.offset)};proto.pick=function "+r+"_pick(){return TrivialArray(this.data);};proto.valueOf=proto.get=function "+r+"_get(){return "+(o?"this.data.get(this.offset)":"this.data[this.offset]")+"};proto.set=function "+r+"_set(v){return "+(o?"this.data.set(this.offset,v)":"this.data[this.offset]=v")+"};return function construct_"+r+"(a,b,c,d){return new "+r+"(a,d)}";return new Function("TrivialArray",i)(h[t][0])}i=["'use strict'"];var a=n(e),s=a.map((function(t){return"i"+t})),l="this.offset+"+a.map((function(t){return"this.stride["+t+"]*i"+t})).join("+"),f=a.map((function(t){return"b"+t})).join(","),c=a.map((function(t){return"c"+t})).join(",");i.push("function "+r+"(a,"+f+","+c+",d){this.data=a","this.shape=["+f+"]","this.stride=["+c+"]","this.offset=d|0}","var proto="+r+".prototype","proto.dtype='"+t+"'","proto.dimension="+e),i.push("Object.defineProperty(proto,'size',{get:function "+r+"_size(){return "+a.map((function(t){return"this.shape["+t+"]"})).join("*"),"}})"),1===e?i.push("proto.order=[0]"):(i.push("Object.defineProperty(proto,'order',{get:"),e<4?(i.push("function "+r+"_order(){"),2===e?i.push("return (Math.abs(this.stride[0])>Math.abs(this.stride[1]))?[1,0]:[0,1]}})"):3===e&&i.push("var s0=Math.abs(this.stride[0]),s1=Math.abs(this.stride[1]),s2=Math.abs(this.stride[2]);if(s0>s1){if(s1>s2){return [2,1,0];}else if(s0>s2){return [1,2,0];}else{return [1,0,2];}}else if(s0>s2){return [2,0,1];}else if(s2>s1){return [0,1,2];}else{return [0,2,1];}}})")):i.push("ORDER})")),i.push("proto.set=function "+r+"_set("+s.join(",")+",v){"),o?i.push("return this.data.set("+l+",v)}"):i.push("return this.data["+l+"]=v}"),i.push("proto.get=function "+r+"_get("+s.join(",")+"){"),o?i.push("return this.data.get("+l+")}"):i.push("return this.data["+l+"]}"),i.push("proto.index=function "+r+"_index(",s.join(),"){return "+l+"}"),i.push("proto.hi=function "+r+"_hi("+s.join(",")+"){return new "+r+"(this.data,"+a.map((function(t){return["(typeof i",t,"!=='number'||i",t,"<0)?this.shape[",t,"]:i",t,"|0"].join("")})).join(",")+","+a.map((function(t){return"this.stride["+t+"]"})).join(",")+",this.offset)}");var p=a.map((function(t){return"a"+t+"=this.shape["+t+"]"})),d=a.map((function(t){return"c"+t+"=this.stride["+t+"]"}));i.push("proto.lo=function "+r+"_lo("+s.join(",")+"){var b=this.offset,d=0,"+p.join(",")+","+d.join(","));for(var g=0;g<e;++g)i.push("if(typeof i"+g+"==='number'&&i"+g+">=0){d=i"+g+"|0;b+=c"+g+"*d;a"+g+"-=d}");i.push("return new "+r+"(this.data,"+a.map((function(t){return"a"+t})).join(",")+","+a.map((function(t){return"c"+t})).join(",")+",b)}"),i.push("proto.step=function "+r+"_step("+s.join(",")+"){var "+a.map((function(t){return"a"+t+"=this.shape["+t+"]"})).join(",")+","+a.map((function(t){return"b"+t+"=this.stride["+t+"]"})).join(",")+",c=this.offset,d=0,ceil=Math.ceil");for(g=0;g<e;++g)i.push("if(typeof i"+g+"==='number'){d=i"+g+"|0;if(d<0){c+=b"+g+"*(a"+g+"-1);a"+g+"=ceil(-a"+g+"/d)}else{a"+g+"=ceil(a"+g+"/d)}b"+g+"*=d}");i.push("return new "+r+"(this.data,"+a.map((function(t){return"a"+t})).join(",")+","+a.map((function(t){return"b"+t})).join(",")+",c)}");var m=new Array(e),v=new Array(e);for(g=0;g<e;++g)m[g]="a[i"+g+"]",v[g]="b[i"+g+"]";i.push("proto.transpose=function "+r+"_transpose("+s+"){"+s.map((function(t,e){return t+"=("+t+"===undefined?"+e+":"+t+"|0)"})).join(";"),"var a=this.shape,b=this.stride;return new "+r+"(this.data,"+m.join(",")+","+v.join(",")+",this.offset)}"),i.push("proto.pick=function "+r+"_pick("+s+"){var a=[],b=[],c=this.offset");for(g=0;g<e;++g)i.push("if(typeof i"+g+"==='number'&&i"+g+">=0){c=(c+this.stride["+g+"]*i"+g+")|0}else{a.push(this.shape["+g+"]);b.push(this.stride["+g+"])}");return i.push("var ctor=CTOR_LIST[a.length+1];return ctor(this.data,a,b,c)}"),i.push("return function construct_"+r+"(data,shape,stride,offset){return new "+r+"(data,"+a.map((function(t){return"shape["+t+"]"})).join(",")+","+a.map((function(t){return"stride["+t+"]"})).join(",")+",offset)}"),new Function("CTOR_LIST","ORDER",i.join("\n"))(h[t],u)}var h={float32:[],float64:[],int8:[],int16:[],int32:[],uint8:[],uint16:[],uint32:[],array:[],uint8_clamped:[],bigint64:[],biguint64:[],buffer:[],generic:[]};var f=function(t,e,r,o){if(void 0===t)return(0,h.array[0])([]);"number"==typeof t&&(t=[t]),void 0===e&&(e=[t.length]);var n=e.length;if(void 0===r){r=new Array(n);for(var s=n-1,u=1;s>=0;--s)r[s]=u,u*=e[s]}if(void 0===o){o=0;for(s=0;s<n;++s)r[s]<0&&(o-=(e[s]-1)*r[s])}for(var f=function(t){if(i(t))return"buffer";if(a)switch(Object.prototype.toString.call(t)){case"[object Float64Array]":return"float64";case"[object Float32Array]":return"float32";case"[object Int8Array]":return"int8";case"[object Int16Array]":return"int16";case"[object Int32Array]":return"int32";case"[object Uint8Array]":return"uint8";case"[object Uint16Array]":return"uint16";case"[object Uint32Array]":return"uint32";case"[object Uint8ClampedArray]":return"uint8_clamped";case"[object BigInt64Array]":return"bigint64";case"[object BigUint64Array]":return"biguint64"}return Array.isArray(t)?"array":"generic"}(t),c=h[f];c.length<=n+1;)c.push(l(f,c.length-1));return(0,c[n+1])(t,e,r,o)};var c=6371008.8,p={centimeters:637100880,centimetres:637100880,degrees:57.22891354143274,feet:20902260.511392,inches:39.37*c,kilometers:6371.0088,kilometres:6371.0088,meters:c,metres:c,miles:3958.761333810546,millimeters:6371008800,millimetres:6371008800,nauticalmiles:c/1852,radians:1,yards:6967335.223679999};function d(t,e,r){if(void 0===r&&(r={}),!t)throw new Error("coordinates is required");if(!Array.isArray(t))throw new Error("coordinates must be an Array");if(t.length<2)throw new Error("coordinates must be at least 2 numbers long");if(!v(t[0])||!v(t[1]))throw new Error("coordinates must contain numbers");return function(t,e,r){void 0===r&&(r={});var o={type:"Feature"};return(0===r.id||r.id)&&(o.id=r.id),r.bbox&&(o.bbox=r.bbox),o.properties=e||{},o.geometry=t,o}({type:"Point",coordinates:t},e,r)}function g(t){return 180*(t%(2*Math.PI))/Math.PI}function m(t){return t%360*Math.PI/180}function v(t){return!isNaN(t)&&null!==t&&!Array.isArray(t)}function y(t,e,r,o){void 0===o&&(o={});var n=function(t){if(!t)throw new Error("coord is required");if(!Array.isArray(t)){if("Feature"===t.type&&null!==t.geometry&&"Point"===t.geometry.type)return t.geometry.coordinates;if("Point"===t.type)return t.coordinates}if(Array.isArray(t)&&t.length>=2&&!Array.isArray(t[0])&&!Array.isArray(t[1]))return t;throw new Error("coord must be GeoJSON Point or an Array of numbers")}(t),i=m(n[0]),a=m(n[1]),s=m(r),u=function(t,e){void 0===e&&(e="kilometers");var r=p[e];if(!r)throw new Error(e+" units is invalid");return t/r}(e,o.units),l=Math.asin(Math.sin(a)*Math.cos(u)+Math.cos(a)*Math.sin(u)*Math.cos(s));return d([g(i+Math.atan2(Math.sin(s)*Math.sin(u)*Math.cos(a),Math.cos(u)-Math.sin(a)*Math.sin(l))),g(l)],o.properties)}function b(t){return`${t[0]}/${t[1]}/${t[2]}`}function w([t,e,r]){return[40075016.68557849*e/Math.pow(2,t)-20037508.342789244,20037508.342789244-40075016.68557849*r/Math.pow(2,t)]}function M(t){for(var e=t.length,r=1/0;e--;)t[e]<r&&(r=t[e]);return r}function x(t){for(var e=t.length,r=-1/0;e--;)t[e]>r&&(r=t[e]);return r}class ${constructor(t,e,r){this.config=t,this.elevationZoom=e,this.textureZoom=r,this.subDivisions=Math.pow(2,this.textureZoom-this.elevationZoom),this.ranges=this.getRanges(t.size,this.subDivisions)}getRanges(t,e){let r=t,o=t,n=[];for(let i=0;i<e;i++)for(let t=0;t<e;t++)n.push([[t*(o/e-1)+t,(t+1)*o/e],[i*(r/e-1)+i,(i+1)*r/e]]);return n}async getDataFromElevationTiles(t,e){let r=t.map((({aIdElevationTile:t,aIdTextureTiles:r})=>new Promise((o=>{this.getDataFromElevationTile(t,r,e,o)})))),o=await Promise.all(r),n=[].concat(...o),i=n.filter((t=>t.elevations));return this.addSouthEastData(i,n),i.forEach((t=>{})),i}joinNormals(t){let e=[],r=[];t.sort(((t,e)=>t.aId[2]===e.aId[2]?t.aId[1]>e.aId[1]:t.aId[2]>e.aId[2])).forEach(((t,r,o)=>{t.aId[1]!==o[0].aId[1]&&e.push([o[r-1],t])})),t.sort(((t,e)=>t.id>e.id)).forEach(((t,e,o)=>{t.aId[2]!==o[0].aId[2]&&r.push([o[e-1],t])}));let o=e[0][0].segments+1;e.forEach((([t,e])=>{let r=t.geom.attributes.normal,n=e.geom.attributes.normal;for(let i=0;i<o;i++){let t=o*i*3;for(let e=0;e<3;e++){let i=(r.array[t+3*(o-1)+e]+n.array[t+e])/2;r.array[t+3*(o-1)+e]=n.array[t+e]=i}}})),r.forEach((([t,e])=>{let r=t.geom.attributes.normal,n=e.geom.attributes.normal,i=(o-1)*o*3;for(let a=0;a<o;a++)for(let t=0;t<3;t++){let e=(r.array[i+3*a+t]+n.array[3*a+t])/2;r.array[i+3*a+t]=n.array[3*a+t]=e}}))}addSouthEastData(t,e){let r={};e.forEach(((t,e)=>{r[t.id]=e})),t.forEach((t=>{let o=b([t.aId[0],t.aId[1]+1,t.aId[2]]),n=b([t.aId[0],t.aId[1],t.aId[2]+1]),i=b([t.aId[0],t.aId[1]+1,t.aId[2]+1]),a=t.segments+1;for(let s=0;s<t.segments;s++)t.elevations[s*a+a-1]=e[r[o]].west[s];for(let s=0;s<t.segments;s++)t.elevations[(a-1)*a+s]=e[r[n]].north[s];t.east=e[r[o]].west,t.south=e[r[n]].north,r[i]?(t.se=e[r[i]].nw,t.elevations[t.elevations.length-1]=e[r[i]].nw):(t.se=(t.east[t.east.length-1]+t.south[t.south.length-1])/2,t.elevations[t.elevations.length-1]=t.se),t.min=M(t.elevations),t.max=x(t.elevations)}))}getDataFromElevationTile(t,e,r,o){let n=e.map((t=>b(t))),i=this.config.url(...t,this.config.token),a=[];for(let s=0;s<this.subDivisions;s++)for(let e=0;e<this.subDivisions;e++)a.push([this.textureZoom,t[1]*this.subDivisions+e,t[2]*this.subDivisions+s].join("/"));!function(t,e){var r=new Image;r.crossOrigin="Anonymous",r.onload=function(){let{width:t,height:o}=r;var n=document.createElement("canvas");n.width=t,n.height=o;var i=n.getContext("2d");i.drawImage(r,0,0);var a=i.getImageData(0,0,t,o);e(null,f(a.data,[o,t,4]),[t,o])},r.onerror=function(t){e(t)},r.src=t}(i,((t,e,i)=>{let s;t&&console.error(t);let u=[];a.forEach(((t,o)=>{if(!n.includes(t))return;let i=this.ranges[o],a=i[0][1]-i[0][0],l=null;if(!r.includes(t)){s=0,l=new Float32Array((a+1)*(a+1));for(let t=i[1][0];t<i[1][1];t++)for(let r=i[0][0];r<i[0][1];r++){let o=e.get(t,r,0),n=e.get(t,r,1),a=e.get(t,r,2);l[s]=256*o+n+a/256-32768,s++,r===i[0][1]-1&&(l[s]=0,s++)}}s=0;let h=new Float32Array(a);for(let r=i[0][0];r<i[0][1];r++){let t=e.get(i[1][0],r,0),o=e.get(i[1][0],r,1),n=e.get(i[1][0],r,2);h[s]=256*t+o+n/256-32768,s++}s=0;let f=new Float32Array(a);for(let r=i[1][0];r<i[1][1];r++){let t=e.get(r,i[0][0],0),o=e.get(r,i[0][0],1),n=e.get(r,i[0][0],2);f[s]=256*t+o+n/256-32768,s++}var c;u.push({id:t,aId:(c=t,c.split("/").map((t=>parseInt(t)))),elevations:l,north:h,west:f,nw:h[0],segments:a})})),o(u)}))}}class j extends t.BufferGeometry{constructor({segments:e,elevations:r,se:o,south:n,east:i},a,s){super(),this.type="TileGeometry";let u=e,l=e;this.parameters={width:1,height:1,widthSegments:u,heightSegments:l};const h=Math.floor(u),f=Math.floor(l),c=h+1,p=f+1,d=1/h,g=1/f,m=[],v=[],y=[],b=[];let w=0;for(let t=0;t<p;t++){const e=t*g;for(let o=0;o<c;o++){const n=o*d;v.push(n,-e,r[w]*a-s),w++,y.push(0,0,1),b.push(o/h),b.push(1-t/f)}}for(let t=0;t<f;t++)for(let e=0;e<h;e++){const r=e+c*t,o=e+c*(t+1),n=e+1+c*(t+1),i=e+1+c*t;m.push(r,o,i),m.push(o,n,i)}this.setIndex(m),this.setAttribute("position",new t.Float32BufferAttribute(v,3)),this.setAttribute("normal",new t.Float32BufferAttribute(y,3)),this.setAttribute("uv",new t.Float32BufferAttribute(b,2))}}var I={},T=Math.PI/180,A=180/Math.PI;function E(t){var e=S(t[0]+1,t[2]);return[S(t[0],t[2]),F(t[1]+1,t[2]),e,F(t[1],t[2])]}function S(t,e){return t/Math.pow(2,e)*360-180}function F(t,e){var r=Math.PI-2*Math.PI*t/Math.pow(2,e);return A*Math.atan(.5*(Math.exp(r)-Math.exp(-r)))}function _(t,e,r){var o=G(t,e,r);return o[0]=Math.floor(o[0]),o[1]=Math.floor(o[1]),o}function O(t){return[[2*t[0],2*t[1],t[2]+1],[2*t[0]+1,2*t[1],t[2]+1],[2*t[0]+1,2*t[1]+1,t[2]+1],[2*t[0],2*t[1]+1,t[2]+1]]}function z(t){return[t[0]>>1,t[1]>>1,t[2]-1]}function k(t){return O(z(t))}function P(t,e){for(var r=0;r<t.length;r++)if(B(t[r],e))return!0;return!1}function B(t,e){return t[0]===e[0]&&t[1]===e[1]&&t[2]===e[2]}function G(t,e,r){var o=Math.sin(e*T),n=Math.pow(2,r),i=n*(t/360+.5);return(i%=n)<0&&(i+=n),[i,n*(.5-.25*Math.log((1+o)/(1-o))/Math.PI),r]}var C={tileToGeoJSON:function(t){var e=E(t);return{type:"Polygon",coordinates:[[[e[0],e[3]],[e[0],e[1]],[e[2],e[1]],[e[2],e[3]],[e[0],e[3]]]]}},tileToBBOX:E,getChildren:O,getParent:z,getSiblings:k,hasTile:P,hasSiblings:function(t,e){for(var r=k(t),o=0;o<r.length;o++)if(!P(e,r[o]))return!1;return!0},tilesEqual:B,tileToQuadkey:function(t){for(var e="",r=t[2];r>0;r--){var o=0,n=1<<r-1;0!=(t[0]&n)&&o++,0!=(t[1]&n)&&(o+=2),e+=o.toString()}return e},quadkeyToTile:function(t){for(var e=0,r=0,o=t.length,n=o;n>0;n--){var i=1<<n-1,a=+t[o-n];1===a&&(e|=i),2===a&&(r|=i),3===a&&(e|=i,r|=i)}return[e,r,o]},pointToTile:_,bboxToTile:function(t){var e=_(t[0],t[1],32),r=_(t[2],t[3],32),o=[e[0],e[1],r[0],r[1]],n=function(t){for(var e=28,r=0;r<e;r++){var o=1<<32-(r+1);if((t[0]&o)!=(t[2]&o)||(t[1]&o)!=(t[3]&o))return r}return e}(o);return 0===n?[0,0,0]:[o[0]>>>32-n,o[1]>>>32-n,n]},pointToTileFraction:G};function R(t){return{type:"Feature",geometry:C.tileToGeoJSON(t),properties:{}}}function D(t,e){var r,o,n=t.coordinates,i=e.max_zoom,a={},s=[];if("Point"===t.type)return[C.pointToTile(n[0],n[1],i)];if("MultiPoint"===t.type)for(r=0;r<n.length;r++)a[q((o=C.pointToTile(n[r][0],n[r][1],i))[0],o[1],o[2])]=!0;else if("LineString"===t.type)Q(a,n,i);else if("MultiLineString"===t.type)for(r=0;r<n.length;r++)Q(a,n[r],i);else if("Polygon"===t.type)N(a,s,n,i);else{if("MultiPolygon"!==t.type)throw new Error("Geometry type not implemented");for(r=0;r<n.length;r++)N(a,s,n[r],i)}if(e.min_zoom!==i){var u=s.length;for(Z(a,s),r=0;r<u;r++){var l=s[r];a[q(l[0],l[1],l[2])]=!0}return function(t,e,r){for(var o=[],n=r.max_zoom;n>r.min_zoom;n--){for(var i={},a=[],s=0;s<e.length;s++){var u=e[s];if(u[0]%2==0&&u[1]%2==0){var l=q(u[0]+1,u[1],n),h=q(u[0],u[1]+1,n),f=q(u[0]+1,u[1]+1,n);if(t[l]&&t[h]&&t[f]){t[q(u[0],u[1],u[2])]=!1,t[l]=!1,t[h]=!1,t[f]=!1;var c=[u[0]/2,u[1]/2,n-1];n-1===r.min_zoom?o.push(c):(i[q(u[0]/2,u[1]/2,n-1)]=!0,a.push(c))}}}for(s=0;s<e.length;s++)t[q((u=e[s])[0],u[1],u[2])]&&o.push(u);t=i,e=a}return o}(a,s,e)}return Z(a,s),s}function N(t,e,r,o){for(var n=[],i=0;i<r.length;i++){var a=[];Q(t,r[i],o,a);for(var s=0,u=a.length,l=u-1;s<u;l=s++){var h=(s+1)%u,f=a[s][1];(f>a[l][1]||f>a[h][1])&&(f<a[l][1]||f<a[h][1])&&f!==a[h][1]&&n.push(a[s])}}for(n.sort(L),i=0;i<n.length;i+=2){f=n[i][1];for(var c=n[i][0]+1;c<n[i+1][0];c++){t[q(c,f,o)]||e.push([c,f,o])}}}function L(t,e){return t[1]-e[1]||t[0]-e[0]}function Q(t,e,r,o){for(var n,i,a=0;a<e.length-1;a++){var s=C.pointToTileFraction(e[a][0],e[a][1],r),u=C.pointToTileFraction(e[a+1][0],e[a+1][1],r),l=s[0],h=s[1],f=u[0]-l,c=u[1]-h;if(0!==c||0!==f){var p=f>0?1:-1,d=c>0?1:-1,g=Math.floor(l),m=Math.floor(h),v=0===f?1/0:Math.abs(((f>0?1:0)+g-l)/f),y=0===c?1/0:Math.abs(((c>0?1:0)+m-h)/c),b=Math.abs(p/f),w=Math.abs(d/c);for(g===n&&m===i||(t[q(g,m,r)]=!0,o&&m!==i&&o.push([g,m]),n=g,i=m);v<1||y<1;)v<y?(v+=b,g+=p):(y+=w,m+=d),t[q(g,m,r)]=!0,o&&m!==i&&o.push([g,m]),n=g,i=m}}o&&m===o[0][1]&&o.pop()}function Z(t,e){for(var r,o,n,i,a,s=Object.keys(t),u=0;u<s.length;u++)e.push((r=+s[u],o=void 0,n=void 0,i=void 0,a=void 0,void 0,[a=(i=(r-(o=r%32))/32)%(n=2*(1<<o)),(i-a)/n%n,o]))}function q(t,e,r){return 32*(2*(1<<r)*e+t)+r}I.geojson=function(t,e){return{type:"FeatureCollection",features:D(t,e).map(R)}},I.tiles=D,I.indexes=function(t,e){return D(t,e).map(C.tileToQuadkey)};var H={elevation:{terrarium:{url:(t,e,r)=>`https://s3.amazonaws.com/elevation-tiles-prod/terrarium/${t}/${e}/${r}.png`,size:256,maxZoom:15},mapboxElevation:{url:(t,e,r,o)=>`https://api.mapbox.com/v4/mapbox.terrain-rgb/${t}/${e}/${r}@2x.pngraw?access_token=${o}`,token:"pk.eyJ1IjoibGhhcGFpcGFpIiwiYSI6IkdfVFF6NTgifQ.oqzkNQOTByLWb9Q0EgNr3A",size:512,maxZoom:15},localElevation:{url:(t,e,r)=>`http://map-tiles.local/terrarium/${t}/${e}/${r}.png`,size:256,maxZoom:15},mapboxTerrainVector:{url:(t,e,r,o)=>`https://api.mapbox.com/v4/mapbox.mapbox-terrain-v2/${t}/${e}/${r}.vector.pbf?access_token=${o}`,token:"pk.eyJ1IjoibGhhcGFpcGFpIiwiYSI6IkdfVFF6NTgifQ.oqzkNQOTByLWb9Q0EgNr3A"}},texture:{localOSM:(t,e,r)=>`http://map-tiles.local/osm/${t}/${e}/${r}.png`,localIgn25:(t,e,r)=>`http://map-tiles.local/ign-25/${t}/${e}/${r}.jpg`,localIgnSatellite:(t,e,r)=>`http://map-tiles.local/ign-satellite/${t}/${e}/${r}.jpg`,localSwiss25:(t,e,r)=>`http://map-tiles.local/swiss-25/${t}/${e}/${r}.jpeg`,localGoogleSatellite:(t,e,r)=>`http://map-tiles.local/google-satellite/${t}/${e}/${r}.jpg`,osm:(t,e,r)=>`https://c.tile.openstreetmap.org/${t}/${e}/${r}.png`,googleSatellite:(t,e,r)=>`https://mt3.google.com/vt/lyrs=s&hl=fr&x=${e}&y=${r}&z=${t}&s=Ga`,ign25:{url:(t,e,r,o)=>`https://wxs.ign.fr/${o}/wmts?layer=GEOGRAPHICALGRIDSYSTEMS.MAPS.SCAN25TOUR&style=normal&tilematrixset=PM&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image/jpeg&TileMatrix=${t}&TileCol=${e}&TileRow=${r}`,size:256,token:"9nc6c2p7hhsijjg2wtd46sgr"},ignSatellite:{url:(t,e,r,o)=>`https://wxs.ign.fr/${o}/wmts?layer=ORTHOIMAGERY.ORTHOPHOTOS&style=normal&tilematrixset=PM&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image/jpeg&TileMatrix=${t}&TileCol=${e}&TileRow=${r}`,size:256,token:"9nc6c2p7hhsijjg2wtd46sgr"},swiss25:(t,e,r)=>`https://wmts5.geo.admin.ch/1.0.0/ch.swisstopo.pixelkarte-farbe-pk25.noscale/default/current/3857/${t}/${e}/${r}.jpeg`,swissSatellite:(t,e,r)=>`https://wmts5.geo.admin.ch/1.0.0/ch.swisstopo.swissimage/default/current/3857/${t}/${e}/${r}.jpeg`,mapboxSatellite:{url:(t,e,r,o)=>`https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/${t}/${e}/${r}?access_token=${o}`,token:"pk.eyJ1IjoibGhhcGFpcGFpIiwiYSI6IkdfVFF6NTgifQ.oqzkNQOTByLWb9Q0EgNr3A",size:256}}};class V extends r.EventDispatcher{constructor(t){super(),this.config=Object.assign({},V.defaultConfig,t),"string"==typeof this.config.elevationSource&&(this.config.elevationSource=H.elevation[this.config.elevationSource]),this.loadManager=new r.LoadingManager,this.textureLoader=new r.TextureLoader(this.loadManager)}async getMap(t){let{textureSource:e,tileSegments:o,textureZoom:n,center:i,distanceFromCenter:a}=Object.assign({},V.mapDefaultConfig,t),s=this.config.tileUnits*Math.pow(2,n)/40075016.68557849,u=n-Math.log2(this.config.elevationSource.size/o);if(u>this.config.elevationSource.maxZoom)throw new Exception(`elevation segments: ${o} unavailables for this zoom: ${n}, choose less segments`);this.elevationManager=new $(this.config.elevationSource,u,n),"string"==typeof e&&(e=H.texture[e]),"function"==typeof e&&(e={url:e,size:256});const l=function(t,e){const r={type:"Feature",properties:{},geometry:{type:"Polygon",coordinates:[[]]}};let o=d(t);const[n,i]=y(o,e,-45).geometry.coordinates,[a,s]=y(o,e,135).geometry.coordinates;return r.geometry.coordinates[0]=[[n,i],[a,i],[a,s],[n,s],[n,i]],{feature:r,northWest:[n,i],southEast:[a,s]}}(i,a),h=I.tiles(l.feature.geometry,{min_zoom:n,max_zoom:n}).map((([t,e,r])=>[r,t,e])).sort(),f={north:h[0][2],south:h[h.length-1][2],west:h[0][1],east:h[h.length-1][1]};let c=h[0];this.objectContainer=new r.Group;const p=function(t){let e=t.map((t=>b(t))),r=[];return t.forEach((t=>{let o=[t[0],t[1],t[2]+1],n=[t[0],t[1]+1,t[2]];e.includes(b(o))||r.push(o),e.includes(b(n))||r.push(n)})),r}(h),g=function(t,e,r){let o=e-r;const n={};return t.forEach((t=>{let e=[r,Math.floor(t[1]/Math.pow(2,o)),Math.floor(t[2]/Math.pow(2,o))],i=b(e);n[i]?n[i].aIdTextureTiles.push(t):n[i]={aIdElevationTile:e,aIdTextureTiles:[t]}})),Object.values(n)}(h.concat(p),n,u),m=await this.elevationManager.getDataFromElevationTiles(g,p.map((t=>b(t))));let v=M(m.map((t=>t.min))),T=x(m.map((t=>t.max))),A=s*this.config.zScaleFactor,E=v*A-this.config.basementHeight;return this.objectContainer.userData={mapBox:{x:h[h.length-1][1]-c[1]+1,y:h[h.length-1][2]-c[2]+1,z:(T-v)*A+this.config.basementHeight},zOffset:E,origin:w(c),resolution:s,zResolution:A},(this.config.debug||this.config.dryRun)&&this.log(i,f,c,l,h,p,g,m,v,s),m.forEach((t=>{t.geom=new j(t,A,E),t.geom.computeVertexNormals()})),this.elevationManager.joinNormals(m),m.forEach((t=>{let o=this.textureLoader.load(e.url(...t.aId,e.token)),n=new r.MeshLambertMaterial({map:o,color:16777215}),i=new r.Mesh(t.geom,n);this.config.debug&&i.add(new r.AxesHelper(1));let a=t.aId[1]-c[1],s=c[2]-t.aId[2];i.position.set(a,s,0),i.userData.id=t.id,this.objectContainer.add(i)})),class{static computeBasement(t,e,o,n){let i=[],a=e.south-e.north+1,s=e.east-e.west+1,u=new r.MeshLambertMaterial({emissive:10066329});["north","south"].forEach((s=>{let l="north"===s?0:-a,h="north"===s?1:-1,f=[],c=[],p=[];t.filter((t=>t.aId[2]===e[s])).sort(((t,e)=>t.aId[1]>e.aId[1])).forEach(((t,e,r)=>{let i;t[s].forEach(((t,r,a)=>{let s=e+r/a.length;i=f.length/3,f.push(s,l,t*o-n),f.push(s,l,0),c.push(0,h,0,0,h,0),0===e&&0===r?p.push(i,i+1):p.push(i,i,i-1,i+1,i,i+1)})),e===r.length-1&&(i=f.length/3,f.push(e+1,l,("north"===s?t.east[0]:t.se)*o-n),f.push(e+1,l,0),c.push(0,h,0,0,h,0),p.push(i,i,i-1,i+1))})),"north"===s&&p.reverse();let d=new r.BufferGeometry;d.setAttribute("position",new r.BufferAttribute(new Float32Array(f),3)),d.setAttribute("normal",new r.BufferAttribute(new Float32Array(c),3)),d.setIndex(p),console.log(f,"indexes",p,d.attributes.normal.array);let g=new r.Mesh(d,u);i.push(g)})),["west","east"].forEach((a=>{let l="west"===a?0:s,h="west"===a?-1:1,f=[],c=[],p=[];t.filter((t=>t.aId[1]===e[a])).sort(((t,e)=>t.aId[2]>e.aId[2])).forEach(((t,e,r)=>{let i;t[a].forEach(((t,r,a)=>{let s=-e-r/a.length;i=f.length/3,f.push(l,s,t*o-n),f.push(l,s,0),c.push(h,0,0,h,0,0),0===e&&0===r?p.push(i,i+1):p.push(i,i,i-1,i+1,i,i+1)})),e===r.length-1&&(i=f.length/3,f.push(l,-e-1,("west"===a?t.south[0]:t.se)*o-n),f.push(l,-e-1,0),c.push(h,0,0,h,0,0),p.push(i,i,i-1,i+1))})),"east"===a&&p.reverse();let d=new r.BufferGeometry;d.setAttribute("position",new r.BufferAttribute(new Float32Array(f),3)),d.setAttribute("normal",new r.BufferAttribute(new Float32Array(c),3)),d.setIndex(p);let g=new r.Mesh(d,u);i.push(g)}));{let t=new r.PlaneBufferGeometry(s,a,1,1),e=new r.Mesh(t,u);e.position.set(s/2,-a/2,0),e.rotation.x=Math.PI,i.push(e),console.log("face",t)}return i}}.computeBasement(m,f,A,E).forEach((t=>this.objectContainer.add(t))),this.$loader=document.getElementById("loader"),this.$loaderContent=document.getElementById("loader-content"),this.loadManager.onLoad=()=>{this.$loader.classList.add("hidden"),this.dispatchEvent({type:"dispose"})},this.loadManager.onProgress=(t,e,r)=>{this.$loaderContent.innerText=e+"/"+r},this.objectContainer}log(t,e,r,o,n,i,a,s,u,l){let h=this.objectContainer.userData;if(console.info(`location: (${t}), origin tile: ${b(r)}, bbox tiles: (n:${e.north},s:${e.south},w:${e.west},e:${e.east})`),console.info(`bbox: (nw: ${o.northWest}, se: ${o.southEast})`),console.info(`textures tiles: ${n.length}, neighbours: ${i.length}, elevationsTiles: ${a.length}`,n.map((t=>b(t))),i.map((t=>b(t))),a.map((t=>b(t.aIdElevationTile)))),console.info("texture tiles fullfilled:",s,"min elevation: ",u),console.info(`mapBBox: (${h.mapBox.x},${h.mapBox.y},${h.mapBox.z})`,`zOffset: (${h.zOffset})`,`origin: (${h.origin})`,`xyResolution: ${l}`),this.config.dryRun)return console.info("textures tiles load\n",n.concat(i).map((t=>b(t))).join("\n")),void console.info("elevation tiles\n",a.map((t=>b(t.aIdElevationTile))).join("\n"))}}return V.defaultConfig={elevationSource:"terrarium",zScaleFactor:1.6,tileUnits:1,debug:!1,dryRun:!1,basementHeight:.05},V.mapDefaultConfig={textureSource:"osm",tileSegments:32,textureZoom:15,center:[6.4751,46.1024],distanceFromCenter:1},V}));