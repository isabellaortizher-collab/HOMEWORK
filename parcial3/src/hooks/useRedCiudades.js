import { useState } from 'react';

export const useRedCiudades = () => {
  const [ciudades, setCiudades] = useState([]);

  // Cálculos para zonas verdes
  const calcularAlturaMaxima = (zona) => {
    if (!zona.subzonas || zona.subzonas.length === 0) return 1;
    const alturas = zona.subzonas.map(calcularAlturaMaxima);
    return 1 + Math.max(...alturas);
  };

  const contarTotalZonas = (zona) => {
    let total = 1;
    if (zona.subzonas) {
      zona.subzonas.forEach(subzona => {
        total += contarTotalZonas(subzona);
      });
    }
    return total;
  };

  // Cálculos para ciudades
  const calcularAlturaMaximaCiudad = (nombreCiudad) => {
    const ciudad = ciudades.find(c => c.nombre === nombreCiudad);
    if (!ciudad || !ciudad.zonasVerdes || ciudad.zonasVerdes.length === 0) return 0;
    const alturas = ciudad.zonasVerdes.map(calcularAlturaMaxima);
    return Math.max(...alturas);
  };

  const contarTotalZonasVerdesCiudad = (nombreCiudad) => {
    const ciudad = ciudades.find(c => c.nombre === nombreCiudad);
    if (!ciudad || !ciudad.zonasVerdes) return 0;
    return ciudad.zonasVerdes.reduce((total, zona) => total + contarTotalZonas(zona), 0);
  };

  // Operaciones CRUD para ciudades
  const agregarCiudad = (nombre) => {
    // Verificar que no exista ya la ciudad
    if (ciudades.some(ciudad => ciudad.nombre === nombre)) {
      alert('La ciudad ya existe');
      return;
    }

    const nuevaCiudad = {
      nombre, // SOLO nombre, sin ID
      zonasVerdes: []
    };
    setCiudades(prev => [...prev, nuevaCiudad]);
  };

  const eliminarCiudad = (nombre) => {
    setCiudades(prev => prev.filter(ciudad => ciudad.nombre !== nombre));
  };

  // SOLO agregar y editar zonas verdes (NO eliminar)
  const agregarZonaVerde = (nombreCiudad, nombreZona, nombreZonaPadre = null) => {
    const nuevaZona = {
      nombre: nombreZona,
      subzonas: []
    };

    setCiudades(prev => prev.map(ciudad => {
      if (ciudad.nombre !== nombreCiudad) return ciudad;

      // Función recursiva para agregar zona
      const agregarZonaRecursivo = (zonas) => {
        return zonas.map(zona => {
          if (zona.nombre === nombreZonaPadre) {
            return {
              ...zona,
              subzonas: [...zona.subzonas, nuevaZona]
            };
          }
          return {
            ...zona,
            subzonas: agregarZonaRecursivo(zona.subzonas)
          };
        });
      };

      if (!nombreZonaPadre) {
        // Agregar zona raíz
        return {
          ...ciudad,
          zonasVerdes: [...ciudad.zonasVerdes, nuevaZona]
        };
      } else {
        // Agregar subzona
        return {
          ...ciudad,
          zonasVerdes: agregarZonaRecursivo(ciudad.zonasVerdes)
        };
      }
    }));
  };

  // Editar zona verde (cambiar nombre)
  const editarZonaVerde = (nombreCiudad, nombreZonaVieja, nombreZonaNueva, nombreZonaPadre = null) => {
    setCiudades(prev => prev.map(ciudad => {
      if (ciudad.nombre !== nombreCiudad) return ciudad;

      const editarZonaRecursivo = (zonas) => {
        return zonas.map(zona => {
          if (zona.nombre === nombreZonaVieja && 
              (nombreZonaPadre === null || zonas.find(z => z.nombre === nombreZonaPadre))) {
            return {
              ...zona,
              nombre: nombreZonaNueva
            };
          }
          return {
            ...zona,
            subzonas: editarZonaRecursivo(zona.subzonas)
          };
        });
      };

      return {
        ...ciudad,
        zonasVerdes: editarZonaRecursivo(ciudad.zonasVerdes)
      };
    }));
  };

  return {
    ciudades,
    agregarCiudad,
    eliminarCiudad,
    agregarZonaVerde,
    editarZonaVerde, // SOLO editar, no eliminar
    calcularAlturaMaximaCiudad,
    contarTotalZonasVerdesCiudad
  };
};