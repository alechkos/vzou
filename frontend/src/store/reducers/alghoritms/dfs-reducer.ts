import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NodeRole } from "../../../components/Simulation/BinaryTree/BinaryTreeTypes";
import { Events } from "../../../components/Simulation/BinaryTree/BinaryTreeTypes";
import { DFSAlgNames } from "../../../components/Simulation/PseudoCode/DFSPseudoCodeData";
import { CodeReference } from "../../../components/Simulation/PseudoCode/HeapPseudoCodeData";
import { graphType } from "../../../types/GraphTypes";
import { DFSNode } from "../../../ClassObjects/DFS/DFSNode";
import { DFSItemObj } from "../../../ClassObjects/DFS/DFSItemObj";

const graphData: graphType = { nodes: [], links: [] };
const graphNodes: DFSItemObj[] = [];
const tableData: { id: number; data: { color: string; pi: number; d: number; f: number } }[] = [];

const initialState = {
  graphData,
  initialNode: undefined as DFSNode | undefined,
  isPlaying: false,
  inputArray: "",
  error: "",
  currentAlg: "Search" as DFSAlgNames,
  currentLine: 0,
  currentRoles: [] as NodeRole[],
  visitedNodes: [] as number[],
  passedNodes: [] as number[],
  currentActions: [] as Events,
  graphNodes,
  tableData,
};

const bfsSlice = createSlice({
  name: "BFS",
  initialState,
  reducers: {
    setPlaying(state, action: PayloadAction<boolean>) {
      state.isPlaying = action.payload;
    },
    setInitialNode(state, action: PayloadAction<DFSNode | undefined>) {
      state.initialNode = action.payload;
    },
    setRoles(state, action: PayloadAction<NodeRole[]>) {
      state.currentRoles = action.payload;
    },
    setActions(state, action: PayloadAction<Events>) {
      state.currentActions = action.payload;
    },
    setPassedNodes(state, action: PayloadAction<number[]>) {
      state.passedNodes = action.payload;
    },
    setVisitedNodes(state, action: PayloadAction<number[]>) {
      state.visitedNodes = action.payload;
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    setInputArray(state, action: PayloadAction<string>) {
      state.inputArray = action.payload;
    },
    clearInputArray(state) {
      state.inputArray = "";
    },
    setGraphData(state, action: PayloadAction<graphType>) {
      state.graphData = action.payload;
    },
    setCodeRef(state, action: PayloadAction<CodeReference<DFSAlgNames>>) {
      state.currentAlg = action.payload.name;
      state.currentLine = action.payload.line;
      return state;
    },
    setGraphNodes(state, action: PayloadAction<DFSItemObj[]>) {
      state.graphNodes = action.payload;
    },
    setTableData(
      state,
      action: PayloadAction<
        { id: number; data: { color: string; pi: number; d: number; f: number } }[]
      >
    ) {
      state.tableData = action.payload;
    },
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
} = bfsSlice.actions;
