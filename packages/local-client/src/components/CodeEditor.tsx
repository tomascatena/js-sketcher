import React from 'react';
import Editor, { EditorProps } from "@monaco-editor/react";

type Props = {
  language?: EditorProps['language'];
};

const CodeEditor = ({
  language = 'javascript'
}: Props) => {
  return (
    <Editor
      height={500}
      language={language}
    />
  );
};

export default CodeEditor;