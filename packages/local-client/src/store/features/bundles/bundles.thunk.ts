import { createAsyncThunk } from '@reduxjs/toolkit';
import bundler from '../../../bundler';
import { RootState } from '../../store';
import { bundlesActions, Bundle } from './bundlesSlice';

export const createBundle = createAsyncThunk<
  Bundle | undefined,
  { cellId: string; rawCode: string },
  { state: RootState }
>(
  'bundles/createBundle',
  async ({ cellId, rawCode }, { dispatch, getState }): Promise<Bundle | undefined> => {
    dispatch(bundlesActions.setCurrentCellId({ id: cellId }));

    const { cellBundles } = getState().bundles;

    if (!cellBundles[cellId] || cellBundles[cellId]?.isBundling) {
      return;
    }

    dispatch(bundlesActions.startBundling({ id: cellId }));

    let code = null;
    let error = null;

    try {
      const result = await bundler(rawCode);

      code = result.code;
    } catch (err) {
      if (err instanceof Error) {
        error = err.message;
      }
    } finally {
      dispatch(
        bundlesActions.completeBundling({
          id: cellId,
          code,
          error,
        })
      );

      return {
        isBundling: false,
        code,
        error,
      };
    }
  }
);
