import mainState from "./main-state";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Events, NodeRole } from "../../../components/Simulation/BinaryTree/BinaryTreeTypes";
import { CodeReference } from "../../../components/Simulation/PseudoCode/HeapPseudoCodeData";
import { HashTableNode } from "../../../ClassObjects/HashTable/HashTableNode";
import { HashTableAlgNames } from "../../../components/Simulation/PseudoCode/HashTablePseudoCodeData";

const inputArray: { size: number; keys: number[]; method: string; A: number } = {
  size: 0,
  keys: [],
  method: "",
  A: 0,
};

const initialState = {
  ...mainState,
  head: undefined as HashTableNode | undefined,
  currentAlg: "Search" as HashTableAlgNames,
  inputValues: {
    Search: +"",
    Insert: +"",
    Delete: +"",
  },
  A: "",
  hashTableSize: "",
  hashTableValues: "",
  inputArray,
};

const hashTableSlice = createSlice({
  name: "hashTable",
  initialState,
  reducers: {
    setA(state, action: PayloadAction<string>) {
      state.A = action.payload;
    },
    setSizeForHash(state, action: PayloadAction<string>) {
      state.hashTableSize = action.payload;
    },
    setValuesForHash(state, action: PayloadAction<string>) {
      state.hashTableValues = action.payload;
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
      return state;
    },
    setCurrentAlgorithm(state, action: PayloadAction<HashTableAlgNames>) {
      state.currentAlg = action.payload;
      return state;
    },
    setInput(
      state,
      action: PayloadAction<{
        val: number;
        key: "Search" | "Insert" | "Delete";
      }>
    ) {
      state.inputValues[action.payload.key] = action.payload.val;
      return state;
    },
    setInputArray(
      state,
      action: PayloadAction<{ size: number; keys: number[]; method: string; A: number }>
    ) {
      state.inputArray = { ...action.payload };
    },
    clearInputArray(state) {
      state.hashTableSize = "";
      state.hashTableValues = "";
      state.inputArray = { size: 0, keys: [], method: "", A: 0 };
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
    setCodeRef(state, action: PayloadAction<CodeReference<HashTableAlgNames>>) {
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
  setHead,
  setActions,
  setRoles,
  setCodeRef,
  setPlaying,
  setPassedNodes,
  setCurrentAlgorithm,
  clearInputArray,
  setSizeForHash,
  setValuesForHash,
  setInputArray,
  setA,
} = hashTableSlice.actions;
