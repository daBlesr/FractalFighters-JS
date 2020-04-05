import CameraHandler from "./CameraHandler";
import DynamicGameEntity from "../DynamicGameEntity";
import Game from "../Game";
import {Vector3} from "three";
import Transform from "../Transform";

class PlayerCamera implements CameraHandler {

    private watchable: DynamicGameEntity;
    private game: Game;
    private offset: Vector3 = new Vector3(0, 5, -10);
    private lookatOffset: Vector3 = new Vector3(0, 1, 0);

    constructor(game: Game) {
        this.game = game;
    }

    watch(entity: DynamicGameEntity): void {
        this.watchable = entity;
    };

    input(): void {


    }

    update(step: number): void {
        const camera = this.game.getCamera();

        const newCameraPosition = new Vector3().copy(this.offset);

        // rotate camera around object according to object rotation itself.
        newCameraPosition.applyQuaternion(this.watchable.getTransform().getObjectRotation());
        newCameraPosition.add(this.watchable
            .getTransform()
            .getWorldPosition()
        );

        camera.position.copy(newCameraPosition);

        camera.lookAt(
            this.watchable
                .getTransform()
                .getWorldPosition()
                .clone()
                .add(this.lookatOffset)
        );
    }

    getTransform(): Transform {
        throw new Error("not yet implemented");
    }
}

export default PlayerCamera;