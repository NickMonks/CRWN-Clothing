import './App.css';
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from "./pages/shop/shop.component.jsx";
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { auth } from './firebase/firebase.utils';

class App extends React.Component {
  constructor() {
    super();


    this.state = {
      // authentication user from firebase
      currentUser: null
    }

  }

  unsubscribeFromAuth = null;

  // subscription - we just to check when the state has changed - a new user state
  // So we dont want to remount again and manually fetch. 
  // All of this allows us to do OAth, authentication from 3rd parties. 
  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(user=> {
      // this method from firebase library takes a function callback with user argument
      // and we set the state with it
      this.setState({ currentUser: user});
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
        <Header currentUser={this.state.currentUser} />
        <Switch>
        {/* Switch is used to only render whichever endpoint is being hit*/}
        {/* history component is only passed to the children, but we need to avoid prop drilling! */}
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage}/>
          <Route path='/signin' component={SignInAndSignUpPage}/>
  
        </Switch>
       
      </div>
    );
  }
  
}

export default App;
