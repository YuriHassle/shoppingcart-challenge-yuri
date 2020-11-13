import React from 'react'
import { cartItemsVar} from '../cache';
import {RouteComponentProps} from '@reach/router'
import {getAllProducts_products as Product} from '../queries/types/getAllProducts'

interface ProductDetailProps extends RouteComponentProps {
    product?: Product;
}

const AdicionarItem: React.FC<ProductDetailProps> = ({product}) => {

    function handleAdicionarClick(){
        if (product) {
        const cartItems = cartItemsVar();
        const isInCart = cartItems.some(({product:{id}}) => id == product.id)
            cartItemsVar(
                isInCart
                    ? cartItems.map(item =>
                        item.product.id == product.id
                            ? { ...item, qtd: ++item.qtd }
                            : item
                    )
                    : [...cartItems, { product: product, qtd: 1 }]
            )
        }
    }
    return(
        <button onClick={handleAdicionarClick}>
            Adicionar ao Carrinho
        </button>
    )
}

export default AdicionarItem