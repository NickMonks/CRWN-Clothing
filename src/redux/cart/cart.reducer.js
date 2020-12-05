import CartActionTypes from './cart.types';
import { addItemToCart, removeItemFromCart } from './cart.utils';
const INITIAL_STATE = {
    hidden: true,
    cartItems: []
}

const cartReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CartActionTypes.TOOGLE_CART_HIDDEN:
           return {
               ...state,
               hidden: !state.hidden
           };
        
        case CartActionTypes.ADD_ITEM:  
            return {
                ...state,
                // To add cartItems and stack them, we spread the old cartItems
                // and then add the action.payload
                cartItems: addItemToCart(state.cartItems, action.payload)
            }
        case CartActionTypes.CLEAR_ITEM_FROM_CART:
            return {
                ...state,
                // because the payload is the item, we filter anything and pass anything but the cartItem.id
                cartItems: state.cartItems.filter(cartItem => cartItem.id !== action.payload.id)
            }
        
        case CartActionTypes.REMOVE_ITEM:
            return {
                ...state,
                // we define the function in the utility.js
                cartItems: removeItemFromCart(state.cartItems, action.payload)
            }
        case CartActionTypes.CLEAR_CART:
            return {
                ...state,
                cartItems: []
            }
        
        default:
            return state;
    }
}

export default cartReducer;