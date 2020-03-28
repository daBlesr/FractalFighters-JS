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

//bool castRay(const vec3 ro, const vec3 rd, float resT) {
//    const float dt = 0.01;
//    const float mint = 0.001;
//    const float maxt = 10.0;
//    float lh = 0.0;
//    float ly = 0.0;
//    for( float t = mint; t < maxt; t += dt )
//    {
//        vec3  p = ro + rd*t;
//        float h = sin(p.x) * sin(p.z); // f( p.xz );
//        if( p.y < h )
//        {
//            // interpolate the intersection distance
//            resT = t - dt + dt*(lh-ly)/(p.y-ly-h+lh);
//            return true;
//        }
//        // allow the error to be proportinal to the distance
//        lh = h;
//        ly = p.y;
//    }
//    return false;
//}
