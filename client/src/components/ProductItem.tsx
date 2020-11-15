import React, {Fragment} from 'react';
import {Link} from '@reach/router'

interface ProductProps{
    product:{
        id: string,
        title: string,
        price: number
        image: string
    },
}

const ProductItem: React.FC<ProductProps> = ({product}) => {

    return (
        <Fragment>
        <div className="container-list">
            <div className="header-list">
                <Link to={`product/${product.id}`}>
                    <h1 className='title-list'>{product.title}</h1>
                </Link>
            </div>
            <p className='price-list'>{product.price.toLocaleString("pt-BR", {style:"currency", currency:"BRL"})}</p>
            <img className='img-fluid rounded img-list' src={require(`../assets/${product.image}`)} alt={product.image}/>
        </div>
        </Fragment>
    )
  }
  
  export default ProductItem;