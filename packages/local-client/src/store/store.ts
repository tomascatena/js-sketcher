import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import cellsReducer, { CellType } from './features/cells/cellsSlice';
import bundlesReducer from './features/bundles/bundlesSlice';
import { cellsActions } from './features/cells/cellsSlice';

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

store.dispatch(cellsActions.insertCellAfter({ id: null, cellType: CellType.JAVASCRIPT }));
store.dispatch(cellsActions.insertCellAfter({ id: null, cellType: CellType.MARKDOWN }));
store.dispatch(cellsActions.insertCellAfter({ id: null, cellType: CellType.JAVASCRIPT }));
store.dispatch(cellsActions.insertCellAfter({ id: null, cellType: CellType.MARKDOWN }));
