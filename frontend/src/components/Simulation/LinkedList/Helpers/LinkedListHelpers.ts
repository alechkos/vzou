import { LinkedListNode } from "../../../../ClassObjects/LinkedList/LinkedListNode";
import {
  LinkedListPseudoCode,
  LinkedListPseudoCodeKeys,
} from "../../PseudoCode/LinkedListPseudoCodeData";

export function buildLinkedList(arr: number[], index?: number) {
  if (arr.length === 0) return undefined;
  let head: LinkedListNode;
  if (!index) {
    head = new LinkedListNode(arr[0], 0, undefined, undefined);
    let tempNode = head;
    for (let i = 1; i < arr.length; ++i) {
      tempNode.next = new LinkedListNode(arr[i], i, tempNode, undefined);
      tempNode = tempNode.next;
    }
  } else {
    head = new LinkedListNode(arr[0], index, undefined, undefined);
    let tempNode = head;
    let id = index + 1;
    for (let i = 1; i < arr.length; ++i) {
      tempNode.next = new LinkedListNode(arr[i], id, tempNode, undefined);
      tempNode = tempNode.next;
      id++;
    }
  }
  return head;
}

export const combineLinkedListPseudoCode = (currentAlg: LinkedListPseudoCodeKeys) => {
  return LinkedListPseudoCode[currentAlg];
};
