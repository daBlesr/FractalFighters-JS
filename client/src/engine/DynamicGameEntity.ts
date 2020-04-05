import {Vector3} from "three";
import Transform from "./Transform";

interface DynamicGameEntity {

    update(step: number): void;
    getTransform(): Transform;
}

export default DynamicGameEntity;