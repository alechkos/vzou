import { HashTableNode } from "./HashTableNode";
import { HashTableMemento } from "./HashTableMemento";
import { ActionType } from "../../components/Simulation/BinaryTree/BinaryTreeTypes";
import { LinkedListNode } from "../LinkedList/LinkedListNode";
import { listItemTextClasses } from "@mui/material";

export function chainingSearch(
  head: HashTableNode,
  memento: HashTableMemento,
  value: number,
  size: number,
  A?: number
) {
  const index = !A ? value % size : Math.floor(size * ((value * A) % 1));
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
  size: number,
  A?: number
) {
  const index = !A ? value % size : Math.floor(size * ((value * A) % 1));
  let x = head;
  let y: HashTableNode | undefined = head;
  let id = 0;

  //get max ID
  while (y) {
    if (id < y.id) id = y.id;
    let temp = y.listHead;
    while (temp) {
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
  id += 1;

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

export function chainingDelete(
  head: HashTableNode,
  memento: HashTableMemento,
  value: number,
  size: number,
  A?: number
) {
  const index = !A ? value % size : Math.floor(size * ((value * A) % 1));
  const passedIds: number[] = [];
  let x = head;

  while (x.value !== index && x.next !== undefined) {
    x = x.next;
  }
  memento.addSnapshot(
    { line: 1, name: "ChainingDelete" },
    head,
    x.id,
    ActionType.HIGHLIGHT_LIGHT,
    [{ id: x.id, role: "i" }],
    undefined,
    undefined
  );
  passedIds.push(x.id);

  let list = x.listHead;

  if (list !== undefined) {
    passedIds.push(list.id);
    memento.addSnapshot(
      { line: 2, name: "ChainingDelete" },
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
        { line: 3, name: "ChainingDelete" },
        head,
        list.id,
        ActionType.HIGHLIGHT_LIGHT,
        [{ id: list.id, role: "X" }],
        undefined,
        passedIds
      );
      memento.addSnapshot(
        { line: 4, name: "ChainingDelete" },
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
        { line: 5, name: "ChainingDelete" },
        head,
        list.id,
        ActionType.HIGHLIGHT_LIGHT,
        [{ id: list.id, role: "X" }],
        undefined,
        passedIds
      );
      memento.addSnapshot(
        { line: 6, name: "ChainingDelete" },
        head,
        list.id,
        ActionType.HIGHLIGHT_LIGHT,
        [{ id: list.id, role: "X" }],
        undefined,
        passedIds
      );
      if (list.next) {
        memento.addSnapshot(
          { line: 7, name: "ChainingDelete" },
          head,
          list?.next.id,
          ActionType.HIGHLIGHT_LIGHT,
          [{ id: list?.next.id, role: "X" }],
          undefined,
          passedIds
        );
      } else {
        memento.addSnapshot(
          { line: 8, name: "ChainingDelete" },
          head,
          list.id,
          ActionType.HIGHLIGHT_LIGHT,
          [{ id: list.id, role: "X" }],
          undefined,
          passedIds
        );
      }

      return head;
    } else {
      memento.addError(
        { line: 9, name: "ChainingDelete" },
        head,
        `Node with value ${value} not found`,
        [],
        [],
        passedIds
      );
    }
  } else {
    memento.addSnapshot(
      { line: 5, name: "ChainingDelete" },
      head,
      x.id,
      ActionType.HIGHLIGHT_LIGHT,
      [],
      undefined,
      passedIds
    );
    memento.addError(
      { line: 9, name: "ChainingDelete" },
      head,
      `Node with value ${value} not found`,
      [],
      [],
      passedIds
    );
  }
}

export function search(
  head: HashTableNode,
  memento: HashTableMemento,
  value: number,
  size: number,
  double?: string
) {
  let index = value % size;
  const passedIds: number[] = [];
  let x = head;
  const temp = index;

  memento.addBlank({ line: 1, name: "Search" }, head, [], undefined, passedIds);
  memento.addBlank({ line: 2, name: "Search" }, head, [], undefined, passedIds);

  while (x.value !== index && x.next !== undefined) {
    x = x.next;
  }

  while (index < size && x.listHead !== undefined) {
    memento.addBlank({ line: 3, name: "Search" }, head, [], undefined, passedIds);
    x = head;
    while (x.value !== index && x.next !== undefined) {
      x = x.next;
    }
    memento.addSnapshot(
      { line: 4, name: "Search" },
      head,
      x.id,
      ActionType.HIGHLIGHT_LIGHT,
      [{ id: x.id, role: "j" }],
      undefined,
      passedIds
    );
    passedIds.push(x.id);
    if (x.listHead) {
      memento.addSnapshot(
        { line: 4, name: "Search" },
        head,
        x.listHead.id,
        ActionType.HIGHLIGHT_LIGHT,
        [{ id: x.listHead.id, role: "X" }],
        undefined,
        passedIds
      );
      if (x.listHead.value === value) {
        memento.addSnapshot(
          { line: 5, name: "Search" },
          head,
          x.listHead.id,
          ActionType.HIGHLIGHT_LIGHT,
          [{ id: x.listHead.id, role: "X" }],
          undefined,
          passedIds
        );
        return head;
      }
    }
    if (!double) {
      index++;
      index %= size;
    } else {
      let j = 1 + (value % (size - 2));
      index = (j + index * j) % size;
    }
    if (x.listHead?.value !== value) {
      memento.addBlank({ line: 6, name: "Search" }, head, [], undefined, passedIds);
      memento.addBlank({ line: 7, name: "Search" }, head, [], undefined, passedIds);
    }
    if (index === temp) break;
  }
  if (x.listHead === undefined) {
    memento.addError(
      { line: 8, name: "Search" },
      head,
      `Node with value ${value} not found`,
      [],
      [],
      passedIds
    );
    return;
  }
  if (x.listHead.value === value) {
    memento.addSnapshot(
      { line: 5, name: "Search" },
      head,
      x.listHead.id,
      ActionType.HIGHLIGHT_LIGHT,
      [{ id: x.listHead.id, role: "X" }],
      undefined,
      passedIds
    );
    return head;
  }
  memento.addError(
    { line: 8, name: "Search" },
    head,
    `Node with value ${value} not found`,
    [],
    [],
    passedIds
  );
  return;
}

export function insert(
  head: HashTableNode,
  memento: HashTableMemento,
  value: number,
  size: number,
  double?: string
) {
  const passedIds: number[] = [];

  function getHead(head: HashTableNode, memento: HashTableMemento, value: number, size: number) {
    let index = value % size;
    let temp = index;
    let x = head;

    memento.addBlank({ line: 1, name: "Insert" }, head, [], undefined, passedIds);

    while (index < size) {
      x = head;
      memento.addBlank({ line: 2, name: "Insert" }, head, [], undefined, passedIds);
      memento.addBlank({ line: 3, name: "Insert" }, head, [], undefined, passedIds);
      while (x.value !== index && x.next !== undefined) {
        x = x.next;
      }
      passedIds.push(x.id);
      memento.addSnapshot(
        { line: 4, name: "Insert" },
        head,
        x.id,
        ActionType.HIGHLIGHT_LIGHT,
        [{ id: x.id, role: "i" }],
        undefined,
        passedIds
      );
      if (x.listHead === undefined) {
        return x.id;
      } else {
        if (!double) {
          index++;
          index %= size;
        } else {
          let j = 1 + (value % (size - 2));
          index = (j + index * j) % size;
        }
        memento.addBlank({ line: 7, name: "Insert" }, head, [], undefined, passedIds);
        if (index === temp) break;
      }
    }

    memento.addError({ line: 8, name: "Insert" }, head, `Hash table overflow`, [], [], passedIds);
    return;
  }

  let listId = getHead(head, memento, value, size);
  if (listId !== undefined) {
    let x: HashTableNode = head;
    while (x.id !== listId && x.next !== undefined) {
      x = x.next;
    }
    memento.addSnapshot(
      { line: 5, name: "Insert" },
      head,
      x.id,
      ActionType.ADD,
      [{ id: x.id, role: "X" }],
      undefined,
      passedIds
    );
    memento.addSnapshot(
      { line: 6, name: "Insert" },
      head,
      x.id,
      ActionType.ADD,
      [{ id: x.id, role: "X" }],
      undefined,
      passedIds
    );
  }

  return head;
}

export function deleteNode(
  head: HashTableNode,
  memento: HashTableMemento,
  value: number,
  size: number,
  double?: string
) {
  let index = value % size;
  const passedIds: number[] = [];
  let x = head;
  const temp = index;

  memento.addBlank({ line: 1, name: "Delete" }, head, [], undefined, passedIds);
  memento.addBlank({ line: 2, name: "Delete" }, head, [], undefined, passedIds);

  while (x.value !== index && x.next !== undefined) {
    x = x.next;
  }

  while (index < size && x.listHead !== undefined) {
    memento.addBlank({ line: 3, name: "Delete" }, head, [], undefined, passedIds);
    x = head;
    while (x.value !== index && x.next !== undefined) {
      x = x.next;
    }
    memento.addSnapshot(
      { line: 4, name: "Delete" },
      head,
      x.id,
      ActionType.HIGHLIGHT_LIGHT,
      [{ id: x.id, role: "j" }],
      undefined,
      passedIds
    );
    passedIds.push(x.id);
    if (x.listHead) {
      memento.addSnapshot(
        { line: 4, name: "Delete" },
        head,
        x.listHead.id,
        ActionType.HIGHLIGHT_LIGHT,
        [{ id: x.listHead.id, role: "X" }],
        undefined,
        passedIds
      );
      if (x.listHead.value === value) {
        memento.addSnapshot(
          { line: 5, name: "Delete" },
          head,
          x.listHead.id,
          ActionType.HIGHLIGHT_LIGHT,
          [{ id: x.listHead.id, role: "X" }],
          undefined,
          passedIds
        );
        memento.addSnapshot(
          { line: 6, name: "Delete" },
          head,
          x.listHead.id,
          ActionType.HIGHLIGHT_LIGHT,
          [{ id: x.listHead.id, role: "X" }],
          undefined,
          passedIds
        );
        return head;
      }
    }
    if (!double) {
      index++;
      index %= size;
    } else {
      let j = 1 + (value % (size - 2));
      index = (j + index * j) % size;
    }
    if (x.listHead?.value !== value) {
      memento.addBlank({ line: 7, name: "Delete" }, head, [], undefined, passedIds);
      memento.addBlank({ line: 8, name: "Delete" }, head, [], undefined, passedIds);
    }
    if (index === temp) break;
  }
  if (x.listHead === undefined) {
    memento.addError(
      { line: 9, name: "Delete" },
      head,
      `Node with value ${value} not found`,
      [],
      [],
      passedIds
    );
    return;
  }
  if (x.listHead.value === value) {
    memento.addSnapshot(
      { line: 5, name: "Delete" },
      head,
      x.listHead.id,
      ActionType.HIGHLIGHT_LIGHT,
      [{ id: x.listHead.id, role: "X" }],
      undefined,
      passedIds
    );
    return head;
  }
  memento.addError(
    { line: 9, name: "Delete" },
    head,
    `Node with value ${value} not found`,
    [],
    [],
    passedIds
  );
  return;
}
