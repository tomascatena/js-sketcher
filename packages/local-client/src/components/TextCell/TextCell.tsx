import React from 'react';
import MDEditor from '@uiw/react-md-editor';

type Props = {};

const TextCell = (props: Props) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [value, setValue] = React.useState("# Tomas Catena");

  React.useEffect(() => {
    const listener = (event: MouseEvent) => {
      setIsEditing(false);
    };

    window.addEventListener('click', listener, { capture: true });

    return () => {
      window.removeEventListener('click', listener, { capture: true });
    };
  }, []);

  if (isEditing) {
    return (
      <MDEditor
        value={value}
        onChange={e => setValue(e as string)}
      />
    );
  } else {
    return (
      <div onClick={() => setIsEditing(true)}>
        <MDEditor.Markdown source={value} />
      </div>
    );
  }
};

export default TextCell;