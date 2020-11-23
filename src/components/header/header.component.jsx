import React from 'react';
import {Link} from 'react-router-dom';

import { auth } from '../../firebase/firebase.utils';

import {ReactComponent as Logo} from '../../assets/crown.svg';

import './header.styles.scss';

const Header = ({currentUser}) => (
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
                (<div className='option' onClick={() => auth.signOut()}> SIGN OUT </div>)
                :
                <Link className='option' to ='/signin'>SIGN IN</Link>
            }
        </div>
    </div>
);

export default Header;