import React, { Dispatch, SetStateAction } from 'react'
import { cartItemsVar } from '../cache';
import { RouteComponentProps } from '@reach/router'
import { getAllProducts_products as Product } from '../queries/types/getAllProducts'
import { useMutation, useQuery } from '@apollo/client';
import { UPDATE_PRODUCT } from '../mutations/productsMutation';
import { updateProduct } from '../mutations/types/updateProduct';
import { productById } from '../queries/types/productById';
import { GET_PRODUCT_BY_ID } from '../queries/productsQuery';
import { FaPlus } from 'react-icons/fa';

interface ProductDetailProps extends RouteComponentProps {
    product?: Product,
    setProductMessage?: any
}

const AdicionarItem: React.FC<ProductDetailProps> = ({ product, setProductMessage}) => {


    const [updateProduct] = useMutation<updateProduct>(UPDATE_PRODUCT)

    const { loading,  refetch } = useQuery<productById>(GET_PRODUCT_BY_ID, {
        nextFetchPolicy: 'network-only',
        variables: { productId: product.id }
    })

    if (loading) return <p>Loading</p>;

    const handleAddItem = () => {

        if (!product) return

        refetch().then(({data}) => {
            if (data.product.availability > 0) {

                const variables = {
                    variables: {
                        id: product.id,
                        availability: data.product.availability - 1
                    }
                }
                updateProduct(variables).then(() => {
                    const cartItems = cartItemsVar();
                    const isInCart = cartItems.some(({ product: { id } }) => id == product.id)
                    cartItemsVar(
                        isInCart
                            ? cartItems.map(item =>
                                item.product.id == product.id
                                    ? { ...item, qtd: ++item.qtd }
                                    : item
                            )
                            : [...cartItems, { product: product, qtd: 1 }]
                    )
                })

            } else {
                setProductMessage('Essa há mais lugares para essa viagem :(')
            }
        })
    }

    return (
        <button className='btn btn-dark mt-3' onClick={handleAddItem}>
            <FaPlus size={15} color={'#ffffff'} ></FaPlus>
            &nbsp; Adicionar ao carrinho
        </button>
    )
}

export default AdicionarItem