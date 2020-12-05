// gets two properties: state (or initial state), and an action, which is an action that contains
// a type ("USER-GENERATED") and a payload, which can be anything.
import UserActionTypes from './user.types';
// First we need to set an initial state
const INITIAL_STATE = {
    currentUser: null,
    error: null,
};
                        //    If there is no value 
                        //    set this anyway
const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UserActionTypes.SIGN_IN_SUCCESS:
            return {
                ...state, // Important: when we spread the state and later the property of interest it will overload it
                currentUser: action.payload,
                error: null // to clean any errors that may have appear
            };
        case UserActionTypes.SIGN_IN_SUCCESS:
            return {
                ...state,
                currentUser: null,
                error: null
            }
        case UserActionTypes.SIGN_IN_FAILURE: 
        case UserActionTypes.SIGN_OUT_FAILURE:
        case UserActionTypes.SIGN_UP_FAILURE: 
 
            return {
                ...state,
                error: action.payload
            };
        
        default:
            return state;
    }
};
export default userReducer;