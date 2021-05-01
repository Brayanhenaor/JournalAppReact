import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBabCHph3FWD0GtvTQp36WuHDFuoj3p0_U",
    authDomain: "journalappcurso.firebaseapp.com",
    projectId: "journalappcurso",
    storageBucket: "journalappcurso.appspot.com",
    messagingSenderId: "566912048918",
    appId: "1:566912048918:web:b10ff17aeaf6278c09ba37"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export {
    db,
    googleAuthProvider,
    firebase
}