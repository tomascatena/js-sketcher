import { Container } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { useDarkMode } from './hooks/useDarkMode';
import CellList from './components/CellList/CellList';
import CssBaseline from '@mui/material/CssBaseline';
import React from 'react';

const App = () => {
  const { theme } = useDarkMode();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Container>
        <CellList />
      </Container>
    </ThemeProvider>
  );
};

export default App;
