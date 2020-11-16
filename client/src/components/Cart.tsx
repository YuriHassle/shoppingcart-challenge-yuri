import { Link, RouteComponentProps } from '@reach/router';
import React, { Fragment, useContext, useState } from 'react'

import {FaHome, FaCreditCard } from 'react-icons/fa'
import CartContext from '../CartContext';
import CartItem from './CartItem';



interface CartProps extends RouteComponentProps { }

const Cart: React.FC<CartProps> = () => {


    const [cartMessage, setCartMessage] = useState('')
    const { cartItems, setCartItems } = useContext(CartContext)
    const [emptyCart, setEmptyCart] = useState(!(cartItems.length > 0))

    const handleMessageState = (message: string) => {
        setCartMessage(message)
    }

    const handleEmptyState = (empty: boolean) => {
        setEmptyCart(empty)
    }

    const totalCart = () => cartItems.reduce((acc, item) =>
        acc + item.qtd * item.product.price, 0)

    return (
        <Fragment>
            {cartItems && cartItems.length > 0 ? true : (<p className='message-alert'>Seu carrinho está vazio :/</p>)}
            <p className='message-alert'>{cartMessage}</p>
            {cartItems && cartItems.map(item => (
                <CartItem key={item.product.id} item={item} setCartMessage={handleMessageState} setEmptyCart={handleEmptyState}></CartItem>
            ))}
            <p className='subtitle'>Total do carrinho</p>
            <p className='price-list'>{totalCart().toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</p>
            <Link
                to={'/checkout'}
                state={{ totalOrder: totalCart()}}
            >
                <button disabled={emptyCart} className='btn btn-dark mt-3'>
                    <FaCreditCard size={15} color={'#FFFFFF'} ></FaCreditCard>
                    &nbsp; Ir para o pagamento
                </button>
            </Link>
            <Link to='/'>
                <button className='btn btn-info mt-2'>
                    <FaHome size={15} color={'#FFFFFF'} ></FaHome>
                        &nbsp;Voltar para a página inicial
                    </button>
            </Link>
        </Fragment>
    )
}

export default Cart