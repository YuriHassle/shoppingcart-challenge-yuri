import React, {Fragment, useState} from 'react'
import { cartItemsVar} from '../cache';
import { RouteComponentProps } from '@reach/router';


const Header: React.FC = () => {

    const [cartItems, setCartItems] = useState(cartItemsVar())
    //const cartTotalValue = cartItems.map(item => item.product.price).reduce((a, b) => a + b, 0)
    const cartTotalValue = cartItems.length
    const cartTotalItems = cartItems.map(item => item.qtd).reduce((a, b) => a + b, 0)
    console.log(cartTotalItems)
    console.log(cartTotalValue)
    return (
        <Fragment>
            <div>{cartTotalItems}</div>
            <div>{cartTotalValue}</div>
        </Fragment>
    )
  }

export default Header