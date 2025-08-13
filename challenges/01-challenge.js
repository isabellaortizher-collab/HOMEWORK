// Función Regular
const funcionRegular = function (numero) {
    console.log("Ejecutando la Función Regular...");
    return numero % 2 === 0 ? `${numero} es par` : `${numero} es impar`;
}

// Función Flecha
const funcionFlecha = (numero) => {
    console.log("Ejecutando la Función Flecha...");
    return numero % 2 === 0 ? `${numero} es par` : `${numero} es impar`;
}

// Pruebas
console.log(funcionRegular(4));  // Par
console.log(funcionFlecha(7));   // Impar
// Diferencias principales:
// 1. Las Arrow Functions no tienen su propio 'this', usan el 'this' del contexto donde se crean.
// 2. No pueden usarse como constructores (no tienen 'prototype').
// 3. Tienen una sintaxis más corta.
// 4. No tienen el objeto 'arguments' propio.

