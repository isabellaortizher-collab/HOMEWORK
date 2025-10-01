import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { increment, decrement, incrementBy, reset } from './counterSlice';
import { push, pop, clear } from './stackSlice';

export default function App() {
  const dispatch = useDispatch();
  const counter = useSelector((state) => state.counter.value);
  const stack = useSelector((state) => state.stack.items);

  const [incValue, setIncValue] = useState('');
  const [pushValue, setPushValue] = useState('');

  const handleIncrementBy = () => {
    // parsear a número; si no, 0
    const n = Number(incValue);
    if (Number.isNaN(n)) {
      alert('Ingresa un número válido');
      return;
    }
    dispatch(incrementBy(n));
    setIncValue('');
  };

  const handlePush = () => {
    if (pushValue === '') {
      alert('Escribe algo para apilar');
      return;
    }
    dispatch(push(pushValue));
    setPushValue('');
  };

  return (
    <div style={{ padding: 24, fontFamily: 'Arial, sans-serif' }}>
      <h1>Challenge 10 — Redux</h1>

      <section style={{ marginBottom: 20 }}>
        <h2>Contador</h2>
        <p>Valor actual: <strong>{counter}</strong></p>
        <button onClick={() => dispatch(increment())}>Increment +1</button>{' '}
        <button onClick={() => dispatch(decrement())}>Decrement -1</button>{' '}
        <button onClick={() => dispatch(reset())}>Reset</button>

        <div style={{ marginTop: 12 }}>
          <input
            type="text"
            placeholder="Valor a incrementar (ej: 5)"
            value={incValue}
            onChange={(e) => setIncValue(e.target.value)}
          />
          <button onClick={handleIncrementBy}>Incrementar por valor</button>
        </div>
      </section>

      <section>
        <h2>Pila (Stack)</h2>
        <p>Elementos (top = derecha): [{stack.join(', ')}]</p>

        <div style={{ marginBottom: 10 }}>
          <input
            type="text"
            placeholder="Valor para push"
            value={pushValue}
            onChange={(e) => setPushValue(e.target.value)}
          />
          <button onClick={handlePush}>Push</button>{' '}
          <button onClick={() => dispatch(pop())}>Pop</button>{' '}
          <button onClick={() => dispatch(clear())}>Clear</button>
        </div>

        <div>
          <strong>Top:</strong>{' '}
          {stack.length > 0 ? stack[stack.length - 1] : <em>pila vacía</em>}
        </div>
      </section>
    </div>
  );
}
