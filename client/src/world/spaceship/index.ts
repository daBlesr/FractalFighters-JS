import * as THREE from "three";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";

const loader = new GLTFLoader();
const material = new THREE.MeshToonMaterial( { color: "#054687" } );
const deckMaterial = new THREE.MeshToonMaterial( { color: "#054d96" } );

const renderSpaceShip = async (scene: THREE.Scene) => {
    loader.load( 'meshes/space-shuttle.glb', function ( gltf ) {
        const importedScene = gltf.scene;
        const spaceShuttle = importedScene.getObjectByName("SpaceShuttle") as THREE.Mesh;
        spaceShuttle.material = material;

        const deck = spaceShuttle.children[0] as THREE.Mesh;
        deck.material = deckMaterial;

        scene.add(importedScene);
    }, undefined, function ( error ) {
        console.error( error );
    } );

};

export default renderSpaceShip;