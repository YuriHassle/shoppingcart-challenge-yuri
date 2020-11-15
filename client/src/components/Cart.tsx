import { useMutation, useQuery } from '@apollo/client';
import { Link, RouteComponentProps } from '@reach/router';
import React, { Fragment, useEffect, useState } from 'react'
import { cartItemsVar } from '../cache';
import { UPDATE_PRODUCT } from '../mutations/productsMutation';
import { updateProduct } from '../mutations/types/updateProduct';
import { GET_PRODUCT_BY_ID } from '../queries/productsQuery';
import { productById } from '../queries/types/productById';
import { FaPlus, FaMinus, FaTrashAlt, FaHome, FaCashRegister, FaCreditCard } from 'react-icons/fa'



interface CartProps extends RouteComponentProps { }

const Cart: React.FC<CartProps> = () => {

        
    const [cartMessage, setCartMessage] = useState('')
    const [cartItems, setCartItems] = useState([])
    
    useEffect(()=>{
        setCartItems(cartItemsVar)
        if(cartItems.length>0){
            return console.log('entrou')
        }
    },cartItems)

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
        setCartMessage('')
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
                    : setCartMessage('Essa há mais lugares para essa viagem :(')
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

    const teste = ()=>{console.log(cartItems)}
    return (
        <Fragment>
            {cartItems && cartItems.map(item => (
                <div className="container-cart-item" key={item.product.id}>
                    <Link to={`/product/${item.product.id}`}>
                        <h3 className='title-list'>{item.product.title}</h3>
                    </Link>
                    <p>Quantidade no carrinho: <span>{item.qtd}</span></p>
                    <div className="container-button">
                        <button className='btn btn-add'
                            onClick={() => handleUpdateClick(item.product.id, 'INCREMENT')}
                        >
                            <FaPlus size={20} color={'#ffffff'}></FaPlus>
                        </button>
                        <button className='btn btn-dec'
                            onClick={() => handleUpdateClick(item.product.id, 'DECREMENT')}
                        >
                            <FaMinus size={20} color={'#ffffff'}></FaMinus>
                        </button>
                        <button className='btn btn-remove'
                            onClick={() => handleUpdateClick(item.product.id, 'REMOVE')}
                        >
                            <FaTrashAlt size={20} color={'#ffffff'}></FaTrashAlt>
                        </button>
                    </div>
                </div>
            ))}
            <p className='subtitle'>Total do carrinho</p>
            <p className='price-list'>{totalCart().toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</p>
            <Link
                to={'/checkout'}
                state={{ totalOrder: totalCart(), cartItems: cartItems }}
            >
                <button disabled className='btn btn-dark mt-3'>
                    <FaCreditCard size={15} color={'#FFFFFF'} ></FaCreditCard>
                    &nbsp; Ir para o pagamento
                </button>
            </Link>
            <Link to='/'>
                <button className='btn btn-info mt-2'>
                    <FaHome size={15} color={'#FFFFFF'} ></FaHome>
                        &nbsp;Voltar para a página inicial
                    </button>
            </Link>
            <p className='message-alert'>{cartMessage}</p>
            <button onClick={teste}>TESTEEE</button>
        </Fragment>
    )
}

export default Cart