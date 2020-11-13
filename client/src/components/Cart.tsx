import { Link, RouteComponentProps } from '@reach/router';
import React, {Fragment, useState} from 'react'
import {cartItemsVar} from '../cache';

interface CartProps extends RouteComponentProps { }

const Cart: React.FC<CartProps> = () => {

    const [cartItems, setCartItems] = useState(cartItemsVar())

    const totalCart = () => cartItems.reduce((acc, item) =>
        acc + item.qtd * item.product.price, 0)

    function updateQtd(productId: string, isAdding: boolean) {
        cartItemsVar(
            cartItems.map(item => {
                if (item.product.id == productId) {
                    return isAdding
                        ? { ...item, qtd: ++item.qtd }
                        : { ...item, qtd: --item.qtd }
                } else return item
            })
        )
        setCartItems(cartItemsVar())
        totalCart()
    }

    function removeProduct(productId: string) {
        cartItemsVar(
            cartItems.filter(item => item.product.id != productId)
        )
        setCartItems(cartItemsVar())
        totalCart()
    }

    return (
        <Fragment>
            {cartItems && cartItems.map(item => (
                <div key={item.product.id}>
                    <Link to={`/product/${item.product.id}`}><h3>{item.product.title}</h3></Link>
                    <p>{item.qtd}</p>
                    <button onClick={() => updateQtd(item.product.id, true)}>+</button>
                    <button onClick={() => updateQtd(item.product.id, false)}>-</button>
                    <button onClick={() => removeProduct(item.product.id)}>X</button>
                </div>
            ))}
            <p>{totalCart()}</p>
            <Link to={'/checkout'} state={{totalOrder : totalCart()}}>
                <button>Ir para o pagamento</button>
            </Link>
        </Fragment>
    )
}

export default Cart