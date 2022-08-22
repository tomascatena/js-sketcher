import { Button } from '@mui/material';
import React from 'react';
import bundler from '../../bundler';
import CodeEditor from '../CodeEditor/CodeEditor';
import Preview from '../Preview/Preview';

const initialCode = `import React from 'react';
import ReactDOM from 'react-dom';

console.log('Hello World from the iframe');

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<h1>Hello, world!</h1>);
`;

type Props = {};

const CodeCell = (props: Props) => {
  const [code, setCode] = React.useState(initialCode);
  const [input, setInput] = React.useState(initialCode);

  const onClick = async () => {
    const result = await bundler(code);

    setCode(result);
  };

  return (
    <>
      <div>
        <CodeEditor
          initialValue={initialCode}
          onChange={value => setInput(value)}
        />

        <Preview code={code} />
      </div>

      <div>
        <Button variant="contained" onClick={onClick}>
          Run Code
        </Button>
      </div>
    </>
  );
};

export default CodeCell;