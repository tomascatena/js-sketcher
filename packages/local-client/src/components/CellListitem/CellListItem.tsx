import React from 'react';
import { Cell } from '../../store/features/cells/cellsSlice';
import ActionBar from '../ActionBar/ActionBar';
import CodeCell from '../CodeCell/CodeCell';
import TextCell from '../TextCell/TextCell';
import { ActionBarWrapper, StyledCellListItem } from './CellListItem.styled';

type Props = {
  cell: Cell;
};

const CellListItem = ({ cell }: Props) => {
  return (
    <StyledCellListItem>
      <ActionBarWrapper>
        <ActionBar id={cell.id} />
      </ActionBarWrapper>

      {
        cell.type === 'javascript'
          ? <CodeCell cell={cell} />
          : <TextCell cell={cell} />
      }
    </StyledCellListItem>
  );
};

export default CellListItem;