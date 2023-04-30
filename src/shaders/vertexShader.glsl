uniform sampler2D u_elevation_data;
uniform float u_time;

varying vec2 vUv;

void main() {
  vUv = uv;

  vec4 modelPosition = modelMatrix * vec4(position, 1.0);

  vec4 textureCoord = texture2D(u_elevation_data,uv);
  float r = textureCoord.r * 256.;
  float g = textureCoord.g * 256.;
  float b = textureCoord.b * 256.;
  float offset =  r * 256. + g + b / 256. - 32768. > 0. ? r * 256. + g + b / 256. - 32768. : 1.;
  offset = offset / 1000.;

  // float test = sin(u_time + length(modelPosition.xy)) > 0. ? 1. : 0.5;
  // * (sin(u_time + length(modelPosition.xy)) / 2. + 0.5);
  modelPosition.z += offset * (sin(u_time + length(modelPosition.xy)) / 2. + 0.5);


  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;
}
