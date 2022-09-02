import { styled } from '@mui/system';
import { Box } from '@mui/material';

export const MDPreviewContainer = styled(Box)(({ theme }) => ({
  border: `1px solid ${theme.palette.grey[500]}`,
  padding: theme.spacing(2),
}));
