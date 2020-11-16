import React from 'react'
import {getAllProducts_products as Product} from './queries/types/getAllProducts'


export interface CartItemInterface {
  product: Product,
  qtd: number
}

const CartContext = React.createContext({
    cartItems: [],
    setCartItems: (cartItems:CartItemInterface[]) => {}
})

//const CartContext = React.createContext({})

export default CartContext