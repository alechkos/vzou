import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NodeRole } from "../../../components/Simulation/BinaryTree/BinaryTreeTypes";
import { Events } from "../../../components/Simulation/BinaryTree/BinaryTreeTypes";
import { BfsAlgNames } from "../../../components/Simulation/PseudoCode/BfsPseudoCodeData";
import { CodeReference } from "../../../components/Simulation/PseudoCode/HeapPseudoCodeData";
import d3 from "d3";
import { graphType, SVGType } from "../../../types/GraphTypes";
import { BfsNode } from "../../../ClassObjects/BFS/BfsNode";

const graphData: graphType = { nodes: [], links: [] };

const initialState = {
  graphData,
  initialValue: "",
  initialNode: undefined as BfsNode | undefined,
  isPlaying: false,
  inputArray: "",
  error: "",
  currentAlg: "Search" as BfsAlgNames,
  currentLine: 0,
  currentRoles: [] as NodeRole[],
  visitedNodes: [] as number[],
  passedNodes: [] as number[],
  traversalResults: [] as number[],
  currentActions: [] as Events,
};

const bfsSlice = createSlice({
  name: "BFS",
  initialState,
  reducers: {
    setPlaying(state, action: PayloadAction<boolean>) {
      state.isPlaying = action.payload;
    },
    setInitialNode(state, action: PayloadAction<BfsNode | undefined>) {
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
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    setInitialValue(state, action: PayloadAction<string>) {
      state.initialValue = action.payload;
    },
    setInputArray(state, action: PayloadAction<string>) {
      state.inputArray = action.payload;
    },
    setGraphData(state, action: PayloadAction<graphType>) {
      state.graphData = action.payload;
    },
    setCodeRef(state, action: PayloadAction<CodeReference<BfsAlgNames>>) {
      state.currentAlg = action.payload.name;
      state.currentLine = action.payload.line;
      return state;
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
  setError,
  setInitialValue,
  setInputArray,
  setGraphData,
  setCodeRef,
} = bfsSlice.actions;
