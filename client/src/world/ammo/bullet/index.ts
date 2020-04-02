
import * as THREE from "three";
import Renderable from "../../engine/Renderable";

class Bullet extends Renderable {
    private geometry = new THREE.CylinderGeometry(5, 5, 20, 32);
    private material = new THREE.MeshBasicMaterial({ color: new THREE.Color().setRGB(70 / 255, 126 / 255, 224 / 255)});
    private mesh: THREE.Mesh;

    constructor(scene: THREE.Scene, position: THREE.Vector3, direction: THREE.Vector3) {
        super();
        this.position = position;
        this.direction = direction;
        this.velocity = 20;
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.position.copy(position);

        scene.add(this.mesh);
    }

}

export default Bullet;