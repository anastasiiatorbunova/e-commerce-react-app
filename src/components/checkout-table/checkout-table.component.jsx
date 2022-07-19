import { useContext } from "react";
import { Fragment } from "react";

import './checkout-table.styles.scss';

import { CartContext } from "../../contexts/cart.context";
import CheckoutItem from "../checkout-item/checkout-item.component";

const CheckoutTable = () => {
    const { cartItems, cartTotal } = useContext(CartContext);

    return (
        <Fragment>
            { 
                cartItems.length > 0 ?
                    <div className="checkout-container">
                        <div className="checkout-header">
                            <div className="header-block"><span>Product</span></div>
                            <div className="header-block"><span>Description</span></div>
                            <div className="header-block"><span>Quantity</span></div>
                            <div className="header-block"><span>Price</span></div>
                            <div className="header-block"><span>Remove</span></div>
                        </div>
                        {
                            cartItems.map(cartItem => <CheckoutItem key={cartItem.id} cartItem={cartItem} />)
                        }
                        <span className="total">Total: ${cartTotal}</span>
                    </div> :
                    <h2 className="empty-notification">The cart is empty!</h2>
            }
        </Fragment>
    )
}

export default CheckoutTable;