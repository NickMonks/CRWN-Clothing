import { takeLatest, put, all, call } from 'redux-saga/effects';

import UserActionTypes from './user.types';

import {    signInSuccess, 
            signInFailure,
            signOutSuccess,
            signOutFailure,
            signUpSuccess,
            signUpFailure  } from './user.actions';

import { 
        auth, 
        googleProvider, 
        createUserProfileDocument,
        getCurrentUser
    } from '../../firebase/firebase.utils';


export function* getSnapshotFromUserAuth(userAuth, additionalData) {
    try{
        
        const userRef = yield call(createUserProfileDocument, userAuth, additionalData);
        const userSnapshot = yield userRef.get(); // take the snapshot of the collection
        yield put(
            signInSuccess({
                // remember that user is the argument of the action,
                // and put is basically a dispatch of the action. In this case,
                // we simply destruct it in the same way as the observable implemented before in app.js
            id: userSnapshot.id,
            ...userSnapshot.data()
        })
        );
    } catch(error){
        yield put(signInFailure(error));
    }
}   


export function* signInWithGoogle() {
    try{
        // anytime we access to n API can fail
        const {user} = yield auth.signInWithPopup(googleProvider); // we need to pull off the user from the response
        yield getSnapshotFromUserAuth(user);

    } catch(error) {
        yield put(signInFailure(error));
    }
}



export function* signInWithEmail({payload: {email, password}}){
    try{

        const { user } = yield auth.signInWithEmailAndPassword(email,password);
        yield getSnapshotFromUserAuth(user);

    } catch(error){
        yield put(signInFailure(error));
    }
}

export function* isUserAuthenticated() {
// Checks if the user is already authenticated
// Inside a promise we created in firebase.utils
    try{
       const userAuth = yield getCurrentUser(); 
       if (!userAuth) return; // if its not authenticated then return
       yield getSnapshotFromUserAuth(userAuth);
    }catch(error) {
        yield put(signInFailure(error))
    }
}

export function* signOut() {
    try{
        yield auth.signOut();
        yield put(signOutSuccess())
    } catch(error){
        yield put(signOutFailure(error));
    }
} 

export function* signUp({ payload: { email,password,displayName }}){
    try{
        const {user} = yield auth.createUserWithEmailAndPassword(email, password);
        yield put(signUpSuccess({ user, additionalData:{ displayName } }))
            
    } catch(error){
        yield put(signUpFailure(error))

    }
}

export function* signInAfterSignUp({payload: { user, additionalData }}) {
    yield getSnapshotFromUserAuth(user, additionalData);
}


// ------------ Listeners -----------------------

export function* onGoogleSignInStart() {
    yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle)
}

export function* onEmailSignInStart() {
    yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail)
}

// use the prefix "on" whenever we're listening
export function* onCheckUserSession() {
    yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* onSignOutStart() {
    yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut);
}

export function* onSignUpStart() {
    yield takeLatest(UserActionTypes.SIGN_UP_START, signUp)
}

export function* onSignUpSuccess() {
    yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp )
}




// we export a main saga:

export function* userSagas() {
    yield all([
        call(onGoogleSignInStart),
        call(onEmailSignInStart),
        call(onCheckUserSession),
        call(onSignOutStart),
        call(onSignUpStart),
        call(onSignUpSuccess)
    ]);
}