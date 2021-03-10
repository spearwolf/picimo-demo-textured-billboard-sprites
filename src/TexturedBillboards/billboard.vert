#pragma glslify: snoise2 = require(glsl-noise/simplex/2d)

attribute vec3 centerPosition;
attribute vec2 particleSize;
attribute vec4 tex;

varying vec2 vTexCoords;
varying float fogDepth;

void main(void)
{
  // ---- billboards ------------------------------
  vec3 look = normalize(cameraPosition - centerPosition);
  vec3 cameraUp = vec3(modelViewMatrix[0].y, modelViewMatrix[1].y, modelViewMatrix[2].y);
  vec3 billboardRight = cross(cameraUp, look);
  vec3 billboardUp = cross(look, billboardRight);

  vec3 vertexPosition = centerPosition
                      + billboardRight * position.x * particleSize.x
                      + billboardUp * position.y * particleSize.y;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(vertexPosition, 1.0);

  vTexCoords = vec2(tex.x + (uv.x * tex.z), tex.y + (uv.y * tex.w));

  fogDepth = -(modelViewMatrix * vec4(centerPosition, 1.0)).z;
}
