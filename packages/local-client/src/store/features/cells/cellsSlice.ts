import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Direction = 'up' | 'down';
export type CellType = 'javascript' | 'markdown';

export interface Cell {
  id: string;
  direction: Direction;
  type: CellType;
  content: string;
}

export interface CellsState {
  data: { [key: string]: Cell };
  order: string[];
  loading: boolean;
  error: string | null;
}

const initialState: CellsState = {
  data: {},
  order: [],
  loading: false,
  error: null,
};

export const cellsSlice = createSlice({
  name: 'cells',
  initialState,
  reducers: {
    moveCell: (state, action: PayloadAction<{ id: string; direction: Direction }>) => {},
    deleteCell: (state, action: PayloadAction<{ id: string }>) => {
      const { id } = action.payload;
      delete state.data[id];

      state.order = state.order.filter((cellId) => cellId !== id);
    },
    insertCellBefore: (state, action: PayloadAction<{ id: string; cellType: CellType }>) => {},
    insertCellAfter: (state, action: PayloadAction<{ id: string; cellType: CellType }>) => {},
    updateCell: (state, action: PayloadAction<{ id: string; content: string }>) => {
      const { id, content } = action.payload;

      state.data[id].content = content;
    },
  },
});

export const cellsActions = cellsSlice.actions;

export default cellsSlice.reducer;
