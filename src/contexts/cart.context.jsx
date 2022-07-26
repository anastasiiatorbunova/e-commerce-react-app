import { createContext, useReducer } from "react";
import { createAction } from "../utils/reducer/reducer.utils";

const addCartItem = (cartItems, productToAdd) => {
    // find if cartItems contains productToAdd
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === productToAdd.id
    );
    
    // if found, increment quantity
    if( existingCartItem ) {
        return cartItems.map(
            (cartItem) => cartItem.id === productToAdd.id ? 
                {...cartItem, quantity: cartItem.quantity + 1} : cartItem
        )
    }

    // return new array with modified cartItem / new cartItem
    return [...cartItems, {...productToAdd, quantity: 1}];
}

const removeCartItem = (cartItems, cartItemToRemove) => {
    // find the cart item to remove
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === cartItemToRemove.id
    );

    // check if the quantity is equal to 1, if it is remove item
    if(existingCartItem.quantity === 1){
        return cartItems.filter(item => item.id !== cartItemToRemove.id);
    }

    // return back cartItems with matching cart item with reduced quantity
    return cartItems.map(
        (cartItem) => cartItem.id === cartItemToRemove.id ? 
            {...cartItem, quantity: cartItem.quantity - 1} : cartItem
    );
}

const clearItem = (cartItems, itemToClear) => {
    return cartItems.filter(item => item.id !== itemToClear.id);
}

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    clearItemFromCart: () => {},
    cartCount: 0,
    cartTotal: 0
})

export const CART_ACTION_TYPES = {
    SET_IS_CART_OPEN: 'SET_IS_CART_OPEN',
    SET_CART_ITEMS: 'SET_CART_ITEMS'
}

const cartReducer = (state, action) => {
    const { type, payload } = action;

    switch(type) {
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return {
                ...state,
                ...payload
            }
        case CART_ACTION_TYPES.SET_IS_CART_OPEN:
            return {
                ...state,
                isCartOpen: payload
            }
        default:
            throw new Error(`Unhandled type ${type} in cartReducer`)
    } 
}

export const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    cartTotal: 0
}

export const CartProvider = ({ children }) => {
    const [ { cartItems, isCartOpen, cartCount, cartTotal }, dispatch ] = useReducer(cartReducer, INITIAL_STATE);

    const updateCartItemsReducer = (newCartItems) => {
        const newCartCount = newCartItems.reduce((total, currentItem) => total + currentItem.quantity, 0);
        
        const newCartTotal = newCartItems.reduce(
            (total, currentItem) => total + currentItem.quantity * currentItem.price, 
        0);

        dispatch( createAction( CART_ACTION_TYPES.SET_CART_ITEMS, {
            cartItems: newCartItems,
            cartTotal: newCartTotal,
            cartCount: newCartCount
        }))
    }

    const addItemToCart = (productToAdd) => {
        const newCartItems = addCartItem(cartItems, productToAdd);
        updateCartItemsReducer(newCartItems);
    }

    const removeItemFromCart = (productToRemove) => {
        const newCartItems = removeCartItem(cartItems, productToRemove);
        updateCartItemsReducer(newCartItems);
    }

    const clearItemFromCart = (itemToClear) => {
        const newCartItems = clearItem(cartItems, itemToClear);
        updateCartItemsReducer(newCartItems);
    }

    const setIsCartOpen = (bool) => {
        dispatch(createAction( CART_ACTION_TYPES.SET_IS_CART_OPEN, bool ))
    }

    const value = {
        isCartOpen, 
        setIsCartOpen, 
        addItemToCart, 
        removeItemFromCart,
        clearItemFromCart,
        cartItems, 
        cartCount,
        cartTotal
    };

    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
}