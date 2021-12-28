import React from "react";
import { Table } from "antd";
import { FolderOutlined, FileTextOutlined } from "@ant-design/icons";

import ModeContext, { FolderEditorMode, ProductEditorMode } from "./Modes";
import AppState from "../GlobalContext/AppState";
import { StorageContext } from "../Storage";

const Finder = (props) => {
    const storage = React.useContext(StorageContext);
    return (
        <AppState.Consumer>
            {(state) => (
                <ModeContext.Consumer>
                    {(ctx) => (
                        <Table
                            dataSource={props.catalog}
                            columns={columns}
                            onRow={onRow(storage, state, ctx, props.type)}
                            onHeaderRow={onHeaderRow(state, ctx, props.type)}
                        />
                    )}
                </ModeContext.Consumer>
            )}
        </AppState.Consumer>
    );
};

const onRow = (storage, state, ctx, type) => (record, rowIndex) => ({
    onClick: () => {
        console.log("++++", state);
        if (record.__typename === "Product") {
            ctx.onMode(ProductEditorMode);
        }

        if (record.__typename === "Folder") {
            state.panel[type].currentFolder = record;
            console.log(storage);
            storage.openFolder(record.id);
        }
    },
});

const onHeaderRow = (state, ctx, type) => () => ({
    onClick: () => {
        const f = state.panel[type].currentFolder;
        if (f.hasOwnProperty("isRoot") && f.isRoot === true) {
            return;
        }

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
