import {camera, renderer, scene} from "./init";

const animate = () => {
    renderer.render( scene, camera );
    requestAnimationFrame(animate);
};

export default animate;