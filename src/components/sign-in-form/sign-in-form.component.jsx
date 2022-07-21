import { useState } from 'react';
import { 
    signInWithGooglePopup,
    signInAuthUserWithEmailAndPassword
} from '../../utils/firebase/firebase.utils.js';

import FormInput from '../form-input/form-input.component.jsx';
import Button, { BUTTON_TYPES_CLASSES } from '../button/button.component.jsx';

import { SignInContainer, SignInTitle, ButtonsContainer } from '../sign-in-form/sign-in-form.styles.jsx';

const defaulfFormFields = {
    email: '',
    password: '',
};

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaulfFormFields);
    const { email, password } = formFields;

    const resetFormFields = () => {
        setFormFields(defaulfFormFields);
    }

    const signInWithGoogle = async () =>{
        await signInWithGooglePopup();
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const {user} = await signInAuthUserWithEmailAndPassword(email, password);
            resetFormFields(); 
        } catch(error) {
            switch(error.code){
                case 'auth/wrong-password':
                    alert('Incorrect password for email');
                    break;
                case 'auth/user-not-found':
                    alert('No user associated with this account');
                    break;
                default:
                    alert(error.message);
            }
        }
    }
 
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({...formFields, [name] : value });
    }

    return (
        <SignInContainer>
            <SignInTitle>Already have an account</SignInTitle>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                
                <FormInput 
                    label='Email'
                    type='email' 
                    required 
                    onChange={handleChange} 
                    name='email' 
                    value={email} 
                />

                <FormInput 
                    label='Password'
                    type='password' 
                    required 
                    onChange={handleChange} 
                    name='password' 
                    value={password} 
                />

                <ButtonsContainer>
                    <Button type='submit'>Sign In</Button>
                    <Button type='button' buttonType={BUTTON_TYPES_CLASSES.google} onClick={signInWithGoogle}>
                        Google Sign In
                    </Button>
                </ButtonsContainer>
            </form>
        </SignInContainer>
    )
}

export default SignInForm;