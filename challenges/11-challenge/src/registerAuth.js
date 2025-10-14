import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "./firebase/config";
import { register } from "./features/authSlice";

export const registerAuth = ( email, password ) => {
    return async ( dispatch ) => {
        const response = await createUserWithEmailAndPassword( auth, email, password );
        if( response ){
            await updateProfile(auth.currentUser, {
                displayName: 'Isabella' ,
                photoURL: ''
            })

            const userEmail = response.user.email;
            dispatch( register({ email: userEmail }))
        } else {
            throw new Error('Login failed')

        }
    }
}