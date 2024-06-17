import { HashTableNode } from "../../../../ClassObjects/HashTable/HashTableNode";

export function buildHashTable(arr: number[]) {
  if (arr.length === 0) return undefined;
  let head = new HashTableNode(0, arr[0], undefined, undefined);
  let tempNode = head;
  for (let i = 1; i <= arr.length; ++i) {
    tempNode.next = new HashTableNode(i, arr[i], undefined, tempNode);
    tempNode = tempNode.next;
  }
  return head;
}
