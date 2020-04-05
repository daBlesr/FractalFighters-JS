import CameraHandler from "./CameraHandler";
import DynamicGameEntity from "../DynamicGameEntity";
import Game from "../Game";
import {Group, Vector3} from "three";
import Transform from "../Transform";
import RigidBody from "../RigidBody";

class PlayerCamera implements CameraHandler {

    private watchable: RigidBody;
    private game: Game;
    private offset: Vector3 = new Vector3(0, 5, -10);
    private lookatOffset: Vector3 = new Vector3(0, 1, 0);

    constructor(game: Game) {
        this.game = game;
        game.addInputListener(this);
    }

    watch(entity: RigidBody): void {
        this.watchable = entity;
        this.watchable.getMesh().add(this.game.getCamera());
        this.game.getCamera().position.add(this.offset);
        this.game.getCamera().lookAt(
            this.watchable
                .getTransform()
                .getWorldPosition()
                .clone()
                .add(this.lookatOffset)
        );
    };

    input(): void {


    }

    update(step: number): void {
        // const camera = this.game.getCamera();

        // // local space
        // const newCameraPosition = new Vector3().copy(this.offset);
        //
        // // rotate camera around object according to object rotation itself in local space
        // // newCameraPosition.applyQuaternion(this.watchable.getTransform().getObjectRotation());
        // // newCameraPosition.add(this.watchable
        // //     .getTransform()
        // //     .getWorldPosition()
        // // );
        // //
        // camera.position.copy(newCameraPosition);
        //
        // camera.lookAt(
        //     this.watchable
        //         .getTransform()
        //         .getWorldPosition()
        //         .clone()
        //         .add(this.lookatOffset)
        // );
    }

    getTransform(): Transform {
        throw new Error("not yet implemented");
    }
}

export default PlayerCamera;