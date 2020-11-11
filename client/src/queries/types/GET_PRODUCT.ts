/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GET_PRODUCT
// ====================================================

export interface GET_PRODUCT_getProduct {
  __typename: "Product";
  id: string;
  title: string;
  description: string;
  price: number;
  availability: number;
}

export interface GET_PRODUCT {
  getProduct: GET_PRODUCT_getProduct | null;
}

export interface GET_PRODUCTVariables {
  productId: string;
}
