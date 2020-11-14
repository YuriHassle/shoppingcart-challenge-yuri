import { gql } from "@apollo/client";

export const SAVE_ORDER = gql`
  mutation saveOrder($creditCardNumber:String!, $productIds: [ID]!){
    addOrder(creditCardNumber: $creditCardNumber, productIds: $productIds){
      creditCardNumber
      productIds
    }
  }
`