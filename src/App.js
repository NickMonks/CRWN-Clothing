
import './App.css';
import React, { useEffect } from 'react';

import { Switch, Route, Redirect } from 'react-router-dom';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from "./pages/shop/shop.component.jsx";
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import CheckoutPage from './pages/checkout/checkout.component';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from './redux/user/user.selector';
import { checkUserSession } from './redux/user/user.actions';


const App = ({ checkUserSession, currentUser }) => {
 
  
  // Instead of ComponentDidUnmount, we use React Hook useEffect:
  useEffect(() =>{
    checkUserSession()
  }, [checkUserSession]); 
  // we pass an empty array so it's only called once)
  // so it will be passed the dispatch property, and it wont never change
 
  
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
            currentUser ? (
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
  


// instead of using state, we destructure the state and take user
const mapStateToProps = createStructuredSelector ({
  currentUser: selectCurrentUser
  // Uncomment if you want to re-create firestore
  //collectionsArray: selectCollectionsForPreview
})
// mapDispatch is used to set the state of header, not to used

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
}); 

//        Propstostate
            //          \/
export default connect(
  mapStateToProps,
  mapDispatchToProps
  )(App);
