import {Button, Card} from "antd";
import * as React from "react";
import "./styles.css";
import World from "../world";
import {RENDERABLES} from "./constants";
import DebugWorld from "../debug-world";

const UI = () => {
    const [renderable, setRenderable] = React.useState<RENDERABLES>();

    if (renderable === undefined) {
        return (
            <div className="c-ui-container">
                {Object
                    .keys(RENDERABLES)
                    .filter(key => !Number.isNaN(parseInt(key)))
                    .map(renderable => (
                        <Card title={RENDERABLES[renderable]} style={{ width: 300 }}>
                            <Button
                                size="large"
                                type="primary"
                                onClick={() => setRenderable(parseInt(renderable))}
                            >
                                Render
                            </Button>
                        </Card>
                    )
                )}
            </div>
        );
    }

    switch(renderable) {
        case RENDERABLES.WORLD:
            return <World/>;
        default:
            return <DebugWorld renderable={renderable} />
    }
};

export  default UI;