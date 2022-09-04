import { bindActionCreators } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { bundlesActions } from '../store/features/bundles/bundlesSlice';
import { cellsActions } from '../store/features/cells/cellsSlice';
import React from 'react';

const actions = {
  ...cellsActions,
  ...bundlesActions,
};

export const useActions = (): typeof actions => {
  const dispatch = useDispatch();

  return React.useMemo(() => {
    return bindActionCreators(actions, dispatch);
  }, [dispatch]);
};
