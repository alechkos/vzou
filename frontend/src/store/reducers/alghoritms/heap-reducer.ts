import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

import {
  Events,
  NodeRole,
  TreeNode,
} from "../../../components/Simulation/BinaryTree/BinaryTreeTypes";
import { arrayToBinaryTree } from "../../../components/Simulation/BinaryTree/Helpers/Functions";
import {
  CodeReference,
  HeapAlgNames,
  HeapPseudoCode,
} from "../../../components/Simulation/PseudoCode/HeapPseudoCodeData";
import mainState from "./main-state";

const heapArray = [2, 1, 0];

const initialState = {
  ...mainState,
  root: arrayToBinaryTree(heapArray),
  currentArr: heapArray,
  currentAlg: "BuildMaxHeap" as keyof typeof HeapPseudoCode,
  inputKey: 0,
  currentHeapSize: heapArray.length,
};

const heapSlice = createSlice({
  name: "heap",
  initialState,
  reducers: {
    setRoot(state, action: PayloadAction<TreeNode | undefined>) {
      state.root = action.payload;
      return state;
    },
    setActions(state, action: PayloadAction<Events>) {
      state.currentActions = action.payload;
      return state;
    },
    setArray(state, action: PayloadAction<{ arr: number[]; currentHeapSize: number }>) {
      state.currentArr = action.payload.arr;
      state.currentHeapSize = action.payload.currentHeapSize;
      return state;
    },
    setPlaying(state, action: PayloadAction<boolean>) {
      state.isPlaying = action.payload;
      return state;
    },
    setInputArray(state, action: PayloadAction<string>) {
      state.inputArray = action.payload;
      return state;
    },
    setInputKey(state, action: PayloadAction<number>) {
      state.inputKey = action.payload;
      return state;
    },
    setCodeRef(state, action: PayloadAction<CodeReference<HeapAlgNames>>) {
      state.currentAlg = action.payload.name;
      state.currentLine = action.payload.line;
      return state;
    },
    setRoles(state, action: PayloadAction<NodeRole[]>) {
      state.currentRoles = action.payload;
    },
  },
});

export default heapSlice.reducer;
export const {
  setRoot,
  setCodeRef,
  setInputKey,
  setInputArray,
  setPlaying,
  setActions,
  setArray,
  setRoles,
} = heapSlice.actions;
