import React, { Fragment, Component, useEffect, useState } from 'react'
import ProductsList from './components/ProductsList'
import { Router } from '@reach/router'
import ProductDetail from './components/ProductDetail'
import CartBadge from './components/CartBadge'
import Cart from './components/Cart'
import CheckoutOrder from './components/CheckoutOrder'
import CartContext from './CartContext'
import PageContainer from './components/PageContainer'


const App: React.FC = () => {

  const [cartItems, setCartItems] = useState([])
  const value = { cartItems, setCartItems }

  return (

    <Fragment>
      <CartContext.Provider value={value}>
        <PageContainer>
          <CartBadge />
          <Router primary={false} component={Fragment}>
            <ProductsList path="/" />
            <ProductDetail path="product/:productId" />
            <Cart path='cart' />
            <CheckoutOrder path='checkout' />
          </Router>
        </PageContainer>
      </CartContext.Provider>
    </Fragment>
  )

}

export default App

