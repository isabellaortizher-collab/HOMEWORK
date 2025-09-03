import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import { ProveedorAuth, useAuth } from "./ContextoAuten.js";
import Inicio from "./Inicio.js";
import Panel from "./Panel.js";
import Acceso from "./Acceso.js";

// Ruta privada
function RutaPrivada({ children }) {
  const { usuario } = useAuth();
  return usuario ? children : <Navigate to="/acceso" />;
}

export default function App() {
  return (
    <ProveedorAuth>
      <BrowserRouter>
        <nav>
          <Link to="/">Inicio</Link> |{" "}
          <Link to="/panel">Panel</Link> |{" "}
          <Link to="/acceso">Acceso</Link>
        </nav>
        <hr />

        <Routes>
          {/* Ruta pública */}
          <Route path="/" element={<Inicio />} />

          {/* Ruta privada */}
          <Route
            path="/panel"
            element={
              <RutaPrivada>
                <Panel />
              </RutaPrivada>
            }
          />

          {/* Login */}
          <Route path="/acceso" element={<Acceso />} />

          {/* Página no encontrada */}
          <Route path="*" element={<h2>404 No encontrado</h2>} />
        </Routes>
      </BrowserRouter>
    </ProveedorAuth>
  );
}

