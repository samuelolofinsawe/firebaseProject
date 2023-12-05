import {auth,emailProvider,googleProvider} from '../config/firebase'
import {signInWithPopup } from 'firebase/auth'

import {signOut} from 'firebase/auth'
export const Login =()=>{
    
    const signInWithGoogle = async()=>{
     const result = await signInWithPopup(auth,googleProvider)
     console.log(result)
    
    }
    const signInWithEmail = async()=>{
        const emailResult = await signInWithPopup(auth,emailProvider)
    }
    return (
        <div className='login'>
            <p>Sign in  with google</p>
            <button className='google' onClick={signInWithGoogle}>Continue with google </button>
            <button className='email' onClick={signInWithEmail}>Continue with your email</button>
            
        </div>
    )
}