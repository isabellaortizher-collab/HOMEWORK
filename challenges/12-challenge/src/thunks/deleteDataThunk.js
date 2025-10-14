import { ref, remove } from "firebase/database";
import { db } from "../firebase/config";
import { setData } from "../features/firebaseSlice";

export const deleteDataThunk = (id) => {
  return async (dispatch, getState) => {
    try {
      const itemRef = ref(db, `items/${id}`);
      await remove(ref(db, `${clave}`));
      console.log("Dato eliminado de Realtime DB");

      const currentData = getState().firebase.data;
      const newData = currentData.filter((item) => item.id !== id);
      dispatch(setData(newData));
    } catch (error) {
      console.error("Error al eliminar:", error.message);
    }
  };
};


