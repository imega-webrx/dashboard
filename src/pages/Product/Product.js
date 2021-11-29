import React from "react";
import { useMutation, useQuery } from "@apollo/client";
import { Descriptions, Image, Button, Row, Col } from "antd";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import {
  GET_CATALOG,
  GET_PRODUCT,
  DELETE_PRODUCT,
} from "../../apollo/queries/product/productQueries";

const Product = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { loading, error, data } = useQuery(GET_PRODUCT, {
    variables: { uuIds: [id] },
  });
  const [removeProduct, { loading: _loading, error: _error }] = useMutation(
    DELETE_PRODUCT,
    {
      refetchQueries: [
        GET_CATALOG, // DocumentNode object parsed with gql
        ["catalog"], // Query name
      ],
    }
  );
  if (loading || _loading) {
    return <p>Loading...</p>;
  }
  if (error || _error) {
    console.error("Error:", error);
  }
  if (!data.getProducts.length) {
    return <Navigate to="/products" />;
  }

  const onDeleteProduct = (id) => {
    const conf = window.confirm("Are you sure you want to delete?");
    if (!conf) return;

    removeProduct({ variables: { id: id } });
    navigate("/products");
  };

  const product = data.getProducts[0];

  return (
    <Row gutter={0}>
      <Col className="gutter-row" span={8}>
        <div style={{}}>
          <Image
            width={250}
            height={250}
            src="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg"
          />
        </div>
      </Col>
      <Col className="gutter-row" span={13}>
        <div style={{}}>
          <Descriptions size="default" column={1}>
            <Descriptions.Item
              labelStyle={{ fontWeight: "bold" }}
              label="Title"
            >
              {product.title}
            </Descriptions.Item>
            <Descriptions.Item
              labelStyle={{ fontWeight: "bold" }}
              label="Description"
            >
              {product.description}
            </Descriptions.Item>
            <Descriptions.Item
              labelStyle={{ fontWeight: "bold" }}
              label="Price"
            >
              {product.price}
            </Descriptions.Item>
            <Descriptions.Item
              labelStyle={{ fontWeight: "bold" }}
              label="Amount"
            >
              $80.00
            </Descriptions.Item>
            <Descriptions.Item
              labelStyle={{ fontWeight: "bold" }}
              label="Discount"
            >
              $20.00
            </Descriptions.Item>
            <Descriptions.Item
              labelStyle={{ fontWeight: "bold" }}
              label="Official"
            >
              $60.00
            </Descriptions.Item>
          </Descriptions>
        </div>
      </Col>
      <Col className="gutter-row" span={3}>
        <div style={{}}>
          <Button
            type="primary"
            size="middle"
            block
            style={{ marginBottom: "10px" }}
            onClick={() => navigate(`/product/edit/${product.id}`)}
          >
            Edit
          </Button>
          <Button
            type="danger"
            size="middle"
            block
            onClick={() => onDeleteProduct(product.id)}
          >
            Delete
          </Button>
        </div>
      </Col>
    </Row>
  );
};

export default Product;
