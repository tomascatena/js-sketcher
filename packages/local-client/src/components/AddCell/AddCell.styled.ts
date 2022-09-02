import { styled } from '@mui/system';
import { Box, Divider } from '@mui/material';

export const StyledCellListItem = styled(Box)(({ theme }) => ({
  position: 'relative',
}));

export const ButtonsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(4),
}));

export const StyledDivider = styled(Divider)(({ theme }) => ({
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
  opacity: 0,
  transition: 'opacity 0.3s ease-in-out 0.1s',

  ':hover': {
    opacity: 1,
  },
}));
