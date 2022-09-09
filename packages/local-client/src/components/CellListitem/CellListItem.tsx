import { ActionBarWrapper } from './CellListItem.styled';
import { Box } from '@mui/material';
import { Cell, CellType } from '../../store/features/cells/cellsSlice';
import ActionBar from '../ActionBar/ActionBar';
import CodeCell from '../CodeCell/CodeCell';
import React from 'react';
import TextCell from '../TextCell/TextCell';

type Props = {
  cell: Cell;
};

const CellListItem = ({ cell }: Props) => {
  return (
    <Box>
      <ActionBarWrapper>
        <ActionBar id={cell.id} />
      </ActionBarWrapper>

      {
        cell.type === CellType.JAVASCRIPT
          ? <CodeCell cell={cell} />
          : <TextCell cell={cell} />
      }
    </Box>
  );
};

export default CellListItem;
