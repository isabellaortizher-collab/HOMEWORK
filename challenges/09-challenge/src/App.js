import React, { useEffect, useState } from "react";
import Cola from "./Cola";
import { Personas } from "./Personas";

function App() {
  const [cola] = useState(new Cola());
  const [lista, setLista] = useState([]);
  const [nombre, setNombre] = useState("");
  const [retiro, setRetiro] = useState("");

  const actualizarLista = () => {
    const ordenada = cola.toArray().sort(
      (a, b) => new Date(a.fecha) - new Date(b.fecha)
    );
    setLista(ordenada);
  };

  useEffect(() => {
    Personas.forEach(p => cola.enqueue(p));
    actualizarLista();
  }, [cola]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevaPersona = {
      nombre,
      retiro: Number(retiro),
      fecha: new Date().toISOString() // 👈 se guarda como string ISO
    };
    cola.enqueue(nuevaPersona);
    actualizarLista();
    setNombre("");
    setRetiro("");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Cola de Cajero Automático</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Importe del retiro"
          value={retiro}
          onChange={(e) => setRetiro(e.target.value)}
          required
        />
        <button type="submit">Agregar</button>
      </form>

      <button
        style={{ margin: "10px 0", background: "lightgrey", color: "black", padding: "8px 16px", border: "none", borderRadius: "4px" }}
        onClick={() => {
          cola.dequeue();
          actualizarLista();
        }}
        disabled={cola.isEmpty()}
      >
        Atender
      </button>

      <h2>Personas en la cola:</h2>
      <ul>
        {lista.map((persona, index) => (
          <li key={index}>
            {persona.nombre} — Retiro: ${persona.retiro.toLocaleString()} — Fecha:{" "}
            {new Date(persona.fecha).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;




