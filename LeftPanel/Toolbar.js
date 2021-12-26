import React from "react";
import { Button, Divider, Space } from "antd";
import {
    AimOutlined,
    UnorderedListOutlined,
    CheckSquareOutlined,
    FolderAddOutlined,
    FileAddOutlined,
    LinkOutlined,
    DeleteOutlined,
} from "@ant-design/icons";

const ToolBar = () => (
    <nav style={{ padding: "0 0 1em 0" }}>
        <Button icon={<AimOutlined />}>Root</Button>
        <Divider type="vertical" />
        <Button icon={<UnorderedListOutlined />}>Sort</Button>
        <Button icon={<CheckSquareOutlined />}>Check</Button>
        <Divider type="vertical" />
        <Button icon={<FolderAddOutlined />}>Folder</Button>
        <Button icon={<FileAddOutlined />}>Product</Button>
        <Divider type="vertical" />
        <Button icon={<LinkOutlined />} disabled>
            Link to
        </Button>
        <Button
            style={{ float: "right" }}
            icon={<DeleteOutlined />}
            type="danger"
            disabled
        >
            Delete
        </Button>
    </nav>
);

export default ToolBar;
