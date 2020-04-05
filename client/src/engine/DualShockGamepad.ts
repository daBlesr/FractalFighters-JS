import {Vector2} from "three";

class DualShockGamepad {

    public static getButtonX(gamepad: Gamepad): boolean {
        return gamepad.buttons[0].pressed;
    }

    public static getButtonO(gamepad: Gamepad): boolean {
        return gamepad.buttons[1].pressed;
    }

    public static getButtonSquare(gamepad: Gamepad): boolean {
        return gamepad.buttons[2].pressed;
    }

    public static getButtonTriangle(gamepad: Gamepad): boolean {
        return gamepad.buttons[3].pressed;
    }

    public static getButtonR1(gamepad: Gamepad): boolean {
        return gamepad.buttons[5].pressed;
    }

    public static getButtonR2(gamepad: Gamepad): number {
        return gamepad.buttons[7].value;
    }

    public static getButtonL1(gamepad: Gamepad): boolean {
        return gamepad.buttons[4].pressed;
    }

    public static getButtonL2(gamepad: Gamepad): number {
        return gamepad.buttons[6].value;
    }

    public static getButtonUp(gamepad: Gamepad): boolean {
        return gamepad.buttons[12].pressed;
    }

    public static getButtonLeft(gamepad: Gamepad): boolean {
        return gamepad.buttons[14].pressed;
    }

    public static getButtonRight(gamepad: Gamepad): boolean {
        return gamepad.buttons[15].pressed;
    }

    public static getButtonDown(gamepad: Gamepad): boolean {
        return gamepad.buttons[13].pressed;
    }

    public static getButtonOptions(gamepad: Gamepad): boolean {
        return gamepad.buttons[9].pressed;
    }

    public static getButtonRJoystickPressed(gamepad: Gamepad): boolean {
        return gamepad.buttons[11].pressed;
    }

    public static getButtonLJoystickPressed(gamepad: Gamepad): boolean {
        return gamepad.buttons[10].pressed;
    }

    public static getButtonRJoystick(gamepad: Gamepad): Vector2 {
        return new Vector2(gamepad.axes[2], gamepad.axes[3]);
    }

    public static getButtonLJoystick(gamepad: Gamepad): Vector2 {
        return new Vector2(gamepad.axes[0], gamepad.axes[1]);
    }

}

export default DualShockGamepad;