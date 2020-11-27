import React from 'react';
import {Link} from 'react-router-dom';
// In order to pull the currenUser state from redux, we import a HOC that takes components as inputs
// This will connect the component to the redux store
import {connect} from 'react-redux';
//
import {createStructuredSelector} from 'reselect';

import { auth } from '../../firebase/firebase.utils';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import {ReactComponent as Logo} from '../../assets/crown.svg';
// selectors
import { selectCartHidden } from '../../redux/cart/cart.selectors'
import { selectCurrentUser } from '../../redux/user/user.selector';
import './header.styles.scss';

const Header = ({currentUser, hidden}) => (
    <div className='header'>
        <Link to="/">
            <Logo className='logo' />
        </Link>
        <div className="options">
            <Link className='option' to="/shop">
                SHOP
            </Link>
            <Link className='option' to="/shop">
                CONTACT
            </Link>
            {
                // Here we put a ternary operator. When the currenUser exists, then we set a synthetic event
                // onClick that fires up auth.signOut from firebase. 
                currentUser ?
                (<div className='option' onClick={() => auth.signOut()}> 
                SIGN OUT 
                </div>
                ): (
                <Link className='option' to ='/signin'>
                    SIGN IN
                </Link>
                )}
                <CartIcon />
        </div>
        {   // render the card-dropdown if it's not null
            hidden ? null : 
            <CartDropdown />
        }
    </div>
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

// We use currying - call the connect function, which gives a HOC, and then we add the Header component.
// first argument will be the state of the root reducer
// So: export -> function connect, which let us have access to states from redux, and then add as an argument Header. 
export default connect(mapStateToProps)(Header);