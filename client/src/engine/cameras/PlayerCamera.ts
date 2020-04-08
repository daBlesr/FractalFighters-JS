import CameraHandler from "./CameraHandler";
import DynamicGameEntity from "../DynamicGameEntity";
import Game from "../Game";
import {Euler, Group, Quaternion, Vector3} from "three";
import Transform from "../Transform";
import RigidBody from "../RigidBody";
import DualShockGamepad from "../DualShockGamepad";

class PlayerCamera implements CameraHandler {

    static defaultOffset = new Vector3(0, 5, -10);

    private watchable: RigidBody;
    private game: Game;
    private offset: Vector3 = new Vector3(0, 5, -10);
    private lookatOffset: Vector3 = new Vector3(0, 1, 0);

    constructor(game: Game) {
        this.game = game;
        game.addInputListener(this);
        console.log(this.offset.length());
    }

    watch(entity: RigidBody): void {
        this.watchable = entity;
        // this.watchable.getMesh().add(this.game.getCamera());

    };

    input(): void {
        const gamepad = this.game.getGamepad();
        const cameraRotation = DualShockGamepad.getButtonRJoystick(gamepad);
        const upVectorWatchable = this.offset.normalize().multiplyScalar(11).applyQuaternion(
            new Quaternion().setFromAxisAngle(new Vector3(0, 1,  0), cameraRotation.x / 20.0)
        ).applyQuaternion(
            new Quaternion().setFromAxisAngle(new Vector3(0, 1,  0).cross(this.offset.clone().normalize()), cameraRotation.y / 20.0)
        );

        this.offset = upVectorWatchable;

        if (DualShockGamepad.getButtonRJoystickPressed(gamepad)) {
            this.offset = PlayerCamera.defaultOffset.clone()
                .applyQuaternion(this.watchable.getTransform().getObjectRotation());
        }
    }

    update(step: number): void {
        const camera = this.game.getCamera();

        const newCameraPosition = new Vector3().copy(this.offset);

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