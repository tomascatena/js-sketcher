import { Box } from '@mui/material';
import { styled } from '@mui/system';

export const CodeCellContainer = styled(Box)(() => ({
  display: 'flex',
  height: '100%',
  flexDirection: 'row',
  backgroundColor: '#fff',
  border: '2px solid #fff',
}));

export const BundlingMessageContainer = styled(Box)(() => ({
  flex: 1,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  gap: '1rem',
}));
