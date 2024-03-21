import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

import { BSTreeNode } from "../../../ClassObjects/BSTreeNode";
import { Events, NodeRole } from "../../../components/Simulation/BinaryTree/BinaryTreeTypes";
import { BSTAlgNames } from "../../../components/Simulation/PseudoCode/BSTreePseudoCodeData";
import { CodeReference } from "../../../components/Simulation/PseudoCode/HeapPseudoCodeData";

const initialState = {
  currentActions: [] as Events,
  currentRoot: undefined as BSTreeNode | undefined,
  isPlaying: false,
  inputArray: "",
  error: "", // TODO:error in search in bst
  currentAlg: "Search" as BSTAlgNames,
  currentLine: 0,
  currentRoles: [] as NodeRole[],
  visitedNodes: [] as number[],
  passedNodes: [] as number[],
  traversalResults: [] as number[],
  inputValues: {
    Successor: +"",
    Predecessor: +"",
    Search: +"",
    Insert: +"",
    DeleteNode: +"",
  },
};

const bstSlice = createSlice({
  name: "bst",
  initialState,
  reducers: {
    setRoot(state, action: PayloadAction<BSTreeNode | undefined>) {
      state.currentRoot = action.payload;
      return state;
    },
    setActions(state, action: PayloadAction<Events>) {
      state.currentActions = action.payload;
      return state;
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
      return state;
    },
    setTraversalResults(state, action: PayloadAction<number[]>) {
      state.traversalResults = action.payload;
      return state;
    },
    setPassedNodes(state, action: PayloadAction<number[]>) {
      state.passedNodes = action.payload;
      return state;
    },
    setPlaying(state, action: PayloadAction<boolean>) {
      state.isPlaying = action.payload;
      return state;
    },
    setVisited(state, action: PayloadAction<number[]>) {
      state.visitedNodes = action.payload;
      return state;
    },
    setInputArray(state, action: PayloadAction<string | number[]>) {
      if (typeof action.payload === "string") {
        state.inputArray = action.payload;
      } else {
        action.payload.forEach((num, index) => {
          if (index !== action.payload.length - 1) {
            state.inputArray += num + ", ";
          } else {
            state.inputArray += num;
          }
        });
      }
      return state;
    },
    addToInputArray(state, action: PayloadAction<number>) {
      state.inputArray += ", " + action.payload.toString();
    },
    deleteFromInputArray(state, action: PayloadAction<number>) {
      const inputArray = state.inputArray.split(",");
      const filteredArray = inputArray.filter((num) => +num !== action.payload);
      state.inputArray = "";
      filteredArray.forEach((num, index) => {
        if (index !== filteredArray.length - 1) {
          state.inputArray += num + ", ";
        } else {
          state.inputArray += num;
        }
      });
    },
    clearInputArray(state) {
      state.inputArray = "";
    },
    setInput(
      state,
      action: PayloadAction<{
        val: number;
        key: "Successor" | "Predecessor" | "Search" | "Insert" | "DeleteNode";
      }>
    ) {
      state.inputValues[action.payload.key] = action.payload.val;
      return state;
    },
    setCodeRef(state, action: PayloadAction<CodeReference<BSTAlgNames>>) {
      state.currentAlg = action.payload.name;
      state.currentLine = action.payload.line;
      return state;
    },
    setRoles(state, action: PayloadAction<NodeRole[]>) {
      state.currentRoles = action.payload;
    },
    setCurrentAlg(state, action: PayloadAction<BSTAlgNames>) {
      state.currentAlg = action.payload;
      return state;
    },
  },
});

export default bstSlice.reducer;
export const {
  setRoot,
  setCodeRef,
  setInput,
  setInputArray,
  setPlaying,
  setActions,
  setError,
  setRoles,
  setVisited,
  setPassedNodes,
  setTraversalResults,
  setCurrentAlg,
  clearInputArray,
  addToInputArray,
  deleteFromInputArray,
} = bstSlice.actions;
