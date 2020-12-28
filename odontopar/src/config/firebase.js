import firebase from 'firebase'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

var firebaseConfigDev = {
  apiKey: "AIzaSyA9AiYVOld58-IcqlfUQp7rEBfR6P52W7I",
  authDomain: "microcrm-2365f.firebaseapp.com",
  projectId: "microcrm-2365f",
  storageBucket: "microcrm-2365f.appspot.com",
  messagingSenderId: "69624294958",
  appId: "1:69624294958:web:3a0cf331c745bdbdb0f9bf"
};


  // Initialize Firebase
  const proyectoSecundario = firebase.initializeApp(firebaseConfigDev, "secondary");
  export const db = proyectoSecundario.firestore();
  // export const auth = firebase.auth();
  export const storage = proyectoSecundario.storage();