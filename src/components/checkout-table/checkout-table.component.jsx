import { useContext } from "react";
import { Fragment } from "react";

import {
    CheckoutContainer,
    HeaderContainer,
    HeaderBlock,
    Total,
    EmptyNotification
} from './checkout-table.styles.jsx';

import { CartContext } from "../../contexts/cart.context";
import CheckoutItem from "../checkout-item/checkout-item.component";

const CheckoutTable = () => {
    const { cartItems, cartTotal } = useContext(CartContext);

    return (
        <Fragment>
            { 
                cartItems.length > 0 ?
                    <CheckoutContainer>
                        <HeaderContainer>
                            <HeaderBlock><span>Product</span></HeaderBlock>
                            <HeaderBlock><span>Description</span></HeaderBlock>
                            <HeaderBlock><span>Quantity</span></HeaderBlock>
                            <HeaderBlock><span>Price</span></HeaderBlock>
                            <HeaderBlock><span>Remove</span></HeaderBlock>
                        </HeaderContainer>
                        {
                            cartItems.map(cartItem => <CheckoutItem key={cartItem.id} cartItem={cartItem} />)
                        }
                        <Total>Total: ${cartTotal}</Total>
                    </CheckoutContainer> :
                    <EmptyNotification>The cart is empty!</EmptyNotification>
            }
        </Fragment>
    )
}

export default CheckoutTable;