precision highp float;

struct Ray {
    vec3 origin;
    vec3 target;
    vec3 direction;
    int iter;
    bool hit;
    float depth;
};

Ray initRay(const vec3 origin, const vec3 direction) {
    return Ray(
        origin,
        vec3(origin),
        direction,
        0,
        false,
        0.0
    );
}