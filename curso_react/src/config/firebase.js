import firebase from 'firebase'
import 'firebase/firestore'


const firebaseConfig = {
    apiKey: "AIzaSyAtiAB3iF32dPgrtuougRlibESM_LIgGDs",
    authDomain: "loli-store.firebaseapp.com",
    databaseURL: "https://loli-store.firebaseio.com",
    projectId: "loli-store",
    storageBucket: "loli-store.appspot.com",
    messagingSenderId: "229617274498",
    appId: "1:229617274498:web:a62f34e114ceb5913c2e9b"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  export default firebase;
  export const db = firebase.firestore();