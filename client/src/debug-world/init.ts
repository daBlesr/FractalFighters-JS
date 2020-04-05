import * as THREE from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {base} from "./base";
import Spaceship from "../world/spaceship";
import {RENDERABLES} from "../ui/constants";
import initializeSpaceship from "../world/spaceship/init";
import Bullet from "../world/ammo/bullet";
import Game from "../engine/Game";

export const sceneWidth = window.innerWidth * 0.7;
export const sceneHeight = window.innerHeight * 0.7;

const init = async (game: Game, renderable: RENDERABLES) => {
    game.getScene().add(base);

    // camera controls
    game.getCamera().position.set(20, 5, -10);
    game.getCamera().lookAt(0, 0, 0);

    const controls = new OrbitControls( game.getCamera(), game.getRenderer().domElement );
    controls.update();

    game.getRenderer().setSize( sceneWidth, sceneHeight );
    base.position.set(0, -0.1,0);
    game.getRenderer().setClearColor("black", 1 );

    const directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
    directionalLight.position.set(100, 100, 0);
    game.getScene().add( directionalLight );

    game.getRenderer().setPixelRatio( window.devicePixelRatio );

    switch (renderable) {
        case RENDERABLES.SPACESHIP:
            await initializeSpaceship();
            game.getGameState().addObject(new Spaceship(game));
            break;
        case RENDERABLES.BULLET:
            game.getGameState().addObject(new Bullet(game));
            break;
    }
};

export default init;