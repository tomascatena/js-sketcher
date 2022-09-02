import React from 'react';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import CellListItem from '../CellListitem/CellListItem';

type Props = {};

const CellList = (props: Props) => {
  const { data, order } = useTypedSelector((state) => state.cells);

  const cells = order.map((id) => data[id]);

  const renderedCells = cells.map((cell) => <CellListItem key={cell.id} cell={cell} />);

  return (
    <div>
      {renderedCells}
    </div>
  );
};

export default CellList;