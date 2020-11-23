import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBrknopf7MxXyVhmg0VR4z-1hsDsW1O98w",
    authDomain: "crwn-db-d39b0.firebaseapp.com",
    databaseURL: "https://crwn-db-d39b0.firebaseio.com",
    projectId: "crwn-db-d39b0",
    storageBucket: "crwn-db-d39b0.appspot.com",
    messagingSenderId: "594910722098",
    appId: "1:594910722098:web:c64c3b7f37258aeb34e42b",
    measurementId: "G-RFSZYDL4L7"
  };

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  //Google authentication
  
  const provider = new firebase.auth.GoogleAuthProvider();

  // we want to trigger the google authentication when is selected
  provider.setCustomParameters({prompt: 'select_account'});
  
  // signInwithgoogle is a callback function that provides the authentication with a popup. 
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  // We need to habilitate the firebase to allow google popups
  export default firebase;