precision highp float;
uniform vec2 resolution;

uniform mat4 viewMatrix;
uniform vec3 cameraPosition;

uniform mat4 cameraWorldMatrix;
uniform mat4 cameraProjectionMatrix;
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

vec3 getRayColor(inout Ray ray) {

    // marching loop
    float dist;
    const int MAX_ITERATIONS = 20;

    for (int i = 0; i < MAX_ITERATIONS; i++){
        ray.iter = i;
        dist = _DistanceFunction(ray.target);
        ray.depth += dist;
        ray.target = ray.origin + ray.depth * ray.direction;

        if (abs(dist) < EPS) break;

    }

    // hit check and calc color
    vec3 color;
    vec3 rayNormal = GetDistanceFunctionNormal(ray.target) * 0.5 + 0.5;

    if (abs(dist) < EPS) {
        float light = (dot(rayNormal, lightDir) + 1.0) * 0.9; // half lambert
        float ao = 1.0 - 1.0 *  float(ray.iter) / float(MAX_ITERATIONS); // ambient occlusion using raymarching loop count
        color = vec3(light * ao);
        ray.hit = true;
        return color;
    } else {
        ray.hit = false;
        return vec3(0.0);
    }
}

void main(void) {

    // screen position
    vec2 screenPos = (gl_FragCoord.xy * 2.0 - resolution) / resolution;

    // ray direction in normalized device coordinate
    vec4 rayDirection = vec4(screenPos.xy, 1.0, 1.0);

    // convert ray direction from normalized device coordinate to world coordinate
    vec3 rayDirectionWorldCoordinate = normalize((cameraWorldMatrix * cameraProjectionMatrixInverse * rayDirection).xyz);

    Ray ray = initRay(cameraPosition, rayDirectionWorldCoordinate);

    // camera position
    vec3 cPos = cameraPosition;

    // cast ray
    vec3 color = vec3(0.0);

    color = getRayColor(ray);

    gl_FragColor = vec4(color, 1.0);

    // https://www.iquilezles.org/www/articles/raypolys/raypolys.htm
    float zc = ( cameraProjectionMatrix * vec4( ray.target, 1.0 ) ).z;
    float wc = ( cameraProjectionMatrix * vec4( ray.target, 1.0 ) ).w;
    gl_FragDepthEXT = zc / wc;

}