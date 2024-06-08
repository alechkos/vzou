import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  showActions: false,
  editingConstruction: false,
  showPseudoCode: false,
  viewportWidth: window.innerWidth,
};

const basePageSlice = createSlice({
  name: "BasePage",
  initialState,
  reducers: {
    setShowActions(state, action: PayloadAction<boolean>) {
      state.showActions = action.payload;
      return state;
    },
    setEditingConstruction(state, action: PayloadAction<boolean>) {
      state.editingConstruction = action.payload;
      return state;
    },
    setShowPseudoCode(state, action: PayloadAction<boolean>) {
      state.showPseudoCode = action.payload;
      return state;
    },
    setViewPortWidth(state, action: PayloadAction<number>) {
      state.viewportWidth = action.payload;
    },
    setToInitial(state) {
      state.showActions = false;
      state.editingConstruction = false;
      state.showPseudoCode = false;
    },
  },
});

export default basePageSlice.reducer;

export const {
  setShowPseudoCode,
  setShowActions,
  setEditingConstruction,
  setViewPortWidth,
  setToInitial,
} = basePageSlice.actions;
