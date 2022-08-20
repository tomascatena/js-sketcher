import { bindActionCreators } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { counterActions } from '../store/features/counter/counterSlice';

const actions = {
  ...counterActions,
};

export const useActions = (): typeof actions => {
  const dispatch = useDispatch();
  return bindActionCreators(actions, dispatch);
};
