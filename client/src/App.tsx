import React, { Fragment, Component } from 'react'
import ProductsList from './components/ProductsList'
import {Router} from '@reach/router'
import ProductDetail from './components/ProductDetail'
import CartBadge from './components/CartBadge'
import Cart from './components/Cart'
import CheckoutOrder from './components/CheckoutOrder'
import {cartItemsVar} from './cache'

const CartContext = React.createContext({})

class App extends Component {
  render() {
    return (
      <Fragment>
        <CartContext.Provider value={cartItemsVar()}>
          <CartBadge>
          <Router primary={false} component={Fragment}>
              <ProductsList path="/" />
              <ProductDetail path="product/:productId"/>
              <Cart path='cart'/>
              <CheckoutOrder path='checkout'/>
          </Router>
          </CartBadge>
        </CartContext.Provider>
      </Fragment>
    )
  }
}

export default App

