import { LinkedListNode } from "../LinkedList/LinkedListNode";

export class HashTableNode {
  id: number;

  value: number;

  next?: HashTableNode;

  prev?: HashTableNode;

  valuesForList?: LinkedListNode[];

  constructor(
    id: number,
    value: number,
    next: HashTableNode | undefined,
    prev: HashTableNode | undefined,
    valuesForList?: LinkedListNode[]
  ) {
    this.id = id;
    this.value = value;
    this.next = next;
    this.prev = prev;
    this.valuesForList = valuesForList;
  }

  //Functions for visualization!
}
