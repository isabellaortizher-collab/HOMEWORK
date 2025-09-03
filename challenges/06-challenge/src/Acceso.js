import { useAuth } from "./ContextoAuten.js";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Acceso() {
  const { login } = useAuth();
  const [nombre, setNombre] = useState("");
  const navigate = useNavigate();

  const manejarLogin = () => {
    login(nombre || "Invitado");
    navigate("/panel");
  };

  return (
    <div>
      <h2>Acceso</h2>
      <input
        type="text"
        placeholder="Usuario"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />
      <button onClick={manejarLogin}>Entrar</button>
    </div>
  );
}
