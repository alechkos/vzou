import { graphReducers, graphState } from "./graph-state";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ...graphState,
};

const bellmanFordSlice = createSlice({
  name: "BellmanFord",
  initialState,
  reducers: {
    ...graphReducers,
  },
});

export default bellmanFordSlice.reducer;

export const {
  setPlaying,
  setRoles,
  setActions,
  setPassedNodes,
  setVisitedNodes,
  setError,
  setInputArray,
  setGraphData,
  clearInputArray,
  setDirected,
} = bellmanFordSlice.actions;
