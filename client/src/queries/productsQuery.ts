import { gql } from '@apollo/client'


export const GET_ALL_PRODUCTS = gql`
  query getAllProducts{
    products{
      id
      title
      description
      price
      availability
      image
    }
  }
`

export const GET_PRODUCT_BY_ID = gql`
  query productById($productId: ID!){
    product(id: $productId){
      id
      title
      description
      price
      availability
      image
    }
  }
`