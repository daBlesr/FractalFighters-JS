import * as THREE from "three";
import {Color, Mesh, MeshBasicMaterial, PlaneGeometry} from "three";
import {base} from "./base";
import Spaceship from "../world/spaceship";
import {RENDERABLES} from "../ui/constants";
import initializeSpaceship from "../world/spaceship/init";
import Bullet from "../world/ammo/bullet";
import Game from "../engine/Game";
import OrbitCamera from "../engine/cameras/OrbitCamera";
import PlayerCamera from "../engine/cameras/PlayerCamera";

export const sceneWidth = window.innerWidth * 0.7;
export const sceneHeight = window.innerHeight * 0.7;

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
            const spaceship = new Spaceship(game);
            game.getGameState().addObject(spaceship);
            const planeGeometry = new PlaneGeometry(1000, 1000, 100, 100);
            planeGeometry.rotateX(Math.PI / 2.0);
            const planeMaterial = new MeshBasicMaterial({ color: new Color().setRGB(0.3, 0.3, 0.3 ),  side: THREE.DoubleSide});
            const plane = new Mesh(planeGeometry, planeMaterial)
            plane.position.setY(-5);
            game.getScene().add(plane);
            const playerCamera = new PlayerCamera(game);
            game.addInputListener(playerCamera);
            playerCamera.watch(spaceship);
            game.setCameraHandler(playerCamera);
            break;
    }
};

export default init;