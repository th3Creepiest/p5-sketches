precision mediump float;

uniform float u_time;

vec3 colorA = vec3(0.38, 0.05, 0.22);
vec3 colorB = vec3(0.06, 0.35, 0.23);

void main() {
    vec3 color = vec3(0.0);
    float pct = abs(sin(u_time));

    color = mix(colorA, colorB, pct);

    gl_FragColor = vec4(color, 1.0);
}
