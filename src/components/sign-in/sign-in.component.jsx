import React, { useState } from 'react';
import { connect } from 'react-redux';
import FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/custom-button.component';
import { googleSignInStart, emailSignInStart } from '../../redux/user/user.actions';

import './sign-in.styles.scss';

const SignIn = ({emailSignInStart, googleSignInStart}) => {
   
    const [userCredentials, setCredentials ] = useState({
        email:'', 
        password: ''
    }); // use of React Hooks
    
    const {email, password} = userCredentials;

    const handleSubmit = async (event) => {
        
        event.preventDefault(); // prevent the firing for now; we'll habilitate it later

        emailSignInStart(email,password)
        
    };

    const handleChange = (event) => {
        const {value, name} = event.target; // event.target takes the fields from the object caller
        setCredentials({...userCredentials, [name]: value }); // Instead of using setState, we use the second parameter of the useState
                                        // then password: value
    }


        return (
            <div className="sign-in">
                <h2>I already have an account</h2>

                <span>Sign in with your email and password</span>
                
                
                <form onSubmit={handleSubmit} >
                    <FormInput 
                        name="email" 
                        type="email"
                        label="Email" 
                        value={email} 
                        handleChange={handleChange} 
                        required />
                    
                    <FormInput  
                            name="password" 
                            type="password"
                            label="Password"  
                            value={password} 
                            handleChange={handleChange}
                            required />
                    <div className='buttons'>
                        {/* IMPORTANT: because CUstomButton has the type "submit", it will trigger the 
                        onSubmit event, independently of being an input or component. basically means that both are type submit*/}
                    <CustomButton type="submit">
                        Sign In
                    </CustomButton>

                    {/* Firebase authentication*/}
                    <CustomButton   type="button"
                                    onClick={googleSignInStart} 
                                    isGoogleSignIn >
                        Sign In with Google{' '}
                    </CustomButton>
                    </div>
                </form>
            </div>
        );
    }

const mapDispatchToProps = dispatch => ({
    googleSignInStart: () => dispatch(googleSignInStart()),
    emailSignInStart: (email, password) => dispatch(emailSignInStart({email,password}))
})

export default connect(null, mapDispatchToProps)(SignIn);