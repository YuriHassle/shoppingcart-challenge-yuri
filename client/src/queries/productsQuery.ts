import { gql } from '@apollo/client'


export const productsQuery = gql`
  query GET_ALL_PRODUCTS{
    getProducts{
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
    getProduct(id: $productId){
      id
      title
      description
      price
      availability
    }
  }
`