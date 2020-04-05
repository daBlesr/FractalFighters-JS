import CameraHandler from "./CameraHandler";
import DynamicGameEntity from "../DynamicGameEntity";
import Game from "../Game";
import {Vector3} from "three";

class PlayerCamera implements CameraHandler {

    private watchable: DynamicGameEntity;
    private game: Game;

    constructor(game: Game) {
        this.game = game;
        this.game.addInputListener(this);
    }

    watch(entity: DynamicGameEntity): void {
        this.watchable = entity;
    };

    input(): void {
        const camera = this.game.getCamera();

        camera.position.copy(
            this.watchable
                .getTransform()
                .getWorldPosition()
                .clone()
                .add(new Vector3(0, 10, -10))
        );

        camera.lookAt(
            this.watchable
                .getTransform()
                .getWorldPosition()
        );
    }
}

export default PlayerCamera;