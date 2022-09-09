import { useTypedSelector } from '../../hooks/useTypedSelector';
import AddCell from '../AddCell/AddCell';
import CellListItem from '../CellListitem/CellListItem';
import React from 'react';

const CellList = () => {
  const { data, order } = useTypedSelector((state) => state.cells);

  const cells = order.map((id) => data[id]);

  const renderedCells = cells.map((cell) => (
    <React.Fragment key={cell.id}>
      <CellListItem cell={cell} />

      <AddCell previousCellId={cell.id} />
    </React.Fragment>
  ));

  return (
    <>
      <AddCell
        previousCellId={null}
        forceVisible={cells.length === 0}
      />

      {renderedCells}
    </>
  );
};

export default CellList;
