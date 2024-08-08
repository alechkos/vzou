import { graphReducers, graphState } from "./graph-state";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BellmanFordNode } from "../../../ClassObjects/BellmanFord/BellmanFordNode";
import { BellmanFordAlgNames } from "../../../components/Simulation/PseudoCode/BelmanFordPseudoCode";
import { CodeReference } from "../../../components/Simulation/PseudoCode/HeapPseudoCodeData";
import { BellmanFordItemObj } from "../../../ClassObjects/BellmanFord/BellmanFordItemObj";

const graphNodes: BellmanFordItemObj[] = [];

const initialState = {
  ...graphState,
  graphNodes,
  initialNode: undefined as BellmanFordNode | undefined,
  currentAlg: "Search" as BellmanFordAlgNames,
  countRows: [1],
  from: [] as string[],
  to: [] as string[],
  weight: [] as string[],
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
      state.inputData = [];
      state.from = [];
      state.to = [];
      state.weight = [];
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
    deleteInputData(state, action: PayloadAction<number>) {
      state.countRows.splice(action.payload, 1);
      state.inputData.splice(action.payload, 1);
      state.from.splice(action.payload, 1);
      state.to.splice(action.payload, 1);
      state.weight.splice(action.payload, 1);
    },
    setFrom(state, action: PayloadAction<{ input: string; index: number }>) {
      state.from[action.payload.index] = action.payload.input;
    },
    setTo(state, action: PayloadAction<{ input: string; index: number }>) {
      state.to[action.payload.index] = action.payload.input;
    },
    setWeight(state, action: PayloadAction<{ input: string; index: number }>) {
      state.weight[action.payload.index] = action.payload.input;
    },
    setGraphNodes(state, action: PayloadAction<BellmanFordItemObj[]>) {
      state.graphNodes = action.payload;
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
  setFrom,
  setTo,
  setWeight,
  deleteInputData,
  setTableData,
} = bellmanFordSlice.actions;
