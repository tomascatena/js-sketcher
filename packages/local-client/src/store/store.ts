import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import cellsReducer from './features/cells/cellsSlice';
import bundlesReducer from './features/bundles/bundlesSlice';

export const store = configureStore({
  reducer: {
    cells: cellsReducer,
    bundles: bundlesReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
