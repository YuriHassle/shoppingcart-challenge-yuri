import React from 'react';
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
        <ul>
            <li><Link to={`/product/${product.id}`}> {product.title}</Link></li>
            <li>{product.price}</li>
        </ul>
    )
  }
  
  export default ProductItem;