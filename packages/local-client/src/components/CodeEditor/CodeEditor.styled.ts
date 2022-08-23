import { styled } from '@mui/system';
import { Button, Box } from '@mui/material';

export const StyledBox = styled(Box)(() => ({
  position: 'relative',
  width: 'calc(100% - 10px)',
  height: '100%',

  '&:hover': {
    '& .format-button': {
      opacity: 1,
      transition: 'opacity 0.2s ease-in-out',
    },
  },
}));

export const StyledButton = styled(Button)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(1),
  right: theme.spacing(2),
  zIndex: 1,
  opacity: 0,
}));
