import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DFSAlgNames } from "../../../components/Simulation/PseudoCode/DFSPseudoCodeData";
import { CodeReference } from "../../../components/Simulation/PseudoCode/HeapPseudoCodeData";
import { DFSNode } from "../../../ClassObjects/DFS/DFSNode";
import { graphReducers, graphState } from "./graph-state";

const initialState = {
  ...graphState,
  initialNode: undefined as DFSNode | undefined,
  currentAlg: "Search" as DFSAlgNames,
};

const bfsSlice = createSlice({
  name: "BFS",
  initialState,
  reducers: {
    setInitialNode(state, action: PayloadAction<DFSNode | undefined>) {
      state.initialNode = action.payload;
    },
    setCodeRef(state, action: PayloadAction<CodeReference<DFSAlgNames>>) {
      state.currentAlg = action.payload.name;
      state.currentLine = action.payload.line;
      return state;
    },
    ...graphReducers,
  },
});

export default bfsSlice.reducer;

export const {
  setPlaying,
  setInitialNode,
  setRoles,
  setActions,
  setPassedNodes,
  setVisitedNodes,
  setError,
  setInputArray,
  setGraphData,
  setCodeRef,
  setGraphNodes,
  setTableData,
  clearInputArray,
  setDirected,
} = bfsSlice.actions;
