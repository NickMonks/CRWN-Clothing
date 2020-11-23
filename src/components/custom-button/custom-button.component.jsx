import React from 'react';

import './custom-button.styles.scss';
{/* This will we a presentational component, and very flexible since we will use it throughout the entire application*/}
{/* we pull off the children from our props: props.children. When we actually call & use the CustomButton we pass some text 
    to it as children to describe what the button does.
    IMPORTANT: ANYTHING THAT IS PASSED BETWEEN COMPONENT TAGS (like "sign in") is considered children
 */}
const CustomButton = ({children, isGoogleSignIn,  ...otherProps}) => (
    <button 
        className={`${isGoogleSignIn ? 'google-sign-in': ''} custom-button`} 
        {...otherProps}
        >
        {children}
    </button>
);

export default CustomButton;

