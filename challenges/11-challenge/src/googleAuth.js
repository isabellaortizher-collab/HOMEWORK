// src/googleAuth.js
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "./firebase/config";
import { register } from "./features/authSlice";

export const googleAuth = () => {
  return async (dispatch) => {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      dispatch(
        register({
          email: user.email,
        })
      );

      console.log("Inicio con Google:", user.email);
    } catch (error) {
      console.error("Error con Google Auth:", error.message);
    }
  };
};
