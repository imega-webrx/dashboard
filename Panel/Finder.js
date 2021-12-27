import React from "react";
import { Table } from "antd";
import { FolderOutlined, FileTextOutlined } from "@ant-design/icons";

import ModeContext, { FolderEditorMode } from "./Modes";
import AppState from "../GlobalContext/AppState";

const Finder = (props) => (
    <AppState.Consumer>
        {(state) => (
            <ModeContext.Consumer>
                {(ctx) => (
                    <Table
                        dataSource={props.catalog}
                        columns={columns}
                        onRow={onRow}
                        onHeaderRow={onHeaderRow(ctx)}
                    />
                )}
            </ModeContext.Consumer>
        )}
    </AppState.Consumer>
);

const onRow = (record, rowIndex) => {
    return {
        onClick: (event) => {
            console.log("+++++", record);
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
