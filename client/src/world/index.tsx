import * as React from "react";
import init, {sceneHeight, sceneWidth} from "./init";
import * as THREE from "three";
import Game from "../engine/Game";

const World = () => {
    const divRef = React.useRef<HTMLDivElement>();

    const camera = new THREE.PerspectiveCamera(60, sceneWidth / sceneHeight, 1, 3000);
    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer({ antialias: true });

    const game = new Game(renderer).setCamera(camera).setScene(scene);
    game.start();

    init(game);

    React.useEffect(
        () => {
            if (divRef.current) {
                divRef.current.appendChild(renderer.domElement);
            }
            return () => {
                divRef.current.removeChild(renderer.domElement);
            }
        },
        []
    );

    return (
        <div className={"sceneContainer"} style={{ width: sceneWidth, height: sceneHeight, margin: "auto" }} ref={divRef} />
    )
};

export default World;