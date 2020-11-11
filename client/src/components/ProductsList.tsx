import React, {Fragment, Component} from 'react'
import {useQuery} from '@apollo/client'
import {productsQuery} from '../queries/productsQuery'
import { GET_ALL_PRODUCTS } from '../queries/types/GET_ALL_PRODUCTS'
import ProductItem from './ProductItem'
import { RouteComponentProps } from '@reach/router';

interface ProductsProps extends RouteComponentProps {}

const ProductsList: React.FC<ProductsProps> = () => {
    const {loading, error, data} = useQuery<GET_ALL_PRODUCTS>(productsQuery)

    if (loading) return <p>Loading</p>;
    if (error || !data) return <p>ERROR</p>;
    return (
      <Fragment>
        <h1>Produtos</h1>
        {data && data.getProducts && data.getProducts.map((product) => (
          <ProductItem key={product.id} product={product}></ProductItem>
        )
        )}
      </Fragment>
    )
}

export default ProductsList