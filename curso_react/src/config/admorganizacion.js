import firebase from 'firebase'
import 'firebase/firestore'
import 'firebase/auth'

var firebaseConfigAdmOrganizacion = {
    apiKey: "AIzaSyA44FBWUJx5btdHskyJI1ISxeVp8sn4CkQ",
    authDomain: "admorganizacion-21770.firebaseapp.com",
    projectId: "admorganizacion-21770",
    storageBucket: "admorganizacion-21770.appspot.com",
    messagingSenderId: "49429174223",
    appId: "1:49429174223:web:3615ea76024d851cefa4ba"
};

  // Initialize Firebase
  firebase.initializeApp(firebaseConfigAdmOrganizacion);
  export default firebase;
  export const db = firebase.firestore();
  export const auth = firebase.auth();
