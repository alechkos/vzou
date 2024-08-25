import { graphReducers, graphState } from "./graph-state";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CodeReference } from "../../../components/Simulation/PseudoCode/HeapPseudoCodeData";
import { KruskalNode } from "../../../ClassObjects/Kruskal/KruskalNode";
import { KruskalItemObj } from "../../../ClassObjects/Kruskal/KruskalItemObj";
import { KruskalAlgNames } from "../../../components/Simulation/PseudoCode/KruskalPseudoCodeData";
import { KruskalTableType, linksType } from "../../../types/GraphTypes";

const tableData: KruskalTableType = [];
const links: linksType = [];
const T: linksType = [];

const initialState = {
  ...graphState,
  initialNode: undefined as KruskalNode | undefined,
  currentAlg: "Search" as KruskalAlgNames,
  countRows: [1],
  from: [] as string[],
  to: [] as string[],
  weight: [] as string[],
  inputData: [] as { source: number; target: number; weight: number }[],
  graphNodes: [] as KruskalItemObj[],
  T,
  tableData,
  links,
};

const kruskalSlice = createSlice({
  name: "Prim",
  initialState,
  reducers: {
    ...graphReducers,
    setInitialNode(state, action: PayloadAction<KruskalNode | undefined>) {
      state.initialNode = action.payload;
    },
    setCodeRef(state, action: PayloadAction<CodeReference<KruskalAlgNames>>) {
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
    setGraphNodes(state, action: PayloadAction<KruskalItemObj[]>) {
      state.graphNodes = action.payload;
    },
    setT(state, action: PayloadAction<linksType>) {
      state.T = action.payload;
    },
    setTableData(state, action: PayloadAction<KruskalTableType>) {
      state.tableData = action.payload;
    },
    setLinks(state, action: PayloadAction<linksType>) {
      state.links = action.payload;
    },
  },
});

export default kruskalSlice.reducer;

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
  setInputData,
  changeInputData,
  deleteInputData,
  setFrom,
  setWeight,
  setTo,
  setCountRows,
  setT,
  setLinks,
} = kruskalSlice.actions;
