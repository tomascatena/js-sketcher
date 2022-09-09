import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';
import bundlesReducer from './features/bundles/bundlesSlice';
import cellsReducer, { CellType, cellsActions } from './features/cells/cellsSlice';

export const store = configureStore({
  reducer: {
    cells: cellsReducer,
    bundles: bundlesReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
/* eslint-disable */
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
/* eslint-enable */
