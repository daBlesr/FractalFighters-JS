
import {camera, renderer, scene} from "./init";
import {rayMarchingShader} from "./renderRayMarchedScene";

const animate = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    rayMarchingShader.uniforms.time = { value: new Date().getTime() - 1585422287184 };
    // camera.position.setZ(camera.position.z + 1);
    renderer.render( scene, camera );
    requestAnimationFrame(animate);
};

export default animate;