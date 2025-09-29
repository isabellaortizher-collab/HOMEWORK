class Cola {
  constructor() {
    this.personas = [];
  }

  enqueue(persona) {
    this.personas.push(persona);
  }

  dequeue() {
    return this.personas.length > 0 ? this.personas.shift() : null;
  }

  peek() {
    return this.personas.length > 0 ? this.personas[0] : null;
  }

  size() {
    return this.personas.length;
  }

  isEmpty() {
    return this.personas.length === 0;
  }

  toArray() {
    return [...this.personas];
  }
}

export default Cola;


