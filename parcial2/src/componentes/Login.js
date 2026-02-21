import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser, loginUser, loginWithGoogle } from "../features/authSlice";

export default function Login(){
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onRegister = () => dispatch(registerUser({email, password}));
  const onLogin = () => dispatch(loginUser({email, password}));
  const onGoogle = () => dispatch(loginWithGoogle());

  return (
    <div style={{padding:20}}>
      <h3>Login / Registro</h3>
      <input placeholder="email" value={email} onChange={e=>setEmail(e.target.value)} />
      <br />
      <input type="password" placeholder="password" value={password} onChange={e=>setPassword(e.target.value)} />
      <br />
      <button onClick={onLogin}>Iniciar sesión</button>
      <button onClick={onRegister}>Registrar</button>
      <button onClick={onGoogle}>Iniciar con Google</button>
    </div>
  );
}
