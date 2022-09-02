import { styled } from '@mui/system';
import { Box, Divider } from '@mui/material';

export const StyledCellListItem = styled(Box)(({ theme }) => ({
  position: 'relative',
}));

export const ButtonsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(4),
}));

type StyledDividerProps = {
  forceVisible?: boolean;
};

export const StyledDivider = styled(Divider, {
  shouldForwardProp: (prop) => prop !== 'forceVisible',
})<StyledDividerProps>(({ theme, forceVisible }) => ({
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
  opacity: forceVisible ? 1 : 0,
  transition: 'opacity 0.3s ease-in-out 0.1s',

  ':hover': {
    opacity: 1,
  },
}));
