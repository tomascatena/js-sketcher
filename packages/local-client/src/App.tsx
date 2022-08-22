import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { useDarkMode } from './hooks/useDarkMode';
import CssBaseline from '@mui/material/CssBaseline';
import { Button, Container } from '@mui/material';
import CodeEditor from './components/CodeEditor/CodeEditor';
import Preview from './components/Preview/Preview';
import bundler from './bundler';

const initialCode = `import React from 'react';
import ReactDOM from 'react-dom';

console.log('Hello World from the iframe');

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<h1>Hello, world!</h1>);
`;

const App = () => {
  const { theme } = useDarkMode();

  const [code, setCode] = React.useState(initialCode);
  const [input, setInput] = React.useState(initialCode);

  const onClick = async () => {
    const result = await bundler(code);

    setCode(result);
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
          <Button variant="contained" onClick={onClick}>
            Build
          </Button>
        </div>

        <Preview code={code} />
      </Container>
    </ThemeProvider>
  );
};


export default App;
