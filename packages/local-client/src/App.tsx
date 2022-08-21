import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { useDarkMode } from './hooks/useDarkMode';
import CssBaseline from '@mui/material/CssBaseline';
import { Container } from '@mui/material';
import * as esbuild from 'esbuild-wasm';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';
import { unpkgFetchPlugin } from './plugins/fetch-plugin';

const html = /*html */`
<h1>Local HTML Doc</h1>
`;

const App = () => {
  const { theme } = useDarkMode();

  const [input, setInput] = React.useState(`
import React from 'react';

const App = () => {
  return (
    <div>
      <h1>Hello World</h1>
    </div>
  );
}
`);
  const [code, setCode] = React.useState('');
  const [isEsbuildInitialized, setIsEsbuildInitialized] = React.useState(false);

  const initializeEsBuild = async () => {
    try {
      await esbuild.initialize({
        worker: true,
        wasmURL: 'https://unpkg.com/esbuild-wasm@0.15.5/esbuild.wasm',
      });

      setIsEsbuildInitialized(true);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    if (!isEsbuildInitialized) {
      initializeEsBuild();
    }
  }, [isEsbuildInitialized]);

  const onClick = async () => {
    if (!isEsbuildInitialized) {
      return;
    }

    try {
      const result = await esbuild.build({
        entryPoints: ['index.js'],
        bundle: true,
        write: false,
        plugins: [
          unpkgPathPlugin(),
          unpkgFetchPlugin(input)
        ],
        define: {
          'process.env.NODE_ENV': "production",
          global: 'window'
        }
      });

      setCode(result.outputFiles[0].text);

      try {
        eval(result.outputFiles[0].text);
      } catch (error) {
        console.log(error);
      }
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
          cols={90}
          rows={10}
        ></textarea>

        <div>
          <button
            disabled={!isEsbuildInitialized}
            onClick={onClick}
          >
            Submit
          </button>
        </div>

        <pre>{code}</pre>

        {/* Cannot use localStorage and some other browser APIs when using srcDoc AND sandbox="" */}
        <iframe
          srcDoc={html}
          title="iframe"
          style={{ backgroundColor: '#fff' }}
          sandbox=""
        ></iframe>
      </Container>
    </ThemeProvider>
  );
};


export default App;
