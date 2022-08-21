import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { useDarkMode } from './hooks/useDarkMode';
import CssBaseline from '@mui/material/CssBaseline';
import { Container } from '@mui/material';
import * as esbuild from 'esbuild-wasm';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';

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
    } catch (error) {
      window.location.reload();
    }
  };

  React.useEffect(() => {
    initializeEsBuild();
  }, []);

  const onClick = async () => {
    try {
      const result = await esbuild.build({
        entryPoints: ['index.js'],
        bundle: true,
        write: false,
        plugins: [
          unpkgPathPlugin()
        ],
      });

      console.log(result.outputFiles[0].contents);
      console.log(result);

      setCode(result.outputFiles[0].text);
    } catch (error) {
      console.log(error);
    }
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
