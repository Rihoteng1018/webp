import firebase from 'firebase/app';

const firebaseConfig =
{
    apiKey: "AIzaSyC1pgtr_3J30GRxclILYcBaHjI74csbEos",
    authDomain: "socialbyrihoteng.firebaseapp.com",
    projectId: "socialbyrihoteng",
    storageBucket: "socialbyrihoteng.appspot.com",
    messagingSenderId: "757943710802",
    appId: "1:757943710802:web:f38c1fa398d87c89cf5b8b"
  };


firebase.initializeApp(firebaseConfig);

export default firebase;