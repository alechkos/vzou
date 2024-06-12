export class HashTableNode {
  id: number;

  value: number;

  next?: HashTableNode;

  prev?: HashTableNode;

  constructor(id: number, value: number, next: HashTableNode, prev: HashTableNode) {
    this.id = id;
    this.value = value;
    this.next = next;
    this.prev = prev;
  }

  //Functions for visualization!
}
