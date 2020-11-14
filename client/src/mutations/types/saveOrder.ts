/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: saveOrder
// ====================================================

export interface saveOrder_addOrder {
  __typename: "Order";
  creditCardNumber: string;
  productIds: (string | null)[];
}

export interface saveOrder {
  addOrder: saveOrder_addOrder | null;
}

export interface saveOrderVariables {
  creditCardNumber: string;
  productIds: (string | null)[];
}
