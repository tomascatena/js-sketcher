import React from 'react';
import CodeEditor from './CodeEditor/CodeEditor';
import Preview from './Preview/Preview';
import Resizable from '../Resizable/Resizable';
import { CodeCellContainer } from './CodeCell.styled';
import { Cell } from '../../store/features/cells/cellsSlice';
import { useActions } from '../../hooks/useActions';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { createBundle } from '../../store/features/bundles/bundles.thunk';
import { CircularProgress, Box, Typography } from '@mui/material';

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

  const dispatch = useAppDispatch();

  const bundle = useTypedSelector((state) => state.bundles.cellBundles[cell.id]);

  React.useEffect(() => {
    const timer = setTimeout(async () => {
      dispatch(createBundle({
        cellId: cell.id,
        rawCode: cell.content,
      }));
    }, 750);

    return () => {
      clearTimeout(timer);
    };
  }, [cell.content, cell.id, dispatch]);

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

          {
            !bundle || bundle.isBundling ? (
              <Box sx={{
                flex: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                gap: '1rem',
              }}>
                <CircularProgress />
                <Typography sx={{ marginLeft: '0.5rem' }}>Bundling</Typography>
              </Box>
            ) : (
              <Preview
                code={bundle.code}
                error={bundle.error}
              />
            )
          }
        </CodeCellContainer>
      </Resizable>
    </Box>
  );
};

export default CodeCell;