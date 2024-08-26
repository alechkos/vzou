import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

import { numbersToSortItems } from "../../../components/Simulation/Sorts/helpers/functions";
import { SortItem } from "../../../components/Simulation/Sorts/helpers/types";

export enum ItemColor {
  BASE = "#84cc16",
  MARKED = "#ecfccb",
  PIVOT = "#FF6666",
  DONE = "#E0E0E0",
}

export interface State {
  data: SortItem[];
  i: number;
  j: number;
  p: number;
  r: number;
  line: number;
  enteredValue: string;
}

interface ActionPayload {
  indexList: number[];
  line: number;
}

export type QuickSortPayload = number[] | number | ActionPayload;

const initialState = {
  data: [] as SortItem[],
  i: -2,
  j: -2,
  p: -1,
  r: -1,
  line: -1,
  enteredValue: "",
};

const quickSortSlice = createSlice({
  name: "quickSort",
  initialState,
  reducers: {
    init(state, action: PayloadAction<number[]>) {
      state = {
        data: [] as SortItem[],
        i: -2,
        j: -2,
        p: -1,
        r: -1,
        line: -1,
        enteredValue: state.enteredValue,
      };
      if (action.payload.length > 0) {
        state.data = numbersToSortItems(action.payload);
      }
      return state;
    },
    mark(state, action: PayloadAction<ActionPayload>) {
      const { indexList, line } = action.payload;
      for (const index of indexList) {
        state.data[index] = markElem(state.data[index]);
      }
      state.line = line;
      return state;
    },
    unmark(state, action: PayloadAction<ActionPayload>) {
      const { indexList, line } = action.payload;
      for (const index of indexList) {
        state.data[index] = unMarkElem(state.data[index]);
      }
      state.line = line;
      return state;
    },
    markPivot(state, action: PayloadAction<ActionPayload>) {
      const { indexList, line } = action.payload;
      state.data[indexList[0]].color = ItemColor.PIVOT;
      state.line = line;
      return state;
    },
    done(state, action: PayloadAction<ActionPayload>) {
      const { indexList, line } = action.payload;
      state.data[indexList[0]].color = ItemColor.DONE;
      state.line = line;
      if (line === 15) {
        state.i = -2;
        state.j = -2;
        state.p = -1;
        state.r = -1;
      }
      return state;
    },
    swap(state, action: PayloadAction<ActionPayload>) {
      const { indexList, line } = action.payload;
      const i = indexList[0];
      const j = indexList[1];
      const x = state.data[i];
      state.data[i] = state.data[j];
      state.data[j] = x;
      state.line = line;
      return state;
    },
    setI(state, action: PayloadAction<ActionPayload>) {
      const { indexList, line } = action.payload;
      state.i = indexList[0];
      state.line = line;
    },
    setJ(state, action: PayloadAction<ActionPayload>) {
      const { indexList, line } = action.payload;
      state.j = indexList[0];
      state.line = line;
    },
    setPandR(state, action: PayloadAction<ActionPayload>) {
      const { indexList, line } = action.payload;
      state.p = indexList[0];
      state.r = indexList[1];
      state.line = line;
    },
    setLine(state, action: PayloadAction<number>) {
      state.line = action.payload;
    },
    setState(state, action: PayloadAction<State>) {
      return action.payload;
    },
    setEnteredValue(state, action: PayloadAction<string>) {
      state.enteredValue = action.payload;
    },
  },
});

export default quickSortSlice.reducer;
export const quickSortActions = quickSortSlice.actions;

function markElem(elem: SortItem) {
  const newElem: SortItem = {
    ...elem,
    isSelected: true,
    color: elem.color === ItemColor.BASE ? ItemColor.MARKED : elem.color,
  };
  return newElem;
}

function unMarkElem(elem: SortItem) {
  const newElem: SortItem = {
    ...elem,
    isSelected: false,
    color: elem.color === ItemColor.MARKED ? ItemColor.BASE : elem.color,
  };
  return newElem;
}
