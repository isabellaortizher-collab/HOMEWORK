// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA02mLfRr1F1vHu9itNq5Epk-JSAed5sm8",
  authDomain: "challenge-6113a.firebaseapp.com",
  projectId: "challenge-6113a",
  storageBucket: "challenge-6113a.firebasestorage.app",
  messagingSenderId: "345057241551",
  appId: "1:345057241551:web:8b703a02a1a4d6b3304aba",
  measurementId: "G-3NENF5KG8T"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
