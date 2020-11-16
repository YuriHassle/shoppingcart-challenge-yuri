import { useMutation, useQuery } from '@apollo/client';
import { Link, RouteComponentProps } from '@reach/router';
import React, { Fragment, useContext, useState } from 'react'
import { FaHome, FaShoppingBag } from 'react-icons/fa';
import CartContext, { CartItemInterface } from '../CartContext';
import { SAVE_ORDER } from '../mutations/ordersMutation';
import { saveOrder } from '../mutations/types/saveOrder';
import { GET_ALL_PRODUCTS } from '../queries/productsQuery';
import { getAllProducts } from '../queries/types/getAllProducts';

interface CheckoutOrderProps extends RouteComponentProps {
    location?: any
}

const CheckoutOrder: React.FC<CheckoutOrderProps> = ({ location }) => {

    const { cartItems, setCartItems } = useContext(CartContext)
    const [creditCardNumber, setCreditCardNumber] = useState('')
    let {totalOrder} = location.state
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
                        setCartItems([])
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
            <h1 className='title-list'>Pagamento</h1>
            <p className='subtile'>
                Total do pedido: <span>{totalOrder.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</span>
            </p>
            <div className="container-checkout">
                <p>Informe o número do cartão de crédito:</p>
                <input
                    placeholder='Apenas números'
                    type="text"
                    onChange={(e) => setCreditCardNumber(e.target.value)}
                />
                <button className='btn btn-dark mt-5' id='checkoutButton' onClick={checkout}>
                    <FaShoppingBag size={15} color={'#FFFFFF'} ></FaShoppingBag>
                    &nbsp; Efetuar Pedido
                </button>
                <Link to='/'>
                    <button className='btn btn-info mt-2'>
                        <FaHome size={15} color={'#FFFFFF'} ></FaHome>
                        &nbsp;Voltar para a página inicial
                    </button>
                </Link>
            </div>
            <p className='message-alert'>{orderMessage}</p>
        </Fragment>
    )
}

export default CheckoutOrder