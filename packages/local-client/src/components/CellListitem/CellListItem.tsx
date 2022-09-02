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
      {
        cell.type === 'javascript'
          ? (
            <>
              <ActionBarWrapper>
                <ActionBar id={cell.id} />
              </ActionBarWrapper>

              <CodeCell cell={cell} />
            </>
          )
          : (
            <>
              <TextCell cell={cell} />
              <ActionBar id={cell.id} />
            </>
          )
      }
    </StyledCellListItem>
  );
};

export default CellListItem;