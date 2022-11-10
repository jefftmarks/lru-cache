class Node {
  constructor(data = null, key = null, next = null, prev = null) {
    this.data = data;
    this.key = key;
    this.next = next;
    this.prev = prev;
  }
}

class DoublyLinkedList {
  constructor(head = null, tail = null) {
    this.head = head;
    this.tail = tail;
  }

  // ADD THE NODE TO THE HEAD OF THE LIST
  addHead(node) {
    if (!this.head) {
      this.head = node;
      this.tail = node;
      return;
    }

    this.head.prev = node;
    node.next = this.head;
    this.head = node;
    this.head.prev = null;
  }

  // REMOVE THE TAIL NODE FROM THE LIST
  // AND RETURN IT
  removeTail() {
    if (!this.tail) {
      return this.tail;
    }

    if (!this.head.next) {
      this.head = null;
      return this.tail;
    }

    let oldTail = this.tail;
    this.tail = this.tail.prev;
    this.tail.next = null;
    return oldTail;
  }

  // REMOVE THE GIVEN NODE FROM THE LIST
  // AND THEN RETURN IT
  removeNode(node) {
    if (!this.head) {
      return null;
    }

    let curr = this.head;

    while (curr) {
      if (curr === node) {
        if (node === this.tail) {
          this.removeTail();
        } else if (node === this.head) {
          this.head = node.next;
          this.head.prev = null;
        } else {
          node.prev.next = node.next;
          node.next.prev = node.prev;
        }
        return node;
      } else {
        curr = curr.next;
      }
    }

    return null;
  }

  // MOVE THE GIVEN NODE FROM ITS LOCATION TO THE HEAD
  // OF THE LIST
  moveNodeToHead(node) {
    if (this.removeNode(node)) {
      this.addHead(node);
    }
  }
}

class LRUCache {
  constructor(limit = 10) {
    this.limit = limit;
    this.size = 0;
    this.hash = {};
    this.list = new DoublyLinkedList();
  }

  // RETRIEVE THE NODE FROM THE CACHE USING THE KEY
  // IF THE NODE IS IN THE CACHE, MOVE IT TO THE HEAD OF THE LIST AND RETURN IT
  // OTHERWISE RETURN -1
  get(key) {
    const node = this.hash[key];
    if (!node) {
      return -1;
    } else {
      this.list.moveNodeToHead(node);
      return node;
    }
  }

  // ADD THE GIVEN KEY AND VALUE TO THE CACHE
  // IF THE CACHE ALREADY CONTAINS THE KEY, UPDATE ITS VALUE AND MOVE IT TO 
  // THE HEAD OF THE LIST
  // IF THE CACHE DOESN'T CONTAIN THE KEY, ADD IT TO THE CACHE AND PLACE IT
  // AT THE HEAD OF THE LIST
  // IF THE CACHE IS FULL, REMOVE THE LEAST RECENTLY USED ITEM BEFORE ADDING
  // THE NEW DATA TO THE CACHE
  put(key, value) {
    if (this.hash[key]) {
      const node = this.hash[key];
      node.data = value;
      this.list.moveNodeToHead(node);
    } else {
      if (this.size === this.limit) {
        const oldTail = this.list.removeTail();
        delete this.hash[oldTail.key];
        --this.size;
      }
      const new_node = new Node(value, key);
      this.hash[key] = new_node;
      this.list.addHead(new_node);
      ++this.size;
    }
  }
}

if (require.main === module) {
  // add your own tests in here
}

module.exports = {
  Node,
  DoublyLinkedList,
  LRUCache
};

// Please add your pseudocode to this file
// And a written explanation of your solution
