import React from 'react';
import SidebarMenu from './componentes/SidebarMenu';
import './App.css';

function App() {
  return (
    <div className="app">
      <SidebarMenu />
      <main className="main-content">
        <h1>Contenido Principal</h1>
        <p>Selecciona un elemento del menú</p>
      </main>
    </div>
  );
}

export default App;