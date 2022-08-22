import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { useDarkMode } from './hooks/useDarkMode';
import CssBaseline from '@mui/material/CssBaseline';
import { Container } from '@mui/material';
import * as esbuild from 'esbuild-wasm';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';
import { unpkgFetchPlugin } from './plugins/unpkg-fetch-plugin';
import CodeEditor from './components/CodeEditor/CodeEditor';
import Preview from './components/Preview/Preview';

const initialCode = `import React from 'react';
import ReactDOM from 'react-dom';

console.log('Hello World');
console.log(document.getElementById('root'))

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<h1>Hello, world!</h1>);
`;

const App = () => {
  const { theme } = useDarkMode();

  const [code, setCode] = React.useState(initialCode);
  const [input, setInput] = React.useState(initialCode);

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

  const onClick = async () => {
    if (!esbuildRef.current) {
      return;
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

    setCode(result.outputFiles[0].text);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Container>
        <CodeEditor
          initialValue={initialCode}
          onChange={value => setInput(value)}
        />

        <div>
          <button onClick={onClick}>
            Submit
          </button>
        </div>

        <Preview code={code} />
      </Container>
    </ThemeProvider>
  );
};


export default App;
