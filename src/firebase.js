import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDBdMFgCBRT3bNtD5D9zhcdRR3gfaiDXG4",
  authDomain: "gastos-hernandavid.firebaseapp.com",
  projectId: "gastos-hernandavid",
  storageBucket: "gastos-hernandavid.appspot.com",
  messagingSenderId: "432964597645",
  appId: "1:432964597645:web:f0289b47a3bea830b9efc4",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();

export { db, firebase, auth };
