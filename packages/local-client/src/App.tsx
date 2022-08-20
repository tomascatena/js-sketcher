import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { useDarkMode } from './hooks/useDarkMode';
import CssBaseline from '@mui/material/CssBaseline';

const App = () => {
  const { theme } = useDarkMode();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <h1>Local Client!</h1>
    </ThemeProvider>
  );
};

export default App;
