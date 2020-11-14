import React, { Fragment, useState } from 'react'
import { GET_PRODUCT_BY_ID } from '../queries/productsQuery'
import { productById } from '../queries/types/productById'
import { RouteComponentProps } from '@reach/router';
import { useQuery } from '@apollo/client'
import AddItem from './AddItem'


interface ProductDetailProps extends RouteComponentProps {
    productId?: string;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ productId }) => {
    const { loading, error, data} = useQuery<productById>(GET_PRODUCT_BY_ID, {
        fetchPolicy: 'network-only',
        variables: { productId }
    })

    if (loading) return <p>Loading</p>;
    if (error || !data) return <p>ERROR</p>;


    const {product} = data
    
    return (
        <Fragment>
            <h3>{product && product.title}</h3>
            <p>Descrição: {product && product.description}</p>
            <p>Por apenas: {product && product.price}</p>
            <p>Quantidade disponível: {product && product.availability}</p>
            <AddItem product={product}></AddItem>
        </Fragment>
    )
}

export default ProductDetail