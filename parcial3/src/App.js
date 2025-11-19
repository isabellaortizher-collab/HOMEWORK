import React, { useState } from 'react';
import { useRedCiudades } from './hooks/useRedCiudades';
import './App.css';

function App() {
  const {
    ciudades,
    agregarCiudad,
    eliminarCiudad,
    agregarZonaVerde,
    editarZonaVerde,
    calcularAlturaMaximaCiudad,
    contarTotalZonasVerdesCiudad
  } = useRedCiudades();

  const [nuevaCiudad, setNuevaCiudad] = useState('');
  const [nuevaZona, setNuevaZona] = useState({ 
    ciudad: '', 
    nombre: '', 
    zonaPadre: '' 
  });
  const [editarZona, setEditarZona] = useState({
    ciudad: '',
    zonaVieja: '',
    zonaNueva: '',
    zonaPadre: ''
  });

  const handleAgregarCiudad = (e) => {
    e.preventDefault();
    if (nuevaCiudad.trim()) {
      agregarCiudad(nuevaCiudad.trim());
      setNuevaCiudad('');
    }
  };

  const handleAgregarZona = (e) => {
    e.preventDefault();
    if (nuevaZona.ciudad && nuevaZona.nombre.trim()) {
      agregarZonaVerde(
        nuevaZona.ciudad,
        nuevaZona.nombre.trim(),
        nuevaZona.zonaPadre || null
      );
      setNuevaZona({ ciudad: '', nombre: '', zonaPadre: '' });
    }
  };

  const handleEditarZona = (e) => {
    e.preventDefault();
    if (editarZona.ciudad && editarZona.zonaVieja && editarZona.zonaNueva.trim()) {
      editarZonaVerde(
        editarZona.ciudad,
        editarZona.zonaVieja,
        editarZona.zonaNueva.trim(),
        editarZona.zonaPadre || null
      );
      setEditarZona({ ciudad: '', zonaVieja: '', zonaNueva: '', zonaPadre: '' });
    }
  };

  // Componente para renderizar zonas recursivamente
  // Componente mejorado para renderizar zonas
const RenderZona = ({ zona, nivel = 0 }) => {
  const tieneSubzonas = zona.subzonas && zona.subzonas.length > 0;
  
  return (
    <div className={nivel === 0 ? "zona-item" : "subzona-item"} 
         style={{ marginLeft: `${nivel * 20}px` }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '10px'
      }}>
        <span style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '8px',
          fontWeight: nivel === 0 ? '600' : '400',
          color: nivel === 0 ? '#2c3e50' : '#495057'
        }}>
          {tieneSubzonas ? '🌳' : '🌿'} 
          {zona.nombre}
          {tieneSubzonas && (
            <span style={{
              fontSize: '0.8rem',
              background: '#e9ecef',
              padding: '2px 8px',
              borderRadius: '12px',
              color: '#6c757d'
            }}>
              {zona.subzonas.length} subzona{zona.subzonas.length !== 1 ? 's' : ''}
            </span>
          )}
        </span>
      </div>
      
      {tieneSubzonas && (
        <div style={{ marginTop: '10px' }}>
          {zona.subzonas.map(subzona => (
            <RenderZona 
              key={subzona.nombre} 
              zona={subzona} 
              nivel={nivel + 1} 
            />
          ))}
        </div>
      )}
    </div>
  );
};
  // Función para obtener todas las zonas de una ciudad (para selects)
  const obtenerTodasLasZonas = (ciudad) => {
    const todas = [];
    
    const recorrerZonas = (zonas, nivel = 0) => {
      zonas.forEach(zona => {
        todas.push({
          nombre: zona.nombre,
          nivel: nivel
        });
        if (zona.subzonas) {
          recorrerZonas(zona.subzonas, nivel + 1);
        }
      });
    };

    if (ciudad && ciudad.zonasVerdes) {
      recorrerZonas(ciudad.zonasVerdes);
    }
    return todas;
  };

  return (
    <div className="app">
      <h1>Red de Ciudades y Zonas Verdes</h1>
      
      {/* Formulario para agregar ciudad */}
      <div className="seccion">
        <h2>Agregar Ciudad</h2>
        <form onSubmit={handleAgregarCiudad} className="formulario">
          <input
            type="text"
            value={nuevaCiudad}
            onChange={(e) => setNuevaCiudad(e.target.value)}
            placeholder="Nombre de la ciudad"
            required
          />
          <button type="submit">Agregar Ciudad</button>
        </form>
      </div>

      {/* Formulario para agregar zona verde */}
      {/* Formulario CORREGIDO para agregar zona verde */}
<div className="seccion">
  <h2>Agregar Zona Verde</h2>
  <form onSubmit={handleAgregarZona} className="formulario">
    {/* Select para elegir ciudad */}
    <select
      value={nuevaZona.ciudad}
      onChange={(e) => setNuevaZona({...nuevaZona, ciudad: e.target.value})}
      required
    >
      <option value="">Seleccionar ciudad</option>
      {ciudades.map(ciudad => (
        <option key={ciudad.nombre} value={ciudad.nombre}>
          {ciudad.nombre}
        </option>
      ))}
    </select>

    <select
      value={nuevaZona.zonaPadre}
      onChange={(e) => setNuevaZona({...nuevaZona, zonaPadre: e.target.value})}
    >
      <option value="">Zona raíz (sin padre)</option>
      {nuevaZona.ciudad && 
        obtenerTodasLasZonas(ciudades.find(c => c.nombre === nuevaZona.ciudad))
          .map(zona => (
            <option key={zona.nombre} value={zona.nombre}>
              {'-'.repeat(zona.nivel)} {zona.nombre}
            </option>
          ))
      }
    </select>

    <input
      type="text"
      value={nuevaZona.nombre}
      onChange={(e) => setNuevaZona({...nuevaZona, nombre: e.target.value})}
      placeholder="Nombre de la zona verde"
      required
    />
    
    <button type="submit">Agregar Zona Verde</button>
  </form>
</div>

      {/* Formulario para EDITAR zona verde */}
      <div className="seccion">
        <h2>Editar Zona Verde</h2>
        <form onSubmit={handleEditarZona} className="formulario">
          <select
            value={editarZona.ciudad}
            onChange={(e) => setEditarZona({...editarZona, ciudad: e.target.value})}
            required
          >
            <option value="">Seleccionar ciudad</option>
            {ciudades.map(ciudad => (
              <option key={ciudad.nombre} value={ciudad.nombre}>{ciudad.nombre}</option>
            ))}
          </select>
          
          <select
            value={editarZona.zonaVieja}
            onChange={(e) => setEditarZona({...editarZona, zonaVieja: e.target.value})}
            required
          >
            <option value="">Seleccionar zona a editar</option>
            {editarZona.ciudad && obtenerTodasLasZonas(ciudades.find(c => c.nombre === editarZona.ciudad)).map(zona => (
              <option key={zona.nombre} value={zona.nombre}>
                {'-'.repeat(zona.nivel)} {zona.nombre}
              </option>
            ))}
          </select>
          
          <input
            type="text"
            value={editarZona.zonaNueva}
            onChange={(e) => setEditarZona({...editarZona, zonaNueva: e.target.value})}
            placeholder="Nuevo nombre de la zona"
            required
          />
          
          <button type="submit">Editar Zona Verde</button>
        </form>
      </div>

      {/* Lista de ciudades */}
      <div className="seccion">
        <h2>Ciudades en la Red</h2>
        {ciudades.length === 0 ? (
          <p>No hay ciudades en la red</p>
        ) : (
          ciudades.map(ciudad => (
            <div key={ciudad.nombre} className="ciudad-card">
              <div className="ciudad-header">
                <h3>{ciudad.nombre}</h3>
                <button 
                  onClick={() => eliminarCiudad(ciudad.nombre)}
                  className="btn-eliminar"
                >
                  Eliminar Ciudad
                </button>
              </div>
              
              {/* Estadísticas */}
              <div className="estadisticas">
                <p><strong>Altura máxima de zonas verdes:</strong> {calcularAlturaMaximaCiudad(ciudad.nombre)}</p>
                <p><strong>Número total de zonas verdes:</strong> {contarTotalZonasVerdesCiudad(ciudad.nombre)}</p>
              </div>

              {/* Zonas verdes */}
              <div className="zonas-verdes">
                <h4>Zonas Verdes:</h4>
                {!ciudad.zonasVerdes || ciudad.zonasVerdes.length === 0 ? (
                  <p>No hay zonas verdes</p>
                ) : (
                  ciudad.zonasVerdes.map(zona => (
                    <RenderZona 
                      key={zona.nombre} 
                      zona={zona} 
                    />
                  ))
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
