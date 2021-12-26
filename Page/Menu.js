import React from "react";
import { Menu, Modal, Form, Input } from "antd";
import { FolderAddOutlined } from "@ant-design/icons";
import { v4 } from "uuid";

import CurrentFolderCtx from "../src/context/CurrentFolder";

const addFolderAction = "addFolder";

const MainMenu = (props) => {
    const [isFolderModalVisible, setIsFolderModalVisible] =
        React.useState(false);

    const [addFolderForm] = Form.useForm();

    const handleClick = ({ key }) => {
        if (key === addFolderAction) {
            setIsFolderModalVisible(true);
        }
    };

    const handleOk = () => {
        console.log(addFolderForm.getFieldsValue(true), v4());
        setIsFolderModalVisible(false);
    };

    const handleCancel = () => {
        setIsFolderModalVisible(false);
    };

    return (
        <React.Fragment>
            <Menu theme="dark" onClick={handleClick} mode="horizontal">
                <Menu.Item key={"catalog"}>Catalog</Menu.Item>
                <Menu.Item
                    key={addFolderAction}
                    icon={<FolderAddOutlined style={{ fontSize: "24px" }} />}
                >
                    Folder
                </Menu.Item>
            </Menu>
            <CurrentFolderCtx.Consumer>
                {(id) => (
                    <Modal
                        title={"Folder"}
                        visible={isFolderModalVisible}
                        onOk={handleOk}
                        onCancel={handleCancel}
                    >
                        <Form
                            form={addFolderForm}
                            labelCol={{ span: 6 }}
                            wrapperCol={{ span: 16 }}
                            autoComplete="off"
                        >
                            <Form.Item
                                hidden={true}
                                name="parentid"
                                initialValue={id}
                            >
                                <Input />
                            </Form.Item>
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
                )}
            </CurrentFolderCtx.Consumer>
        </React.Fragment>
    );
};

export default MainMenu;
