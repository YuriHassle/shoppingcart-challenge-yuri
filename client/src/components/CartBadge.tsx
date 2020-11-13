import { Link, RouteComponentProps } from '@reach/router';
import React, {Fragment, useEffect, useState} from 'react'
import { cartItemsVar} from '../cache';

interface CartBadgeProps extends RouteComponentProps { }
const CartBadge: React.FC<CartBadgeProps> = () => {

    const [cartItems, setCartItems] = useState(cartItemsVar())

    useEffect(() => {
        totalCartQtd()
        totalCartValue()
    }, cartItems)

    const totalCartValue = () => cartItems.reduce((acc, item) =>
    acc + item.qtd * item.product.price, 0)

    const totalCartQtd = () => cartItems.map(item => item.qtd).reduce((a, b) => a + b, 0)

    return (
        <Fragment>
            <Link to='cart'><button>Ir para o carrinho</button></Link>
            <div>{totalCartQtd()}</div>
            <div>{totalCartValue()}</div>
        </Fragment>
    )
  }

export default CartBadge