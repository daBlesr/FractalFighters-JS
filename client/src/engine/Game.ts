import GameState from "./GameState";
import * as GameLoop from "browser-game-loop";
import * as THREE from "three";
import DualShockGamepad from "./DualShockGamepad";

class Game {

    private state: GameState = new GameState();
    private gamepadIndex: number;
    private gameLoop;

    private renderer: THREE.WebGLRenderer;
    private scene: THREE.Scene;
    private camera: THREE.Camera;

    constructor(renderer: THREE.WebGLRenderer) {
        this.renderer = renderer;
        this.gameLoop = GameLoop({
            input: this.input,
            update: this.update,
            render: () => renderer.render(this.scene, this.camera)
        });

        window.addEventListener(
            "gamepadconnected",
            (e) => {
                // @ts-ignore
                this.gamepadIndex = e.gamepad.index;
                console.log('registered gamepad')
            },
            false
        );

    }

    private input = () => {
        if (!this.getGamepad()) {
            return;
        }

        if (DualShockGamepad.getButtonX(this.getGamepad())) {
            console.log("x pressed");
        }
    };

    private update = (step: number) => {
        this.getGameState().objects.forEach(object => {
            object.update(step);
        })
    };

    private getGamepad = () => {
        return navigator.getGamepads()[this.gamepadIndex];
    };


    public start(): void {
        this.gameLoop.start();
    }

    public setCamera(camera: THREE.Camera): this {
        this.camera = camera;
        return this;
    }

    public getCamera(): THREE.Camera {
        return this.camera;
    }

    public setScene(scene: THREE.Scene): this {
        this.scene = scene;
        return this;
    }

    public getScene(): THREE.Scene {
        return this.scene;
    }

    public getRenderer(): THREE.WebGLRenderer {
        return this.renderer;
    }

    public getGameState(): GameState {
        return this.state;
    }
}

export default Game;