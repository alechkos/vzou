import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

import { numbersToSortItems } from "../../../components/Simulation/Sorts/helpers/functions";
import { Colors, SortItem } from "../../../components/Simulation/Sorts/helpers/types";

export interface State {
  A: SortItem[];
  B: SortItem[];
  C: SortItem[];
  k: number;
  indexA: number;
  indexB: number;
  indexC: number;
  line: number;
  enteredValue: string;
}

interface InitPayload {
  data: number[];
  arrName: string;
  line?: number;
}

interface IndexPayload {
  index: number;
  arrName: string;
  line: number;
}

interface SelectItem {
  index: number;
  arrName: string;
}

interface ColorPayload {
  items: SelectItem[];
  val: Colors;
  line: number;
}

interface ValuePayload {
  index: number;
  arrName: string;
  value: number;
}

export type CountingSortPayload =
  | InitPayload
  | IndexPayload
  | ColorPayload
  | undefined
  | number
  | ValuePayload;

const initialState = {
  A: [] as SortItem[],
  B: [] as SortItem[],
  C: [] as SortItem[],
  k: 0,
  indexA: -2,
  indexB: -2,
  indexC: -2,
  line: -1,
  enteredValue: "",
};

const countingSortSlice = createSlice({
  name: "countingSort",
  initialState,
  reducers: {
    init(state, action: PayloadAction<InitPayload>) {
      const { data, arrName, line } = action.payload;
      let arr;
      switch (arrName) {
        case "A": {
          arr = numbersToSortItems(data);
          state.A = arr;
          state.k = Math.max(...data);
          state.B = [] as SortItem[];
          state.C = [] as SortItem[];
          state.indexA = -2;
          state.indexB = -2;
          state.indexC = -2;
          state.line = -1;
          break;
        }
        case "B": {
          arr = numbersToSortItems(data);
          state.B = arr;
          break;
        }
        case "C": {
          arr = numbersToSortItems(data);
          state.C = arr;
          break;
        }
      }
      if (line !== undefined) state.line = line;
      return state;
    },
    setIndex(state, action: PayloadAction<IndexPayload>) {
      const { index, arrName, line } = action.payload;
      switch (arrName) {
        case "A": {
          state.indexA = index;
          break;
        }
        case "B": {
          state.indexB = index;
          break;
        }
        case "C": {
          state.indexC = index;
          break;
        }
      }
      state.line = line;
      return state;
    },
    setValue(state, action: PayloadAction<ValuePayload>) {
      const { index, arrName, value } = action.payload;
      switch (arrName) {
        case "A": {
          state.A[index].value = value;
          break;
        }
        case "B": {
          state.B[index].value = value;
          break;
        }
        case "C": {
          state.C[index].value = value;
          break;
        }
      }
      return state;
    },
    setColor(state, action: PayloadAction<ColorPayload>) {
      const { items, val, line } = action.payload;
      for (const item of items) {
        switch (item.arrName) {
          case "A": {
            state.A[item.index].color = val;
            break;
          }
          case "B": {
            state.B[item.index].color = val;
            break;
          }
          case "C": {
            state.C[item.index].color = val;
            break;
          }
        }
      }
      state.line = line;
      return state;
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

export default countingSortSlice.reducer;
export const CountingSortActions = countingSortSlice.actions;
export const { init, setIndex, setColor, setLine, setValue, setEnteredValue } =
  countingSortSlice.actions;
