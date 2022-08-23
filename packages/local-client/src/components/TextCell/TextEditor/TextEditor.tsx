import React from 'react';
import MDEditor from '@uiw/react-md-editor';

type Props = {};

const TextEditor = (props: Props) => {
  const [value, setValue] = React.useState("**Hello world!!!**");

  return (
    <MDEditor
      value={value}
      onChange={e => setValue(e as string)}
    />
  );
};

export default TextEditor;