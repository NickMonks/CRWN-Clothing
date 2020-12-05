import React from 'react';
import { connect } from 'react-redux';
import FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/custom-button.component';
import { googleSignInStart, emailSignInStart } from '../../redux/user/user.actions';

import './sign-in.styles.scss';

class SignIn extends React.Component {
    constructor(props){
        super(props);

        this.state={
            email: "",
            password: ""
        }
    }

    handleSubmit = async (event) => {
        event.preventDefault(); // prevent the firing for now; we'll habilitate it later
        const {emailSignInStart} = this.props;
        const {email, password} = this.state;

        emailSignInStart(email,password)
        // Redux will handle the state from here out with sagas
        // try {
        //    await auth.signInWithEmailAndPassword(email, password); 
        //    this.setState({email: '', password: ''})

        // } catch (error) {
        //     console.log(error);
        // }
    }

    handleChange = (event) => {
        const {value, name} = event.target; // event.target takes the fields from the object caller
        this.setState({[name]: value }); // it will render whatever is the field. If it's password what is triggering the event, 
                                        // then password: value
    }

    render() {
        const { googleSignInStart } = this.props;
        return (
            <div className="sign-in">
                <h2>I already have an account</h2>

                <span>Sign in with your email and password</span>
                
                
                <form onSubmit={this.handleSubmit} >
                    <FormInput 
                        name="email" 
                        type="email"
                        label="Email" 
                        value={this.state.email} 
                        handleChange={this.handleChange} 
                        required />
                    
                    <FormInput  
                            name="password" 
                            type="password"
                            label="Password"  
                            value={this.state.password} 
                            handleChange={this.handleChange}
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
};

const mapDispatchToProps = dispatch => ({
    googleSignInStart: () => dispatch(googleSignInStart()),
    emailSignInStart: (email, password) => dispatch(emailSignInStart({email,password}))
})

export default connect(null, mapDispatchToProps)(SignIn);