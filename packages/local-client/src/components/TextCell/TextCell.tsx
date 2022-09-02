import React from 'react';
import MDEditor from '@uiw/react-md-editor';
import { Cell } from '../../store/features/cells/cellsSlice';
import { useActions } from '../../hooks/useActions';
import { MDPreviewContainer } from './TextCell.styled';

type Props = {
  cell: Cell;
};

const TextCell = ({ cell }: Props) => {
  const [isEditing, setIsEditing] = React.useState(false);

  const { updateCell } = useActions();

  const mdEditorRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (!mdEditorRef?.current?.contains(event.target as Node)) {
        setIsEditing(false);
      }
    };

    window.addEventListener('click', listener, { capture: true });

    return () => {
      window.removeEventListener('click', listener, { capture: true });
    };
  }, []);

  if (isEditing) {
    return (
      <div ref={mdEditorRef}>
        <MDEditor
          value={cell.content}
          onChange={value => updateCell({ id: cell.id, content: value || '' })}
        />
      </div>
    );
  } else {
    return (
      <MDPreviewContainer
        onClick={() => setIsEditing(true)}
        data-color-mode="dark"
      >
        <MDEditor.Markdown source={cell.content || '# Click to edit'} />
      </MDPreviewContainer>
    );
  }
};

export default TextCell;