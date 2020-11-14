import { useMutation, useQuery } from '@apollo/client';
import { RouteComponentProps } from '@reach/router';
import React, { Fragment, useState } from 'react'
import { CartItemInterface, cartItemsVar } from '../cache';
import { SAVE_ORDER } from '../mutations/ordersMutation';
import { saveOrder } from '../mutations/types/saveOrder';
import { GET_ALL_PRODUCTS } from '../queries/productsQuery';
import { getAllProducts } from '../queries/types/getAllProducts';

interface CheckoutOrderProps extends RouteComponentProps {
    location?: any
}

const CheckoutOrder: React.FC<CheckoutOrderProps> = ({ location }) => {

    const [creditCardNumber, setCreditCardNumber] = useState('')
    let { cartItems, totalOrder } = location.state
    const [orderMessage, setOrderMessage] = useState('')

    const [addOrder] = useMutation<saveOrder>(SAVE_ORDER)

    const { loading, refetch } = useQuery<getAllProducts>(GET_ALL_PRODUCTS, { nextFetchPolicy: 'network-only' })
    if (loading) return <p>Loading</p>;

    const checkout = () => {

        let isAvailable = true

        if (!cartItems) {
            setOrderMessage('Seu carrinho está vazio. Acrescente items e volte a compar')
        }

        else if (!creditCardNumber) setOrderMessage('Por favor, informe o número do cartão de crédito!')

        else if (creditCardNumber != '123456789')
            setOrderMessage('Desculpe, infelizmente o seu cartão de crédito não foi aprovado :(')

        else {


            refetch().then(({ data }) => {

                cartItems.map((item: CartItemInterface) => {
                    const dataProduct = data.products.find(product => product.id === item.product.id)
                    if (dataProduct.availability < 0) {
                        setOrderMessage(`Não há mais estoque disponível para o produto: ${item.product.title}`)
                        isAvailable = false
                        return
                    }
                })

                if (isAvailable) {
                    const variables = {
                        variables: {
                            creditCardNumber: creditCardNumber,
                            productIds: cartItems.map((item: CartItemInterface) => item.product.id)
                        }
                    }
                    addOrder(variables).then(() => {
                        cartItemsVar([])
                        cartItems = []
                        setOrderMessage('Compra realizada com sucesso!')
                        let el = document.getElementById("checkoutButton") as HTMLButtonElement
                        el.disabled = true

                    })
                }
            })
        }
    }

    return (
        <Fragment>
            <h1>Pagamento</h1>
            <p>Total do pedido: {totalOrder}</p>
            <label>Informe o número do cartão de crédito:</label>
            <input
                placeholder='Apenas Números'
                type="text"
                onChange={(e) => setCreditCardNumber(e.target.value)}
            />
            <button id='checkoutButton' onClick={checkout}>Efetuar Pedido</button>
            <div>{orderMessage}</div>
        </Fragment>
    )
}

export default CheckoutOrder