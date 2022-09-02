import React from 'react';
import { Cell } from '../../store/features/cells/cellsSlice';
import CodeCell from '../CodeCell/CodeCell';
import TextCell from '../TextCell/TextCell';

type Props = {
  cell: Cell;
};


const CellListItem = ({ cell }: Props) => {
  return (
    <div>
      {
        cell.type === 'javascript'
          ? <CodeCell cell={cell} />
          : <TextCell cell={cell} />
      }
    </div>
  );
};

export default CellListItem;