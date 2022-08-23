import React from 'react';
import bundler from '../../bundler';
import CodeEditor from '../CodeEditor/CodeEditor';
import Preview from '../Preview/Preview';
import Resizable from '../Resizable/Resizable';
import { CodeCellContainer } from './CodeCell.styled';

const initialCode = `import React from 'react';
import ReactDOM from 'react-dom';

console.log('Hello World from the iframe');

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<h1>Hello, world!</h1>);
`;

const CodeCell = () => {
  const [code, setCode] = React.useState(initialCode);
  const [input, setInput] = React.useState(initialCode);


  React.useEffect(() => {
    const timer = setTimeout(async () => {
      const result = await bundler(input);

      setCode(result);
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

        <Preview code={code} />
      </CodeCellContainer>
    </Resizable>
  );
};

export default CodeCell;