import { graphReducers, graphState } from "./graph-state";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BellmanFordNode } from "../../../ClassObjects/BellmanFord/BellmanFordNode";
import { BellmanFordAlgNames } from "../../../components/Simulation/PseudoCode/BelmanFordPseudoCode";
import { CodeReference } from "../../../components/Simulation/PseudoCode/HeapPseudoCodeData";
import { DFSAlgNames } from "../../../components/Simulation/PseudoCode/DFSPseudoCodeData";

const initialState = {
  ...graphState,
  initialNode: undefined as BellmanFordNode | undefined,
  currentAlg: "Search" as BellmanFordAlgNames,
  countRows: [1],
  inputData: [] as { source: number; target: number; weight: number }[],
};

const bellmanFordSlice = createSlice({
  name: "BellmanFord",
  initialState,
  reducers: {
    ...graphReducers,
    setInitialNode(state, action: PayloadAction<BellmanFordNode | undefined>) {
      state.initialNode = action.payload;
    },
    setCodeRef(state, action: PayloadAction<CodeReference<BellmanFordAlgNames>>) {
      state.currentAlg = action.payload.name;
      state.currentLine = action.payload.line;
      return state;
    },
    setCountRows(state, action: PayloadAction<number>) {
      state.countRows.push(action.payload);
    },
    clearInputArray(state) {
      state.inputArray = "";
      state.countRows = [1];
    },
    setInputData(state, action: PayloadAction<{ source: number; target: number; weight: number }>) {
      state.inputData.push(action.payload);
    },
    changeInputData(
      state,
      action: PayloadAction<{ source: number; target: number; weight: number; index: number }>
    ) {
      state.inputData[action.payload.index] = {
        source: action.payload.source,
        target: action.payload.target,
        weight: action.payload.weight,
      };
    },
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
  setInitialNode,
  setCodeRef,
  setGraphNodes,
  setCountRows,
  setInputData,
  changeInputData,
} = bellmanFordSlice.actions;
