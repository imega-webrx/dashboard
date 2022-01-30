import React from "react";
import { Button, Divider } from "antd";
import {
    AimOutlined,
    UnorderedListOutlined,
    CheckSquareOutlined,
    FolderAddOutlined,
    FileAddOutlined,
    LinkOutlined,
    DeleteOutlined,
} from "@ant-design/icons";

import PanelCtx from "./Context";
import ModeContext, {
    FinderMode,
    FolderEditorMode,
    ProductEditorMode,
} from "./Modes";

const ToolBar = () => (
    <nav style={{ padding: "0 0 1em 0" }}>
        <RootBtn />
        <Divider type="vertical" />
        <SortBtn />
        <CheckBtn />
        <Divider type="vertical" />
        <AddFolderBtn />
        <AddProductBtn />
        <Divider type="vertical" />
        <LinkToBtn />
        <DeleteBtn />
    </nav>
);

const RootBtn = () => (
    <PanelCtx.Consumer>
        {(api) => (
            <Button icon={<AimOutlined />} onClick={api.rootFolder}>
                Root
            </Button>
        )}
    </PanelCtx.Consumer>
);

const SortBtn = () => <Button icon={<UnorderedListOutlined />}>Sort</Button>;

const CheckBtn = () => <Button icon={<CheckSquareOutlined />}>Check</Button>;

const AddFolderBtn = () => (
    <PanelCtx.Consumer>
        {(api) => (
            <ModeContext.Consumer>
                {(ctx) => (
                    <Button
                        icon={<FolderAddOutlined />}
                        onClick={clickAddFolderBtn(api, ctx)}
                        type={ctx.currentMode === FolderEditorMode && "primary"}
                    >
                        Folder
                    </Button>
                )}
            </ModeContext.Consumer>
        )}
    </PanelCtx.Consumer>
);

const clickAddFolderBtn = (api, ctx) => () => {
    api.newFolder();
    ctx.onMode((prevMode) =>
        prevMode === FolderEditorMode ? FinderMode : FolderEditorMode
    );
};

const AddProductBtn = () => (
    <ModeContext.Consumer>
        {(ctx) => (
            <Button
                icon={<FileAddOutlined />}
                onClick={clickAddProductBtn(ctx)}
                type={ctx.currentMode === ProductEditorMode && "primary"}
            >
                Product
            </Button>
        )}
    </ModeContext.Consumer>
);

const clickAddProductBtn = (ctx) => () => {
    ctx.onMode((prevMode) =>
        prevMode === ProductEditorMode ? FinderMode : ProductEditorMode
    );
};

const LinkToBtn = () => (
    <Button icon={<LinkOutlined />} disabled>
        Link to
    </Button>
);

const DeleteBtn = () => (
    <Button
        style={{ float: "right" }}
        icon={<DeleteOutlined />}
        type="danger"
        title="Delete"
        disabled
    />
);

export default ToolBar;
