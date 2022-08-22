import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { useDarkMode } from './hooks/useDarkMode';
import CssBaseline from '@mui/material/CssBaseline';
import { Container } from '@mui/material';
import CodeCell from './components/CodeCell/CodeCell';

const App = () => {
  const { theme } = useDarkMode();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Container>
        <CodeCell />

        <CodeCell />
      </Container>
    </ThemeProvider>
  );
};


export default App;
