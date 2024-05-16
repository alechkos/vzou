import { LinkedListNode } from "./LinkedListNode";
import { LinkedListMemento } from "./LinkedListMemento";
import { ActionType } from "../../components/Simulation/BinaryTree/BinaryTreeTypes";

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
      memento.addBlank(
        { line: 4, name: "Search" },
        head,
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
        [],
        [],
        passedIds
      );
    }
  }
}
