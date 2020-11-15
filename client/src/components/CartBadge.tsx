import { Link} from '@reach/router';
import React, {Fragment, useEffect, useState} from 'react'
import {FaShoppingCart, FaHome} from 'react-icons/fa'

import { cartItemsVar} from '../cache';

const CartBadge: React.FC = props => {


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
            <header>
                <Link to='/'>
                    <FaHome size={40} color={'#4b0e26e5'}/>
                </Link>
                <Link to='/cart'>
                    <FaShoppingCart size={40} color={'#4b0e26e5'}/>
                </Link>
                <div>{totalCartQtd()}</div>
                <div>{totalCartValue()}</div>
            </header>
            <div className="page-container">
                {props.children}
            </div>
        </Fragment>
    )
  }

export default CartBadge