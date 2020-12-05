import ShopActionTypes from './shop.types';
import {firestore, convertCollectionsSnapshotToMap} from '../../firebase/firebase.utils';

export const fetchCollectionsStart = () => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_START
});

export const fetchCollectionSuccess = collectionsMap => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
    payload: collectionsMap
})

export const fetchCollectionsFailure = errorMessage => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
    payload: errorMessage
})

// thunks - action creator that returns a function that gets dispatch
// So basically thunk allows us to dispatch multiple actions (multithreading)
// export const fetchCollectionsStartAsync = () => {
    
//     // thunks allows to catch actions before hitting the reducer, and use them inside another function
//     // so thunks uses this actions as mere functions
//     // it is simply passing the function in the middleware
    
//     return dispatch => {

//         const collectionRef = firestore.collection('collections');
        
//         // Once we start the fetching, we called the collection start which fires the action FETCH_START
//         dispatch(fetchCollectionsStart());

//         collectionRef.get().then(snapshot => {
//             const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
//            // dispatch the fetch success:
//            dispatch(fetchCollectionSuccess(collectionsMap));
           
//             // pass the collectionsMap in the updatecollections dispatch:
//            updateCollections(collectionsMap);
          
//          }).catch(error=> dispatch(fetchCollectionsFailure(error.message)));
//     }
// }


