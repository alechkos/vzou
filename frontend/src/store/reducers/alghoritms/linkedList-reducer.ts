import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LinkedListNode } from "../../../ClassObjects/LinkedList/LinkedListNode";
import { LinkedListAlgNames } from "../../../components/Simulation/PseudoCode/LinkedListPseudoCodeData";
import { Events, NodeRole } from "../../../components/Simulation/BinaryTree/BinaryTreeTypes";
import { CodeReference } from "../../../components/Simulation/PseudoCode/HeapPseudoCodeData";
import { BSTAlgNames } from "../../../components/Simulation/PseudoCode/BSTreePseudoCodeData";

const initialState = {
  head: undefined as LinkedListNode | undefined,
  isPlaying: false,
  inputArray: "",
  error: "",
  currentAlg: "Search" as LinkedListAlgNames,
  currentLine: 0,
  inputValues: {
    Search: +"",
    Insert: +"",
    Delete: +"",
  },
  currentActions: [] as Events,
  currentRoles: [] as NodeRole[],
  passedNodes: [] as number[],
  currentLength: 0,
};

const linkedListSlice = createSlice({
  name: "linkedList",
  initialState: initialState,
  reducers: {
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
      return state;
    },
    setCurrentAlgorithm(state, action: PayloadAction<LinkedListAlgNames>) {
      state.currentAlg = action.payload;
      return state;
    },
    setInput(state, action: PayloadAction<{ val: number; key: "Search" | "Insert" | "Delete" }>) {
      state.inputValues[action.payload.key] = action.payload.val;
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
    clearInputArray(state) {
      state.inputArray = "";
    },
    setPlaying(state, action: PayloadAction<boolean>) {
      state.isPlaying = action.payload;
    },
    setHead(state, action: PayloadAction<LinkedListNode | undefined>) {
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
    setLength(state, action: PayloadAction<number | undefined>) {
      if (action.payload !== undefined) {
        state.currentLength = action.payload;
        return state;
      }
    },
  },
});

export default linkedListSlice.reducer;

export const {
  setError,
  setCurrentAlgorithm,
  setInput,
  setInputArray,
  clearInputArray,
  setPlaying,
  setHead,
  setPassedNodes,
  setCodeRef,
  setActions,
  setRoles,
  setLength,
} = linkedListSlice.actions;
