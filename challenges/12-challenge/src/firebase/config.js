// Import the functions you need from the SDKs you need
import {getAuth} from 'firebase/auth'
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCz26JSopG_D_XMWZNEtjkIByTIwgFtcrc",
  authDomain: "mi-proyecto-fire-c8d73.firebaseapp.com",
  databaseURL: "https://mi-proyecto-fire-c8d73-default-rtdb.firebaseio.com",
  projectId: "mi-proyecto-fire-c8d73",
  storageBucket: "mi-proyecto-fire-c8d73.appspot.com",
  messagingSenderId: "669212105715",
  appId: "1:669212105715:web:a628bf701029b882fe9086",
  measurementId: "G-Z603X7MWZ8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication
const auth = getAuth();
const db = getDatabase(app)



export { app, auth, db };
