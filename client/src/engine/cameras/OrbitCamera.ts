import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {Camera} from "three";
import Game from "../Game";
import CameraHandler from "./CameraHandler";
import Transform from "../Transform";

class OrbitCamera implements CameraHandler {

    controls: OrbitControls;

    constructor(game: Game) {
        this.controls = new OrbitControls( game.getCamera(), game.getRenderer().domElement );
        this.controls.update();

        // left x+
        // forward z+
        // up y+

        game.getCamera().position.set(20, 5, -10);
        game.getCamera().lookAt(0, 0, 0);
    }


    input(): void {
        // orbitcontrols this does already.
    }

    update(step: number): void {
        // orbitcontrols this does already.
    }

    getTransform(): Transform {
        throw new Error("not yet implemented");
    }
}

export default OrbitCamera;