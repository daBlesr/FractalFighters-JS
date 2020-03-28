import * as THREE from "three";
import {camera, scene, sceneHeight, sceneWidth} from "./init";

const renderRayMarchedSphered = async () => {
    const commonDistanceFunctions = await fetch("shaders/commonDistanceFunctions.frag").then(response => response.text());
    const fragmentShader = await fetch("shaders/circlesFragmentShader.frag").then(response => response.text());
    const vertexShader = await fetch("shaders/circlesVertexShader.vert").then(response => response.text());

    const group = new THREE.Group();
    scene.add( group );
    group.add( camera );

    const geometry = new THREE.PlaneBufferGeometry( 2.0, 2.0 );
    const material = new THREE.RawShaderMaterial( {
        uniforms: {
            resolution: { value: new THREE.Vector2( sceneWidth, sceneHeight) },
            cameraWorldMatrix: { value: camera.matrixWorld },
            cameraProjectionMatrixInverse: { value: new THREE.Matrix4().getInverse( camera.projectionMatrix ) }
        },
        vertexShader: vertexShader,
        fragmentShader: commonDistanceFunctions + fragmentShader
    } );
    const mesh = new THREE.Mesh( geometry, material );
    mesh.frustumCulled = false;
    scene.add( mesh );
};

export default renderRayMarchedSphered;