import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({price}) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51HsZvALbYdbIfcIvxHhoSc1El7r3Sxsp9tDI1v8IGdMZteISeq4VZsAc6U5kw8tsC5myXJVcj3CqEp7WahqytmSW00TZTMnxo1'

    const onToken = token => {
        console.log(token);
        alert('Payment Successful');
    }
    // React requires a set of bindings to connect with stripe
    // so we use the react-stripe-checkout wrapper to achieve this
    // 
    return (
        <StripeCheckout 
            label = 'Pay Now'
            name = 'CRWN Clothing Ltd.'
            billingAddress
            shippingAddress
            image= ''
            description={`Your total is £${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}
        />
    );
}

export default StripeCheckoutButton;