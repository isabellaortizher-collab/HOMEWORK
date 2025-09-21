import { useState } from "react";
import { playlist } from "./ListaSimple";

export default function Canciones() {
  const [actual, setActual] = useState(playlist.reproducirActual());

  const siguiente = () => {
    setActual(playlist.siguienteCancion());
  };

  return (
    <div className="page">
      <h1>Lista de Canciones</h1>
      <p>Canción actual: {actual}</p>
      <button onClick={siguiente}>Siguiente canción</button>
    </div>
  );
}
