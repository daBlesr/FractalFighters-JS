// http://iquilezles.org/www/articles/distfunctions/distfunctions.htm
precision highp float;

float Sphere( vec3 p, float s )
{
    return length(p) - s;
}

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

float Box( vec3 p, vec3 b )
{
    vec3 q = abs(p) - b;
    return
        length(max(q,0.0)) +
        min(
            max(
                q.x,
                max(q.y,q.z)
            ),
            0.0
        );
}

vec3 Mod(vec3 a, vec3 b)
{
    return fract(abs(a / b)) * abs(b);
}


float MagicBox(in vec3 pos)
{
    float box = Box(pos, vec3(1.0));
    float fractalScale = 1.0;

    for (int iter = 0; iter < 5; iter++)
    {
        vec3 translatedPosition = pos - 0.1 * sin(pos);
        vec3 innerRepeater = Mod(translatedPosition * fractalScale, vec3(2.0)) - 1.0;
        fractalScale *= 3.0;
        vec3 r = abs(1.0 - 3.0 * abs(innerRepeater));

        float da = max(r.x, r.y);
        float db = max(r.y, r.z);
        float dc = max(r.z, r.x);
        float c = (min(min(da, db), dc) - 1.0) / fractalScale;

        box = max(box, c);
    }
    return box;
}
