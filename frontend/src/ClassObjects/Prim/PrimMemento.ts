import { Memento } from "../Memento";
import { NodeRole } from "../../components/Simulation/BinaryTree/BinaryTreeTypes";
import { ActionType } from "../../components/Simulation/BinaryTree/BinaryTreeTypes";
import { TableDataType } from "../../types/GraphTypes";
import { PrimNode } from "./PrimNode";

export class PrimMemento extends Memento<PrimNode | undefined, string> {
  visitedNodesSnapshots: number[][];

  passedNodesSnapshots: number[][];

  tableData: TableDataType[];

  Q: PrimNode[][];

  S: number[][];

  constructor() {
    super("Search");
    this.visitedNodesSnapshots = [];
    this.passedNodesSnapshots = [];
    this.tableData = [];
    this.Q = [];
    this.S = [];
  }

  clearSnapshots() {
    super.clearSnapshots();
    this.visitedNodesSnapshots = [];
    this.passedNodesSnapshots = [];
    this.tableData = [];
    this.Q = [];
    this.S = [];
  }

  addBlank(
    codeRef: any,
    node: PrimNode | undefined,
    heapSize?: number,
    nodeRoles: NodeRole[] = [],
    visitedNodes: number[] = [],
    passedNodes: number[] = [],
    tableData: TableDataType = [],
    Q: PrimNode[] = [],
    S: number[] = []
  ) {
    this.snapshots.push({
      actions: [],
      data: node,
      codeRef,
      roles: nodeRoles,
    });
    this.visitedNodesSnapshots.push([...visitedNodes]);
    this.passedNodesSnapshots.push([...passedNodes]);
    this.tableData.push([...tableData]);
    this.Q.push([...Q]);
    this.S.push([...S]);
  }

  addError(
    codeRef: any,
    node: PrimNode | undefined,
    error: string,
    nodeRoles: NodeRole[] = [],
    visitedNodes: number[] = [],
    passedNodes: number[] = [],
    tableData: TableDataType = [],
    Q: PrimNode[] = [],
    S: number[] = []
  ) {
    this.snapshots.push({
      actions: [{ action: ActionType.ERROR, item: -1, error }],
      data: node,
      codeRef,
      roles: nodeRoles,
    });
    this.visitedNodesSnapshots.push([...visitedNodes]);
    this.passedNodesSnapshots.push([...passedNodes]);
    this.tableData.push([...tableData]);
    this.Q.push([...Q]);
    this.S.push([...S]);
  }

  getLength() {
    return this.snapshots.length;
  }

  addSnapshot(
    codeRef: any,
    node: PrimNode | undefined,
    index: number,
    action: ActionType,
    nodeRoles: NodeRole[] = [],
    visitedNodes: number[] = [],
    passedNodes: number[] = [],
    tableData: TableDataType = [],
    Q: PrimNode[] = [],
    S: number[] = []
  ) {
    this.snapshots.push({
      actions: [{ action, item: index }],
      data: node,
      codeRef,
      roles: nodeRoles,
    });
    this.visitedNodesSnapshots.push([...visitedNodes]);
    this.passedNodesSnapshots.push([...passedNodes]);
    this.tableData.push([...tableData]);
    this.Q.push([...Q]);
    this.S.push([...S]);
  }

  getVisitedNodes(index: number) {
    if (index < 0 || index >= this.visitedNodesSnapshots.length) {
      throw new Error("Index out of range");
    }
    return this.visitedNodesSnapshots[index];
  }

  getPassedNodes(index: number) {
    if (index < 0 || index >= this.passedNodesSnapshots.length) {
      throw new Error("Index out of range");
    }
    return this.passedNodesSnapshots[index];
  }

  getTableData(index: number) {
    if (index < 0 || index >= this.tableData.length) {
      throw new Error("Index out of range");
    }
    return this.tableData[index];
  }

  getS(index: number) {
    if (index < 0 || index >= this.tableData.length) {
      throw new Error("Index out of range");
    }
    return this.S[index];
  }

  getQ(index: number) {
    if (index < 0 || index >= this.tableData.length) {
      throw new Error("Index out of range");
    }
    return this.Q[index];
  }
}
