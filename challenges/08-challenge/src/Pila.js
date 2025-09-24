class Pila {
  constructor() {
    this.elementos = [];
  }

  push(value) {
    this.elementos.push(value);
  }

  pop() {
    return this.elementos.length > 0 ? this.elementos.pop() : null;
  }

  peek() {
    return this.elementos.length > 0 ? this.elementos[this.elementos.length - 1] : null;
  }

  isEmpty() {
    return this.elementos.length === 0;
  }

  size() {
    return this.elementos.length;
  }

  print() {
    return this.elementos.slice(); 
  }
}

export default Pila;
