var t=Object.defineProperty,e=Object.defineProperties,r=Object.getOwnPropertyDescriptors,o=Object.getOwnPropertySymbols,n=Object.prototype.hasOwnProperty,i=Object.prototype.propertyIsEnumerable,a=(e,r,o)=>r in e?t(e,r,{enumerable:!0,configurable:!0,writable:!0,value:o}):e[r]=o,s=(t,e)=>{for(var r in e||(e={}))n.call(e,r)&&a(t,r,e[r]);if(o)for(var r of o(e))i.call(e,r)&&a(t,r,e[r]);return t};import*as u from"three";import{BufferGeometry as l,Float32BufferAttribute as h}from"three";function c(t){return!!t.constructor&&"function"==typeof t.constructor.isBuffer&&t.constructor.isBuffer(t)}var p=function(t){for(var e=new Array(t),r=0;r<t;++r)e[r]=r;return e},f=function(t){return null!=t&&(c(t)||function(t){return"function"==typeof t.readFloatLE&&"function"==typeof t.slice&&c(t.slice(0,0))}(t)||!!t._isBuffer)},d="undefined"!=typeof Float64Array;function m(t,e){return t[0]-e[0]}function g(){var t,e=this.stride,r=new Array(e.length);for(t=0;t<r.length;++t)r[t]=[Math.abs(e[t]),t];r.sort(m);var o=new Array(r.length);for(t=0;t<o.length;++t)o[t]=r[t][1];return o}function v(t,e){var r=["View",e,"d",t].join("");e<0&&(r="View_Nil"+t);var o="generic"===t;if(-1===e){var n="function "+r+"(a){this.data=a;};var proto="+r+".prototype;proto.dtype='"+t+"';proto.index=function(){return -1};proto.size=0;proto.dimension=-1;proto.shape=proto.stride=proto.order=[];proto.lo=proto.hi=proto.transpose=proto.step=function(){return new "+r+"(this.data);};proto.get=proto.set=function(){};proto.pick=function(){return null};return function construct_"+r+"(a){return new "+r+"(a);}";return new Function(n)()}if(0===e){n="function "+r+"(a,d) {this.data = a;this.offset = d};var proto="+r+".prototype;proto.dtype='"+t+"';proto.index=function(){return this.offset};proto.dimension=0;proto.size=1;proto.shape=proto.stride=proto.order=[];proto.lo=proto.hi=proto.transpose=proto.step=function "+r+"_copy() {return new "+r+"(this.data,this.offset)};proto.pick=function "+r+"_pick(){return TrivialArray(this.data);};proto.valueOf=proto.get=function "+r+"_get(){return "+(o?"this.data.get(this.offset)":"this.data[this.offset]")+"};proto.set=function "+r+"_set(v){return "+(o?"this.data.set(this.offset,v)":"this.data[this.offset]=v")+"};return function construct_"+r+"(a,b,c,d){return new "+r+"(a,d)}";return new Function("TrivialArray",n)(y[t][0])}n=["'use strict'"];var i=p(e),a=i.map((function(t){return"i"+t})),s="this.offset+"+i.map((function(t){return"this.stride["+t+"]*i"+t})).join("+"),u=i.map((function(t){return"b"+t})).join(","),l=i.map((function(t){return"c"+t})).join(",");n.push("function "+r+"(a,"+u+","+l+",d){this.data=a","this.shape=["+u+"]","this.stride=["+l+"]","this.offset=d|0}","var proto="+r+".prototype","proto.dtype='"+t+"'","proto.dimension="+e),n.push("Object.defineProperty(proto,'size',{get:function "+r+"_size(){return "+i.map((function(t){return"this.shape["+t+"]"})).join("*"),"}})"),1===e?n.push("proto.order=[0]"):(n.push("Object.defineProperty(proto,'order',{get:"),e<4?(n.push("function "+r+"_order(){"),2===e?n.push("return (Math.abs(this.stride[0])>Math.abs(this.stride[1]))?[1,0]:[0,1]}})"):3===e&&n.push("var s0=Math.abs(this.stride[0]),s1=Math.abs(this.stride[1]),s2=Math.abs(this.stride[2]);if(s0>s1){if(s1>s2){return [2,1,0];}else if(s0>s2){return [1,2,0];}else{return [1,0,2];}}else if(s0>s2){return [2,0,1];}else if(s2>s1){return [0,1,2];}else{return [0,2,1];}}})")):n.push("ORDER})")),n.push("proto.set=function "+r+"_set("+a.join(",")+",v){"),o?n.push("return this.data.set("+s+",v)}"):n.push("return this.data["+s+"]=v}"),n.push("proto.get=function "+r+"_get("+a.join(",")+"){"),o?n.push("return this.data.get("+s+")}"):n.push("return this.data["+s+"]}"),n.push("proto.index=function "+r+"_index(",a.join(),"){return "+s+"}"),n.push("proto.hi=function "+r+"_hi("+a.join(",")+"){return new "+r+"(this.data,"+i.map((function(t){return["(typeof i",t,"!=='number'||i",t,"<0)?this.shape[",t,"]:i",t,"|0"].join("")})).join(",")+","+i.map((function(t){return"this.stride["+t+"]"})).join(",")+",this.offset)}");var h=i.map((function(t){return"a"+t+"=this.shape["+t+"]"})),c=i.map((function(t){return"c"+t+"=this.stride["+t+"]"}));n.push("proto.lo=function "+r+"_lo("+a.join(",")+"){var b=this.offset,d=0,"+h.join(",")+","+c.join(","));for(var f=0;f<e;++f)n.push("if(typeof i"+f+"==='number'&&i"+f+">=0){d=i"+f+"|0;b+=c"+f+"*d;a"+f+"-=d}");n.push("return new "+r+"(this.data,"+i.map((function(t){return"a"+t})).join(",")+","+i.map((function(t){return"c"+t})).join(",")+",b)}"),n.push("proto.step=function "+r+"_step("+a.join(",")+"){var "+i.map((function(t){return"a"+t+"=this.shape["+t+"]"})).join(",")+","+i.map((function(t){return"b"+t+"=this.stride["+t+"]"})).join(",")+",c=this.offset,d=0,ceil=Math.ceil");for(f=0;f<e;++f)n.push("if(typeof i"+f+"==='number'){d=i"+f+"|0;if(d<0){c+=b"+f+"*(a"+f+"-1);a"+f+"=ceil(-a"+f+"/d)}else{a"+f+"=ceil(a"+f+"/d)}b"+f+"*=d}");n.push("return new "+r+"(this.data,"+i.map((function(t){return"a"+t})).join(",")+","+i.map((function(t){return"b"+t})).join(",")+",c)}");var d=new Array(e),m=new Array(e);for(f=0;f<e;++f)d[f]="a[i"+f+"]",m[f]="b[i"+f+"]";n.push("proto.transpose=function "+r+"_transpose("+a+"){"+a.map((function(t,e){return t+"=("+t+"===undefined?"+e+":"+t+"|0)"})).join(";"),"var a=this.shape,b=this.stride;return new "+r+"(this.data,"+d.join(",")+","+m.join(",")+",this.offset)}"),n.push("proto.pick=function "+r+"_pick("+a+"){var a=[],b=[],c=this.offset");for(f=0;f<e;++f)n.push("if(typeof i"+f+"==='number'&&i"+f+">=0){c=(c+this.stride["+f+"]*i"+f+")|0}else{a.push(this.shape["+f+"]);b.push(this.stride["+f+"])}");return n.push("var ctor=CTOR_LIST[a.length+1];return ctor(this.data,a,b,c)}"),n.push("return function construct_"+r+"(data,shape,stride,offset){return new "+r+"(data,"+i.map((function(t){return"shape["+t+"]"})).join(",")+","+i.map((function(t){return"stride["+t+"]"})).join(",")+",offset)}"),new Function("CTOR_LIST","ORDER",n.join("\n"))(y[t],g)}var y={float32:[],float64:[],int8:[],int16:[],int32:[],uint8:[],uint16:[],uint32:[],array:[],uint8_clamped:[],bigint64:[],biguint64:[],buffer:[],generic:[]};var b=function(t,e,r,o){if(void 0===t)return(0,y.array[0])([]);"number"==typeof t&&(t=[t]),void 0===e&&(e=[t.length]);var n=e.length;if(void 0===r){r=new Array(n);for(var i=n-1,a=1;i>=0;--i)r[i]=a,a*=e[i]}if(void 0===o){o=0;for(i=0;i<n;++i)r[i]<0&&(o-=(e[i]-1)*r[i])}for(var s=function(t){if(f(t))return"buffer";if(d)switch(Object.prototype.toString.call(t)){case"[object Float64Array]":return"float64";case"[object Float32Array]":return"float32";case"[object Int8Array]":return"int8";case"[object Int16Array]":return"int16";case"[object Int32Array]":return"int32";case"[object Uint8Array]":return"uint8";case"[object Uint16Array]":return"uint16";case"[object Uint32Array]":return"uint32";case"[object Uint8ClampedArray]":return"uint8_clamped";case"[object BigInt64Array]":return"bigint64";case"[object BigUint64Array]":return"biguint64"}return Array.isArray(t)?"array":"generic"}(t),u=y[s];u.length<=n+1;)u.push(v(s,u.length-1));return(0,u[n+1])(t,e,r,o)};var w={centimeters:637100880,centimetres:637100880,degrees:6371008.8/111325,feet:20902260.511392,inches:6371008.8*39.37,kilometers:6371.0088,kilometres:6371.0088,meters:6371008.8,metres:6371008.8,miles:3958.761333810546,millimeters:6371008800,millimetres:6371008800,nauticalmiles:6371008.8/1852,radians:1,yards:6371008.8*1.0936};function A(t){return 180*(t%(2*Math.PI))/Math.PI}function I(t){return t%360*Math.PI/180}function x(t){return!isNaN(t)&&null!==t&&!Array.isArray(t)}function M(t,e,r,o){void 0===o&&(o={});var n=function(t){if(!t)throw new Error("coord is required");if(!Array.isArray(t)){if("Feature"===t.type&&null!==t.geometry&&"Point"===t.geometry.type)return t.geometry.coordinates;if("Point"===t.type)return t.coordinates}if(Array.isArray(t)&&t.length>=2&&!Array.isArray(t[0])&&!Array.isArray(t[1]))return t;throw new Error("coord must be GeoJSON Point or an Array of numbers")}(t),i=I(n[0]),a=I(n[1]),s=I(r),u=function(t,e){void 0===e&&(e="kilometers");var r=w[e];if(!r)throw new Error(e+" units is invalid");return t/r}(e,o.units),l=Math.asin(Math.sin(a)*Math.cos(u)+Math.cos(a)*Math.sin(u)*Math.cos(s));return function(t,e,r){if(void 0===r&&(r={}),!t)throw new Error("coordinates is required");if(!Array.isArray(t))throw new Error("coordinates must be an Array");if(t.length<2)throw new Error("coordinates must be at least 2 numbers long");if(!x(t[0])||!x(t[1]))throw new Error("coordinates must contain numbers");return function(t,e,r){void 0===r&&(r={});var o={type:"Feature"};return(0===r.id||r.id)&&(o.id=r.id),r.bbox&&(o.bbox=r.bbox),o.properties=e||{},o.geometry=t,o}({type:"Point",coordinates:t},e,r)}([A(i+Math.atan2(Math.sin(s)*Math.sin(u)*Math.cos(a),Math.cos(u)-Math.sin(a)*Math.sin(l))),A(l)],o.properties)}var j={},T=Math.PI/180,$=180/Math.PI;function E(t){var e=O(t[0]+1,t[2]);return[O(t[0],t[2]),S(t[1]+1,t[2]),e,S(t[1],t[2])]}function O(t,e){return t/Math.pow(2,e)*360-180}function S(t,e){var r=Math.PI-2*Math.PI*t/Math.pow(2,e);return $*Math.atan(.5*(Math.exp(r)-Math.exp(-r)))}function F(t,e,r){var o=G(t,e,r);return o[0]=Math.floor(o[0]),o[1]=Math.floor(o[1]),o}function z(t){return[[2*t[0],2*t[1],t[2]+1],[2*t[0]+1,2*t[1],t[2]+1],[2*t[0]+1,2*t[1]+1,t[2]+1],[2*t[0],2*t[1]+1,t[2]+1]]}function P(t){return[t[0]>>1,t[1]>>1,t[2]-1]}function R(t){return z(P(t))}function k(t,e){for(var r=0;r<t.length;r++)if(_(t[r],e))return!0;return!1}function _(t,e){return t[0]===e[0]&&t[1]===e[1]&&t[2]===e[2]}function G(t,e,r){var o=Math.sin(e*T),n=Math.pow(2,r),i=n*(t/360+.5);return(i%=n)<0&&(i+=n),[i,n*(.5-.25*Math.log((1+o)/(1-o))/Math.PI),r]}var D={tileToGeoJSON:function(t){var e=E(t);return{type:"Polygon",coordinates:[[[e[0],e[3]],[e[0],e[1]],[e[2],e[1]],[e[2],e[3]],[e[0],e[3]]]]}},tileToBBOX:E,getChildren:z,getParent:P,getSiblings:R,hasTile:k,hasSiblings:function(t,e){for(var r=R(t),o=0;o<r.length;o++)if(!k(e,r[o]))return!1;return!0},tilesEqual:_,tileToQuadkey:function(t){for(var e="",r=t[2];r>0;r--){var o=0,n=1<<r-1;0!=(t[0]&n)&&o++,0!=(t[1]&n)&&(o+=2),e+=o.toString()}return e},quadkeyToTile:function(t){for(var e=0,r=0,o=t.length,n=o;n>0;n--){var i=1<<n-1,a=+t[o-n];1===a&&(e|=i),2===a&&(r|=i),3===a&&(e|=i,r|=i)}return[e,r,o]},pointToTile:F,bboxToTile:function(t){var e=F(t[0],t[1],32),r=F(t[2],t[3],32),o=[e[0],e[1],r[0],r[1]],n=function(t){for(var e=28,r=0;r<e;r++){var o=1<<32-(r+1);if((t[0]&o)!=(t[2]&o)||(t[1]&o)!=(t[3]&o))return r}return e}(o);return 0===n?[0,0,0]:[o[0]>>>32-n,o[1]>>>32-n,n]},pointToTileFraction:G};function L(t){return{type:"Feature",geometry:D.tileToGeoJSON(t),properties:{}}}function N(t,e){var r,o,n=t.coordinates,i=e.max_zoom,a={},s=[];if("Point"===t.type)return[D.pointToTile(n[0],n[1],i)];if("MultiPoint"===t.type)for(r=0;r<n.length;r++)a[V((o=D.pointToTile(n[r][0],n[r][1],i))[0],o[1],o[2])]=!0;else if("LineString"===t.type)Q(a,n,i);else if("MultiLineString"===t.type)for(r=0;r<n.length;r++)Q(a,n[r],i);else if("Polygon"===t.type)B(a,s,n,i);else{if("MultiPolygon"!==t.type)throw new Error("Geometry type not implemented");for(r=0;r<n.length;r++)B(a,s,n[r],i)}if(e.min_zoom!==i){var u=s.length;for(U(a,s),r=0;r<u;r++){var l=s[r];a[V(l[0],l[1],l[2])]=!0}return function(t,e,r){for(var o=[],n=r.max_zoom;n>r.min_zoom;n--){for(var i={},a=[],s=0;s<e.length;s++){var u=e[s];if(u[0]%2==0&&u[1]%2==0){var l=V(u[0]+1,u[1],n),h=V(u[0],u[1]+1,n),c=V(u[0]+1,u[1]+1,n);if(t[l]&&t[h]&&t[c]){t[V(u[0],u[1],u[2])]=!1,t[l]=!1,t[h]=!1,t[c]=!1;var p=[u[0]/2,u[1]/2,n-1];n-1===r.min_zoom?o.push(p):(i[V(u[0]/2,u[1]/2,n-1)]=!0,a.push(p))}}}for(s=0;s<e.length;s++)t[V((u=e[s])[0],u[1],u[2])]&&o.push(u);t=i,e=a}return o}(a,s,e)}return U(a,s),s}function B(t,e,r,o){for(var n=[],i=0;i<r.length;i++){var a=[];Q(t,r[i],o,a);for(var s=0,u=a.length,l=u-1;s<u;l=s++){var h=(s+1)%u,c=a[s][1];(c>a[l][1]||c>a[h][1])&&(c<a[l][1]||c<a[h][1])&&c!==a[h][1]&&n.push(a[s])}}for(n.sort(C),i=0;i<n.length;i+=2){c=n[i][1];for(var p=n[i][0]+1;p<n[i+1][0];p++){t[V(p,c,o)]||e.push([p,c,o])}}}function C(t,e){return t[1]-e[1]||t[0]-e[0]}function Q(t,e,r,o){for(var n,i,a=0;a<e.length-1;a++){var s=D.pointToTileFraction(e[a][0],e[a][1],r),u=D.pointToTileFraction(e[a+1][0],e[a+1][1],r),l=s[0],h=s[1],c=u[0]-l,p=u[1]-h;if(0!==p||0!==c){var f=c>0?1:-1,d=p>0?1:-1,m=Math.floor(l),g=Math.floor(h),v=0===c?1/0:Math.abs(((c>0?1:0)+m-l)/c),y=0===p?1/0:Math.abs(((p>0?1:0)+g-h)/p),b=Math.abs(f/c),w=Math.abs(d/p);for(m===n&&g===i||(t[V(m,g,r)]=!0,o&&g!==i&&o.push([m,g]),n=m,i=g);v<1||y<1;)v<y?(v+=b,m+=f):(y+=w,g+=d),t[V(m,g,r)]=!0,o&&g!==i&&o.push([m,g]),n=m,i=g}}o&&g===o[0][1]&&o.pop()}function U(t,e){for(var r,o,n,i,a,s=Object.keys(t),u=0;u<s.length;u++)e.push((r=+s[u],o=void 0,n=void 0,i=void 0,a=void 0,void 0,[a=(i=(r-(o=r%32))/32)%(n=2*(1<<o)),(i-a)/n%n,o]))}function V(t,e,r){return 32*(2*(1<<r)*e+t)+r}function Z(t){return`${t[0]}/${t[1]}/${t[2]}`}function q([t,e,r]){return[40075016.68557849*e/Math.pow(2,t)-20037508.342789244,20037508.342789244-40075016.68557849*r/Math.pow(2,t)]}function H(t){for(var e=t.length,r=1/0;e--;)t[e]<r&&(r=t[e]);return r}function J(t){for(var e=t.length,r=-1/0;e--;)t[e]>r&&(r=t[e]);return r}function W(t,e,r,o){const n=function(t,e){const r={type:"Feature",properties:{},geometry:{type:"Polygon",coordinates:[[]]}};let o={type:"Feature",properties:{},geometry:{type:"Point",coordinates:t}};console.log("turf point ",o,t);const[n,i]=M(o,e,-45).geometry.coordinates,[a,s]=M(o,e,135).geometry.coordinates;return r.geometry.coordinates[0]=[[n,i],[a,i],[a,s],[n,s],[n,i]],{feature:r,northWest:[n,i],southEast:[a,s]}}(t,e);let i=j.tiles(n.feature.geometry,{min_zoom:r,max_zoom:r}).map((([t,e,r])=>[r,t,e])).sort(),a=function(t){let e=t.map((t=>Z(t))),r=[];return t.forEach((t=>{let o=[t[0],t[1],t[2]+1],n=[t[0],t[1]+1,t[2]];e.includes(Z(o))||r.push(o),e.includes(Z(n))||r.push(n)})),r}(i);return{aIdOrigin:i[0],aIdFinals:i,aIdNeighbours:a,idNeighbours:a.map((t=>Z(t))),bbox:{north:i[0][2],south:i[i.length-1][2],west:i[0][1],east:i[i.length-1][1]},elevationGroups:Y(i.concat(a),r,o)}}function Y(t,e,r){let o=e-r;const n={};return t.forEach((t=>{let e=[r,Math.floor(t[1]/Math.pow(2,o)),Math.floor(t[2]/Math.pow(2,o))],i=Z(e);n[i]?n[i].aIdTextureTiles.push(t):n[i]={aIdElevationTile:e,aIdTextureTiles:[t]}})),Object.values(n)}j.geojson=function(t,e){return{type:"FeatureCollection",features:N(t,e).map(L)}},j.tiles=N,j.indexes=function(t,e){return N(t,e).map(D.tileToQuadkey)};class K{constructor(t,e,r,o){this.config=t,this.dryRun=o,this.elevationZoom=e,this.textureZoom=r,this.subDivisions=Math.pow(2,this.textureZoom-this.elevationZoom),this.ranges=this.getRanges(t.size,this.subDivisions)}getRanges(t,e){let r=t,o=t,n=[];for(let i=0;i<e;i++)for(let t=0;t<e;t++)n.push([[t*(o/e-1)+t,(t+1)*o/e],[i*(r/e-1)+i,(i+1)*r/e]]);return n}async getDataFromElevationTiles({elevationGroups:t,idNeighbours:e}){let r=t.map((({aIdElevationTile:t,aIdTextureTiles:r})=>new Promise((o=>{this.getDataFromElevationTile(t,r,e,o)})))),o=await Promise.all(r),n=[].concat(...o),i=n.filter((t=>t.elevations));return this.addSouthEastData(i,n),i}joinNormals(t){let e,r=[],o=[];t.sort(((t,e)=>t.aId[2]===e.aId[2]?t.aId[1]-e.aId[1]:t.aId[2]-e.aId[2])).forEach(((t,e,o)=>{t.aId[1]!==o[0].aId[1]&&r.push([o[e-1],t])})),t.sort(((t,e)=>t.aId[1]===e.aId[1]?t.aId[2]-e.aId[2]:t.aId[1]-e.aId[1])).forEach(((t,e,r)=>{t.aId[2]!==r[0].aId[2]&&o.push([r[e-1],t])})),r.length>0&&(e=r[0][0].segments+1,r.forEach((([t,r])=>{let o=t.geom.attributes.normal,n=r.geom.attributes.normal;for(let i=0;i<e;i++){let t=e*i*3;for(let r=0;r<3;r++){let i=(o.array[t+3*(e-1)+r]+n.array[t+r])/2;o.array[t+3*(e-1)+r]=n.array[t+r]=i}}}))),o.length>0&&(e=o[0][0].segments+1,o.forEach((([t,r])=>{let o,n=t.geom.attributes.normal,i=r.geom.attributes.normal,a=(e-1)*e*3;for(let s=0;s<e;s++)for(let t=0;t<3;t++)o=(n.array[a+3*s+t]+i.array[3*s+t])/2,n.array[a+3*s+t]=i.array[3*s+t]=o})))}addSouthEastData(t,e){let r={};e.forEach(((t,e)=>{r[t.id]=e})),t.forEach((t=>{let o=Z([t.aId[0],t.aId[1]+1,t.aId[2]]),n=Z([t.aId[0],t.aId[1],t.aId[2]+1]),i=Z([t.aId[0],t.aId[1]+1,t.aId[2]+1]),a=t.segments+1;for(let s=0;s<t.segments;s++)t.elevations[s*a+a-1]=e[r[o]].west[s];for(let s=0;s<t.segments;s++)t.elevations[(a-1)*a+s]=e[r[n]].north[s];t.east=e[r[o]].west,t.south=e[r[n]].north,r[i]?(t.se=e[r[i]].nw,t.elevations[t.elevations.length-1]=e[r[i]].nw):(t.se=(t.east[t.east.length-1]+t.south[t.south.length-1])/2,t.elevations[t.elevations.length-1]=t.se),t.min=H(t.elevations),t.max=J(t.elevations)}))}getDataFromElevationTile(t,e,r,o){let n=e.map((t=>Z(t))),i=this.config.url(...t,this.config.token);if(this.dryRun){const t=function(t,e="",r=512){const o=atob(t),n=[];for(let i=0;i<o.length;i+=r){const t=o.slice(i,i+r),e=new Array(t.length);for(let r=0;r<t.length;r++)e[r]=t.charCodeAt(r);const a=new Uint8Array(e);n.push(a)}return new Blob(n,{type:e})}("iVBORw0KGgoAAAANSUhEUgAAAQAAAAEAAQMAAABmvDolAAAAA1BMVEV/AAD41xK3AAAAH0lEQVRo3u3BAQ0AAADCIPunNsc3YAAAAAAAAAAAcQchAAABp1cp1wAAAABJRU5ErkJggg==","image/png");i=URL.createObjectURL(t)}let a=[];for(let s=0;s<this.subDivisions;s++)for(let e=0;e<this.subDivisions;e++)a.push([this.textureZoom,t[1]*this.subDivisions+e,t[2]*this.subDivisions+s].join("/"));!function(t,e){var r=new Image;r.crossOrigin="Anonymous",r.onload=function(){let{width:t,height:o}=r;var n=document.createElement("canvas");n.width=t,n.height=o;var i=n.getContext("2d");i.drawImage(r,0,0);var a=i.getImageData(0,0,t,o);e(null,b(a.data,[o,t,4]),[t,o])},r.onerror=function(t){e(t)},r.src=t}(i,((t,e,i)=>{let s;t&&console.error(t);let u=[];a.forEach(((t,o)=>{if(!n.includes(t))return;let i=this.ranges[o],a=i[0][1]-i[0][0],l=null;if(!r.includes(t)){s=0,l=new Float32Array((a+1)*(a+1));for(let t=i[1][0];t<i[1][1];t++)for(let r=i[0][0];r<i[0][1];r++){let o=e.get(t,r,0),n=e.get(t,r,1),a=e.get(t,r,2);l[s]=256*o+n+a/256-32768,s++,r===i[0][1]-1&&(l[s]=0,s++)}}s=0;let h=new Float32Array(a);for(let r=i[0][0];r<i[0][1];r++){let t=e.get(i[1][0],r,0),o=e.get(i[1][0],r,1),n=e.get(i[1][0],r,2);h[s]=256*t+o+n/256-32768,s++}s=0;let c=new Float32Array(a);for(let r=i[1][0];r<i[1][1];r++){let t=e.get(r,i[0][0],0),o=e.get(r,i[0][0],1),n=e.get(r,i[0][0],2);c[s]=256*t+o+n/256-32768,s++}var p;u.push({id:t,aId:(p=t,p.split("/").map((t=>parseInt(t)))),elevations:l,north:h,west:c,nw:h[0],segments:a})})),o(u)}))}}class X extends l{constructor({segments:t,elevations:e,se:r,south:o,east:n},i){super(),this.type="TileGeometry";let a=t,s=t;this.parameters={width:1,height:1,widthSegments:a,heightSegments:s};const u=Math.floor(a),l=Math.floor(s),c=u+1,p=l+1,f=1/u,d=1/l,m=[],g=[],v=[],y=[];let b=0;for(let h=0;h<p;h++){const t=h*d;for(let r=0;r<c;r++){const o=r*f;g.push(o,-t,e[b]*i.z-i.zOffset),b++,v.push(0,0,1),y.push(r/u),y.push(1-h/l)}}for(let h=0;h<l;h++)for(let t=0;t<u;t++){const e=t+c*h,r=t+c*(h+1),o=t+1+c*(h+1),n=t+1+c*h;m.push(e,r,n),m.push(r,o,n)}this.setIndex(m),this.setAttribute("position",new h(g,3)),this.setAttribute("normal",new h(v,3)),this.setAttribute("uv",new h(y,2))}}var tt={elevation:{terrarium:{url:(t,e,r)=>`https://s3.amazonaws.com/elevation-tiles-prod/terrarium/${t}/${e}/${r}.png`,size:256,maxZoom:15},mapboxElevation:{url:(t,e,r,o)=>`https://api.mapbox.com/v4/mapbox.terrain-rgb/${t}/${e}/${r}@2x.pngraw?access_token=${o}`,token:"pk.eyJ1IjoibGhhcGFpcGFpIiwiYSI6IkdfVFF6NTgifQ.oqzkNQOTByLWb9Q0EgNr3A",size:512,maxZoom:15},localElevation:{url:(t,e,r)=>`http://map-tiles.local/terrarium/${t}/${e}/${r}.png`,size:256,maxZoom:15},mapboxTerrainVector:{url:(t,e,r,o)=>`https://api.mapbox.com/v4/mapbox.mapbox-terrain-v2/${t}/${e}/${r}.vector.pbf?access_token=${o}`,token:"pk.eyJ1IjoibGhhcGFpcGFpIiwiYSI6IkdfVFF6NTgifQ.oqzkNQOTByLWb9Q0EgNr3A"}},texture:{localOSM:(t,e,r)=>`http://map-tiles.local/osm/${t}/${e}/${r}.png`,localIgn25:(t,e,r)=>`http://map-tiles.local/ign-25/${t}/${e}/${r}.jpg`,localIgnSatellite:(t,e,r)=>`http://map-tiles.local/ign-satellite/${t}/${e}/${r}.jpg`,localSwiss25:(t,e,r)=>`http://map-tiles.local/swiss-25/${t}/${e}/${r}.jpeg`,localGoogleSatellite:(t,e,r)=>`http://map-tiles.local/google-satellite/${t}/${e}/${r}.jpg`,osm:(t,e,r)=>`https://c.tile.openstreetmap.org/${t}/${e}/${r}.png`,googleSatellite:(t,e,r)=>`https://mt3.google.com/vt/lyrs=s&hl=fr&x=${e}&y=${r}&z=${t}&s=Ga`,ign25:{url:(t,e,r,o)=>`https://wxs.ign.fr/${o}/wmts?layer=GEOGRAPHICALGRIDSYSTEMS.MAPS.SCAN25TOUR&style=normal&tilematrixset=PM&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image/jpeg&TileMatrix=${t}&TileCol=${e}&TileRow=${r}`,size:256,token:"9nc6c2p7hhsijjg2wtd46sgr"},ignSatellite:{url:(t,e,r,o)=>`https://wxs.ign.fr/${o}/wmts?layer=ORTHOIMAGERY.ORTHOPHOTOS&style=normal&tilematrixset=PM&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image/jpeg&TileMatrix=${t}&TileCol=${e}&TileRow=${r}`,size:256,token:"9nc6c2p7hhsijjg2wtd46sgr"},swiss25:(t,e,r)=>`https://wmts5.geo.admin.ch/1.0.0/ch.swisstopo.pixelkarte-farbe-pk25.noscale/default/current/3857/${t}/${e}/${r}.jpeg`,swissSatellite:(t,e,r)=>`https://wmts5.geo.admin.ch/1.0.0/ch.swisstopo.swissimage/default/current/3857/${t}/${e}/${r}.jpeg`,mapboxSatellite:{url:(t,e,r,o)=>`https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/${t}/${e}/${r}?access_token=${o}`,token:"pk.eyJ1IjoibGhhcGFpcGFpIiwiYSI6IkdfVFF6NTgifQ.oqzkNQOTByLWb9Q0EgNr3A",size:256}}};let et={geometry:"Relief",textures:"Textures",path:"Itinéraire"};class rt extends u.EventDispatcher{constructor(t,e,r){super(),this.elements={},this.onReady=e;let o=document.createElement("div");o.classList.add("loader","visible");let n=document.createElement("div");n.classList.add("dialog"),this.statusTextures=document.createElement("span"),t.forEach((t=>{let e=document.createElement("div"),r=document.createElement("span");r.classList.add("status"),r.innerText="",e.appendChild(r),e.appendChild(document.createTextNode(et[t])),n.append(e),this.elements[t]={dom:r,value:!1}})),o.append(n),this.dom=o,r?r.append(o):document.body.append(o)}update(t,e,r){let o=this.elements[t];o&&(o.value=e,o.dom.innerText=e,!0===e&&(this.dispatchEvent({type:`ready:${t}`,context:r}),this.testReady(r)))}testReady(){let t=!0;for(let e in this.elements)t=t&&!0===this.elements[e].value;t&&(this.dom.classList.remove("visible"),setTimeout((()=>{this.dispatchEvent({type:"ready"}),this.onReady()}),0))}}class ot extends u.EventDispatcher{constructor(t,e){super(),this.mapLoader=e||new rt(["geometry","textures"],(()=>{})),this.loadManager=new u.LoadingManager,this.textureLoader=new u.TextureLoader(this.loadManager),this.config=Object.assign({},ot.defaultConfig,t),"string"==typeof this.config.elevationSource&&(this.config.elevationSource=tt.elevation[this.config.elevationSource])}async getMap(t){let{textureSource:o,tileSegments:n,textureZoom:i,center:a,radius:l,material:h}=this.computeMapConfig(t,this.config),c=i-Math.log2(this.config.elevationSource.size/n);if(c>this.config.elevationSource.maxZoom)throw new Exception(`${n}segments z${i},try less`);const p=new K(this.config.elevationSource,c,i,this.config.dryRun),f=W(a,l,i,c),d=await p.getDataFromElevationTiles(f);let m={min:H(d.map((t=>t.min))),max:J(d.map((t=>t.max)))},g=this.computeResolution(i,m.min);this.config.debug&&function(t,e,r,o,n,i){console.info("tilesInfos",e),console.info(`location: (${t}), origin tile: ${Z(e.aIdOrigin)}, bbox tiles: (n:${e.bbox.north},s:${e.bbox.south},w:${e.bbox.west},e:${e.bbox.east})`),console.info(`textures tiles: ${e.aIdFinals.length}, neighbours: ${e.aIdNeighbours.length}, elevationsTiles: ${e.elevationGroups.length}`,e.aIdFinals.map((t=>Z(t))),e.aIdNeighbours.map((t=>Z(t))),e.elevationGroups.map((t=>Z(t.aIdElevationTile)))),console.info("texture tiles fullfilled:",r,"min elevation: ",o.min,"max elevation: ",o.max),console.info(`zOffset: (${n.zOffset})`,`xyResolution: ${n.xy}`),i&&(console.info("textures tiles load\n",e.aIdFinals.concat(e.aIdNeighbours).map((t=>Z(t))).join("\n")),console.info("elevation tiles\n",e.elevationGroups.map((t=>Z(t.aIdElevationTile))).join("\n")))}(a,f,d,m,g,this.config.dryRun),d.forEach((t=>{t.geom=new X(t,g),t.geom.computeVertexNormals()})),p.joinNormals(d);let v=new u.Object3D;return v.userData=this.computeUserData(g,f,m),d.forEach((t=>{let n;if(!1!==h.options.map){let a=this.textureLoader.load(o.url(...t.aId,o.token));n=new u[h.name]((i=s({},h.options),e(i,r({map:a}))))}else n=new u[h.name](s({},h.options));var i;let a=new u.Mesh(t.geom,n);a.position.set(t.aId[1]-f.aIdOrigin[1],f.aIdOrigin[2]-t.aId[2],0),a.userData.id=t.id,v.add(a)})),class{static computeBasement(t,e,r){let o=[],n=e.south-e.north+1,i=e.east-e.west+1,a=new u.MeshLambertMaterial({emissive:10066329});["north","south"].forEach((i=>{let s="north"===i?0:-n,l="north"===i?1:-1,h=[],c=[],p=[];t.filter((t=>t.aId[2]===e[i])).sort(((t,e)=>t.aId[1]-e.aId[1])).forEach(((t,e,o)=>{let n;t[i].forEach(((t,o,i)=>{let a=e+o/i.length;n=h.length/3,h.push(a,s,t*r.z-r.zOffset),h.push(a,s,0),c.push(0,l,0,0,l,0),0===e&&0===o?p.push(n,n+1):p.push(n,n,n-1,n+1,n,n+1)})),e===o.length-1&&(n=h.length/3,h.push(e+1,s,("north"===i?t.east[0]:t.se)*r.z-r.zOffset),h.push(e+1,s,0),c.push(0,l,0,0,l,0),p.push(n,n,n-1,n+1))})),"north"===i&&p.reverse();let f=new u.BufferGeometry;f.setAttribute("position",new u.BufferAttribute(new Float32Array(h),3)),f.setAttribute("normal",new u.BufferAttribute(new Float32Array(c),3)),f.setIndex(p);let d=new u.Mesh(f,a);o.push(d)})),["west","east"].forEach((n=>{let s="west"===n?0:i,l="west"===n?-1:1,h=[],c=[],p=[];t.filter((t=>t.aId[1]===e[n])).sort(((t,e)=>t.aId[2]-e.aId[2])).forEach(((t,e,o)=>{let i;t[n].forEach(((t,o,n)=>{let a=-e-o/n.length;i=h.length/3,h.push(s,a,t*r.z-r.zOffset),h.push(s,a,0),c.push(l,0,0,l,0,0),0===e&&0===o?p.push(i,i+1):p.push(i,i,i-1,i+1,i,i+1)})),e===o.length-1&&(i=h.length/3,h.push(s,-e-1,("west"===n?t.south[0]:t.se)*r.z-r.zOffset),h.push(s,-e-1,0),c.push(l,0,0,l,0,0),p.push(i,i,i-1,i+1))})),"east"===n&&p.reverse();let f=new u.BufferGeometry;f.setAttribute("position",new u.BufferAttribute(new Float32Array(h),3)),f.setAttribute("normal",new u.BufferAttribute(new Float32Array(c),3)),f.setIndex(p);let d=new u.Mesh(f,a);o.push(d)}));{let t=new u.PlaneBufferGeometry(i,n,1,1),e=new u.Mesh(t,a);e.position.set(i/2,-n/2,0),e.rotation.x=Math.PI,o.push(e)}return o}}.computeBasement(d,f.bbox,g).forEach((t=>v.add(t))),this.loadManager.onLoad=()=>{this.mapLoader.update("textures",!0,v)},this.loadManager.onProgress=(t,e,r)=>{let o=Math.ceil(100*e/r);this.mapLoader.update("textures",o)},this.mapLoader.update("geometry",!0,v),!1===h.options.map&&this.loadManager.onLoad(),v}computeMapConfig(t,e){let r=Object.assign({},ot.mapDefaultConfig,t),o=r.textureSource;return"string"==typeof o&&(o=tt.texture[o]),"function"==typeof o&&(o={url:o,size:256}),r.textureSource=o,e.dryRun&&(r.material={name:"MeshLambertMaterial",options:{emissive:2236962,wireframe:!0,color:16777215*Math.random(),map:!1}}),r}computeResolution(t,e){let r=this.config.tileUnits*Math.pow(2,t)/40075016.68557849,o=r*this.config.zScaleFactor;return{xy:r,z:o,zOffset:e*o-this.config.basementHeight}}computeUserData(t,e,r){return{resolution:t,origin:q(e.aIdOrigin),bbox:{x:e.aIdFinals[e.aIdFinals.length-1][1]-e.aIdOrigin[1]+1,y:e.aIdFinals[e.aIdFinals.length-1][2]-e.aIdOrigin[2]+1,z:(r.max-r.min)*t.z+this.config.basementHeight}}}}ot.defaultConfig={elevationSource:"terrarium",zScaleFactor:1.6,tileUnits:1,debug:!1,dryRun:!1,basementHeight:.05},ot.mapDefaultConfig={textureSource:"osm",tileSegments:32,textureZoom:15,center:[6.4751,46.1024],radius:1,material:{name:"MeshLambertMaterial",options:{}}};export default ot;
