import React from "react";
import { Table } from "antd";
import { FolderOutlined, FileTextOutlined } from "@ant-design/icons";

import ModeContext, { FolderEditorMode, ProductEditorMode } from "./Modes";
import PanelCtx from "./Context";

const Finder = () => (
    <PanelCtx.Consumer>
        {(api) => (
            <ModeContext.Consumer>
                {(mode) => (
                    <Table
                        rowKey="id"
                        dataSource={api.content()}
                        columns={columns}
                        onRow={onRow(api, mode)}
                        onHeaderRow={onHeaderRow(api, mode)}
                    />
                )}
            </ModeContext.Consumer>
        )}
    </PanelCtx.Consumer>
);

const onRow = (api, mode) => (record) => ({
    onClick: () => {
        if (record.__typename === "Product") {
            mode.onMode(ProductEditorMode);
        }

        if (record.__typename === "Folder") {
            api.openFolder(record);
        }
    },
});

const onHeaderRow = (api, mode) => () => ({
    onClick: () => {
        if (api.editFolder() === false) {
            return;
        }

        mode.onMode(FolderEditorMode);
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
