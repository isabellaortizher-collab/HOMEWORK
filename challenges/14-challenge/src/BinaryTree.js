class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }

  isLeaf() {
    return this.left === null && this.right === null;
  }
}

class BinaryTree {
  constructor() {
    this.root = null;
  }

  insert(value) {
    const newNode = new Node(value);
    
    if (!this.root) {
      this.root = newNode;
      return;
    }

    let current = this.root;
    while (true) {
      if (value < current.value) {
        if (!current.left) {
          current.left = newNode;
          return;
        }
        current = current.left;
      } else if (value > current.value) {
        if (!current.right) {
          current.right = newNode;
          return;
        }
        current = current.right;
      } else {
        return;
      }
    }
  }

  preOrder(node = this.root, result = []) {
    if (!node) return result;
    
    result.push(node.value);
    this.preOrder(node.left, result);
    this.preOrder(node.right, result);
    
    return result;
  }

  inOrder(node = this.root, result = []) {
    if (!node) return result;
    
    this.inOrder(node.left, result);
    result.push(node.value);
    this.inOrder(node.right, result);
    
    return result;
  }

  postOrder(node = this.root, result = []) {
    if (!node) return result;
    
    this.postOrder(node.left, result);
    this.postOrder(node.right, result);
    result.push(node.value);
    
    return result;
  }

  search(value, node = this.root) {
    if (!node) return false;
    
    if (value === node.value) return true;
    
    if (value < node.value) {
      return this.search(value, node.left);
    } else {
      return this.search(value, node.right);
    }
  }

  toD3TreeFormat(node = this.root) {
    if (!node) return null;
    
    return {
      name: node.value.toString(),
      children: [
        this.toD3TreeFormat(node.left),
        this.toD3TreeFormat(node.right)
      ].filter(child => child !== null)
    };
  }
}

export default BinaryTree;

