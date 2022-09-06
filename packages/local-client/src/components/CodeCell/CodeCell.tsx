import React from 'react';
import CodeEditor from './CodeEditor/CodeEditor';
import Preview from './Preview/Preview';
import Resizable from '../Resizable/Resizable';
import { BundlingMessageContainer, CodeCellContainer } from './CodeCell.styled';
import { Cell, CellType } from '../../store/features/cells/cellsSlice';
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
  const [showBundlingMessage, setShowBundlingMessage] = React.useState(false);

  const { updateCell } = useActions();

  const dispatch = useAppDispatch();

  const bundle = useTypedSelector((state) => state.bundles.cellBundles[cell.id]);

  const cumulativeCode = useTypedSelector(state => {
    const { data, order } = state.cells;
    const orderedCells = order.map(id => data[id]);
    const cumulativeCode = [];

    for (let c of orderedCells) {
      if (c.type === CellType.JAVASCRIPT) {
        cumulativeCode.push(c.content);
      }

      if (c.id === cell.id) {
        break;
      }
    }

    return cumulativeCode.join('\n');
  });

  React.useEffect(() => {
    if (!bundle) {
      dispatch(createBundle({
        cellId: cell.id,
        rawCode: cumulativeCode,
      }));

      return;
    }

    const timer = setTimeout(async () => {
      dispatch(createBundle({
        cellId: cell.id,
        rawCode: cumulativeCode,
      }));
    }, 750);

    return () => {
      clearTimeout(timer);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cumulativeCode, cell.id, dispatch]);

  React.useEffect(() => {
    setShowBundlingMessage(false);

    let timer: ReturnType<typeof setTimeout> | null = null;

    if (!bundle || bundle.isBundling) {
      timer = setTimeout(() => {
        setShowBundlingMessage(true);
      }, 500);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [bundle]);

  const BundlingMessage = (
    showBundlingMessage ? (
      <BundlingMessageContainer>
        <CircularProgress />
        <Typography sx={{ marginLeft: '0.5rem' }}>
          {!bundle ? 'Loading...' : 'Bundling...'}
        </Typography>
      </BundlingMessageContainer>
    ) : null
  );

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
              <>{BundlingMessage}</>
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