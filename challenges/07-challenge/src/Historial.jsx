import { useState } from "react";
import { historial } from "./ListaDoble";

export default function Historial() {
  const [actual, setActual] = useState(historial.paginaActual());

  return (
    <div>
      <h1>Historial del Navegador</h1>
      <p>Página actual: {actual}</p>
      <button onClick={() => setActual(historial.retroceder())}>⬅ Atrás</button>
      <button onClick={() => setActual(historial.avanzar())}>Adelante ➡</button>
    </div>
  );
}
