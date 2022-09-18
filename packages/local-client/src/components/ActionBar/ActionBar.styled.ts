import { ButtonGroup } from '@mui/material';
import { styled } from '@mui/system';

export const StyledButtonGroup = styled(ButtonGroup)(({ theme }) => ({
  borderRadius: '0 0 0 0',
  opacity: 0.4,

  '&:hover': {
    opacity: 1,
    transition: 'opacity 0.3s ease-in-out',
  },

  '& > span': {
    borderRadius: '0 0 0 0',
  },
}));
