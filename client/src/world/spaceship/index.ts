import * as THREE from "three";
import Renderable from "../engine/Renderable";
import * as assert from "assert";
import * as Assert from "assert";

class Spaceship extends Renderable {
    private static SPACESHIP_MESH: THREE.Mesh;

    private mesh: THREE.Mesh;
    private camera: THREE.Camera;

    constructor(scene: THREE.Scene, position: THREE.Vector3, direction: THREE.Vector3) {
        super();

        Assert.notEqual(Spaceship.SPACESHIP_MESH, null, "Mesh should be initialized before constructing object");

        this.position = position;
        this.direction = direction;
        this.velocity = 0;
        this.mesh = Spaceship.SPACESHIP_MESH.clone(true);
        this.mesh.position.copy(position);

        scene.add(this.mesh);
    }

    public static setMesh(mesh: THREE.Mesh) {
        Spaceship.SPACESHIP_MESH = mesh;
    }

    public controlledByPlayer(camera: THREE.Camera) {
        this.camera = camera;
        
    }
}

export default Spaceship;
