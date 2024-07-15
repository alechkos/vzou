import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LinkedListNode } from "../../../ClassObjects/LinkedList/LinkedListNode";
import { LinkedListAlgNames } from "../../../components/Simulation/PseudoCode/LinkedListPseudoCodeData";
import { Events, NodeRole } from "../../../components/Simulation/BinaryTree/BinaryTreeTypes";
import { CodeReference } from "../../../components/Simulation/PseudoCode/HeapPseudoCodeData";
import mainState from "./main-state";

const initialState = {
  ...mainState,
  head: undefined as LinkedListNode | undefined,
  currentAlg: "Search" as LinkedListAlgNames,
  inputValues: {
    Search: +"",
    InsertToHead: +"",
    InsertToTail: +"",
    DeleteFromHead: +"",
    DeleteFromTail: +"",
  },
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
    addNodeToHead(state, action: PayloadAction<number>) {
      state.inputArray = action.payload.toString() + ", " + state.inputArray;
      return state;
    },
    deleteNodeFromHead(state) {
      const newArray = state.inputArray.split(",");
      state.inputArray = "";
      newArray.forEach((num, index) => {
        if (index === 0) {
        } else if (index !== newArray.length - 1) {
          state.inputArray += num + ", ";
        } else {
          state.inputArray += num;
        }
      });
      return state;
    },
    addNodeToTail(state, action: PayloadAction<number>) {
      state.inputArray = state.inputArray + ", " + action.payload.toString();
      return state;
    },
    deleteNodeFromTail(state) {
      const newArray = state.inputArray.split(",");
      newArray.pop();
      if (newArray) state.inputArray = newArray.toString();
      else state.inputArray = "";
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
  addNodeToHead,
  deleteNodeFromHead,
  addNodeToTail,
  deleteNodeFromTail,
} = linkedListSlice.actions;
