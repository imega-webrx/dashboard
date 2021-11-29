import { gql } from "@apollo/client";

const GET_CATALOG = gql`
  query Query {
    catalog(id: "e27afe47-e26f-4796-8e25-1e2e873d708c") {
      __typename
      ... on Product {
        id
        title
        description
        price
      }
    }
  }
`;

const MOVE_TO_FOLDER = gql`
  mutation Mutation($tripleInput: TripleInput!) {
    moveToFolder(input: $tripleInput)
  }
`;

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

const ADD_PRODUCT = gql`
  mutation Mutation($productInput: ProductInput!) {
    addProduct(input: $productInput)
  }
`;

const UPDATE_PRODUCT = gql`
  mutation Mutation($id: ID!, $productInput: ProductInput!) {
    updateProduct(id: $id, input: $productInput)
  }
`;

const DELETE_PRODUCT = gql`
  mutation Mutation($id: ID!) {
    removeProduct(id: $id)
  }
`;

export {
  GET_CATALOG,
  MOVE_TO_FOLDER,
  GET_PRODUCT,
  ADD_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
};
