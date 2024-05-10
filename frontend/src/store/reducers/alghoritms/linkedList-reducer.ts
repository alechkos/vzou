import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  isPlaying: false,
  inputArray: "",
  error: "",
  currentAlg: "",
  currentLine: 0,
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
  },
});

export default linkedListSlice.reducer;

export const { setError, setCurrentAlgorithm } = linkedListSlice.actions;
