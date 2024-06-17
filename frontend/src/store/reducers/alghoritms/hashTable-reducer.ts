import mainState from "./main-state";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LinkedListAlgNames } from "../../../components/Simulation/PseudoCode/LinkedListPseudoCodeData";
import { Events, NodeRole } from "../../../components/Simulation/BinaryTree/BinaryTreeTypes";
import { CodeReference } from "../../../components/Simulation/PseudoCode/HeapPseudoCodeData";
import { HashTableNode } from "../../../ClassObjects/HashTable/HashTableNode";

const inputArray: Array<{ id: number; listValues: number[] }> = [{ id: 0, listValues: [] }];

const initialState = {
  ...mainState,
  head: undefined as HashTableNode | undefined,
  currentAlg: "",
  inputValues: {
    Search: +"",
    InsertToHead: +"",
    InsertToTail: +"",
    DeleteFromHead: +"",
    DeleteFromTail: +"",
  },
  inputArray,
};

const hashTableSlice = createSlice({
  name: "hashTable",
  initialState,
  reducers: {
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
      return state;
    },
    setCurrentAlgorithm(state, action: PayloadAction<LinkedListAlgNames>) {
      state.currentAlg = action.payload;
      return state;
    },
    setInput(
      state,
      action: PayloadAction<{
        val: number;
        key: "Search" | "InsertToHead" | "InsertToTail" | "DeleteFromTail" | "DeleteFromHead";
      }>
    ) {
      state.inputValues[action.payload.key] = action.payload.val;
      return state;
    },
    setInputArray(state, action: PayloadAction<Array<{ id: number; listValues: number[] }>>) {
      state.inputArray = [...action.payload];
      return state;
    },
    clearInputArray(state) {
      state.inputArray = [];
    },
    setPlaying(state, action: PayloadAction<boolean>) {
      state.isPlaying = action.payload;
    },
    setHead(state, action: PayloadAction<HashTableNode | undefined>) {
      state.head = action.payload;
    },
    setActions(state, action: PayloadAction<Events>) {
      state.currentActions = action.payload;
      return state;
    },
    setRoles(state, action: PayloadAction<NodeRole[]>) {
      state.currentRoles = action.payload;
    },
    setCodeRef(state, action: PayloadAction<CodeReference<LinkedListAlgNames>>) {
      state.currentAlg = action.payload.name;
      state.currentLine = action.payload.line;
      return state;
    },
    setPassedNodes(state, action: PayloadAction<number[]>) {
      state.passedNodes = action.payload;
      return state;
    },
  },
});

export default hashTableSlice.reducer;

export const {
  setError,
  setInput,
  setInputArray,
  setHead,
  setActions,
  setRoles,
  setCodeRef,
  setPlaying,
  setPassedNodes,
  setCurrentAlgorithm,
  clearInputArray,
} = hashTableSlice.actions;
