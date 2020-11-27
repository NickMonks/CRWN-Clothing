// utility functions allows us to keep our files clean and organize functions
// that we may need in multiple files in one location

export const addItemToCart = (cartItems, cartItemToAdd) => {
    // check if the cart is already existing using find
    // loops each element of cartItems and if undefined it doesnt exist
    const existingCartItem = cartItems.find(
        cartItem => cartItem.id === cartItemToAdd.id
    );

    if (existingCartItem) {
        return cartItems.map(cartItem =>
            cartItem.id === cartItemToAdd.id
            // if matches the new carItemToAdd with cartItem, we add to quantity a +1. 
            ? {...cartItem, quantity: cartItem.quantity + 1}
            : cartItem
            )
    }
    // if not then we spread cartItems, cartItemToAdd and the new quantity. 
    return [...cartItems, {...cartItemToAdd, quantity: 1}]
}