import React, { Fragment, Component } from 'react'
import ProductsList from './components/ProductsList'
import {Router} from '@reach/router'
import ProductDetail from './components/ProductDetail'
import CartBadge from './components/CartBadge'
import Cart from './components/Cart'
import CheckoutOrder from './components/CheckoutOrder'

class App extends Component {
  render() {
    return (
      <Fragment>
        <CartBadge></CartBadge>
        <Router primary={false} component={Fragment}>
            <ProductsList path="/" />
            <ProductDetail path="product/:productId"/>
            <Cart path='cart'/>
            <CheckoutOrder path='checkout'/>
        </Router>
      </Fragment>
    )
  }
}

export default App

