precision highp float;

uniform vec2 resolution;

uniform mat4 viewMatrix;
uniform vec3 cameraPosition;

uniform mat4 cameraWorldMatrix;
uniform mat4 cameraProjectionMatrixInverse;
uniform int time;

const float EPS = 0.001;
const vec3 lightDir = vec3(-0.48666426339228763, 0.8111071056538127, -0.3244428422615251);
const float INFINITY = 3.402823466e+38;
// distance functions
//float sinTime = sin(float(time) / 500.0);

float _DistanceFunction(vec3 pos) {
//    return Sphere(p, 5.0);
    float scale = 10.0;
    vec3 repeater = pos / scale;
    repeater = Repeat(repeater + 1.0, 2.0);
    return max(MagicBox(repeater) * scale, Box(pos, vec3(10))); // , Box(pos, 1000));
}

vec3 getRayColor(vec3 origin, vec3 ray) {

    // marching loop
    float dist;
    float depth = 0.0;
    vec3 pos = origin;
    bool hit = false;
    int iteration;
    const int MAX_ITERATIONS = 20;

    for (int i = 0; i < MAX_ITERATIONS; i++){
        iteration = i;
        dist = _DistanceFunction(pos);
        depth += dist;
        pos = origin + depth * ray;

        if (abs(dist) < EPS) break;

    }

    // hit check and calc color
    vec3 color;
    vec3 rayNormal = GetDistanceFunctionNormal(pos) * 0.5 + 0.5;

    if (abs(dist) < EPS) {
        float light = (dot(rayNormal, lightDir) + 1.0) * 0.9; // half lambert
        float ao = 1.0 - 1.0 *  float(iteration) / float(MAX_ITERATIONS); // ambient occlusion using raymarching loop count
        color = vec3(light * ao);
        hit = true;
        return color;
    } else {
        return vec3(0.0);
    }
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

//    color += alpha * getRayColor(cPos, ray);
//    alpha *= 0.3;
    color = getRayColor(cPos, ray);
    gl_FragColor = vec4(color, 1.0);

}