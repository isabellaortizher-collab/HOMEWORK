// Clase Nodo
class Nodo {
  constructor(valor) {
    this.valor = valor;
    this.siguiente = null;
  }
}

// Lista Enlazada Simple
class ListaSimple {
  constructor() {
    this.cabeza = null;
    this.cola = null;
    this.longitud = 0;
    this.actual = null; // para navegar
  }

  agregar(valor) {
    const nuevoNodo = new Nodo(valor);
    if (!this.cabeza) {
      this.cabeza = nuevoNodo;
      this.cola = nuevoNodo;
      this.actual = this.cabeza;
    } else {
      this.cola.siguiente = nuevoNodo;
      this.cola = nuevoNodo;
    }
    this.longitud++;
  }

  reproducirActual() {
    return this.actual ? this.actual.valor : null;
  }

  siguienteCancion() {
    if (this.actual && this.actual.siguiente) {
      this.actual = this.actual.siguiente;
      return this.actual.valor;
    }
    return "Fin de la lista";
  }
}

// Datos de prueba
const playlist = new ListaSimple();
playlist.agregar("Que pena-Lebron Brothers");
playlist.agregar("Por amarte asi-Marc Anthony");
playlist.agregar("Barrio de chacales-El Rockie");

export { playlist };
