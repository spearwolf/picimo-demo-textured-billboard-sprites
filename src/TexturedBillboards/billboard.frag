uniform sampler2D texMap;

uniform vec3 fogColor;
uniform float[2] fogNearFar;

varying vec2 vTexCoords;
varying float fogDepth;

void main(void) {
  vec4 color = texture2D(texMap, vec2(vTexCoords.s, vTexCoords.t));

  if (color.a == 0.0) {
    discard;
  }

  float fogAmount = smoothstep(fogNearFar[0], fogNearFar[1], fogDepth);

  gl_FragColor = vec4(mix(color.xyz, fogColor.xyz, fogAmount), color.a);
}
