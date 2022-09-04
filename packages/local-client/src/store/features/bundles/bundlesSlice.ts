import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Bundle {
  isBundling: boolean;
  code: string | null;
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
  reducers: {
    setCurrentCellId: (state, action: PayloadAction<{ id: string }>) => {
      state.currentCellId = action.payload.id;
    },
    startBundling: (state, action: PayloadAction<{ id: string }>) => {
      state.cellBundles[action.payload.id] = {
        isBundling: true,
        code: '',
        error: null,
      };
    },
    completeBundling: (
      state,
      action: PayloadAction<{ id: string; code: string | null; error: string | null }>
    ) => {
      state.cellBundles[action.payload.id] = {
        isBundling: false,
        code: action.payload.code,
        error: action.payload.error,
      };
    },
    removeBundle: (state, action: PayloadAction<{ id: string }>) => {
      delete state.cellBundles[action.payload.id];
    },
  },
});

export const bundlesActions = bundlesSlice.actions;

export default bundlesSlice.reducer;
