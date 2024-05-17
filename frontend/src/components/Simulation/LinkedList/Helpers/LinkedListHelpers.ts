import { LinkedListNode } from "../../../../ClassObjects/LinkedList/LinkedListNode";
import {
  LinkedListPseudoCode,
  LinkedListPseudoCodeKeys,
} from "../../PseudoCode/LinkedListPseudoCodeData";

export function buildLinkedList(arr: number[]) {
  if (arr.length === 0) return undefined;
  let head = new LinkedListNode(arr[0], 0, undefined, undefined);
  let tempNode = head;
  for (let i = 1; i < arr.length; ++i) {
    tempNode.next = new LinkedListNode(arr[i], i, tempNode, undefined);
    tempNode = tempNode.next;
  }
  return head;
}

export const combineLinkedListPseudoCode = (currentAlg: LinkedListPseudoCodeKeys) => {
  return LinkedListPseudoCode[currentAlg];
};
