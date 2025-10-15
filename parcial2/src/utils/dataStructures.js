export class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
    this.prev = null; 
  }
}

export class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  append(value) {
    const node = new Node(value);

    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail.next = node;
      this.tail = node;
    }

    this.length++;
    return node;
  }

  
  remove(value) {
    if (!this.head) return false;

    let curr = this.head;
    let prev = null;

    while (curr) {
      if (curr.value.id === value || curr.value === value) {
        if (prev) prev.next = curr.next;
        else this.head = curr.next;

        if (curr === this.tail) this.tail = prev;

        this.length--;
        return true;
      }

      prev = curr;
      curr = curr.next;
    }

    return false;
  }

  // Convierte la lista a un arreglo
  toArray() {
    const arr = [];
    let curr = this.head;

    while (curr) {
      arr.push(curr.value);
      curr = curr.next;
    }

    return arr;
  }

  // Carga los elementos desde un arreglo
  fromArray(arr) {
    this.head = null;
    this.tail = null;
    this.length = 0;
    arr.forEach((item) => this.append(item));
  }
}



