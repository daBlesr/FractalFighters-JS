import * as THREE from "three";
import {Quaternion, Vector3} from "three";
import RigidBody from "../../../engine/RigidBody";
import DynamicGameEntity from "../../../engine/DynamicGameEntity";
import Game from "../../../engine/Game";
import Transform from "../../../engine/Transform";

class Bullet implements DynamicGameEntity {
    private geometry = new THREE.CylinderGeometry(0.02, 0.02, 0.5, 32);
    private material = new THREE.MeshBasicMaterial({ color: new THREE.Color().setRGB(70 / 255, 126 / 255, 224 / 255)});
    private rigidBody = new RigidBody();

    constructor(game: Game) {
        this.rigidBody.setMesh(new THREE.Mesh(this.geometry, this.material));

        this.rigidBody.setObjectRotation(
            new Quaternion()
                .setFromAxisAngle(new Vector3(1, 0, 0), Math.PI / 2)
        );

        this.rigidBody.setWorldPosition(
            this.rigidBody.getTransform().getWorldPosition().clone().sub(new Vector3(0, 0.1, 0))
        );

        game.getScene().add(this.rigidBody.getMesh());
    }

    public getRigidBody(): RigidBody {
        return this.rigidBody;
    }

    public update(step: number) {
        this.rigidBody.update(step);
    }

    public getTransform(): Transform {
        return this.getRigidBody().getTransform();
    }
}

export default Bullet;