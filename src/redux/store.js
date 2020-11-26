import { createStore, applyMiddleware } from 'redux';
// Middleware receive actions in and passed to the reducer

import logger from 'redux-logger';
// It allows log the redux

import rootReducer from './root-reducer';

const middlewares = [logger];

// create store - takes a rootreducer, and all the middlewares (that's why we spread the array )
// this is done everytime we re-render. we create a new store.
const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;