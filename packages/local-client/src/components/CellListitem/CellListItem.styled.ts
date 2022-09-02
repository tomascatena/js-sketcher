import { styled } from '@mui/system';
import { Box } from '@mui/material';

export const StyledCellListItem = styled(Box)(({ theme }) => ({
  position: 'relative',
}));

export const ActionBarWrapper = styled(Box)(({ theme }) => ({
  height: '31px',
  width: '100%',
  backgroundColor: theme.palette.grey[800],
}));
