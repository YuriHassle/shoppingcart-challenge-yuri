import React, { Fragment, Component } from 'react'
import ProductsList from './components/ProductsList'
import {Router} from '@reach/router'
import ProductDetail from './components/ProductDetail'
import PageContainer from './components/PageContainer'

class App extends Component {
  render() {
    return (
      <Fragment>
        <PageContainer>
          <Router primary={false} component={Fragment}>
            <ProductsList path="/" />
            <ProductDetail path="product/:productId"/>
          </Router>
        </PageContainer>
      </Fragment>
    )
  }
}

export default App

