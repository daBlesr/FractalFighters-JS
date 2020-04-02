import * as THREE from "three";
import {camera, scene, sceneHeight, sceneWidth} from "./init";

export const rayMarchingShader = new THREE.RawShaderMaterial(  );

// original raymarching was done on the basis of
// https://threejs.org/examples/?q=raym#webgl_raymarching_reflect
const renderRayMarchedScene = async () => {
    const utils = await fetch("shaders/utils.frag").then(response => response.text());
    const commonDistanceFunctions = await fetch("shaders/commonDistanceFunctions.frag").then(response => response.text());
    const fragmentShader = await fetch("shaders/mengerShader.frag").then(response => response.text());
    const vertexShader = await fetch("shaders/basicVertexShader.vert").then(response => response.text());

    const group = new THREE.Group();
    scene.add( group );
    group.add( camera );

    const geometry = new THREE.PlaneBufferGeometry( 2.0, 2.0 );

    rayMarchingShader.uniforms = {
        time: { value: 0 },
        resolution: { value: new THREE.Vector2( sceneWidth, sceneHeight) },
        cameraWorldMatrix: { value: camera.matrixWorld },
        cameraProjectionMatrix: { value: camera.projectionMatrix },
        cameraProjectionMatrixInverse: { value: new THREE.Matrix4().getInverse( camera.projectionMatrix ) },
    };
    rayMarchingShader.vertexShader = vertexShader;
    rayMarchingShader.fragmentShader = '#extension GL_EXT_frag_depth : enable\n' + utils + commonDistanceFunctions + fragmentShader;

    const mesh = new THREE.Mesh( geometry, rayMarchingShader );
    mesh.frustumCulled = false;
    scene.add( mesh );
};

export default renderRayMarchedScene;