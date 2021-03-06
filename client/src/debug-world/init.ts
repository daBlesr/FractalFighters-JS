import * as THREE from "three";
import {base} from "./base";
import Spaceship from "../world/spaceship";
import {RENDERABLES} from "../ui/constants";
import initializeSpaceship from "../world/spaceship/init";
import Bullet from "../world/ammo/bullet";
import Game from "../engine/Game";
import OrbitCamera from "../engine/cameras/OrbitCamera";
import renderPlayground from "./renderPlayground";

export const sceneWidth = window.innerWidth;
export const sceneHeight = window.innerHeight;

const init = async (game: Game, renderable: RENDERABLES) => {
    game.getScene().add(base);

    game.getRenderer().setSize( sceneWidth, sceneHeight );
    base.position.set(0, -0.1,0);
    game.getRenderer().setClearColor("black", 1 );

    const directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
    directionalLight.position.set(100, 100, 0);
    game.getScene().add( directionalLight );

    game.getRenderer().setPixelRatio( window.devicePixelRatio );

    await initializeSpaceship();

    switch (renderable) {
        case RENDERABLES.SPACESHIP:
            game.setCameraHandler(new OrbitCamera(game));
            game.getGameState().addObject(new Spaceship(game));
            break;
        case RENDERABLES.BULLET:
            game.setCameraHandler(new OrbitCamera(game));
            game.getGameState().addObject(new Bullet(game));
            break;
        case RENDERABLES.PLAYGROUND:
            renderPlayground(game);
            break;
    }
};

export default init;