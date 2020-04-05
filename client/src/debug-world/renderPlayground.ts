import Spaceship from "../world/spaceship";
import {Color, MeshBasicMaterial, PlaneGeometry, Mesh, Vector3, Curve, TubeGeometry, DoubleSide} from "three";
import PlayerCamera from "../engine/cameras/PlayerCamera";
import Game from "../engine/Game";

class Trail extends Curve<Vector3> {

    previousPoint = new Vector3();

    getPoint(t: number): Vector3 {
        return new Vector3(
            0,
            0,
            t * 100
        )
    }
}

const renderPlayground = (game: Game) => {
    const spaceship = new Spaceship(game);
    game.getGameState().addObject(spaceship);
    const playerCamera = new PlayerCamera(game);
    playerCamera.watch(spaceship.getRigidBody());
    game.setCameraHandler(playerCamera);

    var path = new Trail();
    var geometry = new TubeGeometry( path, 20, 0.1, 8, false );
    var material = new MeshBasicMaterial( { color: 0x00ff00 } );
    var mesh = new Mesh( geometry, material );
    game.getScene().add( mesh );
};

export default renderPlayground;