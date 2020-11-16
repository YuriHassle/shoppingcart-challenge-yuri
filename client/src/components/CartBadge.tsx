import { Link } from '@reach/router';
import React, { Fragment, useContext } from 'react'
import { FaShoppingCart, FaHome } from 'react-icons/fa'
import CartContext from '../CartContext';



const CartBadge: React.FC = () => {

    const { cartItems, setCartItems } = useContext(CartContext)

    const totalCartValue = () => cartItems.reduce((acc, item) =>
        acc + item.qtd * item.product.price, 0)

    const totalCartQtd = () => cartItems.map(item => item.qtd).reduce((a, b) => a + b, 0)

    return (
        <Fragment>
            <header className="page-header">
                <div className="cart-icon">
                    <Link to='/'>
                        <FaHome size={45} color={'#4b0e26e5'} />
                    </Link>
                </div>
                <div className="cart-icon">
                    <Link to='/cart'>
                        <FaShoppingCart size={45} color={'#277783f6'} />
                    </Link>
                </div>
                <div className="cart-badge-container">
                    <p className='cart-badge-details'>Total de itens: <span>{totalCartQtd()}</span></p>
                    <p className='cart-badge-details'>
                        <span>{totalCartValue().toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</span>
                    </p>
                </div>
            </header>
        </Fragment>
    )
}

export default CartBadge