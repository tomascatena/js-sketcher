import { Button } from '@mui/material';
import { Direction } from '@/store/features/cells/cellsSlice';
import { StyledButtonGroup } from './ActionBar.styled';
import { useActions } from '@/hooks/useActions';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import React from 'react';

type Props = {
  id: string;
};

const ActionBar = ({ id }: Props) => {
  const { moveCell, deleteCell } = useActions();

  return (
    <StyledButtonGroup
      variant="contained"
      size="small"
    >
      <Button
        aria-label="move cell up"
        onClick={() => moveCell({ id, direction: Direction.Up })}
        component='span'
      >
        <ArrowUpwardIcon />
      </Button>

      <Button
        aria-label="move cell down"
        onClick={() => moveCell({ id, direction: Direction.Down })}
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
