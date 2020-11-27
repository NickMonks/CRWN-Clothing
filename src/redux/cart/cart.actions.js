import CartActionTypes from './cart.types';

export const toggleCartHidden = () => ({
    // We dont pass the payload because it's going to be switched in the reducer itself. 
    type: CartActionTypes.TOOGLE_CART_HIDDEN
})


export const addItem = item => ({
    type: CartActionTypes.ADD_ITEM,
    payload: item
})