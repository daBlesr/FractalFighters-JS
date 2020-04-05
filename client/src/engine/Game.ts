import GameState from "./GameState";
import * as GameLoop from "browser-game-loop";
import * as THREE from "three";
import DualShockGamepad from "./DualShockGamepad";
import CameraHandler from "./cameras/CameraHandler";
import {Camera} from "three";
import InputListener from "./InputListener";

class Game {

    private state: GameState = new GameState();
    private inputListeners: InputListener[] = [];
    private gamepadIndex: number;
    private gameLoop;

    private renderer: THREE.WebGLRenderer;
    private scene: THREE.Scene;
    private camera: Camera;
    private cameraHandler: CameraHandler;

    constructor(renderer: THREE.WebGLRenderer) {
        this.renderer = renderer;
        this.gameLoop = GameLoop({
            input: this.input.bind(this),
            update: this.update.bind(this),
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

    private input() {
        if (!this.getGamepad()) {
            return;
        }

        this.inputListeners.forEach(listener => {
            listener.input();
        })
    };

    private update(step: number): void {
        this.getGameState().objects.forEach(object => {
            object.update(step);
        });

        if (this.cameraHandler) {
            this.cameraHandler.update(step);
        }
    };

    private getGamepad(): Gamepad {
        return navigator.getGamepads()[this.gamepadIndex];
    };


    public start(): void {
        this.gameLoop.start();
    }

    public setCamera(camera: Camera): this {
        this.camera = camera;
        return this;
    }

    public getCamera(): Camera {
        return this.camera;
    }

    public setCameraHandler(cameraHandler: CameraHandler): this {
        this.cameraHandler = cameraHandler;
        return this;
    }

    public getCameraHandler(): CameraHandler {
        return this.cameraHandler;
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

    public addInputListener(inputListener: InputListener) {
        this.inputListeners.push(inputListener);
    }
}

export default Game;