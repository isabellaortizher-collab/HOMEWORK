import React, { useState, useEffect } from "react";
import { ref, push, onValue } from "firebase/database";
import { db } from "../firebase/config";

export const Chat = () => {
  const [mensaje, setMensaje] = useState("");
  const [mensajes, setMensajes] = useState([]);

  // 🧠 Escucha los mensajes en tiempo real
  useEffect(() => {
    const mensajesRef = ref(db, "mensajes");
    onValue(mensajesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const lista = Object.values(data);
        setMensajes(lista);
      } else {
        setMensajes([]);
      }
    });
  }, []);

  // ✉️ Enviar mensaje a Firebase
  const handleEnviar = async () => {
    if (mensaje.trim() === "") return;

    const mensajesRef = ref(db, "mensajes");
    await push(mensajesRef, {
      texto: mensaje,
      fecha: new Date().toLocaleTimeString(),
    });

    setMensaje(""); // limpiar input
  };

  return (
    <div
      style={{
        margin: "2rem auto",
        width: "400px",
        padding: "20px",
        border: "1px solid gray",
        borderRadius: "10px",
        backgroundColor: "#fafafa",
      }}
    >
      <h2>💬 Reto 13: Chat en tiempo real</h2>

      <div
        style={{
          height: "200px",
          overflowY: "auto",
          border: "1px solid #ccc",
          padding: "10px",
          marginBottom: "10px",
          backgroundColor: "white",
        }}
      >
        {mensajes.length === 0 ? (
          <p>No hay mensajes todavía...</p>
        ) : (
          mensajes.map((m, index) => (
            <div key={index}>
              <strong>🗨️ {m.texto}</strong>
              <p style={{ fontSize: "0.8em", color: "#888" }}>{m.fecha}</p>
              <hr />
            </div>
          ))
        )}
      </div>

      <input
        type="text"
        placeholder="Escribe un mensaje..."
        value={mensaje}
        onChange={(e) => setMensaje(e.target.value)}
        style={{ width: "70%", padding: "5px" }}
      />
      <button onClick={handleEnviar} style={{ marginLeft: "10px" }}>
        🚀 Enviar
      </button>
    </div>
  );
};
