import React from "react";
import { useMutation } from "@apollo/client";
import { Image, Form, Input, InputNumber, Button, Row, Col } from "antd";
import { Navigate, useNavigate } from "react-router-dom";
import {
  GET_CATALOG,
  ADD_PRODUCT,
  MOVE_TO_FOLDER,
} from "../../apollo/queries/product/productQueries";
import { v4 as uuidv4 } from "uuid";

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};

const AddProduct = () => {
  const navigate = useNavigate();
  const [addProduct, { loading, error, data }] = useMutation(ADD_PRODUCT);
  const [
    moveToFolder,
    { loading: _loading, error: _error, data: _data },
  ] = useMutation(MOVE_TO_FOLDER, {
    refetchQueries: [
      GET_CATALOG, // DocumentNode object parsed with gql
      "catalog", // Query name
    ],
  });

  if (loading || _loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    console.error("Error:", error);
  }
  if (_error) {
    console.error("Error:", _error);
  }

  // if (data?.addProduct && _data?.moveToFolder) {
  //   return <Navigate to="/products" />;
  // }

  const onFinish = (values) => {
    const uuid = uuidv4();

    const productInput = {
      id: uuid,
      title: values.product.title,
      description: values.product.description,
    };

    addProduct({ variables: { productInput } });

    const tripleInput = {
      subject: "e27afe47-e26f-4796-8e25-1e2e873d708c",
      object: uuid,
      priority: 1,
    };

    moveToFolder({ variables: { tripleInput } });
    navigate("/products");
  };

  return (
    <Row gutter={24}>
      <Col className="gutter-row" span={8}>
        <div style={{}}>
          <Image
            width={250}
            height={250}
            src="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg"
          />
        </div>
      </Col>
      <Col className="gutter-row" span={16}>
        <div style={{}}>
          <Form
            {...layout}
            name="nest-messages"
            onFinish={onFinish}
            validateMessages={validateMessages}
          >
            <Form.Item
              name={["product", "title"]}
              label="Title"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item name={["product", "description"]} label="Description">
              <Input.TextArea />
            </Form.Item>
            <Form.Item
              name={["product", "price"]}
              label="Price"
              //rules={[{ type: "email" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={["product", "something"]}
              label="Something"
              //rules={[{ type: "number", min: 0, max: 99 }]}
            >
              <InputNumber />
            </Form.Item>
            <Form.Item name={["product", "fullTitle"]} label="Full title">
              <Input />
            </Form.Item>
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
              <Button type="primary" htmlType="submit">
                Save
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Col>
    </Row>
  );
};

export default AddProduct;
