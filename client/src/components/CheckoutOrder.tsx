import { Link, RouteComponentProps } from '@reach/router';
import React, {Fragment} from 'react'

interface CheckoutOrderProps extends RouteComponentProps {
    location?: any
}

const CheckoutOrder: React.FC<CheckoutOrderProps> = ({location}) => {
    return(
        <Fragment>
            <h1>Pagamento</h1>
            <p>Total do pedido: {location.state.totalOrder}</p>
            <label>Informe o número do cartão de crédito:</label>
            <input placeholder='Apenas Números' type="text"/>
            <button>Efetuar Pedido</button>
        </Fragment>
    )
}

export default CheckoutOrder