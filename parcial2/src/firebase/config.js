import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  setPersistence, 
  browserLocalPersistence 
} from "firebase/auth";
import { 
  getFirestore, 
  doc, 
  setDoc, 
  getDoc 
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBoJrOnoJzx5QoZWiq40F9-Csw4ZpjYwps",
  authDomain: "parcial-2-f40ed.firebaseapp.com",
  projectId: "parcial-2-f40ed",
  storageBucket: "parcial-2-f40ed.firebasestorage.app",
  messagingSenderId: "738507298255",
  appId: "1:738507298255:web:60fcb821b139a0dad0aeba",
  measurementId: "G-BECMMXQ6HG"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
setPersistence(auth, browserLocalPersistence); 

export const db = getFirestore(app);

export async function saveGlobalState(userId, state) {
  if (!userId) return;
  try {
    const docRef = doc(db, "userStates", userId);
    await setDoc(docRef, { state, updatedAt: new Date().toISOString() });
  } catch (err) {
    console.error("saveGlobalState error", err);
    throw err;
  }
}

export async function loadGlobalState(userId) {
  if (!userId) return null;
  try {
    const docRef = doc(db, "userStates", userId);
    const snapshot = await getDoc(docRef);
    if (!snapshot.exists()) return null;
    const data = snapshot.data();
    return data.state ?? null;
  } catch (err) {
    console.error("loadGlobalState error", err);
    throw err;
  }
}
