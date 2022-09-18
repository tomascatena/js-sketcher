import { ActionBarWrapper } from './CellListItem.styled';
import { Box } from '@mui/material';
import { Cell, CellType } from '@/store/features/cells/cellsSlice';
import ActionBar from '@/components/ActionBar/ActionBar';
import CodeCell from '@/components/CodeCell/CodeCell';
import React from 'react';
import TextCell from '@/components/TextCell/TextCell';

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
