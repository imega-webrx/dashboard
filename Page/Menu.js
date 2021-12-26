import React from "react";
import { Menu, Form } from "antd";
import { FolderAddOutlined } from "@ant-design/icons";
import { v4 } from "uuid";

const addFolderAction = "addFolder";

const MainMenu = (props) => {
    const [addFolderForm] = Form.useForm();

    const handleClick = ({ key }) => {
        if (key === addFolderAction) {
            setIsFolderModalVisible(true);
        }
    };

    const handleOk = () => {
        console.log(addFolderForm.getFieldsValue(true), v4());
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
        </React.Fragment>
    );
};

export default MainMenu;
