  
import ShopActionTypes from './shop.types';

const INITIAL_STATE = {
  collections: null
  // this would introduce new problems, particulary in the shop selector where expects a collection
};

const shopReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ShopActionTypes.UPDATE_COLLECTIONS:
      return {
        ...state,
        collections: action.payload,
      };
    default:
      return state;
  }
};

export default shopReducer;
