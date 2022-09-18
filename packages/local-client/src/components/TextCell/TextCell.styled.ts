import { Box } from '@mui/material';
import { styled } from '@mui/system';

export const MDPreviewContainer = styled(Box)(({ theme }) => ({
  border: `1px solid ${theme.palette.grey[800]}`,
  padding: theme.spacing(2),
}));
