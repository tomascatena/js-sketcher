import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Bundle {
  code: string;
  error: string | null;
}

export interface BundlesState {
  currentCellId: string | null;
  cellBundles: { [key: string]: Bundle };
}

const initialState: BundlesState = {
  currentCellId: null,
  cellBundles: {},
};

export const bundlesSlice = createSlice({
  name: 'bundles',
  initialState,
  reducers: {},
});

export const bundlesActions = bundlesSlice.actions;

export default bundlesSlice.reducer;
