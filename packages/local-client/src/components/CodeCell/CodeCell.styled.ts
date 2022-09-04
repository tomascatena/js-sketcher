import { styled } from '@mui/system';
import { Box } from '@mui/material';

export const CodeCellContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  height: '100%',
  flexDirection: 'row',
  backgroundColor: '#fff',
}));

export const BundlingMessageContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  gap: '1rem',
}));
