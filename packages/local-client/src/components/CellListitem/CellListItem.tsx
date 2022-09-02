import React from 'react';
import { Cell } from '../../store/features/cells/cellsSlice';

type Props = {
  cell: Cell;
};

const CellListItem = ({ cell }: Props) => {
  return (
    <div>
      {cell.id}
    </div>
  );
};

export default CellListItem;