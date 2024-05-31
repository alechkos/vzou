import { LinkedListNode } from "./LinkedListNode";
import { LinkedListMemento } from "./LinkedListMemento";
import { ActionType } from "../../components/Simulation/BinaryTree/BinaryTreeTypes";
import { LinkedListAnimationController } from "./LinkedListAnimationController";

export function searchWithAnimations(
  head: LinkedListNode | undefined,
  memento: LinkedListMemento,
  value: number
) {
  let x = head;
  const passedIds: number[] = [];

  if (x !== undefined) {
    passedIds.push(x.id);
    memento.addBlank(
      { line: 1, name: "Search" },
      head,
      [{ id: x.id, role: "X" }],
      undefined,
      passedIds
    );

    while (x.next !== undefined && x.value !== value) {
      passedIds.push(x.next.id);
      memento.addSnapshot(
        { line: 2, name: "Search" },
        head,
        x.id,
        ActionType.HIGHLIGHT_LIGHT,
        [{ id: x.id, role: "X" }],
        undefined,
        passedIds
      );
      memento.addSnapshot(
        { line: 3, name: "Search" },
        head,
        x.next.id,
        ActionType.HIGHLIGHT_LIGHT,
        [{ id: x.next.id, role: "X" }],
        undefined,
        passedIds
      );
      x = x.next;
    }

    if (x.value === value) {
      memento.addSnapshot(
        { line: 4, name: "Search" },
        head,
        x.id,
        ActionType.HIGHLIGHT_LIGHT,
        [{ id: x.id, role: "X" }],
        undefined,
        passedIds
      );
      return;
    } else {
      memento.addError(
        { line: 0, name: "Search" },
        head,
        `Node with value ${value} not found`,
        [{ id: x.id, role: "X" }],
        [],
        passedIds
      );
    }
  }
}

export function insertToHeadWithAnimations(
  head: LinkedListNode | undefined,
  memento: LinkedListMemento,
  value: number
) {
  head = LinkedListNode.addNodeToHead(head, value);
  if (head !== undefined) {
    memento.addSnapshot(
      { line: 1, name: "InsertToHead" },
      head,
      head.id,
      ActionType.HIGHLIGHT_LIGHT,
      [{ id: head.id, role: "X" }],
      undefined,
      undefined
    );
    memento.addSnapshot(
      { line: 2, name: "InsertToHead" },
      head,
      head.id,
      ActionType.HIGHLIGHT_LIGHT,
      [{ id: head.id, role: "X" }],
      undefined,
      undefined
    );
  }
  return head;
}

export function insertToTailWithAnimations(
  head: LinkedListNode | undefined,
  memento: LinkedListMemento,
  value: number
) {
  let tail = LinkedListNode.getTailOfList(head);
  LinkedListNode.addNodeToTail(head, tail, value);
  if (tail) {
    memento.addSnapshot(
      { line: 1, name: "InsertToTail" },
      head,
      tail.id,
      ActionType.CHANGE,
      [{ id: tail.id, role: "X" }],
      undefined,
      undefined
    );
    if (tail.next)
      memento.addSnapshot(
        { line: 1, name: "InsertToTail" },
        head,
        tail.next.id,
        ActionType.CHANGE,
        [{ id: tail.next.id, role: "X" }],
        undefined,
        undefined
      );
  }
}

export function deleteFromHeadWithAnimations(
  head: LinkedListNode | undefined,
  memento: LinkedListMemento,
  controller: LinkedListAnimationController
) {
  if (head !== undefined) {
    memento.addSnapshot(
      { line: 1, name: "DeleteFromHead" },
      head,
      head.id,
      ActionType.HIGHLIGHT_LIGHT,
      [{ id: head.id, role: "X" }],
      undefined,
      undefined
    );
    memento.addSnapshot(
      { line: 2, name: "DeleteFromHead" },
      head,
      head.id,
      ActionType.HIGHLIGHT_LIGHT,
      [{ id: head.id, role: "X" }],
      undefined,
      undefined
    );
    head = LinkedListNode.deleteNodeFromHead(head);
    if (head)
      memento.addSnapshot(
        { line: 3, name: "DeleteFromHead" },
        head,
        head.id,
        ActionType.CHANGE,
        [{ id: head.id, role: "X" }],
        undefined,
        undefined
      );
    else controller.setListFromInput([]);
    memento.addBlank(
      { line: 4, name: "DeleteFromHead" },
      head,
      [{ id: head ? head.id : 0, role: "X" }],
      undefined,
      undefined
    );
  }
  return head;
}

export function deleteFromTailWithAnimations(
  head: LinkedListNode | undefined,
  memento: LinkedListMemento,
  controller: LinkedListAnimationController
) {
  let tail = LinkedListNode.getTailOfList(head);
  if (tail !== undefined) {
    memento.addSnapshot(
      { line: 1, name: "DeleteFromTail" },
      head,
      tail.id,
      ActionType.HIGHLIGHT_LIGHT,
      [{ id: tail.id, role: "X" }],
      undefined,
      undefined
    );
  }
  head = LinkedListNode.deleteNodeFromTail(head, tail);
  if (head === undefined) {
    controller.setListFromInput([]);
    memento.addBlank({ line: 3, name: "DeleteFromTail" }, head, [], undefined, undefined);
    return head;
  }
  tail = LinkedListNode.getTailOfList(head);
  if (tail !== undefined) {
    memento.addSnapshot(
      { line: 2, name: "DeleteFromTail" },
      head,
      tail.id,
      ActionType.HIGHLIGHT_LIGHT,
      [{ id: tail.id, role: "X" }],
      undefined,
      undefined
    );
    memento.addSnapshot(
      { line: 3, name: "DeleteFromTail" },
      head,
      tail.id,
      ActionType.HIGHLIGHT_LIGHT,
      [{ id: tail.id, role: "X" }],
      undefined,
      undefined
    );
  } else controller.setListFromInput([]);
  memento.addBlank(
    { line: 3, name: "DeleteFromTail" },
    head,
    [{ id: tail ? tail.id : 0, role: "X" }],
    undefined,
    undefined
  );
  return head;
}
