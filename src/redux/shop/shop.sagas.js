// use generator function for use sagas

// import effects from sagas, that allows to do different actions 
// takeevery listens for every action we pass
import { takeLatest, call, put, all } from 'redux-saga/effects';
import {firestore, convertCollectionsSnapshotToMap} from '../../firebase/firebase.utils';
import ShopActionTypes from './shop.types';
import {
    fetchCollectionSuccess,
    fetchCollectionsFailure
} from './shop.actions';

export function* fetchCollectionsAsync() {
    // yield console.log("I am fired (I wish)");
    try{
        const collectionRef = firestore.collection('collections');
        const snapshot = yield collectionRef.get();
        // call allows sagas to control function invocation. 1st arg is the function and the others the arguments
        // once the expression is evaluated it will yield and so forth
        const collectionsMap = yield call(convertCollectionsSnapshotToMap,snapshot);
        // to "dispatch" a saga we use the put effect
        // it takes out the fetchCollectionSuccess return object (in our case is that pay, we have a payload and type)
        yield put(fetchCollectionSuccess(collectionsMap));
    }catch(error) {
        yield put(fetchCollectionsFailure(error.message))
    }
    
}

export function* fetchCollectionsStart() {
    // pauses whenever a specific action comes in
    // so we yield our function
    // takevery(actiontype, another gen that would run in response to the yield)
    // takeevery creates a non-blocking call; it dont blocks javascript and can cancel other func generators
    yield takeLatest( // just in case several fetching collections are fired, only put the latest one since the most up-to-date
        ShopActionTypes.FETCH_COLLECTIONS_START, 
        fetchCollectionsAsync
    );
}

export function* shopSagas() {
    yield all([call(fetchCollectionsStart)])
}