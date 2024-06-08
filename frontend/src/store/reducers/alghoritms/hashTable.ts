import mainState from "./main-state";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ...mainState,
  head: "",
  currentAlg: "",
  inputValues: {},
};

const hashTableSlice = createSlice({
  name: "hashTable",
  initialState,
  reducers: {},
});

export default hashTableSlice.reducer;

export const {} = hashTableSlice.actions;
