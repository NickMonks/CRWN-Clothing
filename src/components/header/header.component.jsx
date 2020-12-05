import React from 'react';

import {connect} from 'react-redux';

import {createStructuredSelector} from 'reselect';

import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import {ReactComponent as Logo} from '../../assets/crown.svg';
// selectors
import { selectCartHidden } from '../../redux/cart/cart.selectors'
import { selectCurrentUser } from '../../redux/user/user.selector';
import { signOutStart  } from '../../redux/user/user.actions';

// CSS in JS:
import {    HeaderContainer, 
            LogoContainer, 
            OptionsContainer,
             OptionLink } from "./header.styles.jsx";

const Header = ({currentUser, hidden}) => (
    <HeaderContainer>
        <LogoContainer to="/">
            <Logo className='logo' />
        </LogoContainer>
        <OptionsContainer>
            <OptionLink to="/shop">
                SHOP
            </OptionLink>
            <OptionLink to="/shop">
                CONTACT
            </OptionLink>
            {
                // Here we put a ternary operator. When the currenUser exists, then we set a synthetic event
                // onClick that fires up auth.signOut from firebase. 
                currentUser ?
                // You can also change the type of object used as keyword
                (<OptionLink as='div' onClick={signOutStart}> 
                SIGN OUT 
                </OptionLink>
                ): (
                <OptionLink to ='/signin'>
                    SIGN IN
                </OptionLink>
                )}
                <CartIcon />
        </OptionsContainer>
        {   // render the card-dropdown if it's not null
            hidden ? null : 
            <CartDropdown />
        }
    </ HeaderContainer>
);
                //        \/ we take the root reducer
                // this will return us an object {} rootReducer. 
// Every time the store is updated (=new states), then the mapStatetoProps will be called

//const mapStateToProps = (state) => ({
// extracts the state of interest from rootReducer, to be used in Header
    //currentUser: state.user.currentUser 
    //                 \/        \/
    //           RootReducer  User.reducer.js
    // But we will use a more advanced syntax, nestening the values

// An easy way to use the selector and being DRY is using structuredselector
    const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
});

const mapDispatchToProps = dispatch => ({
    signOutStart: () => dispatch(signOutStart())
  });
  
 

// We use currying - call the connect function, which gives a HOC, and then we add the Header component.
// first argument will be the state of the root reducer
// So: export -> function connect, which let us have access to states from redux, and then add as an argument Header. 
export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Header);