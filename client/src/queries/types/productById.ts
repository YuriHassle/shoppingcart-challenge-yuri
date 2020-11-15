/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: productById
// ====================================================

export interface productById_product {
  __typename: "Product";
  id: string;
  title: string;
  description: string;
  price: number;
  availability: number;
  image: string;
}

export interface productById {
  product: productById_product | null;
}

export interface productByIdVariables {
  productId: string;
}
