import React, {Fragment} from 'react';
import {Link} from '@reach/router'

interface ProductProps{
    product:{
        id: string,
        title: string,
        price: number
    },
}

const ProductItem: React.FC<ProductProps> = ({product}) => {
    return (
        <Fragment>
            <h3><Link to={`product/${product.id}`}>{product.title}</Link></h3>
            <p>{product.price}</p>
        </Fragment>
    )
  }
  
  export default ProductItem;