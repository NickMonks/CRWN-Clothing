// base reducer that contains all the state of our app.
// It will combine all the states here and reduce thems. 

import { combineReducers } from 'redux';
// we persist the store, and now we persist the reducer itself
import {persistReducer } from 'redux-persist';
// to get the local storage of the DOM window (window.localStorage.setItem(object, JSON.stringify()))
// remember to stringify to save the object as JSON. 
import storage from 'redux-persist/lib/storage';

import userReducer from './user/user.reducer';
import cartReducer from './cart/cart.reducer';
import directoryReducer from './directory/directory.reducer';
import shopReducer from './shop/shop.reducer'

const persistConfig = {
    key: 'root', // at what point in our reducer we want to start to persist
    storage,
    // whitelist is an array containing the name of the reducer that we want to store
    // we only persist the cart so it persist our buy list. 
    whitelist: ['cart']
}

const rootReducer = combineReducers({
    user: userReducer,
    cart : cartReducer,
    directory: directoryReducer,
    shop: shopReducer
});

// we export rootReducer with extended capabilities coming from persistConfig
export default persistReducer(persistConfig, rootReducer)