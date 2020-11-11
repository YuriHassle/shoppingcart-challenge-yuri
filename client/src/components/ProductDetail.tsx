import React, {Fragment} from 'react'
import {productDetailQuery} from '../queries/productsQuery'
import {GET_PRODUCT} from '../queries/types/GET_PRODUCT'
import { RouteComponentProps } from '@reach/router';
import {useQuery} from '@apollo/client'


interface ProductDetailProps extends RouteComponentProps {
    productId?: any;
}

const ProductDetail: React.FC<ProductDetailProps> = ({productId}) => {
    const {loading, error, data} = useQuery<GET_PRODUCT>(productDetailQuery, {
        variables:{productId}
    })

    if (loading) return <p>Loading</p>;
    if (error) return <p>ERROR: {error.message}</p>;
    if (!data) return <p>Not found</p>;

    return (
        <Fragment>
            <h3>{data && data.getProduct && data.getProduct.title}</h3>
            <p>{data && data.getProduct && data.getProduct.description}</p>
            <p>{data && data.getProduct && data.getProduct.price}</p>
            <p>{data && data.getProduct && data.getProduct.availability}</p>
        </Fragment>
    )
  }

export default ProductDetail