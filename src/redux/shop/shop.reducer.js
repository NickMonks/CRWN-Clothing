  
import ShopActionTypes from './shop.types';

const INITIAL_STATE = {
  collections: null,
  // redux needs to indicating if the app is fetching or not
  isFetching : false,
  // this would introduce new problems, particulary in the shop selector where expects a collection
  errorMessage: undefined
};

const shopReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case ShopActionTypes.FETCH_COLLECTIONS_START:
      return {
        ...state,
        isFetching: true
      }
    case ShopActionTypes.FETCH_COLLECTIONS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        collections: action.payload
      }
    
    case ShopActionTypes.FETCH_COLLECTIONS_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
      };
      
    default:
      return state;
  }
};

export default shopReducer;
