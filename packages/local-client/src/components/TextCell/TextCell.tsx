import React from 'react';
import MDEditor from '@uiw/react-md-editor';
import { Cell } from '../../store/features/cells/cellsSlice';

type Props = {
  cell: Cell;
};

const TextCell = ({ cell }: Props) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [value, setValue] = React.useState("# Pelusa");

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
          value={value}
          onChange={e => setValue(e || '')}
        />
      </div>
    );
  } else {
    return (
      <div
        onClick={() => setIsEditing(true)}
        data-color-mode="dark"
      >
        <MDEditor.Markdown source={value} />
      </div>
    );
  }
};

export default TextCell;