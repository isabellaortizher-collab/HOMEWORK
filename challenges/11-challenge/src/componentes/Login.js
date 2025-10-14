import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerAuth } from "../registerAuth";
import { loginAuth } from "../loginAuth";
import { googleAuth } from "../googleAuth";
import { logoutAuth } from "../logoutAuth";

export const Login = () => {
  const dispatch = useDispatch();
  const { status, email } = useSelector(state => state.auth);

  const [registerForm, setRegisterForm] = useState({
    email: "",
    password: ""
  });

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: ""
  });

  const onRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterForm({ ...registerForm, [name]: value });
  };

  const onLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginForm({ ...loginForm, [name]: value });
  };

  const onRegisterSubmit = (e) => {
    e.preventDefault();
    dispatch(registerAuth(registerForm.email, registerForm.password));
  };

  const onLoginSubmit = (e) => {
    e.preventDefault();
    dispatch(loginAuth(loginForm.email, loginForm.password));
  };

  return (
    <div>
      <h1>Autenticación Firebase + Redux</h1>

      {status === "authenticated" ? (
        <>
          <p>¡Bienvenido, {email}!</p>
          <button onClick={() => dispatch(logoutAuth())}>Cerrar sesión</button>
        </>
      ) : (
        <>
          {/* Formulario Registro */}
          <h2>Registro</h2>
          <form onSubmit={onRegisterSubmit}>
            <input
              name="email"
              type="email"
              placeholder="Correo"
              onChange={onRegisterChange}
              value={registerForm.email}
            />
            <input
              name="password"
              type="password"
              placeholder="Contraseña"
              onChange={onRegisterChange}
              value={registerForm.password}
            />
            <button type="submit">Registrarse</button>
          </form>

          <hr />

          {/* Formulario Login */}
          <h2>Iniciar Sesión</h2>
          <form onSubmit={onLoginSubmit}>
            <input
              name="email"
              type="email"
              placeholder="Correo"
              onChange={onLoginChange}
              value={loginForm.email}
            />
            <input
              name="password"
              type="password"
              placeholder="Contraseña"
              onChange={onLoginChange}
              value={loginForm.password}
            />
            <button type="submit">Iniciar Sesión</button>
          </form>

          <button onClick={() => dispatch(googleAuth())}>Iniciar con Google</button>
        </>
      )}
    </div>
  );
};
