import firebase from 'firebase'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

var firebaseConfigDev = {
  apiKey: "AIzaSyCMyWinhuy2lAl_-CYBTCgb4-ZUuQ9fXgE",
  authDomain: "loli-store-dev.firebaseapp.com",
  databaseURL: "https://loli-store-dev.firebaseio.com",
  projectId: "loli-store-dev",
  storageBucket: "loli-store-dev.appspot.com",
  messagingSenderId: "377589547179",
  appId: "1:377589547179:web:0ee575d981f92f5cbab7ee",
  measurementId: "G-T548EN5T0S"
};

const firebaseConfigProd = {
    apiKey: "AIzaSyAtiAB3iF32dPgrtuougRlibESM_LIgGDs",
    authDomain: "loli-store.firebaseapp.com",
    databaseURL: "https://loli-store.firebaseio.com",
    projectId: "loli-store",
    storageBucket: "loli-store.appspot.com",
    messagingSenderId: "229617274498",
    appId: "1:229617274498:web:a62f34e114ceb5913c2e9b"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfigDev, "secondary");
  // firebase.initializeApp(firebaseConfigDev);
  // firebase.initializeApp(firebaseConfigProd);
  // export default firebase;
  export const db = firebase.firestore();
  // export const auth = firebase.auth();
  export const storage = firebase.storage();