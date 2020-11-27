import React from 'react';
import {connect} from 'react-redux';

import CustomButton from '../custom-button/custom-button.component';
import {addItem} from '../../redux/cart/cart.actions';

import './collection-item.styles.scss';

//                                \/ this will be the dispatch action function             
const CollectionItem = ({ item, addItem }) =>{
  // we add the return () and the clauses to spread the values
  const { name, price, imageUrl} = item;
  return (
  <div className='collection-item'>
    <div
      className='image'
      style={{
        backgroundImage: `url(${imageUrl})`
      }}
    />
    <div className='collection-footer'>
      <span className='name'>{name}</span>
      <span className='price'>£{price}</span>
    </div>
    <CustomButton onClick={() => addItem(item)} inverted >Add to cart</CustomButton>
  </div>
     );
 }

const mapDispatchToProps = dispatch => ({
  // Note: addItem is defined as an arrow function, and item is a state
  addItem: item => dispatch(addItem(item))
})

export default connect(null, mapDispatchToProps)(CollectionItem);