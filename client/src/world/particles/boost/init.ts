import {TextureLoader} from "three";

const initializeBoost = () => {
    new TextureLoader().load("smoke.png", function(texture){
        //texture is loaded
    });
};

export default initializeBoost;