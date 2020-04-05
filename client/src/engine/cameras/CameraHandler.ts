import {Camera} from "three";
import InputListener from "../InputListener";
import DynamicGameEntity from "../DynamicGameEntity";

interface CameraHandler extends InputListener, DynamicGameEntity {

}

export default CameraHandler;