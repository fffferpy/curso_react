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


  // Initialize Firebase
  const proyectoSecundario = firebase.initializeApp(firebaseConfigDev, "secondary");
  export const db = proyectoSecundario.firestore();
  // export const auth = firebase.auth();
  export const storage = proyectoSecundario.storage();