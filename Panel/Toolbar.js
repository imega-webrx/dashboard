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

const RootBtn = () => <Button icon={<AimOutlined />}>Root</Button>;

const SortBtn = () => <Button icon={<UnorderedListOutlined />}>Sort</Button>;

const CheckBtn = () => <Button icon={<CheckSquareOutlined />}>Check</Button>;

const AddFolderBtn = () => <Button icon={<FolderAddOutlined />}>Folder</Button>;

const AddProductBtn = () => <Button icon={<FileAddOutlined />}>Product</Button>;

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
        disabled
    >
        Delete
    </Button>
);

export default ToolBar;
