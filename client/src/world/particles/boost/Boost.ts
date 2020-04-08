import Transform from "../../../engine/Transform";
import * as Assert from "assert";
import {Color, Material, Mesh, MeshBasicMaterial, MeshLambertMaterial, SphereGeometry, Texture, Vector3} from "three";
import ParticleEffect from "../ParticleEffect";
import Game from "../../../engine/Game";

class Boost extends ParticleEffect {

    static TEXTURE: Texture;
    static GEOMETRY = new SphereGeometry(0.5, 10, 10);
    static MATERIAL: Material = new MeshBasicMaterial({

        color: new Color().setRGB(1, 0,0)
    });

    constructor(game: Game, worldPosition: Vector3) {
        super(game, worldPosition);
        // Assert.notEqual(Boost.TEXTURE, null, "Texture should be initialized before constructing object");
        Assert.notEqual(Boost.MATERIAL, null, "Material should be initialized before constructing object");
    }

    getTransform(): Transform {
        throw new Error("not applicable for boost");
    }

    setTextureAndMaterial(texture: Texture) {
        Boost.MATERIAL = new MeshLambertMaterial({
            map: texture,
            transparent: true
        });
        Boost.TEXTURE = texture;
    }

    createParticleMesh(): Mesh {
        return new Mesh(Boost.GEOMETRY, Boost.MATERIAL);
    }
}

export default Boost;