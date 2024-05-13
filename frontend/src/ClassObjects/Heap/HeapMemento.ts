import { Memento } from "../Memento";

import { ActionType, NodeRole } from "../../components/Simulation/BinaryTree/BinaryTreeTypes";
import {
  CodeReference,
  HeapAlgNames,
} from "../../components/Simulation/PseudoCode/HeapPseudoCodeData";

export class HeapMemento extends Memento<number[], HeapAlgNames> {
  heapSizeData: (number | undefined)[];

  constructor() {
    super("BuildMaxHeap");
    this.heapSizeData = [];
  }

  addBlank(
    codeRef: CodeReference<HeapAlgNames>,
    array: number[],
    heapSize?: number,
    nodeRoles: NodeRole[] = []
  ) {
    this.snapshots.push({
      actions: [],
      data: HeapMemento.getArrayToAdd(this, array),
      codeRef,
      roles: nodeRoles,
    });
    this.heapSizeData.push(heapSize);
  }

  getHeapSize(index: number) {
    if (index < 0 || index >= this.heapSizeData.length) {
      throw new Error("Index out of range");
    }
    return this.heapSizeData[index];
  }

  getLastHeapSize() {
    if (!this.heapSizeData.length) {
      throw new Error("No snapshots");
    }
    return this.heapSizeData[this.heapSizeData.length - 1];
  }

  addSwap(
    codeRef: CodeReference<HeapAlgNames>,
    array: number[],
    index1: number,
    index2: number,
    heapSize?: number,
    nodeRoles: NodeRole[] = []
  ) {
    this.snapshots.push({
      actions: [{ action: ActionType.SWAP, item: index1, item2: index2 }],
      data: [...array],
      codeRef,
      roles: nodeRoles,
    });
    this.heapSizeData.push(heapSize);
  }

  getLength() {
    return this.snapshots.length;
  }

  /**
   * Adds a snapshot to the collection of snapshots for the heap visualization.
   *
   * @param {CodeReference<HeapAlgNames>} codeRef - The code reference for the snapshot.
   * @param {number[]} array - The array to add to the snapshot.
   * @param {number} index - The index of the item in the array.
   * @param {ActionType} action - The action to perform on the item.
   * @param {number} [heapSize] - The size of the heap.
   * @param {NodeRole[]} [nodeRoles=[]] - The roles of the nodes in the heap.
   */
  addSnapshot(
    codeRef: CodeReference<HeapAlgNames>,
    array: number[],
    index: number,
    action: ActionType,
    heapSize?: number,
    nodeRoles: NodeRole[] = []
  ) {
    this.snapshots.push({
      actions: [{ action, item: index }],
      data: HeapMemento.getArrayToAdd(this, array),
      codeRef,
      roles: nodeRoles,
    });
    this.heapSizeData.push(heapSize);
  }

  clearSnapshots() {
    super.clearSnapshots();
    this.heapSizeData = [];
  }

  /**
   * Static method to get the array to add, method checks if new copy is needed
   * if not, it returns the last array reference, otherwise it returns new array as copy of provided array
   * @param memento: Memento object
   * @param runtimeArr: number[]
   * @return: number[]
   * */
  static getArrayToAdd(memento: HeapMemento, runtimeArr: number[]) {
    // check if memento is empty or runtimeArr is not the same as last runtimeArr, if so new copy is needed
    if (!memento.getLength() || runtimeArr.length !== memento.getLastData().length) {
      if (runtimeArr.length === 0) {
        return [];
      }
      return [...runtimeArr];
    }
    try {
      const lastArr = memento.getLastData();
      // check if runtimeArr is the same as the last runtimeArr
      for (let i = 0; i < runtimeArr.length; i++) {
        if (runtimeArr[i] !== lastArr[i]) {
          return [...runtimeArr];
        }
      }
      return lastArr;
    } catch (e) {
      // Should never happen
      console.log(e);
      return [...runtimeArr];
    }
  }
}
