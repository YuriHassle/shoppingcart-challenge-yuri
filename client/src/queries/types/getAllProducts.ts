/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getAllProducts
// ====================================================

export interface getAllProducts_products {
  __typename: "Product";
  id: string;
  title: string;
  description: string;
  price: number;
  availability: number;
  image: string;
}

export interface getAllProducts {
  products: (getAllProducts_products | null)[] | null;
}
