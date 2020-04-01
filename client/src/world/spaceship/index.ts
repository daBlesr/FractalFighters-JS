import * as THREE from "three";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";

const loader = new GLTFLoader();
const material = new THREE.MeshToonMaterial( { color: "#d9dcfc" } );
const deckMaterial = new THREE.MeshToonMaterial( { color: "#d1d5ff" } );

const renderSpaceShip = async (scene: THREE.Scene) => {
    loader.load( 'meshes/space-shuttle.glb', function ( gltf ) {
        const importedScene = gltf.scene;
        const spaceShuttle = importedScene.getObjectByName("SpaceShuttle") as THREE.Mesh;
        spaceShuttle.material = material;

        const deck = spaceShuttle.children[0] as THREE.Mesh;
        deck.material = deckMaterial;

        importedScene.position.set(20, 20, 20);
        scene.add(importedScene);
    }, undefined, function ( error ) {
        console.error( error );
    } );

};

export default renderSpaceShip;