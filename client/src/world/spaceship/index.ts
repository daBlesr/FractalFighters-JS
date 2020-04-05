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

class Spaceship implements DynamicGameEntity, InputListener {
    private static SPACESHIP_MESH: THREE.Mesh;

    private rigidBody: RigidBody = new RigidBody();
    private game: Game;

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
        const bullet = new Bullet(this.game);
        bullet.getRigidBody().getTransform().setWorldVelocity(
            this.rigidBody.getTransform().projectLocalToWorldSpace(
                new Vector3(0, 0, 100)
            )
        );
        bullet.getRigidBody().setWorldPosition(
            this.rigidBody.getTransform().projectLocalToWorldSpace(
                new Vector3(-1, 0, 2)
            )
        );
        this.game.getGameState().addObject(bullet);
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

    }

    getRigidBody(): RigidBody {
        return this.rigidBody;
    }
}

export default Spaceship;
