import { graphType, TableDataType } from "../../../types/GraphTypes";
import { Events, NodeRole } from "../../../components/Simulation/BinaryTree/BinaryTreeTypes";
import { PayloadAction } from "@reduxjs/toolkit";
import { DFSItemObj } from "../../../ClassObjects/DFS/DFSItemObj";

const graphData: graphType = { nodes: [], links: [] };
const graphNodes: DFSItemObj[] = [];
const tableData: TableDataType = [];

export const graphState = {
  graphData,
  isPlaying: false,
  inputArray: "",
  error: "",
  currentLine: 0,
  currentRoles: [] as NodeRole[],
  visitedNodes: [] as number[],
  passedNodes: [] as number[],
  currentActions: [] as Events,
  directed: false,
  graphNodes,
  tableData,
};

export const graphReducers = {
  setPlaying(state: any, action: PayloadAction<boolean>) {
    state.isPlaying = action.payload;
  },
  setRoles(state: any, action: PayloadAction<NodeRole[]>) {
    state.currentRoles = action.payload;
  },
  setActions(state: any, action: PayloadAction<Events>) {
    state.currentActions = action.payload;
  },
  setPassedNodes(state: any, action: PayloadAction<number[]>) {
    state.passedNodes = action.payload;
  },
  setVisitedNodes(state: any, action: PayloadAction<number[]>) {
    state.visitedNodes = action.payload;
  },
  setError(state: any, action: PayloadAction<string>) {
    state.error = action.payload;
  },
  setInputArray(state: any, action: PayloadAction<string>) {
    state.inputArray = action.payload;
  },
  clearInputArray(state: any) {
    state.inputArray = "";
  },
  setGraphData(state: any, action: PayloadAction<graphType>) {
    state.graphData = action.payload;
  },
  setDirected(state: any, action: PayloadAction<boolean>) {
    state.directed = action.payload;
  },
  setGraphNodes(state: any, action: PayloadAction<DFSItemObj[]>) {
    state.graphNodes = action.payload;
  },
  setTableData(state: any, action: PayloadAction<TableDataType>) {
    state.tableData = action.payload;
  },
};
