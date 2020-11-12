import { gql } from '@apollo/client'


export const productsQuery = gql`
  query GET_ALL_PRODUCTS{
    products{
      id
      title
      description
      price
      availability
    }
  }
`

export const productDetailQuery = gql`
  query GET_PRODUCT($productId: ID!){
    product(id: $productId){
      id
      title
      description
      price
      availability
    }
  }
`