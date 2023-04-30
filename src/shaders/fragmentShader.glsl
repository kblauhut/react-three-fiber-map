uniform sampler2D u_elevation_data;
uniform vec2 winResolution;
uniform float u_time;

varying vec2 vUv;

vec3 colorA = vec3(0.,0.4,1.);
vec3 colorB = vec3(0.,0.,0.);

void main() {
    vec2 texCoord = gl_FragCoord.xy / winResolution;

    vec4 textureCoord = texture2D(u_elevation_data,vUv);
    float r = textureCoord.r * 256.;
    float g = textureCoord.g * 256.;
    float b = textureCoord.b * 256.;
    float offset =  r * 256. + g + b / 256. - 32768. > 0. ? r * 256. + g + b / 256. - 32768. : 1.;


    vec3 color = vec3(1.,1.,1.);
    color = mix(colorA, color, offset / 5000.);
    color = mix(colorB, color, offset / 2000.);


    gl_FragColor = vec4(color,1.0);
}