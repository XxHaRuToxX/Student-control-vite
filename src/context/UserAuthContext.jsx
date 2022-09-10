
import { createContext, useContext } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    GoogleAuthProvider,
    signInWithPopup
} from 'firebase/auth';
import { auth, firestoreDB } from '../db/firebase';
import { doc, setDoc } from "firebase/firestore";

const userAuthContext = createContext();

export const UserAuthContextProvider = ({ children }) => {

    const signUp = async (email, password, rol) => {
        const infoUser = await createUserWithEmailAndPassword(auth, email, password)
        .then((userFirebase)=>{
            return userFirebase;
        })
        console.log(infoUser); 
        const docRef = doc(firestoreDB, `users/${infoUser.user.uid}`)
        setDoc(docRef, { email, rol })
    }

    const logIn = async (email, password) => {
        const infoUser = await signInWithEmailAndPassword(auth, email, password);
        console.log(infoUser);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const logOut = () => {
        return signOut(auth);
    }

    const googleSignIn = () => {
        const googleAuthProvider = new GoogleAuthProvider();
        return signInWithPopup(auth, googleAuthProvider);
    }


    return (
        <userAuthContext.Provider
            value={{
                signUp,
                logIn,
                logOut,
                googleSignIn,
            }}
        >
            {children}
        </userAuthContext.Provider>
    )
}

export const useUserAuth = () => {
    return useContext(userAuthContext);
}