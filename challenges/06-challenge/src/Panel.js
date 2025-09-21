import { useAuth } from "./ContextoAuten.js";

export default function Panel() {
  const { usuario, logout } = useAuth();

  return (
    <div>
      <h2>📊 Panel (privado)</h2>
      <p>Bienvenido <strong>{usuario?.nombre}</strong>!</p>
      <button onClick={logout}>Cerrar sesión</button>
    </div>
  );
}
