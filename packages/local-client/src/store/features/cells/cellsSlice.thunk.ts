import { Cell } from './cellsSlice';
import { RootState } from '@/store/store';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCells = createAsyncThunk<Cell[], void, { state: RootState }>(
  'cells/fetchCells',
  async (_, { getState, requestId }) => {
    const { loading, currentRequestId } = getState().cells;

    console.log('fetchCells', loading, currentRequestId, requestId);

    if (!loading || requestId !== currentRequestId) {
      return;
    }

    const { data } = await axios.get('/cells');

    return data;
  }
);

export const saveCells = createAsyncThunk<void, void, { state: RootState }>(
  'cells/saveCells',
  async (_, { getState, requestId }) => {
    const { loading, currentRequestId, data, order } = getState().cells;

    if (!loading || requestId !== currentRequestId) {
      return;
    }

    const cells = order.map((id: string) => data[id]);

    await axios.post('/cells', { cells });
  }
);
