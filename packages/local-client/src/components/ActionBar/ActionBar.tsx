import { Button } from '@mui/material';
import React from 'react';
import { useActions } from '../../hooks/useActions';

type Props = {
  id: string;
};

const ActionBar = ({ id }: Props) => {
  const { moveCell, deleteCell } = useActions();

  return (
    <div>
      <Button onClick={() => moveCell({ id, direction: 'up' })}>Up</Button>

      <Button onClick={() => moveCell({ id, direction: 'down' })}>Down</Button>

      <Button onClick={() => deleteCell({ id })}>Delete</Button>
    </div>
  );
};

export default ActionBar;