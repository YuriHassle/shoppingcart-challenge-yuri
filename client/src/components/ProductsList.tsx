import React, {Fragment, Component} from 'react'
import {useQuery} from '@apollo/client'
import {GET_ALL_PRODUCTS} from '../queries/productsQuery'
import {getAllProducts} from '../queries/types/getAllProducts'
import ProductItem from './ProductItem'
import { RouteComponentProps } from '@reach/router';

interface ProductsProps extends RouteComponentProps {}

const ProductsList: React.FC<ProductsProps> = () => {
    const {loading, error, data} = useQuery<getAllProducts>(GET_ALL_PRODUCTS)

    if (loading) return <p>Loading</p>;
    if (error || !data) return <p>ERROR</p>;
    return (
      <Fragment>
        <h1>Bem-vindo à loja <span>Viagem Fantástica</span> :)</h1>
        <p>Aqui nós levamos você para uma jornada mágica até os destinos mais épicos imagináveis</p>
        {data.products && data.products.map( product => (
          <ProductItem key={product.id} product={product}></ProductItem>
        )
        )}
      </Fragment>
    )
}

export default ProductsList