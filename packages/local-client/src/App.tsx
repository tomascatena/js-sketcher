import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { useDarkMode } from './hooks/useDarkMode';
import CssBaseline from '@mui/material/CssBaseline';
import { Container } from '@mui/material';
import * as esbuild from 'esbuild-wasm';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';
import { unpkgFetchPlugin } from './plugins/fetch-plugin';
import CodeEditor from './components/CodeEditor';

const App = () => {
  const { theme } = useDarkMode();

  const [input, setInput] = React.useState(`import React from 'react';
import { createRoot } from 'react-dom/client';

const container = document.getElementById('root');
const root = createRoot(container);

const App = () => {
  return <div>Hello World</div>;
}

root.render(<App />);
`);
  const iframeRef = React.useRef<HTMLIFrameElement>(null);
  const esbuildRef = React.useRef<any>();

  const startEsbuildService = async () => {
    esbuildRef.current = await esbuild.startService({
      worker: true,
      wasmURL: 'https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm',
    });
  };

  React.useEffect(() => {
    startEsbuildService();
  }, []);

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
  
            const spanElement = document.createElement('span');
            spanElement.innerText = error;
            spanElement.style.color = 'red';
            root.appendChild(spanElement);
  
            throw error;
          }
        }, false);
      </script>
    </body>
  </html>
  `;

  const onClick = async () => {
    if (!esbuildRef.current) {
      return;
    }

    // Initialize iframe html content
    if (iframeRef.current) {
      iframeRef.current.srcdoc = html;
    }
    const result = await esbuildRef.current.build({
      entryPoints: ['index.js'],
      bundle: true,
      write: false,
      plugins: [
        unpkgPathPlugin(),
        unpkgFetchPlugin(input)
      ],
      define: {
        "process.env.NODE_ENV": '"production"',
        global: "window"
      }
    });

    if (iframeRef.current?.contentWindow) {
      iframeRef.current.contentWindow.postMessage(result.outputFiles[0].text, '*');
    }

  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Container>
        <CodeEditor />

        <textarea
          onChange={e => setInput(e.target.value)}
          value={input}
          cols={90}
          rows={10}
        ></textarea>

        <div>
          <button onClick={onClick}>
            Submit
          </button>
        </div>

        {/* Cannot use localStorage and some other browser APIs when using srcDoc AND sandbox="" */}
        <iframe
          ref={iframeRef}
          srcDoc={html}
          title="Preview"
          style={{ backgroundColor: '#fff' }}
          sandbox="allow-scripts"
        ></iframe>
      </Container>
    </ThemeProvider>
  );
};


export default App;
