import { Memento } from "../Memento";
import { NodeRole } from "../../components/Simulation/BinaryTree/BinaryTreeTypes";
import { ActionType } from "../../components/Simulation/BinaryTree/BinaryTreeTypes";
import { KruskalTableType, linksType } from "../../types/GraphTypes";
import { KruskalNode } from "./KruskalNode";

export class KruskalMemento extends Memento<KruskalNode | undefined, string> {
  visitedNodesSnapshots: number[][];

  passedNodesSnapshots: number[][];

  tableData: KruskalTableType[];

  links: linksType[];

  T: linksType[];

  constructor() {
    super("Search");
    this.visitedNodesSnapshots = [];
    this.passedNodesSnapshots = [];
    this.tableData = [];
    this.links = [];
    this.T = [];
  }

  clearSnapshots() {
    super.clearSnapshots();
    this.visitedNodesSnapshots = [];
    this.passedNodesSnapshots = [];
    this.tableData = [];
    this.links = [];
    this.T = [];
  }

  addBlank(
    codeRef: any,
    node: KruskalNode | undefined,
    heapSize?: number,
    nodeRoles: NodeRole[] = [],
    visitedNodes: number[] = [],
    passedNodes: number[] = [],
    tableData: KruskalTableType = [],
    links: linksType = [],
    T: linksType = []
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
    this.links.push([...links]);
    this.T.push([...T]);
  }

  addError(
    codeRef: any,
    node: KruskalNode | undefined,
    error: string,
    nodeRoles: NodeRole[] = [],
    visitedNodes: number[] = [],
    passedNodes: number[] = [],
    tableData: KruskalTableType = [],
    links: linksType = [],
    T: linksType
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
    this.links.push([...links]);
    this.T.push([...T]);
  }

  getLength() {
    return this.snapshots.length;
  }

  addSnapshot(
    codeRef: any,
    node: KruskalNode | undefined,
    index: number,
    action: ActionType,
    nodeRoles: NodeRole[] = [],
    visitedNodes: number[] = [],
    passedNodes: number[] = [],
    tableData: KruskalTableType = [],
    links: linksType = [],
    T: linksType
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
    this.links.push([...links]);
    this.T.push([...T]);
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

  getLinks(index: number) {
    if (index < 0 || index >= this.links.length) {
      throw new Error("Index out of range");
    }
    return this.links[index];
  }

  getT(index: number) {
    if (index < 0 || index >= this.T.length) {
      throw new Error("Index out of range");
    }
    return this.T[index];
  }
}
