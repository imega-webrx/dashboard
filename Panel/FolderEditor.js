import React from "react";
import { Card, Form, Input, Button } from "antd";

import ModeContext, { FinderMode } from "./Modes";
import PanelCtx from "./Context";

const FolderEditor = () => {
    // const storage = React.useContext(StorageContext);
    const mode = React.useContext(ModeContext);
    const ctx = React.useContext(PanelCtx);
    console.log("====FolderEditor", ctx.saveFolder);
    // const appState = React.useContext(AppState);

    const [form] = Form.useForm();

    // const folder = appState.panel[props.type].editFolder;

    const onSave = async (all) => {
        try {
            console.log("====+++FolderEditor", ctx.saveFolder);
            ctx.saveFolder(all);
            // const { data } = await storage.saveFolder(all);
            // if (data.addFolder === true || data.updateFolder === true) {
            //     props.refetch();
            //     mode.onMode(FinderMode);

            //     return;
            // }

            mode.onMode(FinderMode);
        } catch (e) {
            console.log("addFolder failed to add", e);
        }
    };

    return (
        <Card title={"New folder"}>
            <Form
                form={form}
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 16 }}
                autoComplete="off"
                onFinish={onSave}
                initialValues={ctx.getEditFolder()}
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
