import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { useDarkMode } from './hooks/useDarkMode';
import CssBaseline from '@mui/material/CssBaseline';
import { Container } from '@mui/material';
import * as esbuild from 'esbuild-wasm';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';
import { unpkgFetchPlugin } from './plugins/fetch-plugin';

const App = () => {
  const { theme } = useDarkMode();

  const [input, setInput] = React.useState(`
import React from 'react';
import { createRoot } from 'react-dom/client';

const container = document.getElementById('root');
const root = createRoot(container);

const App = () => {
  return <div>Hello World</div>;
}

root.render(<App />);
`);
  const [code, setCode] = React.useState('');
  const [isEsbuildInitialized, setIsEsbuildInitialized] = React.useState(false);

  const iframeRef = React.useRef<HTMLIFrameElement>(null);

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
          global: 'window'
        }
      });

      if (iframeRef.current?.contentWindow) {
        iframeRef.current.contentWindow.postMessage(result.outputFiles[0].text, '*');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const html = /*html */`
<!DOCTYPE html>
<html lang="en">
  <head></head>

  <body>
    <div id="root">

    <script>
      window.addEventListener('message', (event) => {
        try {
          eval(event.data);
        } catch (error) {
          const root = document.querySelector('#root');

          const errorTitle = document.createElement('h4');
          errorTitle.innerText = 'Runtime Error';
          errorTitle.style.color = 'red';
          root.appendChild(errorTitle);

          const divElement = document.createElement('span');
          divElement.innerText = error;
          divElement.style.color = 'red';
          root.appendChild(divElement);

          throw error;
        }
      }, false);
    </script>
  </body>
</html>
`;

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
          ref={iframeRef}
          srcDoc={html}
          title="iframe"
          style={{ backgroundColor: '#fff' }}
          sandbox="allow-scripts"
        ></iframe>
      </Container>
    </ThemeProvider>
  );
};


export default App;
