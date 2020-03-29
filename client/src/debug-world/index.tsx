import * as React from "react";
import init, {renderer, sceneHeight, sceneWidth} from "../world/init";
import animate from "../world/animate";

const DebugWorld = () => {
    const divRef = React.useRef<HTMLDivElement>();

    init();
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
        <div className={"sceneContainer"} style={{ width: sceneWidth, height: sceneHeight, margin: "auto", marginTop: "15vh" }} ref={divRef} />
    )
};

export default DebugWorld;