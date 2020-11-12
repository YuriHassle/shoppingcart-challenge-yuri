/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GET_PRODUCT
// ====================================================

export interface GET_PRODUCT_product {
  __typename: "Product";
  id: string;
  title: string;
  description: string;
  price: number;
  availability: number;
}

export interface GET_PRODUCT {
  product: GET_PRODUCT_product | null;
}

export interface GET_PRODUCTVariables {
  productId: string;
}
