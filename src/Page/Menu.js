import React from "react";
import { Menu, Modal, Form, Input } from "antd";
import { FolderAddOutlined } from "@ant-design/icons";

const addFolderAction = "addFolder";

const MainMenu = (props) => {
    const [isFolderModalVisible, setIsFolderModalVisible] =
        React.useState(false);

    const handleClick = ({ key }) => {
        if (key === addFolderAction) {
            setIsFolderModalVisible(true);
        }
    };

    const handleOk = () => {
        setIsFolderModalVisible(false);
    };

    const handleCancel = () => {
        setIsFolderModalVisible(false);
    };

    return (
        <React.Fragment>
            <Menu
                theme="dark"
                onClick={handleClick}
                mode="horizontal"
                defaultSelectedKeys={["1"]}
            >
                <Menu.Item key={"catalog"}>Catalog</Menu.Item>
                <Menu.Item
                    key={addFolderAction}
                    icon={<FolderAddOutlined style={{ fontSize: "24px" }} />}
                >
                    Folder
                </Menu.Item>
            </Menu>
            <Modal
                title="Add folder"
                visible={isFolderModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form
                    name="basic"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ remember: true }}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Title"
                        name="title"
                        rules={[
                            {
                                required: true,
                                message: "Please input your title!",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item label="Description" name="description">
                        <Input.TextArea />
                    </Form.Item>
                </Form>
            </Modal>
        </React.Fragment>
    );
};

export default MainMenu;
