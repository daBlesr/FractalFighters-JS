import * as React from "react";
import {RENDERABLES} from "../ui/constants";
import init, {renderer, sceneHeight, sceneWidth} from "./init";
import animate from "./animate";

const DebugWorld: React.FC<{ renderable: RENDERABLES }> = ({ renderable }) => {
    const divRef = React.useRef<HTMLDivElement>();

    init(renderable);
    animate();

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
        <div
            className={"sceneContainer"}
            style={{ width: sceneWidth, height: sceneHeight, margin: "auto", marginTop: "15vh" }}
            ref={divRef}
        />
    )
};

export default DebugWorld;