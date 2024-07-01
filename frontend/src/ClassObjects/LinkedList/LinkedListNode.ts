/** Self-implemented representation for a node in a LinkedList.
 * has the classic attributes like parent, prev, next, value, head, tail
 */

export class LinkedListNode {
  prev?: LinkedListNode;

  next?: LinkedListNode;

  value: number;

  id: number;

  constructor(value: number, id: number, prev?: LinkedListNode, next?: LinkedListNode) {
    this.value = value;
    this.id = id;
    this.prev = prev;
    this.next = next;
  }

  static addNodeToHead(head: LinkedListNode | undefined, value: number, id?: number) {
    if (head === undefined) {
      head = new LinkedListNode(value, id ? id : 0, undefined, undefined);
      return head;
    } else {
      head.prev = new LinkedListNode(value, id ? id : 0, undefined, head);
      if (!id) {
        let tempNode = head;
        while (tempNode.next !== undefined) {
          tempNode.id++;
          tempNode = tempNode.next;
        }
        tempNode.id++;
      }
      return head.prev;
    }
  }

  static deleteNodeFromHead(head: LinkedListNode | undefined) {
    if (head === undefined) return;
    if (head.next && head.next.id !== -1) {
      head = head.next;
      let tempNode = head;
      while (tempNode.next) {
        tempNode.id--;
        tempNode = tempNode.next;
      }
      tempNode.id--;
      return head;
    } else return undefined;
  }

  static addNodeToTail(
    head: LinkedListNode | undefined,
    tail: LinkedListNode | undefined,
    value: number
  ) {
    if (tail !== undefined) tail.next = new LinkedListNode(value, tail.id + 1, tail, undefined);
    return head;
  }

  static deleteNodeFromTail(head: LinkedListNode | undefined, tail: LinkedListNode | undefined) {
    if (tail && tail.prev) {
      const prev = tail.prev;
      if (prev && prev.next) {
        prev.next = undefined;
      }
      return head;
    }
    return undefined;
  }

  static getLengthOfList(head: LinkedListNode | undefined) {
    if (head !== undefined) {
      let tempNode = head;
      let count = 0;
      while (tempNode.next !== undefined) {
        count++;
        tempNode = tempNode.next;
      }
      return count;
    }
  }

  static getTailOfList(head: LinkedListNode | undefined) {
    if (head === undefined) return undefined;
    let tempNode = head;
    while (tempNode.next !== undefined) {
      tempNode = tempNode.next;
    }
    return tempNode;
  }

  static deleteByValue(head: LinkedListNode | undefined, value: number) {
    if (head === undefined) return undefined;
    let tempNode: LinkedListNode | undefined = head;
    while (tempNode && tempNode.value !== value) tempNode = tempNode.next;
    if (tempNode === undefined) return undefined;
    if (tempNode.next === undefined && tempNode.prev === undefined) return undefined;
    if (tempNode.prev === undefined) return tempNode.next;
    if (tempNode.next === undefined) tempNode.prev.next = undefined;
    if (tempNode) {
      tempNode.prev.next = tempNode.next;
      tempNode.next?.prev ? (tempNode.next.prev = tempNode.prev) : undefined;
    }
    return head;
  }
}
