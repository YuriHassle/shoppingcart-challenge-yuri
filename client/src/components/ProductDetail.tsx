import React, { Fragment, useContext, useState } from 'react'
import { GET_PRODUCT_BY_ID } from '../queries/productsQuery'
import { productById } from '../queries/types/productById'
import { Link, RouteComponentProps } from '@reach/router';
import { useQuery } from '@apollo/client'
import AddItem from './AddItem'
import { FaHome, FaShoppingCart } from 'react-icons/fa';


interface ProductDetailProps extends RouteComponentProps {
    productId?: string;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ productId }) => {

    const [productMessage, setProductMessage] = useState('')


    const { loading, error, data } = useQuery<productById>(GET_PRODUCT_BY_ID, {
        fetchPolicy: 'network-only',
        variables: { productId }
    })

    if (loading) return <p>Loading</p>
    if (error || !data) return <p>ERROR</p>

    const { product } = data

    const handleMessageState = (message: string) => {
        setProductMessage(message)
    }

    return (
        <Fragment>
            <h3 className='title-list'>{product && product.title}</h3>
            <p className='price-list'>
                {product && product.price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
            </p>
            <img className='img-fluid img-detail rounded' src={require(`../assets/${product.image}`)} alt={product.image} />
            <div className="container-detail">
                <p>{product && product.description}</p>
                <p>Quantidade disponível: <span>{product && product.availability}</span></p>
            </div>
            <AddItem product={product} setProductMessage={handleMessageState}></AddItem>
            <Link to='/cart'>
                <button className='btn btn-info mt-2'>
                    <FaShoppingCart size={15} color={'#FFFFFF'} ></FaShoppingCart>
                    &nbsp; Ir para o carrinho
                </button>
            </Link>
            <Link to='/'>
                <button className='btn btn-light mt-3'>
                    <FaHome size={15} color={'#111111'} ></FaHome>
                    &nbsp; Voltar para a página inicial
                </button>
            </Link>
            <p className='message-alert'>{productMessage}</p>
        </Fragment>
    )
}

export default ProductDetail