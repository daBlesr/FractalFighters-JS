import * as THREE from "three";
import {GLTF, GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import Spaceship from "./index";

const loader = new GLTFLoader();
const material = new THREE.MeshToonMaterial( { color: "#d9dcfc" } );
const deckMaterial = new THREE.MeshToonMaterial( { color: "#d1d5ff" } );

const initializeSpaceship = (): Promise<THREE.Mesh> => {

    const gltfPromise = new Promise<GLTF>(resolve => {
        loader.load(
            'meshes/space-shuttle.glb',
            resolve,
            undefined,
            function ( error ) { console.error( error );}
        );
    });

    return gltfPromise.then(gltf => {
        const importedScene = gltf.scene;
        const spaceShuttle = importedScene.getObjectByName("SpaceShuttle") as THREE.Mesh;
        spaceShuttle.material = material;

        const deck = spaceShuttle.children[0] as THREE.Mesh;
        deck.material = deckMaterial;

        Spaceship.setMesh(spaceShuttle);
        return spaceShuttle;
    })

};

export default initializeSpaceship;