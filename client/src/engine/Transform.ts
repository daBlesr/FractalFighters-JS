import {Quaternion, Vector3} from "three";

class Transform {

    private worldPosition: Vector3 = new Vector3();
    private worldVelocity: Vector3 = new Vector3();
    private objectRotation: Quaternion = new Quaternion();

    public getWorldPosition = (): Vector3 => {
        return this.worldPosition;
    };

    public setWorldPosition = (value: Vector3): void => {
        this.worldPosition = value;
    };

    public getWorldVelocity = (): Vector3 => {
        return this.worldVelocity;
    };

    public setWorldVelocity = (value: Vector3): void => {
        this.worldVelocity = value;
    };

    public getObjectRotation = (): Quaternion => {
        return this.objectRotation;
    };

    public setObjectRotation = (value: Quaternion) => {
        this.objectRotation = value;
    };

    // modifies input vector in place.
    public projectLocalToObjectSpace = (vector: Vector3): Vector3 => {
        return vector.applyQuaternion(this.objectRotation);
    };

    // modifies input vector in place.
    public projectObjectToWorldSpace = (vector: Vector3): Vector3 => {
        return vector.add(this.worldPosition);
    };

    public projectLocalToWorldSpace = (vector: Vector3): Vector3 => {
        return this.projectObjectToWorldSpace(
            this.projectLocalToObjectSpace(vector)
        );
    }
}

export default Transform;