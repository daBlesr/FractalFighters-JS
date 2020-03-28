// http://iquilezles.org/www/articles/distfunctions/distfunctions.htm
precision highp float;

float roundBox( vec3 p, vec3 b, float r )
{
    vec3 q = abs(p) - b;
    return length(max(q, 0.0)) + min(max(q.x,max(q.y, q.z)), 0.0) - r;
}

vec3 opRep(vec3 p, float interval) {

    vec2 q = mod(p.xz, interval) - interval * 0.5;
    return vec3(q.x, p.y, q.y);

}

// transforms the position argument of a primitve.
// @c repition period
// only works for primitives with bounding box smaller than half of c
// usage: roundBox(repeat(p, c))
vec3 repeat( in vec3 p, in vec3 c )
{
    return mod(p+0.5*c,c)-0.5*c;
}



