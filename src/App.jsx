import { useState } from 'react';
import { Login } from './pages/login/Login';

import { onAuthStateChanged } from 'firebase/auth';
import { auth, firestoreDB } from './db/firebase';
import { UserAuthContextProvider } from './context/UserAuthContext';
import { doc, getDoc } from 'firebase/firestore';
import { Home } from './pages/home/Home';


function App() {

    const [user, setUser] = useState(null);

    const getRol = async (uid) =>{
        const docRef = doc(firestoreDB, `users/${uid}`);
        const docCifrada = await getDoc(docRef);
        const infoFinal = docCifrada.data().rol;

        return infoFinal;
    }

    const setUserWithFirebaseAndRol = (userFirebase)=>{
        getRol(userFirebase.uid).then((rol)=>{
            const userData = {
                uid: userFirebase.uid,
                email: userFirebase.email,
                rol: rol,
            };
            setUser(userData);
            console.log('User data', userData);
        })
    }

    onAuthStateChanged(auth, (userFirebase) => {
        if (userFirebase) {
            if(!user){
                setUserWithFirebaseAndRol(userFirebase)
            }
        } else {
            setUser(null);
        }
    })

    return (
        <>
            <UserAuthContextProvider>
                {
                    user ? <Home user={user} /> : <Login />
                }
            </UserAuthContextProvider>
        </>
    )
}

export default App
