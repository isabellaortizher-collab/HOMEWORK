import React from "react";
import Login from "./componentes/Login";
import Logout from "./componentes/Logout";
import { useSelector } from "react-redux";

function App() {
  const user = useSelector((state) => state.auth.user);

  return (
    <div>
      {user ? (
        <>
          <h2>Bienvenido, {user.displayName || user.email}</h2>
          <Logout />
        </>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;

