import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBZZADf3q1pXxUtx0LC8ZMOCVfcv3vwSuE",
  authDomain: "autotag-92bd3.firebaseapp.com",
  databaseURL: "https://autotag-92bd3.firebaseio.com",
  projectId: "autotag-92bd3",
  storageBucket: "autotag-92bd3.appspot.com",
  messagingSenderId: "1066525249092",
  appId: "1:1066525249092:web:0910e844dbda9742507611",
  measurementId: "G-1HBYFE5XJS"
  });

  const db = firebaseApp.firestore();
  const auth = firebase.auth();

export { auth, db };