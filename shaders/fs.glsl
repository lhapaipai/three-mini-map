#include <common>

uniform float u_time;
uniform vec2 u_res;

varying vec2 v_uv;


void main() {

  // vec2 uv = gl_FragCoord.xy / u_res;
  vec2 uv = v_uv;
  gl_FragColor = vec4(uv, .0, 1.);
}