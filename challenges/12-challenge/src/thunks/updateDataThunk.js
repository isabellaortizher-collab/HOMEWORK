import { ref, update } from "firebase/database";
import { db } from "../firebase/config";

export const updateDataThunk = (id, newData) => {
  return async () => {
    try {
      const itemRef = ref(db, `items/${id}`);
      const updateData = {
        nombre: newData?.nombre || "", // evita undefined
      };

      await update(ref(db, `${clave}`), { nombre: nuevoValor });
      console.log("Dato actualizado en Realtime DB");
    } catch (error) {
      console.error("Error al actualizar:", error.message);
    }
  };
};


