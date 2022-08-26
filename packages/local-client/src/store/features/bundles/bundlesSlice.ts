import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Cell {
  id: string;
  direction: 'up' | 'down';
  type: 'javascript' | 'markdown';
  content: string;
}

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
  reducers: {
    moveCell: (state, action: PayloadAction<{ id: string; to: string }>) => {},
    deleteCell: (state, action: PayloadAction<{ id: string }>) => {},
    insertCellBefore: (state, action: PayloadAction<{ id: string; before: string }>) => {},
    insertCellAfter: (state, action: PayloadAction<{ id: string; after: string }>) => {},
    updateCell: (state, action: PayloadAction<{ id: string; value: string }>) => {},
  },
});

export const bundlesActions = bundlesSlice.actions;

export default bundlesSlice.reducer;
