class NodoDoble {
  constructor(valor) {
    this.valor = valor;
    this.siguiente = null;
    this.anterior = null;
  }
}

class ListaDoble {
  constructor() {
    this.cabeza = null;
    this.cola = null;
    this.actual = null;
  }

  agregar(valor) {
    const nuevoNodo = new NodoDoble(valor);
    if (!this.cabeza) {
      this.cabeza = nuevoNodo;
      this.cola = nuevoNodo;
      this.actual = this.cabeza;
    } else {
      this.cola.siguiente = nuevoNodo;
      nuevoNodo.anterior = this.cola;
      this.cola = nuevoNodo;
    }
  }

  avanzar() {
    if (this.actual && this.actual.siguiente) {
      this.actual = this.actual.siguiente;
      return this.actual.valor;
    }
    return "No hay más páginas adelante.";
  }

  retroceder() {
    if (this.actual && this.actual.anterior) {
      this.actual = this.actual.anterior;
      return this.actual.valor;
    }
    return "No hay más páginas atrás.";
  }

  paginaActual() {
    return this.actual ? this.actual.valor : null;
  }
}

// Datos de prueba
const historial = new ListaDoble();
historial.agregar("Google");
historial.agregar("YouTube");
historial.agregar("GitHub");

export { historial };

