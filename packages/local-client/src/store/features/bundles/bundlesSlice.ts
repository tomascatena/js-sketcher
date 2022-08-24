import { createSlice } from '@reduxjs/toolkit';

export interface BundlesState {
  value: number;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: BundlesState = {
  value: 0,
  status: 'idle',
};

export const bundlesSlice = createSlice({
  name: 'bundles',
  initialState,
  reducers: {},
});

export const bundlesActions = bundlesSlice.actions;

export default bundlesSlice.reducer;
