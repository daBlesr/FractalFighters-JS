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
                <Card title="World" style={{ width: 300 }}>
                    <Button
                        size="large"
                        type="primary"
                        onClick={() => setRenderable(RENDERABLES.WORLD)}
                    >
                        Render
                    </Button>
                </Card>
                <Card title="Space shuttle" style={{ width: 300 }}>
                    <Button
                        size="large"
                        type="primary"
                        onClick={() => setRenderable(RENDERABLES.SPACESHIP)}
                    >
                        Render
                    </Button>
                </Card>
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