import React from "react";
import { Card, Form, Input, Button } from "antd";

const ProductEditor = () => {
    const [form] = Form.useForm();

    return (
        <Card title="New product">
            <Form
                form={form}
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 16 }}
                autoComplete="off"
            >
                <Form.Item hidden={true} name="parentid">
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

export default ProductEditor;
