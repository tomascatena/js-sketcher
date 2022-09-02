import React from 'react';
import { useActions } from '../../hooks/useActions';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { ButtonsContainer, StyledDivider } from './AddCell.styled';

type Props = {
  nextCellId: string | null;
};

const AddCell = ({ nextCellId }: Props) => {
  const { insertCellBefore } = useActions();

  return (
    <StyledDivider>
      <ButtonsContainer>
        <Button
          variant="outlined"
          onClick={() => insertCellBefore({ id: nextCellId, cellType: 'javascript' })}
        >
          <AddIcon style={{ fontSize: '1.3rem' }} /> Code
        </Button>

        <Button
          variant="outlined"
          onClick={() => insertCellBefore({ id: nextCellId, cellType: 'markdown' })}
        >
          <AddIcon style={{ fontSize: '1.3rem' }} /> Text
        </Button>
      </ButtonsContainer>
    </StyledDivider>
  );
};

export default AddCell;