import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase/config";
import { register } from "./features/authSlice";
export const loginAuth = (email, password) => {
  return async (dispatch) => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      const user = response.user;

      dispatch(
        register({
          email: user.email,
        })
      );

      console.log("Usuario logueado:", user.email);
    } catch (error) {
      console.error("Error en login:", error.message);
    }
  };
};
