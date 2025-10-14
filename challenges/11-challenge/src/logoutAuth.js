import { signOut } from "firebase/auth";
import { auth } from "./firebase/config";
import { logout } from "./features/authSlice";

export const logoutAuth = () => {
  return async (dispatch) => {
    try {
      await signOut(auth);
      dispatch(logout());
      console.log("Sesión cerrada correctamente");
    } catch (error) {
      console.error("Error al cerrar sesión:", error.message);
    }
  };
};
