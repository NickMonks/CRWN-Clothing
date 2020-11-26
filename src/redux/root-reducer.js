// base reducer that contains all the state of our app.
// It will combine all the states here and reduce thems. 

import { combineReducers } from 'redux';

import userReducer from './user/user.reducer';
import cartReducer from './cart/cart.reducer';

export default combineReducers({
    user: userReducer,
    cart : cartReducer
});