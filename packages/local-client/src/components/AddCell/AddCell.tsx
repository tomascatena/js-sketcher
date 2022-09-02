import React from 'react';
import { useActions } from '../../hooks/useActions';
import { Button } from '@mui/material';

type Props = {
  nextCellId: string | null;
};

const AddCell = ({ nextCellId }: Props) => {
  const { insertCellBefore } = useActions();

  return (
    <>
      <Button onClick={() => insertCellBefore({ id: nextCellId, cellType: 'javascript' })}>
        Code
      </Button>

      <Button onClick={() => insertCellBefore({ id: nextCellId, cellType: 'markdown' })}>
        Text
      </Button>
    </>
  );
};

export default AddCell;