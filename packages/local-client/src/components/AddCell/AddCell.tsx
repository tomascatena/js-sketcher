import { Button } from '@mui/material';
import { ButtonsContainer, StyledDivider } from './AddCell.styled';
import { CellType } from '@/store/features/cells/cellsSlice';
import { useActions } from '@/hooks/useActions';
import AddIcon from '@mui/icons-material/Add';
import React from 'react';

type Props = {
  previousCellId: string | null;
  forceVisible?: boolean;
};

const AddCell = ({ previousCellId, forceVisible = false }: Props) => {
  const { insertCellAfter } = useActions();

  return (
    <StyledDivider forceVisible={forceVisible}>
      <ButtonsContainer>
        <Button
          variant="outlined"
          onClick={() => insertCellAfter({ id: previousCellId, cellType: CellType.JAVASCRIPT })}
        >
          <AddIcon style={{ fontSize: '1.3rem' }} /> Code
        </Button>

        <Button
          variant="outlined"
          onClick={() => insertCellAfter({ id: previousCellId, cellType: CellType.MARKDOWN })}
        >
          <AddIcon style={{ fontSize: '1.3rem' }} /> Text
        </Button>
      </ButtonsContainer>
    </StyledDivider>
  );
};

export default AddCell;
