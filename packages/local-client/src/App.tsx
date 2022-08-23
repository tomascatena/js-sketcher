import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { useDarkMode } from './hooks/useDarkMode';
import CssBaseline from '@mui/material/CssBaseline';
import { Container } from '@mui/material';
import TextCell from './components/TextCell/TextCell';

const App = () => {
  const { theme } = useDarkMode();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Container>
        <TextCell />
      </Container>
    </ThemeProvider>
  );
};


export default App;
