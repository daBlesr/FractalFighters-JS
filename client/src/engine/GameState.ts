import RigidBody from "./RigidBody";
import DynamicGameEntity from "./DynamicGameEntity";

class GameState {

    objects: DynamicGameEntity[] = [];

    public addObject(object: DynamicGameEntity): void {
        this.objects.push(object);
    }
}

export default GameState;