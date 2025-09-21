import { createContext, useState, useContext } from "react";

// Crear contexto
const ContextoAuth = createContext();

// Hook para consumir el contexto
export const useAuth = () => useContext(ContextoAuth);

// Provider
export const ProveedorAuth = ({ children }) => {
  const [usuario, setUsuario] = useState(null);

  const login = (nombre) => {
    setUsuario({ nombre });
  };

  const logout = () => {
    setUsuario(null);
  };

  return (
    <ContextoAuth.Provider value={{ usuario, login, logout }}>
      {children}
    </ContextoAuth.Provider>
  );
};
