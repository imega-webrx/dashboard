import React from "react";
import { Card, Form, Input, Button } from "antd";

import { StorageContext } from "../Storage";
import ModeContext, { FinderMode } from "./Modes";
import AppState from "../GlobalContext/AppState";

const FolderEditor = (props) => {
    const storage = React.useContext(StorageContext);
    const mode = React.useContext(ModeContext);
    const appState = React.useContext(AppState);

    const [form] = Form.useForm();

    const curFolder = appState.panel[props.type].currentFolder;

    const onSave = async (all) => {
        try {
            const { data } = await storage.saveFolder(all);
            if (data.addFolder === true || data.updateFolder === true) {
                console.log("addFolder", data);
                mode.onMode(FinderMode);
                return;
            }
            console.log("addFolder failed to add", data);
            mode.onMode(FinderMode);
        } catch (e) {
            console.log("addFolder failed to add", e, data);
        }
    };

    return (
        <Card title="New folder">
            <Form
                form={form}
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 16 }}
                autoComplete="off"
                onFinish={onSave}
                initialValues={curFolder}
            >
                <Form.Item hidden={true} name="id">
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
                <Form.Item wrapperCol={{ offset: 16, span: 6 }}>
                    <Button type="primary" htmlType="submit" block={true}>
                        Save
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
};

export default FolderEditor;
