import * as React from "react";
import animate from "./animate";
import init, {renderer, sceneHeight, sceneWidth} from "./init";

const World = () => {
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

export default World;