import { HeapMemento } from "../../../ClassObjects/Heap/HeapMemento";
import { ActionType } from "../BinaryTree/BinaryTreeTypes";
import { getNodeRolesForIter } from "../BinaryTree/Helpers/Functions";
import { HeapPseudoCodeKeys } from "../PseudoCode/HeapPseudoCodeData";

const gaps = {
  buildMaxHeap: 5,
  heapExtractMax: 9,
  heapInsert: 5,
  heapSort: 6,
};

export function buildMaxHeap(A: number[], memento: HeapMemento): void {
  const heapSize = A.length;
  memento.addBlank({ line: 1, name: "BuildMaxHeap" }, A);
  for (let i = Math.floor(heapSize / 2); i >= 0; i--) {
    memento.addBlank({ line: 2, name: "BuildMaxHeap" }, A, heapSize, [{ id: i, role: "𝑖" }]);
    // memento.addBlank({line: 3, name: "BuildMaxHeap"},A)
    memento.addSnapshot({ line: 3, name: "BuildMaxHeap" }, A, i, ActionType.NONE, heapSize, [
      { id: i, role: "𝑖" },
    ]);
    maxHeapify(A, i, heapSize, memento, "BuildMaxHeap", gaps.buildMaxHeap);
  }
}

export function maxHeapify(
  A: number[],
  i: number,
  heapSize: number,
  memento: HeapMemento,
  currentAlg: HeapPseudoCodeKeys,
  gap = 0
): void {
  const left = 2 * i + 1;
  const right = 2 * i + 2;
  let roles = getNodeRolesForIter(left, right, i, heapSize);
  memento.addBlank(
    { line: 1 + gap, name: currentAlg },
    A,
    heapSize,
    getNodeRolesForIter(left, null, i, heapSize)
  );
  memento.addBlank({ line: 2 + gap, name: currentAlg }, A, heapSize, roles);
  let largest = i;
  memento.addBlank({ line: 3 + gap, name: currentAlg }, A, heapSize, roles);
  if (left < heapSize && A[left] > A[largest]) {
    memento.addSnapshot(
      { line: 4 + gap, name: currentAlg },
      A,
      left,
      ActionType.HIGHLIGHT_LIGHT,
      heapSize,
      roles
    );
    largest = left;
  } else {
    memento.addBlank({ line: 5 + gap, name: currentAlg }, A, heapSize, roles);
  }
  memento.addBlank({ line: 6 + gap, name: currentAlg }, A, heapSize, roles);
  if (right < heapSize && A[right] > A[largest]) {
    memento.addSnapshot(
      { line: 7 + gap, name: currentAlg },
      A,
      right,
      ActionType.HIGHLIGHT_LIGHT,
      heapSize,
      roles
    );
    largest = right;
  }
  memento.addBlank({ line: 8 + gap, name: currentAlg }, A, heapSize, roles);
  if (largest !== i) {
    memento.addSnapshot(
      { line: 9 + gap, name: currentAlg },
      A,
      largest,
      ActionType.HIGHLIGHT_FULL,
      heapSize,
      roles
    );
    roles = [];
    [A[i], A[largest]] = [A[largest], A[i]];
    memento.addSwap({ line: 9 + gap, name: currentAlg }, A, i, largest, heapSize, roles);
    memento.addBlank({ line: 10 + gap, name: currentAlg }, A, heapSize, roles);
    maxHeapify(A, largest, heapSize, memento, currentAlg, gap);
  }
}

export function heapExtractMax(A: number[], memento: HeapMemento): number | undefined {
  memento.addBlank({ line: 1, name: "HeapExtractMax" }, A);
  if (A.length < 1) {
    memento.addBlank({ line: 2, name: "HeapExtractMax" }, A);
    return;
  }
  memento.addSnapshot({ line: 3, name: "HeapExtractMax" }, A, 0, ActionType.HIGHLIGHT_FULL);
  const max = A[0];
  A[0] = A[A.length - 1];
  memento.addSnapshot({ line: 4, name: "HeapExtractMax" }, A, 0, ActionType.CHANGE);
  A.pop();
  memento.addBlank({ line: 5, name: "HeapExtractMax" }, A);
  memento.addBlank({ line: 6, name: "HeapExtractMax" }, A);
  maxHeapify(A, 0, A.length, memento, "HeapExtractMax", gaps.heapExtractMax);
  memento.addBlank({ line: 7, name: "HeapExtractMax" }, A);
  return max;
}

export function heapMax(A: number[], memento: HeapMemento) {
  memento.addBlank({ line: 1, name: "HeapMax" }, A);
  if (A.length < 1) {
    memento.addBlank({ line: 2, name: "HeapMax" }, A);
    return;
  }
  memento.addSnapshot({ line: 3, name: "HeapMax" }, A, 0, ActionType.HIGHLIGHT_FULL);
  memento.addBlank({ line: 3, name: "HeapMax" }, A);
}

export function maxHeapInsert(A: number[], memento: HeapMemento, key: number): void {
  memento.addBlank({ line: 1, name: "MaxHeapInsert" }, A);
  A.push(-Infinity);
  memento.addSnapshot({ line: 2, name: "MaxHeapInsert" }, A, A.length - 1, ActionType.ADD);
  memento.addBlank({ line: 3, name: "MaxHeapInsert" }, A);
  heapIncreaseKey(A, A.length - 1, key, memento, "MaxHeapInsert", gaps.heapInsert);
}

export function heapIncreaseKey(
  A: number[],
  i: number,
  key: number,
  memento: HeapMemento,
  currentAlg: HeapPseudoCodeKeys,
  gap = 0
): void {
  memento.addBlank({ line: 1 + gap, name: currentAlg }, A);
  if (key < A[i]) {
    memento.addBlank({ line: 2 + gap, name: currentAlg }, A);
    return;
  }
  A[i] = key;
  memento.addSnapshot({ line: 3 + gap, name: currentAlg }, A, i, ActionType.CHANGE);
  memento.addBlank({ line: 4 + gap, name: currentAlg }, A);
  while (i > 0 && A[Math.floor((i - 1) / 2)] < A[i]) {
    const j = Math.floor((i - 1) / 2);
    [A[i], A[j]] = [A[j], A[i]];
    memento.addSwap({ line: 5 + gap, name: currentAlg }, A, i, j);
    i = Math.floor((i - 1) / 2);
    memento.addSnapshot({ line: 6 + gap, name: currentAlg }, A, i, ActionType.HIGHLIGHT_LIGHT);
  }
  memento.addBlank({ line: 6 + gap, name: currentAlg }, A);
}

export function maxHeapSort(A: number[], memento: HeapMemento): number[] {
  let heapSize = A.length;
  memento.addBlank({ line: 2, name: "MaxHeapSort" }, A, heapSize);
  for (let i = A.length - 1; i > 0; i--) {
    [A[0], A[i]] = [A[i], A[0]];
    memento.addSwap({ line: 3, name: "MaxHeapSort" }, A, 0, i, heapSize);
    heapSize--;
    memento.addBlank({ line: 5, name: "MaxHeapSort" }, A, heapSize);
    maxHeapify(A, 0, heapSize, memento, "MaxHeapSort", gaps.heapSort);
  }
  memento.addBlank({ line: 0, name: "MaxHeapSort" }, A, heapSize - 1);
  return A;
}
