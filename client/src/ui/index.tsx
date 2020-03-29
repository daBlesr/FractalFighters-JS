import {Button, Card} from "antd";
import * as React from "react";
import "./styles.css";

const UI = () => {
    const [renderable, setRenderable] = React.useState();

    if (renderable === undefined) {
        return (
            <div className="c-ui-container">
                <Card title="World" bordered={false} style={{ width: 300 }}>
                    <Button size="large" type="primary" >
                        Render
                    </Button>
                </Card>
                <Card title="Space shuttle" bordered={false} style={{ width: 300 }}>
                    <Button size="large" type="primary">
                        Render
                    </Button>
                </Card>
            </div>
        );
    }
};

export  default UI;