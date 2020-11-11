/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GET_ALL_PRODUCTS
// ====================================================

export interface GET_ALL_PRODUCTS_getProducts {
  __typename: "Product";
  id: string;
  title: string;
  description: string;
  price: number;
  availability: number;
}

export interface GET_ALL_PRODUCTS {
  getProducts: (GET_ALL_PRODUCTS_getProducts | null)[] | null;
}
