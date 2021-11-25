import React from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { Image, Form, Input, InputNumber, Button, Row, Col } from "antd";
import { Navigate, useParams, useNavigate } from "react-router-dom";

const GET_PRODUCT = gql`
  query Query($uuIds: [ID]!) {
    getProducts(uuIds: $uuIds) {
      id
      title
      description
      price
    }
  }
`;

const UPDATE_PRODUCT = gql`
  mutation Mutation($id: ID!, $productInput: ProductInput!) {
    updateProduct(id: $id, input: $productInput)
  }
`;

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

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { loading, error, data, refetch } = useQuery(GET_PRODUCT, {
    variables: { uuIds: [id] },
  });
  // console.log(refetch)
  const [
    updateProduct,
    { loading: _loading, error: _error, data: _data},
  ] = useMutation(UPDATE_PRODUCT);

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    console.error("Error in GET_CATALOG:", error);
  }
  if (_loading) {
    return "Submitting...";
  }
  if (_error) {
    return `Submission error! ${error}`;
  }
  if (!data.getProducts.length) {
    return <Navigate to="/products" />;
  }

  const product = data.getProducts[0];

  const onFinish = (values) => {
    const id = product.id;
    const productInput = {
      id: product.id,
      title: values.product.title,
      description: values.product.description,
    };

    updateProduct({ variables: { id, productInput } });
    refetch();
    navigate(`/product/${id}`);
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
            initialValues={{
              product: {
                title: product.title,
                description: product.description,
                price: product.price,
              },
            }}
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
              name={["product", "type"]}
              label="Type"
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

export default EditProduct;
