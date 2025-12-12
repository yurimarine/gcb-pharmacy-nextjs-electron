import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    loadingCount: 0,
  },
  reducers: {
    setLoading(state) {
      state.loadingCount += 1;
    },
    clearLoading(state) {
      state.loadingCount = Math.max(0, state.loadingCount - 1);
    },
    resetLoading(state) {
      state.loadingCount = 0;
    },
  },
});

export const { setLoading, clearLoading, resetLoading } = uiSlice.actions;
export default uiSlice.reducer;
