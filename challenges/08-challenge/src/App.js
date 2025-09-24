import React, { useState } from "react";
import Pila from "./Pila";
import { libros } from "./Libros";

const App = () => {
  const [pila] = useState(() => {
    const p = new Pila();
    libros.forEach(libro => p.push(libro)); 
    return p;
  });

  const [librosEnPila, setLibrosEnPila] = useState(pila.print());

  const [formulario, setFormulario] = useState({ nombre: "", ISBN: "", autor: "", editorial: "" });

  const manejarCambio = (e) => {
    setFormulario({ ...formulario, [e.target.name]: e.target.value });
  };

  const manejarAgregarLibro = (e) => {
    e.preventDefault();
    pila.push(formulario); 
    setLibrosEnPila([...pila.print()]);
    setFormulario({ nombre: "", ISBN: "", autor: "", editorial: "" });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Pila de Libros</h1>
      
      <form onSubmit={manejarAgregarLibro} className="space-y-2 mb-6">
        <input name="nombre" value={formulario.nombre} onChange={manejarCambio} placeholder="Nombre del libro"/>
        <input name="ISBN" value={formulario.ISBN} onChange={manejarCambio} placeholder="ISBN"/>
        <input name="autor" value={formulario.autor} onChange={manejarCambio} placeholder="Autor"/>
        <input name="editorial" value={formulario.editorial} onChange={manejarCambio} placeholder="Editorial"/>
        <button type="submit">Agregar Libro</button>
      </form>

      <h2 className="text-xl font-semibold mb-2">Libros en la Pila:</h2>
      <ul className="space-y-2">
        {librosEnPila.slice().reverse().map((libro, indice) => (
          <li key={indice} className="border p-2 rounded">
            <strong>{libro.nombre}</strong> <br/>
            ISBN: {libro.ISBN} <br/>
            Autor: {libro.autor} <br/>
            Editorial: {libro.editorial}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
