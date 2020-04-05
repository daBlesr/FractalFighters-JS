import * as THREE from "three";
import Transform from "./Transform";
import {Mesh} from "three";
import {Vector3} from "three";
import {Quaternion} from "three";
import DynamicGameEntity from "./DynamicGameEntity";

class RigidBody implements DynamicGameEntity {

    private transform: Transform = new Transform();
    private mesh: Mesh;

    setMesh = (mesh: Mesh) => {
        this.mesh = mesh;
    };

    getMesh = () => {
        return this.mesh;
    };

    getTransform = () => {
        return this.transform;
    };

    public setWorldPosition = (value: Vector3): void => {
        this.transform.setWorldPosition(value);
        this.mesh.position.copy(value);
    };

    public setObjectRotation = (value: Quaternion) => {
        this.transform.setObjectRotation(value);
        this.mesh.rotation.setFromQuaternion(this.transform.getObjectRotation());
    };

    update = (step: number): void => {
        this.setWorldPosition(
            this.getTransform().getWorldPosition().clone()
                .add(this.transform.getWorldVelocity())
        )
    }
}

export default RigidBody;