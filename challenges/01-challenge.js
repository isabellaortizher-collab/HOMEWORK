// Función Regular
function verificarParImpar(numero) {
    if (numero % 2 === 0) {
        console.log(`[Función Regular] ${numero} es par`);
    } else {
        console.log(`[Función Regular] ${numero} es impar`);
    }
}

// Función Flecha
const verificarParImparFlecha = (numero) => {
    if (numero % 2 === 0) {
        console.log(`[Función Flecha] ${numero} es par`);
    } else {
        console.log(`[Función Flecha] ${numero} es impar`);
    }
};

// Lista de números para probar
const numeros = [3, 8, 15, 20];

// Ejecutar ambas funciones para cada número
numeros.forEach(numero => {
    verificarParImpar(numero);
    verificarParImparFlecha(numero);
});
