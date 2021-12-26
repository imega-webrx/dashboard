import React from "react";
import { Table } from "antd";
import { FolderOutlined, FileTextOutlined } from "@ant-design/icons";

const Finder = (props) => (
    <Table
        dataSource={props.catalog}
        columns={columns}
        onRow={onRow}
        onHeaderRow={onHeaderRow}
    />
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

const onHeaderRow = (columns, index) => {
    return {
        onClick: () => {
            console.log("-------", columns);
        },
    };
};

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
