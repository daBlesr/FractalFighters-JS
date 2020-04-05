import * as THREE from "three";
import renderRayMarchedScene from "./renderRayMarchedScene";
import initializeSpaceship from "./spaceship/init";
import Spaceship from "./spaceship";
import OrbitCamera from "../engine/cameras/OrbitCamera";
import Game from "../engine/Game";

export const sceneWidth = window.innerWidth;
export const sceneHeight = window.innerHeight;

const init = async (game: Game) => {

    const directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
    directionalLight.position.set(100, 100, 0);
    game.getScene().add( directionalLight );

    game.getRenderer().setSize( sceneWidth, sceneHeight );
    game.getRenderer().setPixelRatio( window.devicePixelRatio );
    game.getRenderer().extensions.get("EXT_frag_depth");

    await initializeSpaceship();
    game.setCameraHandler(new OrbitCamera(game));
    game.getGameState().addObject(new Spaceship(game));
    await renderRayMarchedScene(game);
};

export default init;