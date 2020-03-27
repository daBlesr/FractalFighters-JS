import * as THREE from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {base} from "./base";
import "./circlesFragmentShader.frag";
import "./circlesVertexShader.vert";

export const sceneWidth = window.innerWidth * 0.7;
export const sceneHeight = window.innerHeight * 0.7;
export const camera = new THREE.PerspectiveCamera(60, sceneWidth / sceneHeight, 1, 3000);
export const scene = new THREE.Scene();
export const renderer = new THREE.WebGLRenderer({ antialias: true });

const axesHelper = new THREE.AxesHelper( 50 );
const controls = new OrbitControls( camera, renderer.domElement );
const dolly = new THREE.Group();

const init = () => {

    // scene.add(base);
    //
    // // camera controls
    // controls.enableKeys = false;
    // controls.maxPolarAngle = Math.PI * 0.5;
    // camera.position.set(200, 200, 50);
    // controls.update();
    //
    // renderer.setSize( sceneWidth, sceneHeight );
    //
    // base.position.set(0, -0.1,0);
    // renderer.setClearColor("#fffaed", 1 );
    //
    // const directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
    // directionalLight.position.set(100, 100, 0);
    // scene.add( directionalLight );
    //
    // renderer = new THREE.WebGLRenderer( { canvas: canvas } );
    // renderer.setPixelRatio( window.devicePixelRatio );
    // renderer.setSize( config.resolution, config.resolution );
    //
    // window.addEventListener( 'resize', onWindowResize );

    // THREE.Scene

    scene.add( dolly );
    dolly.add( camera );

    const geometry = new THREE.PlaneBufferGeometry( 2.0, 2.0 );
    const material = new THREE.RawShaderMaterial( {
        uniforms: {
            resolution: { value: new THREE.Vector2( sceneWidth, sceneHeight) },
            cameraWorldMatrix: { value: camera.matrixWorld },
            cameraProjectionMatrixInverse: { value: new THREE.Matrix4().getInverse( camera.projectionMatrix ) }
        },
        vertexShader: document.getElementById( 'vertex_shader' ).textContent,
        fragmentShader: document.getElementById( 'fragment_shader' ).textContent
    } );
    const mesh = new THREE.Mesh( geometry, material );
    mesh.frustumCulled = false;
    scene.add( mesh );

};

export default init;