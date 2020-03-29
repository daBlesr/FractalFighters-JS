import * as THREE from "three";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import {scene} from "../init";

const loader = new GLTFLoader();

const renderSpaceShip = async () => {
    loader.load( 'meshes/space-shuttle.glb', function ( gltf ) {
        scene.add( gltf.scene );
    }, undefined, function ( error ) {
        console.error( error );
    } );

};

export default renderSpaceShip;