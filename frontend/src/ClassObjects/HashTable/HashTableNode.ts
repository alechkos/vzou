import { LinkedListNode } from "../LinkedList/LinkedListNode";

export class HashTableNode {
  id: number;

  value: number;

  next?: HashTableNode;

  prev?: HashTableNode;

  listHead?: LinkedListNode;

  constructor(
    id: number,
    value: number,
    next: HashTableNode | undefined,
    prev: HashTableNode | undefined,
    listHead?: LinkedListNode
  ) {
    this.id = id;
    this.value = value;
    this.next = next;
    this.prev = prev;
    this.listHead = listHead;
  }
}
