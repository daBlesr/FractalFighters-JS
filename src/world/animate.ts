
import {camera, renderer, scene} from "./init";

const animate = () => {
    requestAnimationFrame(animate);

    renderer.render( scene, camera );
};

export default animate;