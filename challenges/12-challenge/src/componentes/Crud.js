import React, { useState } from "react";
import { ref, onValue, update, remove } from "firebase/database";
import { db } from "../firebase/config";

export const Crud = () => {
  const [valorBuscado, setValorBuscado] = useState("");
  const [nuevoValor, setNuevoValor] = useState("");
  const [mensaje, setMensaje] = useState("");
  const buscarPorValor = async (valor) => {
    return new Promise((resolve) => {
      const dbRef = ref(db);
      onValue(
        dbRef,
        (snapshot) => {
          const data = snapshot.val();
          if (!data) {
            resolve(false);
            return;
          }
          if (data.nombre && data.nombre.toLowerCase() === valor.toLowerCase()) {
            resolve(true);
          } else {
            resolve(false);
          }
        },
        { onlyOnce: true }
      );
    });
  };

  const handleActualizar = async () => {
    if (!valorBuscado || !nuevoValor) {
      setMensaje("Escribe el valor actual y el nuevo valor.");
      return;
    }

    const existe = await buscarPorValor(valorBuscado);

    if (!existe) {
      setMensaje(`No se encontró el valor "${valorBuscado}" en la base.`);
      return;
    }

    try {
      await update(ref(db), { nombre: nuevoValor });
      setMensaje(`El valor "${valorBuscado}" fue actualizado a "${nuevoValor}".`);
    } catch (error) {
      setMensaje(`Error al actualizar: ${error.message}`);
    }
  };

  const handleEliminar = async () => {
    if (!valorBuscado) {
      setMensaje("Escribe el valor que quieres eliminar.");
      return;
    }

    const existe = await buscarPorValor(valorBuscado);

    if (!existe) {
      setMensaje(`No se encontró el valor "${valorBuscado}" en la base.`);
      return;
    }

    try {
      await remove(ref(db, "nombre"));
      setMensaje(`El valor "${valorBuscado}" fue eliminado correctamente.`);
    } catch (error) {
      setMensaje(`Error al eliminar: ${error.message}`);
    }
  };

  const handleLimpiar = () => {
    setValorBuscado("");
    setNuevoValor("");
    setMensaje("");
  };

  return (
    <div style={{ margin: "2rem" }}>
      <h2>Reto 12: CRUD directo con Realtime Database</h2>

      <p>Escribe el valor actual (ej: valeria):</p>
      <input
        type="text"
        placeholder="Valor actual"
        value={valorBuscado}
        onChange={(e) => setValorBuscado(e.target.value)}
        style={{ marginRight: "10px" }}
      />

      <p>Escribe el nuevo valor (si vas a actualizar):</p>
      <input
        type="text"
        placeholder="Nuevo valor"
        value={nuevoValor}
        onChange={(e) => setNuevoValor(e.target.value)}
      />

      <div style={{ marginTop: "10px" }}>
        <button onClick={handleActualizar}>Actualizar</button>
        <button onClick={handleEliminar} style={{ marginLeft: "10px" }}>
          Eliminar
        </button>
        <button onClick={handleLimpiar} style={{ marginLeft: "10px" }}>
          Limpiar
        </button>
      </div>

      {mensaje && <p style={{ marginTop: "20px" }}>{mensaje}</p>}
    </div>
  );
};

