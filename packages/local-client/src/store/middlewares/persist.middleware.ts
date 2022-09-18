import { AnyAction, Dispatch, Middleware, MiddlewareAPI } from 'redux';
import { RootState } from '@/store/store';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { saveCells } from '@/store/features/cells/cellsSlice.thunk';

const actionsToWatch = [
  'cells/moveCell',
  'cells/updateCell',
  'cells/deleteCell',
  'cells/insertCellAfter',
];

export const persistMiddleware: Middleware = (store: MiddlewareAPI) => {
  let timer: ReturnType<typeof setTimeout>;

  return (next: Dispatch) => {
    return (action) => {
      next(action);

      if (actionsToWatch.includes(action.type)) {
        if (timer) {
          clearTimeout(timer);
        }

        timer = setTimeout(() => {
          (store.dispatch as ThunkDispatch<RootState, unknown, AnyAction>)(saveCells());
        }, 1000);
      }
    };
  };
};
