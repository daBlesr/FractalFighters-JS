import * as THREE from "three";
import {Quaternion, Vector3} from "three";
import RigidBody from "../../engine/RigidBody";
import * as Assert from "assert";
import Game from "../../engine/Game";
import Bullet from "../ammo/bullet";
import DynamicGameEntity from "../../engine/DynamicGameEntity";
import Transform from "../../engine/Transform";
import InputListener from "../../engine/InputListener";
import DualShockGamepad from "../../engine/DualShockGamepad";
import Timer from "../../engine/Timer";

class Spaceship implements DynamicGameEntity, InputListener {
    private static SPACESHIP_MESH: THREE.Mesh;

    private rigidBody: RigidBody = new RigidBody();
    private game: Game;
    private bulletTimer = new Timer(300);

    constructor(game: Game) {
        Assert.notEqual(Spaceship.SPACESHIP_MESH, null, "Mesh should be initialized before constructing object");

        this.game = game;
        this.rigidBody.setMesh(Spaceship.SPACESHIP_MESH.clone(true));

        game.getScene().add(this.rigidBody.getMesh());
        game.addInputListener(this);

    }

    public static setMesh(mesh: THREE.Mesh) {
        Spaceship.SPACESHIP_MESH = mesh;
    }

    public shoot() {
        if (this.bulletTimer.use()) {
            const bulletL = new Bullet(this.game);
            const bulletR = new Bullet(this.game);

            // rotate bullet to rotation of ship.
            bulletL.getRigidBody().setObjectRotation(this.getTransform().getObjectRotation().clone());
            bulletR.getRigidBody().setObjectRotation(this.getTransform().getObjectRotation().clone());

            const bulletRotation = this.rigidBody.getTransform().projectLocalToObjectSpace(new Vector3(0, 0, 2));

            bulletL.getRigidBody().getTransform().setWorldVelocity(bulletRotation);
            bulletR.getRigidBody().getTransform().setWorldVelocity(bulletRotation);

            bulletL.getRigidBody().setWorldPosition(
                this.rigidBody.getTransform().projectLocalToWorldSpace(
                    new Vector3(1, 0, 2)
                )
            );

            bulletR.getRigidBody().setWorldPosition(
                this.rigidBody.getTransform().projectLocalToWorldSpace(
                    new Vector3(-1, 0, 2)
                )
            );

            this.game.getGameState().addObject(bulletL);
            this.game.getGameState().addObject(bulletR);
        }
    }

    update(step: number) {
        this.rigidBody.update(step);
    };

    getTransform(): Transform {
        return this.rigidBody.getTransform();
    }

    input(): void {
        const movement = DualShockGamepad.getButtonLJoystick(this.game.getGamepad());

        // local coordinate space
        const rotation = new Quaternion()
            .setFromAxisAngle(new Vector3(0, 0, 1), movement.x / 15)
            .multiply(
                new Quaternion()
                    .setFromAxisAngle(new Vector3(-1, 0, 0), movement.y / 15)
            );

        this.rigidBody.setObjectRotation(
            // object coordinate space
            this.getTransform().getObjectRotation().clone().multiply(rotation)
        );

        this.getTransform().setWorldVelocity(
            this.getTransform().projectLocalToObjectSpace(
                new Vector3(0, 0, 0.5)
            )
        );

        if (DualShockGamepad.getButtonR2(this.game.getGamepad())) {
            console.log('shooting');
            this.shoot();
        }

    }

    getRigidBody(): RigidBody {
        return this.rigidBody;
    }
}

export default Spaceship;
