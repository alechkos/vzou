import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

import { numbersToSortItems } from "../../../components/Simulation/Sorts/helpers/functions";
import { SortItem } from "../../../components/Simulation/Sorts/helpers/types";

export enum ItemColor {
  BASE = "#84cc16",
  MARKED = "#ecfccb",
}

export interface State {
  data: SortItem[];
  i: number;
  j: number;
  line: number;
  keyValue?: number;
  enteredValue: string;
}

interface ActionPayload {
  indexList: number[];
  line: number;
}

export type InsertionSortPayload = number[] | number | ActionPayload | undefined;

const initialState: State = {
  data: [] as SortItem[],
  i: -2,
  j: -2,
  line: -1,
  enteredValue: "",
};

const insertionSortSlice = createSlice({
  name: "insertionsort",
  initialState,
  reducers: {
    setData(state, action: PayloadAction<number[]>) {
      state = { data: [] as SortItem[], i: -2, j: -2, line: -1, enteredValue: state.enteredValue };
      state.data = numbersToSortItems(action.payload);
      return state;
    },
    setLine(state, action: PayloadAction<number>) {
      state.line = action.payload;
    },
    setI(state, action: PayloadAction<ActionPayload>) {
      state.i = action.payload.indexList[0];
      state.line = action.payload.line;
    },
    setJ(state, action: PayloadAction<ActionPayload>) {
      state.j = action.payload.indexList[0];
      state.line = action.payload.line;
    },
    setKey(state, action: PayloadAction<ActionPayload>) {
      state.keyValue = action.payload.indexList[0];
      state.line = action.payload.line;
    },
    changeElement(state, action: PayloadAction<ActionPayload>) {
      // change element value and mark the element
      const { indexList, line } = action.payload;
      state.data[indexList[0]].value = indexList[1];
      state.data[indexList[0]].color = ItemColor.MARKED;
      state.line = line;
    },
    unmark(state, action: PayloadAction<ActionPayload>) {
      // change element value and mark the element
      const { indexList, line } = action.payload;
      state.data[indexList[0]].color = ItemColor.BASE;
      state.line = line;
    },
    initAnimation(state) {
      state.i = -2;
      state.j = -2;
      state.line = -1;
      state.keyValue = undefined;
    },
    setState(state, action: PayloadAction<State>) {
      return action.payload;
    },
    setEnteredValue(state, action: PayloadAction<string>) {
      state.enteredValue = action.payload;
    },
  },
});

export default insertionSortSlice.reducer;
export const insertionSortActions = insertionSortSlice.actions;
