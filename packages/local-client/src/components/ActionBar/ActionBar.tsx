import { Button } from '@mui/material';
import React from 'react';
import { useActions } from '../../hooks/useActions';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { StyledButtonGroup } from './ActionBar.styled';

type Props = {
  id: string;
};

const ActionBar = ({ id }: Props) => {
  const { moveCell, deleteCell } = useActions();

  return (
    <StyledButtonGroup variant="contained" size="small">
      <Button
        aria-label="move cell up"
        onClick={() => moveCell({ id, direction: 'up' })}
        component='span'
      >
        <ArrowUpwardIcon />
      </Button>

      <Button
        aria-label="move cell down"
        onClick={() => moveCell({ id, direction: 'down' })}
        component='span'
      >
        <ArrowDownwardIcon />
      </Button>

      <Button
        aria-label="delete cell"
        onClick={() => deleteCell({ id })}
        component='span'
      >
        <DeleteForeverIcon />
      </Button>
    </StyledButtonGroup>
  );
};

export default ActionBar;