import React from "react";
import { gql, useQuery } from "@apollo/client";
import { Descriptions, Image, Button } from "antd";
import { Navigate, useParams } from "react-router";

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

const Product = () => {
  const { id } = useParams();

  const { loading, error, data } = useQuery(GET_PRODUCT, {
    variables: { uuIds: [id] },
  });
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    console.error("Error in GET_CATALOG:", error);
  }

  if (!data.getProducts.length) {
    return <Navigate to="/products" />;
  }

  const product = data.getProducts[0];

  return (
    <div style={{ display: "flex" }}>
      <div style={{ marginRight: "25px" }}>
        <Image
          width={250}
          height={250}
          src="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg"
        />
      </div>
      <div style={{ width: "70%" }}>
        <Descriptions
          size="default"
          column={1}
        >
          <Descriptions.Item labelStyle={{ fontWeight: "bold" }} label="Title">
            {product.title}
          </Descriptions.Item>
          <Descriptions.Item
            labelStyle={{ fontWeight: "bold" }}
            label="Description"
          >
            {product.description}
          </Descriptions.Item>
          <Descriptions.Item labelStyle={{ fontWeight: "bold" }} label="Price">
            {product.price}
          </Descriptions.Item>
          <Descriptions.Item labelStyle={{ fontWeight: "bold" }} label="Amount">
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
    </div>
  );
};

export default Product;
