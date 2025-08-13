// Función Regular
function verificarParImpar(numero) {
    console.log(numero % 2 === 0 ? `${numero} es par` : `${numero} es impar`);
}

// Función Flecha
const verificarParImparFlecha = (numero) => {
    console.log(numero % 2 === 0 ? `${numero} es par` : `${numero} es impar`);
}

// Pruebas
verificarParImpar(4);     // 4 es par
verificarParImparFlecha(7); // 7 es impar

