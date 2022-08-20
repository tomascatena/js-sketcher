import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { useDarkMode } from './hooks/useDarkMode';
import CssBaseline from '@mui/material/CssBaseline';
import { Container } from '@mui/material';

const App = () => {
  const { theme } = useDarkMode();

  const [input, setInput] = React.useState('');
  const [code, setCode] = React.useState('');

  const onClick = () => {
    console.log(input);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Container>
        <textarea
          onChange={e => setInput(e.target.value)}
          value={input}
          cols={30} rows={10}
        ></textarea>

        <div>
          <button onClick={onClick}>Submit</button>
        </div>

        <pre>{code}</pre>
      </Container>
    </ThemeProvider>
  );
};

export default App;
