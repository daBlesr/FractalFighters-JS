precision highp float;

uniform vec2 resolution;

uniform mat4 viewMatrix;
uniform vec3 cameraPosition;

uniform mat4 cameraWorldMatrix;
uniform mat4 cameraProjectionMatrixInverse;

const float EPS = 0.01;
const float OFFSET = EPS * 100.0;
const vec3 lightDir = vec3(-0.48666426339228763, 0.8111071056538127, -0.3244428422615251);

// distance functions


float sphereDist(vec3 p, float r) {

    return length(opRep(p, 3.0)) - r;

}

float boxes(vec3 p) {
    return roundBox(repeat(p, vec3(20.0, 0, 20.0)), vec3(1.0, 5.0, 1.0), 0.1);
}

float floorDist(vec3 p){

    return dot(p, vec3(0.0, 1.0, 0.0)) + 0.01;

}

vec4 minVec4(vec4 a, vec4 b) {

    return (a.a < b.a) ? a : b;

}

float sceneDist(vec3 p) {

    return min(
        boxes(p),
        floorDist(p)
    );

}

vec4 sceneColor(vec3 p) {
    return minVec4(
        vec4(vec3(25.0 / 255.0, 255.0 / 255.0, 71.0/ 255.0), boxes(p)),
        vec4(vec3(255.0 / 255.0, 101.0 / 255.0, 54.0 / 255.0), floorDist(p))
    );
}

vec3 getNormal(vec3 p) {

    return normalize(vec3(
    sceneDist(p + vec3(EPS, 0.0, 0.0)) - sceneDist(p + vec3(-EPS, 0.0, 0.0)),
    sceneDist(p + vec3(0.0, EPS, 0.0)) - sceneDist(p + vec3(0.0, -EPS, 0.0)),
    sceneDist(p + vec3(0.0, 0.0, EPS)) - sceneDist(p + vec3(0.0, 0.0, -EPS))
    ));

}

vec3 getRayColor(vec3 origin, vec3 ray, out vec3 pos, out vec3 normal, out bool hit) {

    // marching loop
    float dist;
    float depth = 0.0;
    pos = origin;

    for (int i = 0; i < 150; i++){

        dist = sceneDist(pos);
        depth += dist;
        pos = origin + depth * ray;

        if (abs(dist) < EPS) break;

    }

    // hit check and calc color
    vec3 color;

    if (abs(dist) < EPS) {

        normal = getNormal(pos);
        float diffuse = clamp(dot(lightDir, normal), 0.1, 1.0);
        float specular = pow(clamp(dot(reflect(lightDir, normal), ray), 0.0, 1.0), 10.0);
        float shadow = sceneDist(pos + normal * OFFSET + lightDir);
        color = (sceneColor(pos).rgb * diffuse + vec3(0.8) * specular) * max(0.5, shadow);

        hit = true;

    } else {

        color = vec3(0.0);

    }

    return color - pow(clamp(0.05 * depth, 0.0, 0.6), 2.0);

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
    vec3 pos, normal;
    bool hit;
    float alpha = 1.0;

    color += alpha * getRayColor(cPos, ray, pos, normal, hit);
    alpha *= 0.3;
    cPos = pos + normal * OFFSET;

    gl_FragColor = vec4(color, 1.0);

}