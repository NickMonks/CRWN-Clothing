
import './App.css';
import React from 'react';

import { Switch, Route, Redirect } from 'react-router-dom';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from "./pages/shop/shop.component.jsx";
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import CheckoutPage from './pages/checkout/checkout.component';

import { auth, createUserProfileDocument, addCollectionAndItems } from './firebase/firebase.utils';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from './redux/user/user.selector';
import { setCurrentUser } from './redux/user/user.actions';
import { selectCollections, selectCollectionsForPreview } from './redux/shop/shop.selectors';

class App extends React.Component {
 

  unsubscribeFromAuth = null;

  // subscription - we just to check when the state has changed - a new user state
  // So we dont want to remount again and manually fetch. 
  // All of this allows us to do OAth, authentication from 3rd parties. 
  componentDidMount() {  
    
    // Since we just want to store the database only once, we do it when the app mounts
    // and then we add our Javascript JSON object. 
    const {setCurrentUser/*, collectionsArray */ } = this.props;

    //       \/ asynchronous because we're doing an API request
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      // this method from firebase library takes a function callback with user argument
      // we create profile document:
      if (userAuth) {
        // We use this userRef to check if the data as changed 
        const userRef = await createUserProfileDocument(userAuth); 
        //onSnapshot will send us back the snapshot object
        // In our case, we will subscribe (or "listen") to useRef for any changes of userRef
        // so its an event, and this will setState
        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            
              id: snapShot.id,
              ...snapShot.data() // we ask for the rest of the data
            
          });
        });
      } else {
              // if the user is null and left (unmounted):
              setCurrentUser(userAuth); 
              // Uncomment if you want to re-create firestore                                                    We extract the properties that we want, so we map to create an array of two objects: title and items.                                     
              //addCollectionAndItems('collections', collectionsArray.map(({title, items})=>({title,items})));
      }      
      //createUserProfileDocument(user);
     // authentication persistence - the user will persist, so he will be as a user even if the user refresh or close the window: console.log();
     // This is an open subscription - messaging between app and firebase that is constantly running, so we don't need to fetch everytime the user makes a change
    })
  }

  componentWillUnmount() {
         // we also need to delete this whenever we unmoun, to avoid memory leakage. 
// That's why we called componentwillunmount to close this subscription
    this.unsubscribeFromAuth(); 
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
        {/* Switch is used to only render whichever endpoint is being hit*/}
        {/* history component is only passed to the children, but we need to avoid prop drilling! */}
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage}/>
          <Route exact path='/checkout' component={CheckoutPage}/>

          <Route exact path='/signin' render={()=> 
            // Using render in the router, we can re-render directly on this part of the function
            // if the currentUser state exists, we dont want to go to the sign in page
            this.props.currentUser ? (
            <Redirect to='/'/>
              ): (
                <SignInAndSignUpPage />
                )
              }
            />
        </Switch>
      </div>
    );
  }
  
}

// instead of using state, we destructure the state and take user
const mapStateToProps = createStructuredSelector ({
  currentUser: selectCurrentUser
  // Uncomment if you want to re-create firestore
  //collectionsArray: selectCollectionsForPreview
})
// mapDispatch is used to set the state of header, not to used

const mapDispatchToProps = dispatch => ({
                          // dispatch fires up the action that is going to happen
                          // it passes that action to the reducer
  setCurrentUser: user => dispatch(setCurrentUser(user))
})          //        Propstostate
            //          \/
export default connect(
  mapStateToProps, 
  mapDispatchToProps
  )(App);
