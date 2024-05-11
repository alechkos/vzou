import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LinkedListNode } from "../../../ClassObjects/LinkedList/LinkedListNode";

const initialState = {
  head: undefined as LinkedListNode | undefined,
  isPlaying: false,
  inputArray: "",
  error: "",
  currentAlg: "",
  currentLine: 0,
  inputValues: {
    Search: +"",
    Insert: +"",
    Delete: +"",
  },
};

const linkedListSlice = createSlice({
  name: "linkedList",
  initialState: initialState,
  reducers: {
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
      return state;
    },
    setCurrentAlgorithm(state, action: PayloadAction<string>) {
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
} = linkedListSlice.actions;
