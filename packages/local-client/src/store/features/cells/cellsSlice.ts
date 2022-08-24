import { createSlice } from '@reduxjs/toolkit';

export interface CellsState {
  value: number;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: CellsState = {
  value: 0,
  status: 'idle',
};

export const cellsSlice = createSlice({
  name: 'cells',
  initialState,
  reducers: {},
});

export const cellsActions = cellsSlice.actions;

export default cellsSlice.reducer;
