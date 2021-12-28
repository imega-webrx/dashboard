import React from "react";
import { Table } from "antd";
import { FolderOutlined, FileTextOutlined } from "@ant-design/icons";

import ModeContext, { FolderEditorMode, ProductEditorMode } from "./Modes";
import AppState from "../GlobalContext/AppState";

const Finder = (props) => (
    <AppState.Consumer>
        {(state) => (
            <ModeContext.Consumer>
                {(ctx) => (
                    <Table
                        dataSource={props.catalog}
                        columns={columns}
                        onRow={onRow(state, ctx, props.type)}
                        onHeaderRow={onHeaderRow(state, ctx, props.type)}
                    />
                )}
            </ModeContext.Consumer>
        )}
    </AppState.Consumer>
);

const onRow = (state, ctx, type) => (record, rowIndex) => {
    return {
        onClick: () => {
            console.log("++++", state);
            if (record.__typename === "Product") {
                ctx.onMode(ProductEditorMode);
            }
            if (record.__typename === "Folder") {
                state.panel[type].currentFolder = record;
            }
        },
        onDoubleClick: (event) => {},
        onContextMenu: (event) => {},
        onMouseEnter: (event) => {},
        onMouseLeave: (event) => {},
    };
};

const onHeaderRow = (ctx) => () => ({
    onClick: () => {
        ctx.onMode(FolderEditorMode);
    },
});

const columns = [
    {
        title: "",
        dataIndex: "__typename",
        width: "1em",
        render: (type) =>
            type === "Folder" ? <FolderOutlined /> : <FileTextOutlined />,
    },
    {
        title: "Title",
        dataIndex: "title",
        key: "title",
    },
];

export default Finder;
