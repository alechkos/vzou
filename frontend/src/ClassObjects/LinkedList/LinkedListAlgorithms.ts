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

export function insertWithAnimations(
  head: LinkedListNode | undefined,
  memento: LinkedListMemento,
  value: number
) {
  head = LinkedListNode.addNodeToHead(head, value);
  if (head !== undefined) {
    memento.addSnapshot(
      { line: 1, name: "Insert" },
      head,
      head.id,
      ActionType.HIGHLIGHT_LIGHT,
      [{ id: head.id, role: "X" }],
      undefined,
      undefined
    );
    memento.addSnapshot(
      { line: 2, name: "Insert" },
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

export function deleteWithAnimations(
  head: LinkedListNode | undefined,
  memento: LinkedListMemento,
  controller: LinkedListAnimationController
) {
  if (head !== undefined) {
    memento.addSnapshot(
      { line: 1, name: "Delete" },
      head,
      head.id,
      ActionType.HIGHLIGHT_LIGHT,
      [{ id: head.id, role: "X" }],
      undefined,
      undefined
    );
    memento.addSnapshot(
      { line: 2, name: "Delete" },
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
        { line: 3, name: "Delete" },
        head,
        head.id,
        ActionType.CHANGE,
        [{ id: head.id, role: "X" }],
        undefined,
        undefined
      );
    else controller.setListFromInput([]);
  }
  return head;
}
