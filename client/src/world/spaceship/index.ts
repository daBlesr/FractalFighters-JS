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
import Boost from "../particles/boost/Boost";

class Spaceship implements DynamicGameEntity, InputListener {
    private static SPACESHIP_MESH: THREE.Mesh;

    private rigidBody: RigidBody = new RigidBody();
    private game: Game;
    private bulletTimer = new Timer(300);
    private boostReserve: number = 100;
    private boostTimer = new Timer(30);

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

    update(step: number) {
        // for the spaceship we apply friction every timestep.
        const translation = this.getTransform()
            .getWorldVelocity()
            .clone()
            .multiplyScalar(10 / step);

        this.rigidBody.setWorldPosition(
            this.getTransform().getWorldPosition().clone()
                .add(translation)
        )
    };

    getTransform(): Transform {
        return this.rigidBody.getTransform();
    }

    input(): void {
        this.flyByInput();
        this.shoot();
        this.boost();
    }

    flyByInput(): void {
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
    }

    shoot(): void {
        if (DualShockGamepad.getButtonR2(this.game.getGamepad()) && this.bulletTimer.use()) {
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

    boost(): void {
        if (
            DualShockGamepad.getButtonO(this.game.getGamepad()) &&
            this.boostTimer.use()
        ) {

            const newVelocity = this.rigidBody
                .getTransform()
                .getWorldVelocity()
                .clone()
                .add(
                    new Vector3(0, 0, 0.3)
                        .applyQuaternion(this.rigidBody.getTransform().getObjectRotation())
                );

            this.rigidBody.getTransform().setWorldVelocity(newVelocity);
            this.game.getGameState().addObject(new Boost(this.game, this.getTransform().getWorldPosition().clone()));
        }
    }

    getRigidBody(): RigidBody {
        return this.rigidBody;
    }
}

export default Spaceship;
