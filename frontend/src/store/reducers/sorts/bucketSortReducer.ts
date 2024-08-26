import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

import { ItemColor } from "./quickSortReducer";

import { numbersToSortItems } from "../../../components/Simulation/Sorts/helpers/functions";
import { SortItem } from "../../../components/Simulation/Sorts/helpers/types";

export interface Bucket {
  title: string;
  data: SortItem[];
  index: number;
}

export interface State {
  data: SortItem[];
  buckets: Bucket[];
  line: number;
  bucketIndex: number;
  enteredValue: string;
}

interface ActionLinePayload {
  payload: Payload;
  line: number;
}

interface SetBucketPayload {
  items: SortItem[];
  bucketIndex: number;
}
type Payload = SetBucketPayload | Bucket | number | Bucket[];

export type BucketSortPayload = ActionLinePayload | number[] | number | undefined;

const initialState: State = {
  data: [] as SortItem[],
  buckets: [] as Bucket[],
  line: -1,
  bucketIndex: -1,
  enteredValue: "",
};

const bucketSortSlice = createSlice({
  name: "bucketsort",
  initialState,
  reducers: {
    setData(state, action: PayloadAction<number[]>) {
      state = {
        data: [] as SortItem[],
        buckets: [] as Bucket[],
        line: -1,
        bucketIndex: -1,
        enteredValue: state.enteredValue,
      };
      state.data = numbersToSortItems(action.payload);
      return state;
    },
    pushData(state, action: PayloadAction<ActionLinePayload>) {
      const index = action.payload.payload as number;
      state.data = [
        ...state.data,
        ...state.buckets[index].data.map((e) => ({
          ...e,
          color: ItemColor.BASE,
        })),
      ];
      state.line = action.payload.line;
    },
    setBuckets(state, action: PayloadAction<ActionLinePayload>) {
      state.buckets = [...(action.payload.payload as Bucket[])];
      state.line = action.payload.line;
    },
    markElement(state, action: PayloadAction<ActionLinePayload>) {
      state.data[action.payload.payload as number].color = ItemColor.MARKED;
      state.line = action.payload.line;
    },
    markBucket(state, action: PayloadAction<ActionLinePayload>) {
      const index = action.payload.payload as number;
      for (const item of state.buckets[index].data) item.color = ItemColor.MARKED;
      state.line = action.payload.line;
    },
    pushToBucket(state, action: PayloadAction<ActionLinePayload>) {
      state.buckets[action.payload.payload as number].data.push(state.data[0]);
      state.line = action.payload.line;
    },
    removeFromStart(state, action: PayloadAction<number>) {
      state.data = [...state.data.slice(1)];
      state.line = action.payload;
      return state;
    },
    setBucketData(state, action: PayloadAction<ActionLinePayload>) {
      const { items, bucketIndex } = action.payload.payload as SetBucketPayload;
      state.buckets[bucketIndex].data = items;
      state.line = action.payload.line;
    },
    sortBucket(state, action: PayloadAction<ActionLinePayload>) {
      const bucketIndex = action.payload.payload as number;
      state.buckets[bucketIndex].data.sort((a, b) => a.value - b.value);
      state.line = action.payload.line;
    },
    setBucketIndex(state, action: PayloadAction<ActionLinePayload>) {
      state.bucketIndex = action.payload.payload as number;
      state.line = action.payload.line;
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

export default bucketSortSlice.reducer;
export const bucketSortActions = bucketSortSlice.actions;

export const { setEnteredValue, setData } = bucketSortSlice.actions;
