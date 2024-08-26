import { Memento } from "../Memento";
import { NodeRole } from "../../components/Simulation/BinaryTree/BinaryTreeTypes";
import { ActionType } from "../../components/Simulation/BinaryTree/BinaryTreeTypes";
import { DFSNode } from "./DFSNode";
import { TableDataType } from "../../types/GraphTypes";
import { GraphNode } from "../GraphNode";

export class DFSMemento extends Memento<GraphNode | undefined, string> {
  visitedNodesSnapshots: number[][];

  passedNodesSnapshots: number[][];

  tableData: TableDataType[];

  constructor() {
    super("Search");
    this.visitedNodesSnapshots = [];
    this.passedNodesSnapshots = [];
    this.tableData = [];
  }

  clearSnapshots() {
    super.clearSnapshots();
    this.visitedNodesSnapshots = [];
    this.passedNodesSnapshots = [];
    this.tableData = [];
  }

  addBlank(
    codeRef: any,
    node: GraphNode | undefined,
    heapSize?: number,
    nodeRoles: NodeRole[] = [],
    visitedNodes: number[] = [],
    passedNodes: number[] = [],
    tableData: TableDataType = []
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
  }

  addError(
    codeRef: any,
    node: GraphNode | undefined,
    error: string,
    nodeRoles: NodeRole[] = [],
    visitedNodes: number[] = [],
    passedNodes: number[] = [],
    tableData: TableDataType = []
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
  }

  getLength() {
    return this.snapshots.length;
  }

  addSnapshot(
    codeRef: any,
    node: GraphNode | undefined,
    index: number,
    action: ActionType,
    nodeRoles: NodeRole[] = [],
    visitedNodes: number[] = [],
    passedNodes: number[] = [],
    tableData: TableDataType = []
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
}
