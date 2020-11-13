import React, {Fragment, useState} from 'react'
import {GET_PRODUCT_BY_ID} from '../queries/productsQuery'
import {productById} from '../queries/types/productById'
import { RouteComponentProps } from '@reach/router';
import {useQuery} from '@apollo/client'
import AddItem from './AddItem'


interface ProductDetailProps extends RouteComponentProps {
    productId?: string;
}

const ProductDetail: React.FC<ProductDetailProps> = ({productId}) => {
    const {loading, error, data} = useQuery<productById>(GET_PRODUCT_BY_ID, {
        variables:{productId}
    })

    return (
        <Fragment>
            <h3>{data && data.product && data.product.title}</h3>
            <p>Descrição: {data && data.product && data.product.description}</p>
            <p>Por apenas: {data && data.product && data.product.price}</p>
            <p>Quantidade disponível: {data && data.product && data.product.availability}</p>
            <AddItem product={data && data.product}></AddItem>
        </Fragment>
    )
  }

export default ProductDetail