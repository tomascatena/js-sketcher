import { styled } from '@mui/system';
import { ButtonGroup } from '@mui/material';

export const StyledButtonGroup = styled(ButtonGroup)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  right: 0,
  zIndex: 1,
  borderRadius: '0 0 0 0',

  '& > span': {
    borderRadius: '0 0 0 0',
  },
}));
