import { gql } from '@apollo/client'


export const UPDATE_PRODUCT = gql`
  mutation updateProduct($id:ID!, $title: String, $description: String, $price: Float, $availability: Int){
    updateProduct(id: $id, title: $title, description: $description, price: $price, availability: $availability){
      id
      title
      description
      price
      availability
    }
  }
`