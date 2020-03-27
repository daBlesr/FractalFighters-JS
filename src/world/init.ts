import * as THREE from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import renderRayMarchedSpheres from "./renderRayMarchedSpheres";

export const sceneWidth = window.innerWidth * 0.7;
export const sceneHeight = window.innerHeight * 0.7;
export const camera = new THREE.PerspectiveCamera(60, sceneWidth / sceneHeight, 1, 3000);
export const scene = new THREE.Scene();
export const renderer = new THREE.WebGLRenderer({ antialias: true });

const controls = new OrbitControls( camera, renderer.domElement );

const init = async () => {
    // scene.add(base);

    // camera controls
    controls.enableKeys = false;
    controls.maxPolarAngle = Math.PI * 0.5;
    camera.position.set(200, 200, 50);
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
    renderRayMarchedSpheres();
};

export default init;