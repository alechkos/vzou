import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

import { numbersToSortItems } from "../../../components/Simulation/Sorts/helpers/functions";
import { SortItem } from "../../../components/Simulation/Sorts/helpers/types";

export interface State {
  data: SortItem[];
  sortData: SortItem[];
  i: number;
  line: number;
  currDigit: number;
  enteredValue: string;
}

interface ActionPayload {
  payload: number;
  line: number;
}

const initialState: State = {
  data: [] as SortItem[],
  sortData: [] as SortItem[],
  i: -1,
  currDigit: -1,
  line: -1,
  enteredValue: "",
};

const radixSortSlice = createSlice({
  name: "radixsort",
  initialState,
  reducers: {
    setData(state, action: PayloadAction<number[]>) {
      state = {
        data: [] as SortItem[],
        sortData: [] as SortItem[],
        i: -1,
        currDigit: -1,
        line: -1,
        enteredValue: state.enteredValue,
      };
      state.data = numbersToSortItems(action.payload);
      // state.sortData = numbersToSortItems(state.data.map(e => e.value!%10));
      for (const item of state.data) {
        item.digit = -1;
      }
      return state;
    },
    setSortData(state, action: PayloadAction<number>) {
      if (action.payload === -1) {
        state.sortData = [] as SortItem[];
      } else {
        state.line = 3;
        for (const item of state.data) {
          const val = Math.floor(item.value / 10 ** action.payload) % 10;
          item.digit = val;
          state.sortData = numbersToSortItems(state.data.map((e) => e.digit!));
        }
      }
      return state;
    },
    sort(state) {
      state.line = 4;
      state.data = state.data.sort((a, b) => a.digit! - b.digit!);
      state.sortData = state.sortData.sort((a, b) => a.value - b.value);
      return state;
    },
    setCurrentDigit(state, action: PayloadAction<number>) {
      state.line = 1;
      state.currDigit = action.payload;
    },
    setLine(state, action: PayloadAction<number>) {
      state.line = action.payload;
    },
    initAnimation(state) {
      state = { ...initialState };
    },
    setState(state, action: PayloadAction<State>) {
      return action.payload;
    },
    setEnteredValue(state, action: PayloadAction<string>) {
      state.enteredValue = action.payload;
    },
  },
});

export default radixSortSlice.reducer;
export const radixSortActions = radixSortSlice.actions;
