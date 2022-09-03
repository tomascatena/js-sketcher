import { styled } from '@mui/system';
import { Box } from '@mui/material';

export const ActionBarWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'end',
  width: '100%',
  backgroundColor: theme.palette.grey[800],
}));
