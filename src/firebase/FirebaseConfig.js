import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {

  apiKey: "AIzaSyA4KV7VBbvTELL_H5CmrM3MMGpXpoXrDx8",
  authDomain: "react-app-e845e.firebaseapp.com",
  projectId: "react-app-e845e",
  storageBucket: "react-app-e845e.appspot.com",
  messagingSenderId: "566053438595",
  appId: "1:566053438595:web:e75aff474c60f441d747b6",
  measurementId: "G-N3W060YVBY"
};



firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export {
    db,
    googleAuthProvider,
    firebase
}

