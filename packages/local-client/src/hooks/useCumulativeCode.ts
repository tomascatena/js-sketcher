import { CellType } from '@/store/features/cells/cellsSlice';
import { useTypedSelector } from './useTypedSelector';

export const useCumulativeCode = (cellId: string) => {
  return useTypedSelector((state) => {
    const { data, order } = state.cells;
    const orderedCells = order.map((id) => data[id]);

    const showFunction = `
    import _React from 'react';
    import _ReactDOM from 'react-dom';

    var show = (value) => {
      const root = document.querySelector('#root');

      if(typeof value === 'object') {
        if(value.$$typeof && value.props) {
          _ReactDOM.render(value, root);
        } else {
          root.innerHTML = JSON.stringify(value);
        }
      } else {
        root.innerHTML = value;
      }
    };
    `;

    const showFunctionNoOp = 'var show = () => {}';

    const cumulativeCode = [];

    for (const cell of orderedCells) {
      if (cell.type === CellType.JAVASCRIPT) {
        if (cell.id === cellId) {
          cumulativeCode.push(showFunction);
        } else {
          cumulativeCode.push(showFunctionNoOp);
        }

        cumulativeCode.push(cell.content);
      }

      if (cell.id === cellId) {
        break;
      }
    }

    return cumulativeCode.join('\n');
  });
};
