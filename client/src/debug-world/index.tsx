import * as React from "react";
import {RENDERABLES} from "../ui/constants";
import init, {sceneHeight, sceneWidth} from "./init";
import Game from "../engine/Game";
import * as THREE from "three";

const DebugWorld: React.FC<{ renderable: RENDERABLES }> = ({ renderable }) => {
    const divRef = React.useRef<HTMLDivElement>();

    const camera = new THREE.PerspectiveCamera(60, sceneWidth / sceneHeight, 1, 3000);
    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer({ antialias: true });

    const game = new Game(renderer).setCamera(camera).setScene(scene);
    game.start();

    init(game, renderable);

    React.useEffect(
        () => {
            if (divRef.current) {
                divRef.current.appendChild(game.getRenderer().domElement);
            }
            return () => {
                divRef.current.removeChild(renderer.domElement);
            }
        },
        []
    );

    return (
        <div
            className={"sceneContainer"}
            style={{ width: sceneWidth, height: sceneHeight, margin: "auto", marginTop: "15vh" }}
            ref={divRef}
        />
    )
};

export default DebugWorld;