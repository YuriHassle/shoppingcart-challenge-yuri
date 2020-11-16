import React, { Fragment, useContext } from 'react';
import { Link, RouteComponentProps } from '@reach/router'
import { FaPlus, FaMinus, FaTrashAlt, FaHome, FaCreditCard } from 'react-icons/fa'
import { UPDATE_PRODUCT } from '../mutations/productsMutation';
import { updateProduct } from '../mutations/types/updateProduct';
import { useMutation, useQuery } from '@apollo/client';
import { GET_PRODUCT_BY_ID } from '../queries/productsQuery';
import { productById } from '../queries/types/productById';
import CartContext, { CartItemInterface } from '../CartContext';

interface CartDetailProps extends RouteComponentProps {
    setEmptyCart?: any,
    setCartMessage?: any,
    item?: CartItemInterface
}

const CartItem: React.FC<CartDetailProps> = ({setCartMessage, setEmptyCart, item}) => {

    const { cartItems, setCartItems } = useContext(CartContext)
    const [updateProduct] = useMutation<updateProduct>(UPDATE_PRODUCT)

    const { loading, fetchMore } = useQuery<productById>(GET_PRODUCT_BY_ID, {
        nextFetchPolicy: 'no-cache',
        variables: { productId: '' }
    })
    if (loading) return <p>Loading</p>


    const updateAvailability = (productId: String, currentAvailability: number, qtd: number, op: string) => {

        let variables = {
            variables: {
                id: productId,
                availability: currentAvailability - qtd
            }
        }

        updateProduct(variables).then(() => {
            if (op == 'REMOVE') {
                const newCart = cartItems.filter(item => item.product.id != productId)
                setCartItems(newCart)
                setEmptyCart(!(newCart.length > 0))
            } else {
                setCartItems(
                    cartItems.map(item => {
                        if (item.product.id === productId) {
                            return { ...item, qtd: item.qtd + qtd }
                        } else return item
                    })
                )
            }
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
                    ? updateAvailability(productId, data.product.availability, 1, 'INCREMENT')
                    : setCartMessage('Essa viagem está esgotada :(')
                break

            case 'DECREMENT':
                cartItems.find(item => item.product.id === productId).qtd > 1
                    ? updateAvailability(productId, data.product.availability, (-1), 'DECREMENT')
                    : setCartMessage('Você precisa ter ao menos um item no carrinho.')
                break

            case 'REMOVE':
                const qtd = cartItems.find(item => item.product.id === productId).qtd
                updateAvailability(productId, data.product.availability, (-qtd), 'REMOVE')
        }
    }

    return (
        <Fragment>
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
        </Fragment>
    )
}

export default CartItem;