import firebase from 'firebase'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

var firebaseConfigDev = {
    apiKey: "AIzaSyA44FBWUJx5btdHskyJI1ISxeVp8sn4CkQ",
    authDomain: "admorganizacion-21770.firebaseapp.com",
    projectId: "admorganizacion-21770",
    storageBucket: "admorganizacion-21770.appspot.com",
    messagingSenderId: "49429174223",
    appId: "1:49429174223:web:3615ea76024d851cefa4ba"
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
  firebase.initializeApp(firebaseConfigDev);
  // firebase.initializeApp(firebaseConfigProd);
  export default firebase;
  export const db = firebase.firestore();
  export const auth = firebase.auth();
  export const storage = firebase.storage();