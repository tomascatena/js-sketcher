import { PayloadAction, SerializedError, createSlice } from '@reduxjs/toolkit';
import { fetchCells, saveCells } from './cellsSlice.thunk';
import { v4 as uuidv4 } from 'uuid';

export enum Direction {
  Up = 'up',
  Down = 'down',
}

export enum CellType {
  JAVASCRIPT = 'javascript',
  MARKDOWN = 'markdown',
}

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
  error: null | string | SerializedError;
  currentRequestId: string | undefined;
}

const initialState: CellsState = {
  data: {},
  order: [],
  loading: false,
  error: null,
  currentRequestId: undefined,
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

      const targetIndex = direction === Direction.Up ? index - 1 : index + 1;

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
    insertCellAfter: (state, action: PayloadAction<{ id: string | null; cellType: CellType }>) => {
      const { id, cellType } = action.payload;

      const newCell: Cell = {
        id: uuidv4(),
        direction: Direction.Down,
        type: cellType,
        content: '',
      };

      state.data[newCell.id] = newCell;

      const index = state.order.findIndex((cellId) => cellId === id);

      if (index === -1 || id === null) {
        state.order.unshift(newCell.id);
      } else {
        state.order.splice(index + 1, 0, newCell.id);
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
  extraReducers: (builder) => {
    builder
      .addCase(fetchCells.pending, (state, action) => {
        if (state.loading === false) {
          state.loading = true;
          state.error = null;
          state.currentRequestId = action.meta.requestId;
        }
      })
      .addCase(fetchCells.fulfilled, (state, action) => {
        const { requestId } = action.meta;
        const cells = action.payload;

        if (state.loading === true && state.currentRequestId === requestId) {
          state.loading = false;
          state.currentRequestId = undefined;
          state.order = cells.map((cell) => cell.id);

          state.data = cells.reduce((accumulator, cell) => {
            accumulator[cell.id] = cell;

            return accumulator;
          }, {} as CellsState['data']);
        }
      })
      .addCase(fetchCells.rejected, (state, action) => {
        const { requestId } = action.meta;

        if (state.loading === true && state.currentRequestId === requestId) {
          state.loading = false;
          state.error = action.error;
          state.currentRequestId = undefined;
        }
      })
      .addCase(saveCells.pending, (state, action) => {
        if (state.loading === false) {
          state.loading = true;
          state.error = null;
          state.currentRequestId = action.meta.requestId;
        }
      })
      .addCase(saveCells.fulfilled, (state, action) => {
        const { requestId } = action.meta;

        if (state.loading === true && state.currentRequestId === requestId) {
          state.loading = false;
          state.currentRequestId = undefined;
        }
      })
      .addCase(saveCells.rejected, (state, action) => {
        const { requestId } = action.meta;

        if (state.loading === true && state.currentRequestId === requestId) {
          state.loading = false;
          state.error = action.error;
          state.currentRequestId = undefined;
        }
      });
  },
});

export const cellsActions = cellsSlice.actions;

export default cellsSlice.reducer;
