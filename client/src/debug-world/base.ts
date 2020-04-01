import * as THREE from "three";

export const size = 400;


export const base =  new THREE.GridHelper( 2000, 10, new THREE.Color().setRGB(1, 0 ,0));

// @ts-ignore
base.material.opacity = 0.75;
// @ts-ignore
base.material.transparent = true;
