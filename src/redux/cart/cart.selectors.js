import {createSelector} from 'reselect';
// this script only takes a slice of the state and returns it
const selectCart = state => state.cart;

// This createSelector will create memoized objects
export const selectCartItems = createSelector(
    [selectCart], // collection of inputselectors
    (cart) => cart.cartItems // function that we want to return the selector
)

export const selectCartHidden = createSelector (
    [selectCart],
    (cart) => cart.hidden
)

export const selectCartItemsCount = createSelector(
    [selectCartItems], // This refers tp selectCart, and selectCarts refers to state.cart
                       // so it passes state.cart.cartItem
    (cartItems) => cartItems.reduce(
        (accumulatedQuantity,cartItem)=>
        accumulatedQuantity + cartItem.quantity,
    0)
);

export const selectCartTotal = createSelector(
    [selectCartItems],
    (cartItems) => cartItems.reduce(
        (accumulatedQuantity,cartItem)=>
        accumulatedQuantity + cartItem.quantity * cartItem.price,
    0)

)