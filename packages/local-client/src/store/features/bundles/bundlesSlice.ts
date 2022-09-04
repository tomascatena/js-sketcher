import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Bundle {
  isBundling: boolean;
  code: string | null;
  error: string | null;
}

export interface BundlesState {
  currentCellId: string | null;
  cellBundles: { [key: string]: Bundle | undefined };
}

const initialState: BundlesState = {
  currentCellId: null,
  cellBundles: {},
};

export const bundlesSlice = createSlice({
  name: 'bundles',
  initialState,
  reducers: {
    setCurrentCellId: (state, action: PayloadAction<{ cellId: string }>) => {
      state.currentCellId = action.payload.cellId;

      if (!state.cellBundles[action.payload.cellId]) {
        state.cellBundles[action.payload.cellId] = {
          isBundling: false,
          code: null,
          error: null,
        };
      }
    },
    startBundling: (state, action: PayloadAction<{ cellId: string }>) => {
      state.cellBundles[action.payload.cellId] = {
        isBundling: true,
        code: '',
        error: null,
      };
    },
    completeBundling: (
      state,
      action: PayloadAction<{ cellId: string; code: string | null; error: string | null }>
    ) => {
      state.cellBundles[action.payload.cellId] = {
        isBundling: false,
        code: action.payload.code,
        error: action.payload.error,
      };
    },
    removeBundle: (state, action: PayloadAction<{ cellId: string }>) => {
      delete state.cellBundles[action.payload.cellId];
    },
  },
});

export const bundlesActions = bundlesSlice.actions;

export default bundlesSlice.reducer;
