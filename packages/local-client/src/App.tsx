import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { useDarkMode } from './hooks/useDarkMode';
import CssBaseline from '@mui/material/CssBaseline';
import { Container } from '@mui/material';
import CellList from './components/CellList/CellList';

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
