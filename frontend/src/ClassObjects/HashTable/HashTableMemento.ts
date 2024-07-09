import { Memento } from "../Memento";
import { HashTableNode } from "./HashTableNode";
import { ActionType, NodeRole } from "../../components/Simulation/BinaryTree/BinaryTreeTypes";
import { LinkedListNode } from "../LinkedList/LinkedListNode";

export class HashTableMemento extends Memento<HashTableNode | LinkedListNode | undefined, string> {
  visitedNodesSnapshots: number[][];

  passedNodesSnapshots: number[][];

  constructor() {
    super("Search1");
    this.visitedNodesSnapshots = [];
    this.passedNodesSnapshots = [];
  }

  clearSnapshots() {
    super.clearSnapshots();
    this.visitedNodesSnapshots = [];
    this.passedNodesSnapshots = [];
  }

  addBlank(
    codeRef: any,
    head: HashTableNode | LinkedListNode | undefined,
    nodeRoles: NodeRole[] = [],
    visitedNodes: number[] = [],
    passedNodes: number[] = []
  ) {
    this.snapshots.push({
      actions: [],
      data: head,
      codeRef,
      roles: nodeRoles,
    });
    this.visitedNodesSnapshots.push([...visitedNodes]);
    this.passedNodesSnapshots.push([...passedNodes]);
  }

  addSnapshot(
    codeRef: any,
    head: HashTableNode | LinkedListNode | undefined,
    index: number,
    action: ActionType,
    nodeRoles: NodeRole[] = [],
    visitedNodes: number[] = [],
    passedNodes: number[] = []
  ) {
    this.snapshots.push({
      actions: [{ action, item: index }],
      data: head,
      codeRef,
      roles: nodeRoles,
    });
    this.visitedNodesSnapshots.push([...visitedNodes]);
    this.passedNodesSnapshots.push([...passedNodes]);
  }

  addError(
    codeRef: any,
    head: HashTableNode | LinkedListNode | undefined,
    error: string,
    nodeRoles: NodeRole[] = [],
    visitedNodes: number[] = [],
    passedNodes: number[] = []
  ) {
    this.snapshots.push({
      actions: [{ action: ActionType.ERROR, item: -1, error }],
      data: head,
      codeRef,
      roles: nodeRoles,
    });
    this.visitedNodesSnapshots.push([...visitedNodes]);
    this.passedNodesSnapshots.push([...passedNodes]);
  }

  getPassedNodes(index: number) {
    if (index < 0 || index >= this.passedNodesSnapshots.length) {
      throw new Error("Index out of range");
    }
    return this.passedNodesSnapshots[index];
  }
}
