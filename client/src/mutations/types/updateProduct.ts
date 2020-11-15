/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: updateProduct
// ====================================================

export interface updateProduct_updateProduct {
  __typename: "Product";
  id: string;
  title: string;
  description: string;
  price: number;
  availability: number;
  image: string;
}

export interface updateProduct {
  updateProduct: updateProduct_updateProduct | null;
}

export interface updateProductVariables {
  id: string;
  title?: string | null;
  description?: string | null;
  price?: number | null;
  availability?: number | null;
  image?: string | null;
}
