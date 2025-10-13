import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../features/authSlice";

export default function Logout() {
  const dispatch = useDispatch();
  return <button onClick={() => dispatch(logout())}>Logout</button>;
}
