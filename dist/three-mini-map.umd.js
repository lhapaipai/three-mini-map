!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e(require("three")):"function"==typeof define&&define.amd?define(["three"],e):(t="undefined"!=typeof globalThis?globalThis:t||self).MiniMapManager=e(t.THREE)}(this,(function(t){"use strict";function e(t){if(t&&t.__esModule)return t;var e={__proto__:null,[Symbol.toStringTag]:"Module"};return t&&Object.keys(t).forEach((function(r){if("default"!==r){var o=Object.getOwnPropertyDescriptor(t,r);Object.defineProperty(e,r,o.get?o:{enumerable:!0,get:function(){return t[r]}})}})),e.default=t,Object.freeze(e)}var r=e(t);function o(t){return!!t.constructor&&"function"==typeof t.constructor.isBuffer&&t.constructor.isBuffer(t)}var n=function(t){for(var e=new Array(t),r=0;r<t;++r)e[r]=r;return e},i=function(t){return null!=t&&(o(t)||function(t){return"function"==typeof t.readFloatLE&&"function"==typeof t.slice&&o(t.slice(0,0))}(t)||!!t._isBuffer)},a="undefined"!=typeof Float64Array;function s(t,e){return t[0]-e[0]}function u(){var t,e=this.stride,r=new Array(e.length);for(t=0;t<r.length;++t)r[t]=[Math.abs(e[t]),t];r.sort(s);var o=new Array(r.length);for(t=0;t<o.length;++t)o[t]=r[t][1];return o}function l(t,e){var r=["View",e,"d",t].join("");e<0&&(r="View_Nil"+t);var o="generic"===t;if(-1===e){var i="function "+r+"(a){this.data=a;};var proto="+r+".prototype;proto.dtype='"+t+"';proto.index=function(){return -1};proto.size=0;proto.dimension=-1;proto.shape=proto.stride=proto.order=[];proto.lo=proto.hi=proto.transpose=proto.step=function(){return new "+r+"(this.data);};proto.get=proto.set=function(){};proto.pick=function(){return null};return function construct_"+r+"(a){return new "+r+"(a);}";return new Function(i)()}if(0===e){i="function "+r+"(a,d) {this.data = a;this.offset = d};var proto="+r+".prototype;proto.dtype='"+t+"';proto.index=function(){return this.offset};proto.dimension=0;proto.size=1;proto.shape=proto.stride=proto.order=[];proto.lo=proto.hi=proto.transpose=proto.step=function "+r+"_copy() {return new "+r+"(this.data,this.offset)};proto.pick=function "+r+"_pick(){return TrivialArray(this.data);};proto.valueOf=proto.get=function "+r+"_get(){return "+(o?"this.data.get(this.offset)":"this.data[this.offset]")+"};proto.set=function "+r+"_set(v){return "+(o?"this.data.set(this.offset,v)":"this.data[this.offset]=v")+"};return function construct_"+r+"(a,b,c,d){return new "+r+"(a,d)}";return new Function("TrivialArray",i)(h[t][0])}i=["'use strict'"];var a=n(e),s=a.map((function(t){return"i"+t})),l="this.offset+"+a.map((function(t){return"this.stride["+t+"]*i"+t})).join("+"),c=a.map((function(t){return"b"+t})).join(","),f=a.map((function(t){return"c"+t})).join(",");i.push("function "+r+"(a,"+c+","+f+",d){this.data=a","this.shape=["+c+"]","this.stride=["+f+"]","this.offset=d|0}","var proto="+r+".prototype","proto.dtype='"+t+"'","proto.dimension="+e),i.push("Object.defineProperty(proto,'size',{get:function "+r+"_size(){return "+a.map((function(t){return"this.shape["+t+"]"})).join("*"),"}})"),1===e?i.push("proto.order=[0]"):(i.push("Object.defineProperty(proto,'order',{get:"),e<4?(i.push("function "+r+"_order(){"),2===e?i.push("return (Math.abs(this.stride[0])>Math.abs(this.stride[1]))?[1,0]:[0,1]}})"):3===e&&i.push("var s0=Math.abs(this.stride[0]),s1=Math.abs(this.stride[1]),s2=Math.abs(this.stride[2]);if(s0>s1){if(s1>s2){return [2,1,0];}else if(s0>s2){return [1,2,0];}else{return [1,0,2];}}else if(s0>s2){return [2,0,1];}else if(s2>s1){return [0,1,2];}else{return [0,2,1];}}})")):i.push("ORDER})")),i.push("proto.set=function "+r+"_set("+s.join(",")+",v){"),o?i.push("return this.data.set("+l+",v)}"):i.push("return this.data["+l+"]=v}"),i.push("proto.get=function "+r+"_get("+s.join(",")+"){"),o?i.push("return this.data.get("+l+")}"):i.push("return this.data["+l+"]}"),i.push("proto.index=function "+r+"_index(",s.join(),"){return "+l+"}"),i.push("proto.hi=function "+r+"_hi("+s.join(",")+"){return new "+r+"(this.data,"+a.map((function(t){return["(typeof i",t,"!=='number'||i",t,"<0)?this.shape[",t,"]:i",t,"|0"].join("")})).join(",")+","+a.map((function(t){return"this.stride["+t+"]"})).join(",")+",this.offset)}");var p=a.map((function(t){return"a"+t+"=this.shape["+t+"]"})),d=a.map((function(t){return"c"+t+"=this.stride["+t+"]"}));i.push("proto.lo=function "+r+"_lo("+s.join(",")+"){var b=this.offset,d=0,"+p.join(",")+","+d.join(","));for(var m=0;m<e;++m)i.push("if(typeof i"+m+"==='number'&&i"+m+">=0){d=i"+m+"|0;b+=c"+m+"*d;a"+m+"-=d}");i.push("return new "+r+"(this.data,"+a.map((function(t){return"a"+t})).join(",")+","+a.map((function(t){return"c"+t})).join(",")+",b)}"),i.push("proto.step=function "+r+"_step("+s.join(",")+"){var "+a.map((function(t){return"a"+t+"=this.shape["+t+"]"})).join(",")+","+a.map((function(t){return"b"+t+"=this.stride["+t+"]"})).join(",")+",c=this.offset,d=0,ceil=Math.ceil");for(m=0;m<e;++m)i.push("if(typeof i"+m+"==='number'){d=i"+m+"|0;if(d<0){c+=b"+m+"*(a"+m+"-1);a"+m+"=ceil(-a"+m+"/d)}else{a"+m+"=ceil(a"+m+"/d)}b"+m+"*=d}");i.push("return new "+r+"(this.data,"+a.map((function(t){return"a"+t})).join(",")+","+a.map((function(t){return"b"+t})).join(",")+",c)}");var g=new Array(e),v=new Array(e);for(m=0;m<e;++m)g[m]="a[i"+m+"]",v[m]="b[i"+m+"]";i.push("proto.transpose=function "+r+"_transpose("+s+"){"+s.map((function(t,e){return t+"=("+t+"===undefined?"+e+":"+t+"|0)"})).join(";"),"var a=this.shape,b=this.stride;return new "+r+"(this.data,"+g.join(",")+","+v.join(",")+",this.offset)}"),i.push("proto.pick=function "+r+"_pick("+s+"){var a=[],b=[],c=this.offset");for(m=0;m<e;++m)i.push("if(typeof i"+m+"==='number'&&i"+m+">=0){c=(c+this.stride["+m+"]*i"+m+")|0}else{a.push(this.shape["+m+"]);b.push(this.stride["+m+"])}");return i.push("var ctor=CTOR_LIST[a.length+1];return ctor(this.data,a,b,c)}"),i.push("return function construct_"+r+"(data,shape,stride,offset){return new "+r+"(data,"+a.map((function(t){return"shape["+t+"]"})).join(",")+","+a.map((function(t){return"stride["+t+"]"})).join(",")+",offset)}"),new Function("CTOR_LIST","ORDER",i.join("\n"))(h[t],u)}var h={float32:[],float64:[],int8:[],int16:[],int32:[],uint8:[],uint16:[],uint32:[],array:[],uint8_clamped:[],bigint64:[],biguint64:[],buffer:[],generic:[]};var c=function(t,e,r,o){if(void 0===t)return(0,h.array[0])([]);"number"==typeof t&&(t=[t]),void 0===e&&(e=[t.length]);var n=e.length;if(void 0===r){r=new Array(n);for(var s=n-1,u=1;s>=0;--s)r[s]=u,u*=e[s]}if(void 0===o){o=0;for(s=0;s<n;++s)r[s]<0&&(o-=(e[s]-1)*r[s])}for(var c=function(t){if(i(t))return"buffer";if(a)switch(Object.prototype.toString.call(t)){case"[object Float64Array]":return"float64";case"[object Float32Array]":return"float32";case"[object Int8Array]":return"int8";case"[object Int16Array]":return"int16";case"[object Int32Array]":return"int32";case"[object Uint8Array]":return"uint8";case"[object Uint16Array]":return"uint16";case"[object Uint32Array]":return"uint32";case"[object Uint8ClampedArray]":return"uint8_clamped";case"[object BigInt64Array]":return"bigint64";case"[object BigUint64Array]":return"biguint64"}return Array.isArray(t)?"array":"generic"}(t),f=h[c];f.length<=n+1;)f.push(l(c,f.length-1));return(0,f[n+1])(t,e,r,o)};var f=6371008.8,p={centimeters:637100880,centimetres:637100880,degrees:57.22891354143274,feet:20902260.511392,inches:39.37*f,kilometers:6371.0088,kilometres:6371.0088,meters:f,metres:f,miles:3958.761333810546,millimeters:6371008800,millimetres:6371008800,nauticalmiles:f/1852,radians:1,yards:6967335.223679999};function d(t){return 180*(t%(2*Math.PI))/Math.PI}function m(t){return t%360*Math.PI/180}function g(t){return!isNaN(t)&&null!==t&&!Array.isArray(t)}function v(t,e,r,o){void 0===o&&(o={});var n=function(t){if(!t)throw new Error("coord is required");if(!Array.isArray(t)){if("Feature"===t.type&&null!==t.geometry&&"Point"===t.geometry.type)return t.geometry.coordinates;if("Point"===t.type)return t.coordinates}if(Array.isArray(t)&&t.length>=2&&!Array.isArray(t[0])&&!Array.isArray(t[1]))return t;throw new Error("coord must be GeoJSON Point or an Array of numbers")}(t),i=m(n[0]),a=m(n[1]),s=m(r),u=function(t,e){void 0===e&&(e="kilometers");var r=p[e];if(!r)throw new Error(e+" units is invalid");return t/r}(e,o.units),l=Math.asin(Math.sin(a)*Math.cos(u)+Math.cos(a)*Math.sin(u)*Math.cos(s));return function(t,e,r){if(void 0===r&&(r={}),!t)throw new Error("coordinates is required");if(!Array.isArray(t))throw new Error("coordinates must be an Array");if(t.length<2)throw new Error("coordinates must be at least 2 numbers long");if(!g(t[0])||!g(t[1]))throw new Error("coordinates must contain numbers");return function(t,e,r){void 0===r&&(r={});var o={type:"Feature"};return(0===r.id||r.id)&&(o.id=r.id),r.bbox&&(o.bbox=r.bbox),o.properties=e||{},o.geometry=t,o}({type:"Point",coordinates:t},e,r)}([d(i+Math.atan2(Math.sin(s)*Math.sin(u)*Math.cos(a),Math.cos(u)-Math.sin(a)*Math.sin(l))),d(l)],o.properties)}var y={},b=Math.PI/180,w=180/Math.PI;function I(t){var e=x(t[0]+1,t[2]);return[x(t[0],t[2]),M(t[1]+1,t[2]),e,M(t[1],t[2])]}function x(t,e){return t/Math.pow(2,e)*360-180}function M(t,e){var r=Math.PI-2*Math.PI*t/Math.pow(2,e);return w*Math.atan(.5*(Math.exp(r)-Math.exp(-r)))}function T(t,e,r){var o=S(t,e,r);return o[0]=Math.floor(o[0]),o[1]=Math.floor(o[1]),o}function j(t){return[[2*t[0],2*t[1],t[2]+1],[2*t[0]+1,2*t[1],t[2]+1],[2*t[0]+1,2*t[1]+1,t[2]+1],[2*t[0],2*t[1]+1,t[2]+1]]}function $(t){return[t[0]>>1,t[1]>>1,t[2]-1]}function A(t){return j($(t))}function E(t,e){for(var r=0;r<t.length;r++)if(F(t[r],e))return!0;return!1}function F(t,e){return t[0]===e[0]&&t[1]===e[1]&&t[2]===e[2]}function S(t,e,r){var o=Math.sin(e*b),n=Math.pow(2,r),i=n*(t/360+.5);return(i%=n)<0&&(i+=n),[i,n*(.5-.25*Math.log((1+o)/(1-o))/Math.PI),r]}var O={tileToGeoJSON:function(t){var e=I(t);return{type:"Polygon",coordinates:[[[e[0],e[3]],[e[0],e[1]],[e[2],e[1]],[e[2],e[3]],[e[0],e[3]]]]}},tileToBBOX:I,getChildren:j,getParent:$,getSiblings:A,hasTile:E,hasSiblings:function(t,e){for(var r=A(t),o=0;o<r.length;o++)if(!E(e,r[o]))return!1;return!0},tilesEqual:F,tileToQuadkey:function(t){for(var e="",r=t[2];r>0;r--){var o=0,n=1<<r-1;0!=(t[0]&n)&&o++,0!=(t[1]&n)&&(o+=2),e+=o.toString()}return e},quadkeyToTile:function(t){for(var e=0,r=0,o=t.length,n=o;n>0;n--){var i=1<<n-1,a=+t[o-n];1===a&&(e|=i),2===a&&(r|=i),3===a&&(e|=i,r|=i)}return[e,r,o]},pointToTile:T,bboxToTile:function(t){var e=T(t[0],t[1],32),r=T(t[2],t[3],32),o=[e[0],e[1],r[0],r[1]],n=function(t){for(var e=28,r=0;r<e;r++){var o=1<<32-(r+1);if((t[0]&o)!=(t[2]&o)||(t[1]&o)!=(t[3]&o))return r}return e}(o);return 0===n?[0,0,0]:[o[0]>>>32-n,o[1]>>>32-n,n]},pointToTileFraction:S};function z(t){return{type:"Feature",geometry:O.tileToGeoJSON(t),properties:{}}}function _(t,e){var r,o,n=t.coordinates,i=e.max_zoom,a={},s=[];if("Point"===t.type)return[O.pointToTile(n[0],n[1],i)];if("MultiPoint"===t.type)for(r=0;r<n.length;r++)a[D((o=O.pointToTile(n[r][0],n[r][1],i))[0],o[1],o[2])]=!0;else if("LineString"===t.type)G(a,n,i);else if("MultiLineString"===t.type)for(r=0;r<n.length;r++)G(a,n[r],i);else if("Polygon"===t.type)k(a,s,n,i);else{if("MultiPolygon"!==t.type)throw new Error("Geometry type not implemented");for(r=0;r<n.length;r++)k(a,s,n[r],i)}if(e.min_zoom!==i){var u=s.length;for(R(a,s),r=0;r<u;r++){var l=s[r];a[D(l[0],l[1],l[2])]=!0}return function(t,e,r){for(var o=[],n=r.max_zoom;n>r.min_zoom;n--){for(var i={},a=[],s=0;s<e.length;s++){var u=e[s];if(u[0]%2==0&&u[1]%2==0){var l=D(u[0]+1,u[1],n),h=D(u[0],u[1]+1,n),c=D(u[0]+1,u[1]+1,n);if(t[l]&&t[h]&&t[c]){t[D(u[0],u[1],u[2])]=!1,t[l]=!1,t[h]=!1,t[c]=!1;var f=[u[0]/2,u[1]/2,n-1];n-1===r.min_zoom?o.push(f):(i[D(u[0]/2,u[1]/2,n-1)]=!0,a.push(f))}}}for(s=0;s<e.length;s++)t[D((u=e[s])[0],u[1],u[2])]&&o.push(u);t=i,e=a}return o}(a,s,e)}return R(a,s),s}function k(t,e,r,o){for(var n=[],i=0;i<r.length;i++){var a=[];G(t,r[i],o,a);for(var s=0,u=a.length,l=u-1;s<u;l=s++){var h=(s+1)%u,c=a[s][1];(c>a[l][1]||c>a[h][1])&&(c<a[l][1]||c<a[h][1])&&c!==a[h][1]&&n.push(a[s])}}for(n.sort(P),i=0;i<n.length;i+=2){c=n[i][1];for(var f=n[i][0]+1;f<n[i+1][0];f++){t[D(f,c,o)]||e.push([f,c,o])}}}function P(t,e){return t[1]-e[1]||t[0]-e[0]}function G(t,e,r,o){for(var n,i,a=0;a<e.length-1;a++){var s=O.pointToTileFraction(e[a][0],e[a][1],r),u=O.pointToTileFraction(e[a+1][0],e[a+1][1],r),l=s[0],h=s[1],c=u[0]-l,f=u[1]-h;if(0!==f||0!==c){var p=c>0?1:-1,d=f>0?1:-1,m=Math.floor(l),g=Math.floor(h),v=0===c?1/0:Math.abs(((c>0?1:0)+m-l)/c),y=0===f?1/0:Math.abs(((f>0?1:0)+g-h)/f),b=Math.abs(p/c),w=Math.abs(d/f);for(m===n&&g===i||(t[D(m,g,r)]=!0,o&&g!==i&&o.push([m,g]),n=m,i=g);v<1||y<1;)v<y?(v+=b,m+=p):(y+=w,g+=d),t[D(m,g,r)]=!0,o&&g!==i&&o.push([m,g]),n=m,i=g}}o&&g===o[0][1]&&o.pop()}function R(t,e){for(var r,o,n,i,a,s=Object.keys(t),u=0;u<s.length;u++)e.push((r=+s[u],o=void 0,n=void 0,i=void 0,a=void 0,void 0,[a=(i=(r-(o=r%32))/32)%(n=2*(1<<o)),(i-a)/n%n,o]))}function D(t,e,r){return 32*(2*(1<<r)*e+t)+r}function N(t){return`${t[0]}/${t[1]}/${t[2]}`}function B([t,e,r]){return[40075016.68557849*e/Math.pow(2,t)-20037508.342789244,20037508.342789244-40075016.68557849*r/Math.pow(2,t)]}function L(t){for(var e=t.length,r=1/0;e--;)t[e]<r&&(r=t[e]);return r}function C(t){for(var e=t.length,r=-1/0;e--;)t[e]>r&&(r=t[e]);return r}function Q(t,e,r,o){const n=function(t,e){const r={type:"Feature",properties:{},geometry:{type:"Polygon",coordinates:[[]]}};let o={type:"Feature",properties:{},geometry:{type:"Point",coordinates:t}};console.log("turf point ",o,t);const[n,i]=v(o,e,-45).geometry.coordinates,[a,s]=v(o,e,135).geometry.coordinates;return r.geometry.coordinates[0]=[[n,i],[a,i],[a,s],[n,s],[n,i]],{feature:r,northWest:[n,i],southEast:[a,s]}}(t,e);let i=y.tiles(n.feature.geometry,{min_zoom:r,max_zoom:r}).map((([t,e,r])=>[r,t,e])).sort(),a=function(t){let e=t.map((t=>N(t))),r=[];return t.forEach((t=>{let o=[t[0],t[1],t[2]+1],n=[t[0],t[1]+1,t[2]];e.includes(N(o))||r.push(o),e.includes(N(n))||r.push(n)})),r}(i);return{aIdOrigin:i[0],aIdFinals:i,aIdNeighbours:a,idNeighbours:a.map((t=>N(t))),bbox:{north:i[0][2],south:i[i.length-1][2],west:i[0][1],east:i[i.length-1][1]},elevationGroups:Z(i.concat(a),r,o)}}function Z(t,e,r){let o=e-r;const n={};return t.forEach((t=>{let e=[r,Math.floor(t[1]/Math.pow(2,o)),Math.floor(t[2]/Math.pow(2,o))],i=N(e);n[i]?n[i].aIdTextureTiles.push(t):n[i]={aIdElevationTile:e,aIdTextureTiles:[t]}})),Object.values(n)}y.geojson=function(t,e){return{type:"FeatureCollection",features:_(t,e).map(z)}},y.tiles=_,y.indexes=function(t,e){return _(t,e).map(O.tileToQuadkey)};class q{constructor(t,e,r){this.config=t,this.elevationZoom=e,this.textureZoom=r,this.subDivisions=Math.pow(2,this.textureZoom-this.elevationZoom),this.ranges=this.getRanges(t.size,this.subDivisions)}getRanges(t,e){let r=t,o=t,n=[];for(let i=0;i<e;i++)for(let t=0;t<e;t++)n.push([[t*(o/e-1)+t,(t+1)*o/e],[i*(r/e-1)+i,(i+1)*r/e]]);return n}async getDataFromElevationTiles({elevationGroups:t,idNeighbours:e}){let r=t.map((({aIdElevationTile:t,aIdTextureTiles:r})=>new Promise((o=>{this.getDataFromElevationTile(t,r,e,o)})))),o=await Promise.all(r),n=[].concat(...o),i=n.filter((t=>t.elevations));return this.addSouthEastData(i,n),i}joinNormals(t){let e=[],r=[];t.sort(((t,e)=>t.aId[2]===e.aId[2]?t.aId[1]-e.aId[1]:t.aId[2]-e.aId[2])).forEach(((t,r,o)=>{t.aId[1]!==o[0].aId[1]&&e.push([o[r-1],t])})),t.sort(((t,e)=>t.aId[1]===e.aId[1]?t.aId[2]-e.aId[2]:t.aId[1]-e.aId[1])).forEach(((t,e,o)=>{t.aId[2]!==o[0].aId[2]&&r.push([o[e-1],t])}));let o=e[0][0].segments+1;e.forEach((([t,e])=>{let r=t.geom.attributes.normal,n=e.geom.attributes.normal;for(let i=0;i<o;i++){let t=o*i*3;for(let e=0;e<3;e++){let i=(r.array[t+3*(o-1)+e]+n.array[t+e])/2;r.array[t+3*(o-1)+e]=n.array[t+e]=i}}})),r.forEach((([t,e])=>{let r,n=t.geom.attributes.normal,i=e.geom.attributes.normal,a=(o-1)*o*3;for(let s=0;s<o;s++)for(let t=0;t<3;t++)r=(n.array[a+3*s+t]+i.array[3*s+t])/2,n.array[a+3*s+t]=i.array[3*s+t]=r}))}addSouthEastData(t,e){let r={};e.forEach(((t,e)=>{r[t.id]=e})),t.forEach((t=>{let o=N([t.aId[0],t.aId[1]+1,t.aId[2]]),n=N([t.aId[0],t.aId[1],t.aId[2]+1]),i=N([t.aId[0],t.aId[1]+1,t.aId[2]+1]),a=t.segments+1;for(let s=0;s<t.segments;s++)t.elevations[s*a+a-1]=e[r[o]].west[s];for(let s=0;s<t.segments;s++)t.elevations[(a-1)*a+s]=e[r[n]].north[s];t.east=e[r[o]].west,t.south=e[r[n]].north,r[i]?(t.se=e[r[i]].nw,t.elevations[t.elevations.length-1]=e[r[i]].nw):(t.se=(t.east[t.east.length-1]+t.south[t.south.length-1])/2,t.elevations[t.elevations.length-1]=t.se),t.min=L(t.elevations),t.max=C(t.elevations)}))}getDataFromElevationTile(t,e,r,o){let n=e.map((t=>N(t))),i=this.config.url(...t,this.config.token),a=[];for(let s=0;s<this.subDivisions;s++)for(let e=0;e<this.subDivisions;e++)a.push([this.textureZoom,t[1]*this.subDivisions+e,t[2]*this.subDivisions+s].join("/"));!function(t,e){var r=new Image;r.crossOrigin="Anonymous",r.onload=function(){let{width:t,height:o}=r;var n=document.createElement("canvas");n.width=t,n.height=o;var i=n.getContext("2d");i.drawImage(r,0,0);var a=i.getImageData(0,0,t,o);e(null,c(a.data,[o,t,4]),[t,o])},r.onerror=function(t){e(t)},r.src=t}(i,((t,e,i)=>{let s;t&&console.error(t);let u=[];a.forEach(((t,o)=>{if(!n.includes(t))return;let i=this.ranges[o],a=i[0][1]-i[0][0],l=null;if(!r.includes(t)){s=0,l=new Float32Array((a+1)*(a+1));for(let t=i[1][0];t<i[1][1];t++)for(let r=i[0][0];r<i[0][1];r++){let o=e.get(t,r,0),n=e.get(t,r,1),a=e.get(t,r,2);l[s]=256*o+n+a/256-32768,s++,r===i[0][1]-1&&(l[s]=0,s++)}}s=0;let h=new Float32Array(a);for(let r=i[0][0];r<i[0][1];r++){let t=e.get(i[1][0],r,0),o=e.get(i[1][0],r,1),n=e.get(i[1][0],r,2);h[s]=256*t+o+n/256-32768,s++}s=0;let c=new Float32Array(a);for(let r=i[1][0];r<i[1][1];r++){let t=e.get(r,i[0][0],0),o=e.get(r,i[0][0],1),n=e.get(r,i[0][0],2);c[s]=256*t+o+n/256-32768,s++}var f;u.push({id:t,aId:(f=t,f.split("/").map((t=>parseInt(t)))),elevations:l,north:h,west:c,nw:h[0],segments:a})})),o(u)}))}}class U extends t.BufferGeometry{constructor({segments:e,elevations:r,se:o,south:n,east:i},a){super(),this.type="TileGeometry";let s=e,u=e;this.parameters={width:1,height:1,widthSegments:s,heightSegments:u};const l=Math.floor(s),h=Math.floor(u),c=l+1,f=h+1,p=1/l,d=1/h,m=[],g=[],v=[],y=[];let b=0;for(let t=0;t<f;t++){const e=t*d;for(let o=0;o<c;o++){const n=o*p;g.push(n,-e,r[b]*a.z-a.zOffset),b++,v.push(0,0,1),y.push(o/l),y.push(1-t/h)}}for(let t=0;t<h;t++)for(let e=0;e<l;e++){const r=e+c*t,o=e+c*(t+1),n=e+1+c*(t+1),i=e+1+c*t;m.push(r,o,i),m.push(o,n,i)}this.setIndex(m),this.setAttribute("position",new t.Float32BufferAttribute(g,3)),this.setAttribute("normal",new t.Float32BufferAttribute(v,3)),this.setAttribute("uv",new t.Float32BufferAttribute(y,2))}}var V={elevation:{terrarium:{url:(t,e,r)=>`https://s3.amazonaws.com/elevation-tiles-prod/terrarium/${t}/${e}/${r}.png`,size:256,maxZoom:15},mapboxElevation:{url:(t,e,r,o)=>`https://api.mapbox.com/v4/mapbox.terrain-rgb/${t}/${e}/${r}@2x.pngraw?access_token=${o}`,token:"pk.eyJ1IjoibGhhcGFpcGFpIiwiYSI6IkdfVFF6NTgifQ.oqzkNQOTByLWb9Q0EgNr3A",size:512,maxZoom:15},localElevation:{url:(t,e,r)=>`http://map-tiles.local/terrarium/${t}/${e}/${r}.png`,size:256,maxZoom:15},mapboxTerrainVector:{url:(t,e,r,o)=>`https://api.mapbox.com/v4/mapbox.mapbox-terrain-v2/${t}/${e}/${r}.vector.pbf?access_token=${o}`,token:"pk.eyJ1IjoibGhhcGFpcGFpIiwiYSI6IkdfVFF6NTgifQ.oqzkNQOTByLWb9Q0EgNr3A"}},texture:{localOSM:(t,e,r)=>`http://map-tiles.local/osm/${t}/${e}/${r}.png`,localIgn25:(t,e,r)=>`http://map-tiles.local/ign-25/${t}/${e}/${r}.jpg`,localIgnSatellite:(t,e,r)=>`http://map-tiles.local/ign-satellite/${t}/${e}/${r}.jpg`,localSwiss25:(t,e,r)=>`http://map-tiles.local/swiss-25/${t}/${e}/${r}.jpeg`,localGoogleSatellite:(t,e,r)=>`http://map-tiles.local/google-satellite/${t}/${e}/${r}.jpg`,osm:(t,e,r)=>`https://c.tile.openstreetmap.org/${t}/${e}/${r}.png`,googleSatellite:(t,e,r)=>`https://mt3.google.com/vt/lyrs=s&hl=fr&x=${e}&y=${r}&z=${t}&s=Ga`,ign25:{url:(t,e,r,o)=>`https://wxs.ign.fr/${o}/wmts?layer=GEOGRAPHICALGRIDSYSTEMS.MAPS.SCAN25TOUR&style=normal&tilematrixset=PM&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image/jpeg&TileMatrix=${t}&TileCol=${e}&TileRow=${r}`,size:256,token:"9nc6c2p7hhsijjg2wtd46sgr"},ignSatellite:{url:(t,e,r,o)=>`https://wxs.ign.fr/${o}/wmts?layer=ORTHOIMAGERY.ORTHOPHOTOS&style=normal&tilematrixset=PM&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image/jpeg&TileMatrix=${t}&TileCol=${e}&TileRow=${r}`,size:256,token:"9nc6c2p7hhsijjg2wtd46sgr"},swiss25:(t,e,r)=>`https://wmts5.geo.admin.ch/1.0.0/ch.swisstopo.pixelkarte-farbe-pk25.noscale/default/current/3857/${t}/${e}/${r}.jpeg`,swissSatellite:(t,e,r)=>`https://wmts5.geo.admin.ch/1.0.0/ch.swisstopo.swissimage/default/current/3857/${t}/${e}/${r}.jpeg`,mapboxSatellite:{url:(t,e,r,o)=>`https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/${t}/${e}/${r}?access_token=${o}`,token:"pk.eyJ1IjoibGhhcGFpcGFpIiwiYSI6IkdfVFF6NTgifQ.oqzkNQOTByLWb9Q0EgNr3A",size:256}}};let H={geometry:"Relief",textures:"Textures",path:"Itinéraire"};class J extends r.EventDispatcher{constructor(t,e,r){super(),this.elements={},this.onReady=e;let o=document.createElement("div");o.classList.add("loader","visible");let n=document.createElement("div");n.classList.add("dialog"),this.statusTextures=document.createElement("span"),t.forEach((t=>{let e=document.createElement("div"),r=document.createElement("span");r.classList.add("status"),r.innerText="",e.appendChild(r),e.appendChild(document.createTextNode(H[t])),n.append(e),this.elements[t]={dom:r,value:!1}})),o.append(n),this.dom=o,r?r.append(o):document.body.append(o)}update(t,e,r){let o=this.elements[t];o&&(o.value=e,o.dom.innerText=e,!0===e&&(this.dispatchEvent({type:`ready:${t}`,context:r}),this.testReady(r)))}testReady(){let t=!0;for(let e in this.elements)t=t&&!0===this.elements[e].value;t&&(this.dom.classList.remove("visible"),this.dispatchEvent({type:"ready"}),this.onReady())}}class W extends r.EventDispatcher{constructor(t,e){super(),this.mapLoader=e||new J(["geometry","textures"],(()=>{})),this.loadManager=new r.LoadingManager,this.textureLoader=new r.TextureLoader(this.loadManager),this.config=Object.assign({},W.defaultConfig,t),"string"==typeof this.config.elevationSource&&(this.config.elevationSource=V.elevation[this.config.elevationSource])}async getMap(t){let{textureSource:e,tileSegments:o,textureZoom:n,center:i,radius:a}=this.computeMapConfig(t),s=n-Math.log2(this.config.elevationSource.size/o);if(s>this.config.elevationSource.maxZoom)throw new Exception(`${o}segments z${n},try less`);const u=new q(this.config.elevationSource,s,n),l=Q(i,a,n,s),h=await u.getDataFromElevationTiles(l);let c={min:L(h.map((t=>t.min))),max:C(h.map((t=>t.max)))},f=this.computeResolution(n,c.min);if(this.config.debug&&function(t,e,r,o,n){console.info("tilesInfos",e),console.info(`location: (${t}), origin tile: ${N(e.aIdOrigin)}, bbox tiles: (n:${e.bbox.north},s:${e.bbox.south},w:${e.bbox.west},e:${e.bbox.east})`),console.info(`textures tiles: ${e.aIdFinals.length}, neighbours: ${e.aIdNeighbours.length}, elevationsTiles: ${e.elevationGroups.length}`,e.aIdFinals.map((t=>N(t))),e.aIdNeighbours.map((t=>N(t))),e.elevationGroups.map((t=>N(t.aIdElevationTile)))),console.info("texture tiles fullfilled:",r,"min elevation: ",o.min),console.info(`zOffset: (${n.zOffset})`,`xyResolution: ${n.xy}`)}(i,l,h,c,f),this.config.dryRun)return void function(t){console.info("textures tiles load\n",t.aIdFinals.concat(t.aIdNeighbours).map((t=>N(t))).join("\n")),console.info("elevation tiles\n",t.elevationGroups.map((t=>N(t.aIdElevationTile))).join("\n"))}(l);h.forEach((t=>{t.geom=new U(t,f),t.geom.computeVertexNormals()})),u.joinNormals(h);let p=new r.Object3D;return p.userData=this.computeUserData(f,l,c),h.forEach((t=>{let o=this.textureLoader.load(e.url(...t.aId,e.token)),n=new r.MeshBasicMaterial({map:o}),i=new r.Mesh(t.geom,n);i.position.set(t.aId[1]-l.aIdOrigin[1],l.aIdOrigin[2]-t.aId[2],0),i.userData.id=t.id,p.add(i)})),class{static computeBasement(t,e,o){let n=[],i=e.south-e.north+1,a=e.east-e.west+1,s=new r.MeshLambertMaterial({emissive:10066329});["north","south"].forEach((a=>{let u="north"===a?0:-i,l="north"===a?1:-1,h=[],c=[],f=[];t.filter((t=>t.aId[2]===e[a])).sort(((t,e)=>t.aId[1]-e.aId[1])).forEach(((t,e,r)=>{let n;t[a].forEach(((t,r,i)=>{let a=e+r/i.length;n=h.length/3,h.push(a,u,t*o.z-o.zOffset),h.push(a,u,0),c.push(0,l,0,0,l,0),0===e&&0===r?f.push(n,n+1):f.push(n,n,n-1,n+1,n,n+1)})),e===r.length-1&&(n=h.length/3,h.push(e+1,u,("north"===a?t.east[0]:t.se)*o.z-o.zOffset),h.push(e+1,u,0),c.push(0,l,0,0,l,0),f.push(n,n,n-1,n+1))})),"north"===a&&f.reverse();let p=new r.BufferGeometry;p.setAttribute("position",new r.BufferAttribute(new Float32Array(h),3)),p.setAttribute("normal",new r.BufferAttribute(new Float32Array(c),3)),p.setIndex(f);let d=new r.Mesh(p,s);n.push(d)})),["west","east"].forEach((i=>{let u="west"===i?0:a,l="west"===i?-1:1,h=[],c=[],f=[];t.filter((t=>t.aId[1]===e[i])).sort(((t,e)=>t.aId[2]-e.aId[2])).forEach(((t,e,r)=>{let n;t[i].forEach(((t,r,i)=>{let a=-e-r/i.length;n=h.length/3,h.push(u,a,t*o.z-o.zOffset),h.push(u,a,0),c.push(l,0,0,l,0,0),0===e&&0===r?f.push(n,n+1):f.push(n,n,n-1,n+1,n,n+1)})),e===r.length-1&&(n=h.length/3,h.push(u,-e-1,("west"===i?t.south[0]:t.se)*o.z-o.zOffset),h.push(u,-e-1,0),c.push(l,0,0,l,0,0),f.push(n,n,n-1,n+1))})),"east"===i&&f.reverse();let p=new r.BufferGeometry;p.setAttribute("position",new r.BufferAttribute(new Float32Array(h),3)),p.setAttribute("normal",new r.BufferAttribute(new Float32Array(c),3)),p.setIndex(f);let d=new r.Mesh(p,s);n.push(d)}));{let t=new r.PlaneBufferGeometry(a,i,1,1),e=new r.Mesh(t,s);e.position.set(a/2,-i/2,0),e.rotation.x=Math.PI,n.push(e)}return n}}.computeBasement(h,l.bbox,f).forEach((t=>p.add(t))),this.loadManager.onLoad=()=>{this.mapLoader.update("textures",!0,p)},this.loadManager.onProgress=(t,e,r)=>{let o=Math.ceil(100*e/r);this.mapLoader.update("textures",o)},this.mapLoader.update("geometry",!0,p),p}computeMapConfig(t){let e=Object.assign({},W.mapDefaultConfig,t),r=e.textureSource;return"string"==typeof r&&(r=V.texture[r]),"function"==typeof r&&(r={url:r,size:256}),e.textureSource=r,e}computeResolution(t,e){let r=this.config.tileUnits*Math.pow(2,t)/40075016.68557849,o=r*this.config.zScaleFactor;return{xy:r,z:o,zOffset:e*o-this.config.basementHeight}}computeUserData(t,e,r){return{resolution:t,origin:B(e.aIdOrigin),bbox:{x:e.aIdFinals[e.aIdFinals.length-1][1]-e.aIdOrigin[1]+1,y:e.aIdFinals[e.aIdFinals.length-1][2]-e.aIdOrigin[2]+1,z:(r.max-r.min)*t.z+this.config.basementHeight}}}}return W.defaultConfig={elevationSource:"terrarium",zScaleFactor:1.6,tileUnits:1,debug:!1,dryRun:!1,basementHeight:.05},W.mapDefaultConfig={textureSource:"osm",tileSegments:32,textureZoom:15,center:[6.4751,46.1024],radius:1},W}));
