import { fetchCells } from '@/store/features/cells/cellsSlice.thunk';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import AddCell from '@/components/AddCell/AddCell';
import CellListItem from '@/components/CellListitem/CellListItem';
import React from 'react';

const CellList = () => {
  const { data, order } = useTypedSelector((state) => state.cells);

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(fetchCells());
  }, []);

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
