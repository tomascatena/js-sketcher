import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { useDarkMode } from './hooks/useDarkMode';
import CssBaseline from '@mui/material/CssBaseline';
import { Container } from '@mui/material';
import * as esbuild from 'esbuild-wasm';

const App = () => {
  const { theme } = useDarkMode();

  const [input, setInput] = React.useState('const App = async () => <div>Hi there</div>');
  const [code, setCode] = React.useState('');


  const initializeEsBuild = async () => {
    try {
      await esbuild.initialize({
        worker: true,
        wasmURL: '/esbuild.wasm'
      });
    } catch (error) { }
  };

  React.useEffect(() => {
    initializeEsBuild();
  }, []);

  const onClick = async () => {
    const result = await esbuild.transform(input, {
      loader: 'jsx',
      target: 'es2015',
    });

    setCode(result.code);
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
