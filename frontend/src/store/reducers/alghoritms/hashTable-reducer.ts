import mainState from "./main-state";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LinkedListAlgNames } from "../../../components/Simulation/PseudoCode/LinkedListPseudoCodeData";
import { Events, NodeRole } from "../../../components/Simulation/BinaryTree/BinaryTreeTypes";
import { CodeReference } from "../../../components/Simulation/PseudoCode/HeapPseudoCodeData";
import { HashTableNode } from "../../../ClassObjects/HashTable/HashTableNode";

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
  hashTableSize: "",
  hashTableValues: "",
  inputArray: {
    size: 0,
    keys: [],
    method: "",
  },
};

const hashTableSlice = createSlice({
  name: "hashTable",
  initialState,
  reducers: {
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
    setInputArray(
      state,
      action: PayloadAction<{ size: number; keys: number[]; method: string }>
    ) {},
    clearInputArray(state) {
      state.hashTableSize = "";
      state.hashTableValues = "";
      state.inputArray = { size: 0, keys: [], method: "" };
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
} = hashTableSlice.actions;
