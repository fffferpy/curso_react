import firebase from 'firebase'
import 'firebase/firestore'
import 'firebase/auth'

var firebaseConfigDev = {
    apiKey: "AIzaSyBPm6mkUMomLmIrDv2Pjfl65pdSJMTmV3E",
    authDomain: "proyecto-essen.firebaseapp.com",
    databaseURL: "https://proyecto-essen.firebaseio.com",
    projectId: "proyecto-essen",
    storageBucket: "proyecto-essen.appspot.com",
    messagingSenderId: "561615138068",
    appId: "1:561615138068:web:2330f3392862d6d77e6601"
};


  // Initialize Firebase
  firebase.initializeApp(firebaseConfigDev);
  export default firebase;
  export const db = firebase.firestore();
  export const auth = firebase.auth();