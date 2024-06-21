import { HashTableNode } from "../../../../ClassObjects/HashTable/HashTableNode";
import { buildLinkedList } from "../../LinkedList/Helpers/LinkedListHelpers";

export function divisionHashFunc(size: number, keys: number[]) {
  const hashTable: number[][] = new Array(size).fill(null).map(() => []);
  keys.forEach((key) => {
    let i = key % size;
    hashTable[i].unshift(key);
  });
  return hashTable;
}

export function multiHashFunc(size: number, keys: number[]) {
  const hashTable: number[][] = new Array(size).fill(null).map(() => []);
  let A = Math.random() + 0.0015;
  keys.forEach((key) => {
    let i = Math.floor(size * ((key * A) % 1));
    console.log(i);
    hashTable[i].unshift(key);
  });
  return hashTable;
}

export function buildHashTable(arr: { size: number; keys: number[]; method: string }) {
  let hashTable: number[][] = [];
  switch (arr.method) {
    case "divisionMethod":
      hashTable = divisionHashFunc(arr.size, arr.keys);
      break;
    case "multiplicationMethod":
      hashTable = multiHashFunc(arr.size, arr.keys);
      break;
  }
  if (hashTable.length === 0) return undefined;
  const listHead = buildLinkedList(hashTable[0]);
  const head = new HashTableNode(0, 0, undefined, undefined, listHead);
  let tempNode = head;
  for (let i = 1; i < arr.size; i++) {
    const listHead = buildLinkedList(hashTable[i]);
    tempNode.next = new HashTableNode(i, i, undefined, tempNode, listHead);
    tempNode = tempNode.next;
  }
  return head;
}
