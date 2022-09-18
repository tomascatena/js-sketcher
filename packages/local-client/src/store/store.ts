import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';
import { persistMiddleware } from './middlewares/persist.middleware';
import bundlesReducer from './features/bundles/bundlesSlice';
import cellsReducer from './features/cells/cellsSlice';

export const store = configureStore({
  reducer: {
    cells: cellsReducer,
    bundles: bundlesReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(persistMiddleware),
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
