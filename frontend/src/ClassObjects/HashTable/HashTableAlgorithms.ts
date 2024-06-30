import { HashTableNode } from "./HashTableNode";
import { HashTableMemento } from "./HashTableMemento";
import { ActionType } from "../../components/Simulation/BinaryTree/BinaryTreeTypes";
import { LinkedListNode } from "../LinkedList/LinkedListNode";

export function chainingSearch(
  head: HashTableNode,
  memento: HashTableMemento,
  value: number,
  size: number
) {
  const index = value % size;
  const passedIds: number[] = [];
  let x = head;

  while (x.value !== index && x.next !== undefined) {
    x = x.next;
  }
  memento.addSnapshot(
    { line: 1, name: "ChainingSearch" },
    head,
    x.id,
    ActionType.HIGHLIGHT_LIGHT,
    [{ id: x.id, role: "i" }],
    undefined,
    passedIds
  );
  passedIds.push(x.id);

  let list = x.listHead;

  if (list !== undefined) {
    passedIds.push(list.id);
    memento.addSnapshot(
      { line: 2, name: "ChainingSearch" },
      head,
      list.id,
      ActionType.HIGHLIGHT_LIGHT,
      [{ id: list.id, role: "X" }],
      undefined,
      passedIds
    );

    while (list.next !== undefined && list.value !== value) {
      passedIds.push(list.next.id);
      memento.addSnapshot(
        { line: 3, name: "ChainingSearch" },
        head,
        list.id,
        ActionType.HIGHLIGHT_LIGHT,
        [{ id: list.id, role: "X" }],
        undefined,
        passedIds
      );
      memento.addSnapshot(
        { line: 4, name: "ChainingSearch" },
        head,
        list.next.id,
        ActionType.HIGHLIGHT_LIGHT,
        [{ id: list.next.id, role: "X" }],
        undefined,
        passedIds
      );
      list = list.next;
    }

    if (list.value === value) {
      memento.addSnapshot(
        { line: 5, name: "ChainingSearch" },
        head,
        list.id,
        ActionType.HIGHLIGHT_LIGHT,
        [{ id: list.id, role: "X" }],
        undefined,
        passedIds
      );
      return;
    } else {
      memento.addError(
        { line: 0, name: "ChainingSearch" },
        head,
        `Node with value ${value} not found`,
        [],
        [],
        passedIds
      );
    }
  } else {
    memento.addError(
      { line: 0, name: "ChainingSearch" },
      head,
      `Node with value ${value} not found`,
      [],
      [],
      passedIds
    );
  }
}

export function chainingInsert(
  head: HashTableNode,
  memento: HashTableMemento,
  value: number,
  size: number
) {
  const index = value % size;
  let x = head;
  let y = head;
  let id = 0;

  //get max ID
  while (y.next !== undefined) {
    if (id < y.id) id = y.id;
    let temp = y.listHead;
    while (temp && temp.next !== undefined) {
      if (id < temp.id) id = temp.id;
      temp = temp.next;
    }
    y = y.next;
  }

  while (x.value !== index && x.next !== undefined) {
    x = x.next;
  }
  memento.addSnapshot(
    { line: 1, name: "ChainingInsert" },
    head,
    x.id,
    ActionType.HIGHLIGHT_LIGHT,
    [{ id: x.id, role: "i" }],
    undefined,
    undefined
  );

  let list = x.listHead;
  const length = LinkedListNode.getLengthOfList(y.listHead);

  if (length) id += length + 2;
  else id += 2;

  if (list !== undefined) {
    x.listHead = LinkedListNode.addNodeToHead(list, value, id);
  } else {
    x.listHead = new LinkedListNode(value, id, undefined, undefined);
  }

  memento.addSnapshot(
    { line: 2, name: "ChainingInsert" },
    head,
    id,
    ActionType.HIGHLIGHT_LIGHT,
    [{ id: id, role: "X" }],
    undefined,
    undefined
  );
}
