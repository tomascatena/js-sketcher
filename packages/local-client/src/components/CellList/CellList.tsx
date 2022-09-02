import React from 'react';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import AddCell from '../AddCell/AddCell';
import CellListItem from '../CellListitem/CellListItem';

const CellList = () => {
  const { data, order } = useTypedSelector((state) => state.cells);

  const cells = order.map((id) => data[id]);

  const renderedCells = cells.map((cell) => {
    return (
      <React.Fragment key={cell.id}>
        <AddCell nextCellId={cell.id} />

        <CellListItem cell={cell} />
      </React.Fragment>
    );
  });

  return (
    <>
      {renderedCells}

      <AddCell nextCellId={null} forceVisible={cells.length === 0} />
    </>
  );
};

export default CellList;