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
    // scene.add(base);

    // camera controls
    // controls.enableKeys = false;
    camera.position.set(20, 5, -10);
    camera.lookAt(0, 0, 0);
    controls.update();

    renderer.setSize( sceneWidth, sceneHeight );
    //
    // base.position.set(0, -0.1,0);
    // renderer.setClearColor("#fffaed", 1 );
    //
    // const directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
    // directionalLight.position.set(100, 100, 0);
    // scene.add( directionalLight );
    //
    renderer.setPixelRatio( window.devicePixelRatio );
    await renderRayMarchedScene();
    await renderSpaceShip(scene);
};

export default init;