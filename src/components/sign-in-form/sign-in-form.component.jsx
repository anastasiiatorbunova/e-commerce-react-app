import { useState } from 'react';
import { 
    createUserDocumentFromAuth,
    signInWithGooglePopup,
    signInAuthUserWithEmailAndPassword
} from '../../utils/firebase/firebase.utils.js';
import FormInput from '../form-input/form-input.component.jsx';
import Button from '../button/button.component.jsx';
import '../sign-in-form/sign-in-form.styles.scss';

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
        const { user } = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await signInAuthUserWithEmailAndPassword(email, password);
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
        <div className='sign-up-container'>
            <h2>Already have an account</h2>
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

                <div className='buttons-container'>
                    <Button type='submit'>Sign In</Button>
                    <Button type='button' buttonType='google' onClick={signInWithGoogle}>
                        Google Sign In
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default SignInForm;