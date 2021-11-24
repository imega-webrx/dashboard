import { useState } from "react";
import { Table, Space, Button } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { gql, useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";

const GET_CATALOG = gql`
  query Query {
    catalog(id: "e27afe47-e26f-4796-8e25-1e2e873d708c") {
      __typename
      ...on Product {
        id
        title
        description
        price
      }
    }
  }
`;

const columns = [
  {
    title: "Title",
    dataIndex: "title",
  },
  {
    title: "Price",
    dataIndex: "price",
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: "Type",
    dataIndex: "type",
    filters: [
      {
        text: "Pill",
        value: "pill",
      },
      {
        text: "Liquid",
        value: "liquid",
      },
    ],
    onFilter: (value, record) => record.type.indexOf(value) === 0,
  },
];

const expandable = {
  expandedRowRender: (record) => <p>{record.description}</p>,
};

const ProductsTable = () => {
  const navigate = useNavigate();

  const [tableState] = useState({
    bordered: false,
    loading: false,
    pagination: { position: "bottom" },
    size: "default",
    expandable,
    title: undefined,
    showHeader: true,
    // rowSelection: {},
    scroll: undefined,
    hasData: true,
    tableLayout: undefined,
    top: "none",
    bottom: "bottomRight",
  });

  const { loading, error, data: folder } = useQuery(GET_CATALOG);
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    console.error("Error in GET_CATALOG:", error);
  }
  const data = folder ? folder.catalog
    .filter(result => result.__typename === "Product")
    .map((product) => ({
      key: product.id,
      title: product.title,
      price: product.price,
      type: "pill",
      description: product.description,
    })) : [];

  // const data = [];
  // for (let i = 1; i <= 37; i++) {
  //   data.push({
  //     key: i,
  //     title: "John Brown",
  //     price: `${i}2`,
  //     type: `New York No. ${i} Lake Park`,
  //     description: `My name is John Brown, I am ${i}2 years old, living in New York No. ${i} Lake Park.`,
  //   });
  // }

  const onViewProduct = (id) => {
    navigate(`/product/${id}`)
  }

  const tableColumns = columns.map((item) => ({
    ...item,
    ellipsis: tableState.ellipsis,
  }));

  tableColumns.push({
    title: "Action",
    key: "action",
    sorter: false,
    render: (action) => (
      <Space size="middle">
        <Button className="primary" onClick={() => onViewProduct(action.key)}>View</Button>
        <Button className="primary">
          More actions <DownOutlined />
        </Button>
        <Button type="primary" danger ghost>
          Delete
        </Button>
      </Space>
    ),
  },)

  return (
    <>
      <Table
        {...tableState}
        pagination={{ position: [tableState.top, tableState.bottom] }}
        columns={tableColumns}
        dataSource={tableState.hasData ? data : null}
      />
    </>
  );
};

export default ProductsTable;
