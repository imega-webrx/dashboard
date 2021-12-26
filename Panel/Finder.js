import React from "react";
import { Table } from "antd";
import { FolderOutlined, FileTextOutlined } from "@ant-design/icons";

const Finder = (props) => (
    <Table dataSource={props.catalog} columns={columns} />
);

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
