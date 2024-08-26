import { configureStore } from "@reduxjs/toolkit";

import bstReducer from "./reducers/alghoritms/bst-reducer";
import heapReducer from "./reducers/alghoritms/heap-reducer";
import animationControlReducer from "./reducers/animation-control-reducer";
import authReducer from "./reducers/auth-reducer";
import { authApi } from "./reducers/auth-reducer-api";
import { feedbackApi } from "./reducers/feedback-reducer";
import queueReducer from "./reducers/queueReducer";
import { reportApi } from "./reducers/report-reducer";
import bucketSortReducer from "./reducers/sorts/bucketSortReducer";
import countingSortReducer from "./reducers/sorts/countingSortReducer";
import insertionSortReducer from "./reducers/sorts/insertionSortReducer";
import mergeSortReducer from "./reducers/sorts/mergeSortReducer";
import quickSortReducer from "./reducers/sorts/quickSortReducer";
import radixSortReducer from "./reducers/sorts/radixSortReducer";
import stackReducer from "./reducers/stackReducer";
import linkedListReducer from "./reducers/alghoritms/linkedList-reducer";
import dfsReducer from "./reducers/alghoritms/dfs-reducer";
import hashTableReducer from "./reducers/alghoritms/hashTable-reducer";
import basePageReducer from "./reducers/basePage-reducer";
import bellmanFordReducer from "./reducers/alghoritms/bellmanFord-reducer";
import prim from "./reducers/alghoritms/prim-reducer";
import kruskal from "./reducers/alghoritms/kruskal-reducer";
import { userInputReducerApi } from "./reducers/userInput-reducer-api";

const store = configureStore({
  reducer: {
    // add reducers here
    auth: authReducer,
    stack: stackReducer,
    queue: queueReducer,
    heap: heapReducer,
    bst: bstReducer,
    linkedList: linkedListReducer,
    hashTable: hashTableReducer,
    countingSort: countingSortReducer,
    quickSort: quickSortReducer,
    insertionSort: insertionSortReducer,
    mergeSort: mergeSortReducer,
    bucketSort: bucketSortReducer,
    radixSort: radixSortReducer,
    dfs: dfsReducer,
    bellmanFord: bellmanFordReducer,
    prim: prim,
    kruskal: kruskal,
    animationController: animationControlReducer,
    basePage: basePageReducer,
    [reportApi.reducerPath]: reportApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [feedbackApi.reducerPath]: feedbackApi.reducer,
    [userInputReducerApi.reducerPath]: userInputReducerApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat([
      // serializableCheck: false - do not delete!
      reportApi.middleware,
      authApi.middleware,
      feedbackApi.middleware,
      userInputReducerApi.middleware,
    ]),
});

export default store;

/** *******TYPES:********* */
// needed in order to import the state - we use this type in the select function in each slice:
export type RootState = ReturnType<typeof store.getState>;
// we need this type in order to dispatch the action:
export type AppDispatch = typeof store.dispatch;
