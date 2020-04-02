import * as THREE from "three";

abstract class Renderable {

    protected position: THREE.Vector3;
    protected velocity: number;
    protected direction: THREE.Vector3;

    tick(): void {
        this.position.add(
            this.direction
                .clone()
                .multiplyScalar(this.velocity)
        );
    };

}

export default Renderable;