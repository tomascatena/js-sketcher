import React from 'react';
import bundler from '../../bundler';
import CodeEditor from './CodeEditor/CodeEditor';
import Preview from './Preview/Preview';
import Resizable from '../Resizable/Resizable';
import { CodeCellContainer } from './CodeCell.styled';

const initialCode = `import React from 'react';
import ReactDOM from 'react-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<h1>Hello, world!</h1>);
`;

const CodeCell = () => {
  const [code, setCode] = React.useState<string | null>(initialCode);
  const [input, setInput] = React.useState(initialCode);
  const [error, setError] = React.useState<string | null>(null);


  React.useEffect(() => {
    const timer = setTimeout(async () => {
      const { code, error } = await bundler(input);

      setCode(code);
      setError(error);
    }, 750);

    return () => {
      clearTimeout(timer);
    };
  }, [input]);

  return (
    <Resizable direction='vertical'>
      <CodeCellContainer>
        <Resizable direction='horizontal'>
          <CodeEditor
            initialValue={initialCode}
            onChange={value => setInput(value)}
          />
        </Resizable>

        <Preview
          code={code}
          error={error}
        />
      </CodeCellContainer>
    </Resizable>
  );
};

export default CodeCell;