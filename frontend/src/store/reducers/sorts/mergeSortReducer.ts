import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

import { ItemColor } from "./quickSortReducer";

import { numbersToSortItems } from "../../../components/Simulation/Sorts/helpers/functions";
import { SortItem } from "../../../components/Simulation/Sorts/helpers/types";

export interface State {
  tree: MergeNode[];
  line: number;
  left: number;
  right: number;
  enteredValue: string;
}

interface BasePayload {
  line: number;
}

interface Nodes extends BasePayload {
  nodesList: number[];
}

interface MarkElements extends Nodes {
  elements: number[];
  color: ItemColor;
}

interface SetIndexesPayload extends BasePayload {
  left: number;
  right: number;
}

interface ActionOnNodePayload extends BasePayload {
  nodeIndex: number;
}

interface AddNodePayload extends ActionOnNodePayload {
  data: number[];
}

interface ChangeNodeValuePayload extends ActionOnNodePayload {
  value: number;
  index: number;
}

export type MergeSortPayload =
  | number[]
  | number
  | AddNodePayload
  | ChangeNodeValuePayload
  | Nodes
  | ActionOnNodePayload
  | MarkElements
  | SetIndexesPayload
  | undefined;

export interface MergeNode {
  data: SortItem[];
}

const initialState: State = {
  tree: Array.from({ length: 16 }, () => ({ data: [] })),
  line: -1,
  right: -2,
  left: -2,
  enteredValue: "",
};

const mergeSortSlice = createSlice({
  name: "mergesort",
  initialState,
  reducers: {
    init(state, action: PayloadAction<number[]>) {
      state = {
        tree: Array.from({ length: 16 }, () => ({ data: [] })),
        line: -1,
        right: -2,
        left: -2,
        enteredValue: state.enteredValue,
      };
      // 4 levels tree
      state.tree = Array.from({ length: 16 }, () => ({ data: [] }));
      state.tree[1].data = numbersToSortItems(action.payload); // head
      return state;
    },
    addNode(state, action: PayloadAction<AddNodePayload>) {
      const { nodeIndex, data, line } = action.payload;
      state.line = line;
      state.tree[nodeIndex].data = numbersToSortItems(data);
    },
    setLine(state, action: PayloadAction<number>) {
      state.line = action.payload;
    },
    changeValue(state, action: PayloadAction<ChangeNodeValuePayload>) {
      const { nodeIndex, value, line, index } = action.payload;
      state.tree[nodeIndex].data[index].value = value;
      state.tree[nodeIndex].data[index].hide = false;
      state.line = line;
    },
    deleteNodes(state, action: PayloadAction<Nodes>) {
      const { nodesList, line } = action.payload;
      state.line = line;
      for (const i of nodesList) state.tree[i].data = [];
    },
    initNodeData(state, action: PayloadAction<ActionOnNodePayload>) {
      const { line, nodeIndex } = action.payload;
      state.line = line;
      for (let i = 0; i < state.tree[nodeIndex].data.length; i++) {
        state.tree[nodeIndex].data[i].hide = true;
      }
    },
    markNode(state, action: PayloadAction<ActionOnNodePayload>) {
      const { line, nodeIndex } = action.payload;
      for (let i = 0; i < state.tree[nodeIndex].data.length; i++) {
        state.tree[nodeIndex].data[i].color = ItemColor.MARKED;
      }
      state.line = line;
    },
    markElementInNode(state, action: PayloadAction<MarkElements>) {
      const { line, nodesList, elements, color } = action.payload;
      let node;
      let element;
      for (let i = 0; i < nodesList.length; i++) {
        node = nodesList[i];
        element = elements[i];
        state.tree[node].data[element].color = color;
      }
      state.line = line;
    },
    setIndexes(state, action: PayloadAction<SetIndexesPayload>) {
      const { line, right, left } = action.payload;
      state.left = left;
      state.right = right;
      state.line = line;
    },
    setState(state, action: PayloadAction<State>) {
      return action.payload;
    },
    setEnteredValue(state, action: PayloadAction<string>) {
      state.enteredValue = action.payload;
    },
  },
});

export default mergeSortSlice.reducer;
export const mergeSortActions = mergeSortSlice.actions;
