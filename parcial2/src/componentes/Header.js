import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../features/authSlice";

export default function Header(){
  const dispatch = useDispatch();
  const notCount = useSelector(state => state.notifications.stack.length);
  const user = useSelector(state => state.auth.user);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <header style={{display:'flex', justifyContent:'space-between', padding:'10px', borderBottom:'1px solid #ccc'}}>
      <div>
        <strong>UAO Social</strong>
      </div>
      <div>
        <span style={{marginRight:10}}>Notificaciones: <b>{notCount}</b></span>
        {user ? (
          <>
            <span style={{marginRight:10}}> {user.email}</span>
            <button onClick={handleLogout}>Salir</button>
          </>
        ) : null}
      </div>
    </header>
  );
}
