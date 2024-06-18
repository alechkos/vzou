import { HashTableNode } from "../../../../ClassObjects/HashTable/HashTableNode";
import { buildLinkedList } from "../../LinkedList/Helpers/LinkedListHelpers";

export function buildHashTable(arr: Array<{ id: number; listValues: number[] }>) {
  if (arr.length === 0) return undefined;
  const listHead = buildLinkedList(arr[0].listValues);
  const head = new HashTableNode(0, arr[0].id, undefined, undefined, listHead);
  let tempNode = head;
  for (let i = 1; i < arr.length; i++) {
    const listHead = buildLinkedList(arr[i].listValues);
    tempNode.next = new HashTableNode(i, arr[i].id, undefined, tempNode, listHead);
    tempNode = tempNode.next;
  }
  return head;
}
