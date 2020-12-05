import { createStore, applyMiddleware } from 'redux';
// Middleware receive actions in and passed to the reducer

import logger from 'redux-logger';
// It allows log the redux

import {persistStore} from 'redux-persist';
// we replace thunks for sagas instead
import createSagaMiddleware from 'redux-saga';

import rootSaga from './root-saga';
import rootReducer from './root-reducer';
//import { fetchCollectionsStart } from './shop/shop.actions';


const sagaMiddleware = createSagaMiddleware();
// we add the thunk in the middleware
const middlewares = [sagaMiddleware];

// to avoid logger in production:
if (process.env.NODE_ENV==='development') {
    middlewares.push(logger);
}

// create store - takes a rootreducer, and all the middlewares (that's why we spread the array )
// this is done everytime we re-render. we create a new store.
export const store = createStore(rootReducer, applyMiddleware(...middlewares));

// add individual sagas that we will use:
sagaMiddleware.run(rootSaga);

// this will create a persist version of our store; 
export const persistor = persistStore(store);
export default { store, persistor };