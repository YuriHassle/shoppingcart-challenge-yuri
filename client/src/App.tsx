import React, { Fragment, Component } from 'react'
import ProductsList from './components/ProductsList'
import {Router} from '@reach/router'
import ProductDetail from './components/ProductDetail'

class App extends Component {
  render() {
    return (
      <Fragment>
        <Router primary={false} component={Fragment}>
          <ProductsList path="/" />
          <ProductDetail path="product/:productId"/>
        </Router>
      </Fragment>
    )
  }
}

export default App

