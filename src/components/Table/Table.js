import { useState } from "react";
import { Table, Space, Button } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { gql, useQuery } from "@apollo/client";

const GET_FOLDER = gql`
  query Query {
    getProductsFromFolder(subject: "e27afe47-e26f-4796-8e25-1e2e873d708c") {
      id
      title
      description
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
  {
    title: "Action",
    key: "action",
    sorter: false,
    render: () => (
      <Space size="middle">
        <Button className="primary">View</Button>
        <Button className="primary">
          More actions <DownOutlined />
        </Button>
        <Button type="primary" danger ghost>
          Delete
        </Button>
      </Space>
    ),
  },
];

const expandable = {
  expandedRowRender: (record) => <p>{record.description}</p>,
};

const TableData = () => {
  const [tableState] = useState({
    bordered: false,
    loading: false,
    pagination: { position: "bottom" },
    size: "default",
    expandable,
    title: undefined,
    showHeader: true,
    //rowSelection: {},
    scroll: undefined,
    hasData: true,
    tableLayout: undefined,
    top: "none",
    bottom: "bottomRight",
  });

  const { loading, error, data: folder } = useQuery(GET_FOLDER);
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return console.log("Error");
  }

  const data = folder.getProductsFromFolder.map((product) => ({
    key: product.id,
    title: product.title,
    price: 5,
    type: "pill",
    description: product.description,
  }));

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

  const tableColumns = columns.map((item) => ({
    ...item,
    ellipsis: tableState.ellipsis,
  }));

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

export default TableData;
