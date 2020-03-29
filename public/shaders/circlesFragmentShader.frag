precision highp float;

uniform vec2 resolution;

uniform mat4 viewMatrix;
uniform vec3 cameraPosition;

uniform mat4 cameraWorldMatrix;
uniform mat4 cameraProjectionMatrixInverse;
uniform int time;

const float EPS = 0.01;
const float OFFSET = EPS * 100.0;
const vec3 lightDir = vec3(-0.48666426339228763, 0.8111071056538127, -0.3244428422615251);
const float INFINITY = 3.402823466e+38;
// distance functions
float sinTime = sin(float(time) / 500.0);

float sceneDist(vec3 p) {
    return Sphere(p, 5.0);
}

vec3 getRayColor(vec3 origin, vec3 ray) {

    // marching loop
    float dist;
    float depth = 0.0;
    vec3 pos = origin;
    bool hit = false;

    for (int i = 0; i < 150; i++){

        dist = sceneDist(pos);
        depth += dist;
        pos = origin + depth * ray;

        if (abs(dist) < EPS) break;

    }

    // hit check and calc color
    vec3 color;

    if (abs(dist) < EPS) {
        color = vec3(1.0);
        hit = true;
    } else {
        color = vec3(0.0);
    }
    return color;
//    return color - pow(clamp(0.05 * depth, 0.0, 0.6), 2.0);
}

void main(void) {

    // screen position
    vec2 screenPos = (gl_FragCoord.xy * 2.0 - resolution) / resolution;

    // ray direction in normalized device coordinate
    vec4 ndcRay = vec4(screenPos.xy, 1.0, 1.0);

    // convert ray direction from normalized device coordinate to world coordinate
    vec3 ray = (cameraWorldMatrix * cameraProjectionMatrixInverse * ndcRay).xyz;
    ray = normalize(ray);

    // camera position
    vec3 cPos = cameraPosition;

    // cast ray
    vec3 color = vec3(0.0);
    float alpha = 1.0;

    color += alpha * getRayColor(cPos, ray);
    alpha *= 0.3;

    gl_FragColor = vec4(color, 1.0);

}