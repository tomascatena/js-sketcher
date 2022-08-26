import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

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
    moveCell: (state, action: PayloadAction<{ id: string; direction: Direction }>) => {
      const { id, direction } = action.payload;

      const index = state.order.findIndex((cellId) => cellId === id);

      if (index === -1) {
        return;
      }

      const targetIndex = direction === 'up' ? index - 1 : index + 1;

      if (targetIndex < 0 || targetIndex >= state.order.length) {
        return;
      }

      state.order[index] = state.order[targetIndex];
      state.order[targetIndex] = id;
    },
    deleteCell: (state, action: PayloadAction<{ id: string }>) => {
      const { id } = action.payload;

      if (!state.data[id]) {
        return;
      }

      delete state.data[id];

      state.order = state.order.filter((cellId) => cellId !== id);
    },
    insertCellBefore: (state, action: PayloadAction<{ id: string | null; cellType: CellType }>) => {
      const { id, cellType } = action.payload;

      const newCell: Cell = {
        id: uuidv4(),
        direction: 'down',
        type: cellType,
        content: '',
      };

      state.data[newCell.id] = newCell;

      const index = state.order.findIndex((cellId) => cellId === id);

      if (index === -1 || id === null) {
        state.order.push(newCell.id);
      } else {
        state.order.splice(index, 0, newCell.id);
      }
    },
    updateCell: (state, action: PayloadAction<{ id: string; content: string }>) => {
      const { id, content } = action.payload;

      if (!state.data[id]) {
        return;
      }

      state.data[id].content = content;
    },
  },
});

export const cellsActions = cellsSlice.actions;

export default cellsSlice.reducer;
