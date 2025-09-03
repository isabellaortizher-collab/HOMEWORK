import React, { useState, useCallback } from "react";
import { Child } from "./Child.js";

export default function App() {
  const list = [2, 4, 6, 8, 10];
  const [valor, setValor] = useState(0);

  const increment = useCallback(
    (num) => {
      setValor((prev) => prev + num);
    },
    []
  );

  return (
    <div>
      <h1>Resultado</h1>
      <p>Total: {valor}</p>
      <hr />

      {list.map((n, idx) => (
        <Child key={idx} numero={n} increment={increment} />
      ))}
    </div>
  );
}


