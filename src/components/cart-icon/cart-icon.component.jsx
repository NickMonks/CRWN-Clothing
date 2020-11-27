import React from 'react';
import {connect} from 'react-redux';

import { toggleCartHidden } from '../../redux/cart/cart.actions';
import {selectCartItemsCount} from '../../redux/cart/cart.selectors';
import { createStructuredSelector } from 'reselect';
import {ReactComponent as ShoppingIcon} from '../../assets/shopping-bag.svg';
import './cart-icon.styles.scss';


const CartIcon = ({toggleCartHidden, itemCount}) => (
    <div className='cart-icon' onClick={toggleCartHidden}>
        <ShoppingIcon className='shopping-icon'/>
        <span className='item-count'>{itemCount}</span>
    </div>
);

const mapDispatchToProps = dispatch => ({
    toggleCartHidden: () => dispatch(toggleCartHidden())
})

const mapStateToProps = createStructuredSelector ({
    // Selector - Takes a small portion of the state and returns a sliced object
    // Issue: we are re-rendering always when the state in general changes (so if we 
    // go to signin-signout), and cartitems state is redefined in the store

    // so in order to improve time complexity vs space complexity we use memoization
    // using Reselect library:
    //
    itemCount: selectCartItemsCount
}) 

export default connect(mapStateToProps,
                       mapDispatchToProps
                       )(CartIcon);