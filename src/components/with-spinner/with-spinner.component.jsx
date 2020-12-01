// Because the way we build our backend, there is the possibility that data doesn't load
// before the page renders (due to be asynchronous firebase utils), so we create a loading menu or spinner

import React from 'react';

import {SpinnerContainer, SpinnerOverlay } from './with-spinner.styles';
    //              \/ HOC, takes another component, which takes props + isloading
const WithSpinner = WrappedComponent =>{ 
   const Spinner = ({isLoading, ... otherProps}) => {
    return isLoading ? ( // if its loading then loads the js css files
        <SpinnerOverlay>
            <SpinnerContainer />
        </SpinnerOverlay>
    ) : (// if not just load the component. 
        <WrappedComponent {...otherProps} />
    );
};

    return Spinner;
};

export default WithSpinner;