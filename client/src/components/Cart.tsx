import { useMutation, useQuery } from '@apollo/client';
import { Link, RouteComponentProps } from '@reach/router';
import React, { Fragment, useState } from 'react'
import { cartItemsVar } from '../cache';
import { UPDATE_PRODUCT } from '../mutations/productsMutation';
import { updateProduct } from '../mutations/types/updateProduct';
import { GET_PRODUCT_BY_ID } from '../queries/productsQuery';
import { productById } from '../queries/types/productById';


interface CartProps extends RouteComponentProps { }

const Cart: React.FC<CartProps> = () => {

    const [cartMessage, setCartMessage] = useState('')
    const [cartItems, setCartItems] = useState(cartItemsVar())
    const [updateProduct] = useMutation<updateProduct>(UPDATE_PRODUCT)
    const { loading, fetchMore } = useQuery<productById>(GET_PRODUCT_BY_ID, {
        nextFetchPolicy: 'no-cache',
        variables: { productId: '5fab10eca4a3520014582c05' }
    })
    if (loading) return <p>Loading</p>


    const totalCart = () => cartItems.reduce((acc, item) =>
        acc + item.qtd * item.product.price, 0)

    const updateAvailability = (productId: String, currentAvailability: number, qtd: number) => {

        let variables = {
            variables: {
                id: productId,
                availability: currentAvailability - qtd
            }
        }

        updateProduct(variables).then(() => {
            if (qtd > 1) {
                cartItemsVar(
                    cartItems.filter(item => item.product.id != productId)
                )
            } else {
                cartItemsVar(
                    cartItems.map(item => {
                        if (item.product.id === productId) {
                            return { ...item, qtd: item.qtd + qtd }
                        } else return item
                    })
                )
            }
            setCartItems(cartItemsVar())
            totalCart()
        })
    }

    const handleUpdateClick = async (productId: string, operation: String) => {

        const { data } = await fetchMore({
            variables: {
                productId
            },
            updateQuery(_, { fetchMoreResult }) {
                return fetchMoreResult
            }
        })

        switch (operation) {
            case 'INCREMENT':
                data.product.availability > 0
                    ? updateAvailability(productId, data.product.availability, 1)
                    : setCartMessage('Esse produto teve seu estoque esgotado!')
                break

            case 'DECREMENT':
                cartItems.find(item => item.product.id === productId).qtd > 1
                    ? updateAvailability(productId, data.product.availability, (-1))
                    : setCartMessage('Você precisa ter ao menos um item no carrinho.')
                break

            case 'REMOVE':
                const qtd = cartItems.find(item => item.product.id === productId).qtd
                updateAvailability(productId, data.product.availability, (-qtd))
        }
    }

    return (
        <Fragment>
            {cartItems && cartItems.map(item => (
                <div key={item.product.id}>
                    <Link to={`/product/${item.product.id}`}><h3>{item.product.title}</h3></Link>
                    <p>{item.qtd}</p>
                    <button onClick={() => handleUpdateClick(item.product.id, 'INCREMENT')}>+</button>
                    <button onClick={() => handleUpdateClick(item.product.id, 'DECREMENT')}>-</button>
                    <button onClick={() => handleUpdateClick(item.product.id, 'REMOVE')}>X</button>
                </div>
            ))}
            <p>{totalCart()}</p>
            <Link
                to={'/checkout'}
                state={{ totalOrder: totalCart(), cartItems: cartItems }}
            >
                <button>Ir para o pagamento</button>
            </Link>
            <div>{cartMessage}</div>
        </Fragment>
    )
}

export default Cart