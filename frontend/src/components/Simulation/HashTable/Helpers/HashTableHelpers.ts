import { HashTableNode } from "../../../../ClassObjects/HashTable/HashTableNode";
import { buildLinkedList } from "../../LinkedList/Helpers/LinkedListHelpers";
import { HashTableAnimationController } from "../../../../ClassObjects/HashTable/HashTableAnimationController";
import {
  HashTablePseudoCode,
  HashTablePseudoCodeKeys,
} from "../../PseudoCode/HashTablePseudoCodeData";

export function divisionHashFunc(size: number, keys: number[]) {
  const hashTable: number[][] = new Array(size).fill(null).map(() => []);
  keys.forEach((key) => {
    let i = key % size;
    hashTable[i].unshift(key);
  });
  return hashTable;
}

export function multiHashFunc(size: number, keys: number[], A: number) {
  const hashTable: number[][] = new Array(size).fill(null).map(() => []);
  A += 0.0015;
  keys.forEach((key) => {
    let i = Math.floor(size * ((key * A) % 1));
    hashTable[i].unshift(key);
  });
  return hashTable;
}

export function linearProbing(
  size: number,
  keys: number[],
  controller: HashTableAnimationController
) {
  const hashTable: number[][] = new Array(size).fill(null).map(() => []);
  keys.forEach((key) => {
    let i = key % size;
    let flag = false;
    const temp = i;
    while (hashTable[i].length !== 0) {
      i++;
      i %= size;
      flag = true;
      if (i === temp) break;
    }
    if (i === temp && flag) {
      controller.setError(`No space in hash table for ${key}`);
      return;
    } else {
      hashTable[i].unshift(key);
    }
  });
  return hashTable;
}

export function doubleHashing(
  size: number,
  keys: number[],
  controller: HashTableAnimationController
) {
  const hashTable: number[][] = new Array(size).fill(null).map(() => []);
  keys.forEach((key) => {
    let i = key % size;
    let flag = false;
    const temp = i;
    while (hashTable[i].length !== 0) {
      let j = 1 + (key % (size - 2));
      i = (j + i * j) % size;
      flag = true;
      if (i === temp) break;
    }
    if (i === temp && flag) {
      controller.setError(`No space in hash table for ${key}`);
      return;
    } else {
      hashTable[i].unshift(key);
    }
  });
  return hashTable;
}

export function buildHashTable(
  arr: { size: number; keys: number[]; method: string; A: number },
  controller: HashTableAnimationController
) {
  let hashTable: number[][] = [];
  switch (arr.method) {
    case "divisionMethod":
      hashTable = divisionHashFunc(arr.size, arr.keys);
      break;
    case "multiplicationMethod":
      hashTable = multiHashFunc(arr.size, arr.keys, arr.A);
      break;
    case "linearProbing":
      hashTable = linearProbing(arr.size, arr.keys, controller);
      break;
    case "doubleHashing":
      hashTable = doubleHashing(arr.size, arr.keys, controller);
      break;
  }
  if (hashTable.length === 0) return undefined;
  let id = 0;
  const listHead = buildLinkedList(hashTable[0], id + 1);
  const head = new HashTableNode(0, 0, undefined, undefined, listHead);
  let tempNode = head;
  id += hashTable[0].length + 1;
  for (let i = 1; i < arr.size; i++) {
    const listHead = buildLinkedList(hashTable[i], id + 1);
    tempNode.next = new HashTableNode(id, i, undefined, tempNode, listHead);
    tempNode = tempNode.next;
    id += hashTable[i].length + 1;
  }
  return head;
}

export const combineHashTablePseudoCode = (currentAlg: HashTablePseudoCodeKeys) => {
  return HashTablePseudoCode[currentAlg];
};
