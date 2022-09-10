import firebase from 'firebase/compat/app';
import 'firebase/compat/database';

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {

    apiKey: "AIzaSyAwaHjzieNrXk5TAHEnQyEUDNnV-YFLfPM",

    authDomain: "students-controls-24181.firebaseapp.com",

    projectId: "students-controls-24181",

    storageBucket: "students-controls-24181.appspot.com",

    messagingSenderId: "20690579518",

    appId: "1:20690579518:web:bf14bf8fc73eef0d43e16f",

    measurementId: "G-2YQB9WXEDN"

};

const firebaseDB = firebase.initializeApp(firebaseConfig);

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestoreDB = getFirestore(app);

export default firebaseDB.database().ref();

