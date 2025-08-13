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
