import React from 'react';
import bundler from '../../bundler';
import CodeEditor from './CodeEditor/CodeEditor';
import Preview from './Preview/Preview';
import Resizable from '../Resizable/Resizable';
import { CodeCellContainer } from './CodeCell.styled';
import { Cell } from '../../store/features/cells/cellsSlice';
import { useActions } from '../../hooks/useActions';
import { Box } from '@mui/system';

const initialCode = `import React from 'react';
import ReactDOM from 'react-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<h1>Hello, world!</h1>);
`;

type Props = {
  cell: Cell;
};

const CodeCell = ({ cell }: Props) => {
  const { updateCell } = useActions();

  const [code, setCode] = React.useState<string | null>(initialCode);
  const [error, setError] = React.useState<string | null>(null);


  React.useEffect(() => {
    const timer = setTimeout(async () => {
      const { code, error } = await bundler(cell.content);

      setCode(code);
      setError(error);
    }, 750);

    return () => {
      clearTimeout(timer);
    };
  }, [cell.content]);

  return (
    <Box sx={{ paddingBottom: '0.7rem' }}>
      <Resizable direction='vertical'>
        <CodeCellContainer>
          <Resizable direction='horizontal'>
            <CodeEditor
              initialValue={cell.content}
              onChange={value => updateCell({ id: cell.id, content: value })}
            />
          </Resizable>

          <Preview
            code={code}
            error={error}
          />
        </CodeCellContainer>
      </Resizable>
    </Box>
  );
};

export default CodeCell;