import * as THREE from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import renderRayMarchedScene from "./renderRayMarchedScene";
import {TrackballControls} from "three/examples/jsm/controls/TrackballControls";
import renderSpaceShip from "./spaceship";

export const sceneWidth = window.innerWidth * 0.7;
export const sceneHeight = window.innerHeight * 0.7;
export const camera = new THREE.PerspectiveCamera(60, sceneWidth / sceneHeight, 1, 3000);
export const scene = new THREE.Scene();
export const renderer = new THREE.WebGLRenderer({ antialias: true });

const controls = new OrbitControls( camera, renderer.domElement );

const init = async () => {

    // camera controls
    // controls.enableKeys = false;
    camera.position.set(20, 5, -10);
    camera.lookAt(0, 0, 0);
    controls.update();

    const directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
    directionalLight.position.set(100, 100, 0);
    scene.add( directionalLight );

    renderer.setSize( sceneWidth, sceneHeight );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.extensions.get("EXT_frag_depth");

    await renderSpaceShip(scene);
    await renderRayMarchedScene();
};

export default init;