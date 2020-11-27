import React from 'react'

import './checkout-item.styles.scss';

const CheckoutItem = ({cartItem: {name, imageUrl, price, quantity}}) => (
    <div className='checkout-item'>
        <div className='image-container'>
            <img src={imageUrl} alt="item"/>
        </div>
        <span className='name'>{name}</span>
        <span className='quantity'>{quantity}</span>
        <span className='price'>{price}</span>
        {/* We will implement a UTF-8 button for the cross-delete, which is naturally build in the browser */}
        <div className='remove-button'>&#10005; </div>

    </div>

);

export default CheckoutItem;