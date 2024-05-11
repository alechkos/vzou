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

  static getLength(head: LinkedListNode | undefined): number {
    let length = 0;
    let tempNode = head;
    while (tempNode?.next !== undefined) {
      length++;
      tempNode = tempNode.next;
    }
    return length;
  }

  static addNodeToHead(head: LinkedListNode, value: number) {
    head.prev = new LinkedListNode(value, 0, undefined, head);
    let tempNode = head;
    while (tempNode.next) {
      tempNode.id++;
      tempNode = tempNode.next;
    }
    return head.prev;
  }

  static addNodeToTail(head: LinkedListNode, tail: LinkedListNode, value: number) {
    tail.next = new LinkedListNode(value, tail.id + 1, tail, undefined);
    return head;
  }

  static deleteNodeFromHead(head: LinkedListNode) {
    if (head.next) {
      head = head.next;
      head.id = 0;
      let tempNode = head;
      while (tempNode.next) {
        tempNode.next.id--;
        tempNode = tempNode.next;
      }
      return head;
    }
  }

  static deleteNodeFromTail(head: LinkedListNode, tail: LinkedListNode) {
    const prev = tail.prev;
    if (prev && prev.next) {
      prev.next = undefined;
    }
    return head;
  }
}
