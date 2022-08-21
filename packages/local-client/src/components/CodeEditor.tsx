import React from 'react';
import Editor from "@monaco-editor/react";

type Props = {
  language?: string;
  theme?: 'vs-dark' | 'light';
};

const CodeEditor = ({
  language = 'javascript',
  theme = 'vs-dark'
}: Props) => {
  return (
    <Editor
      height={500}
      language={language}
      theme={theme}
      options={{
        wordWrap: 'on',
        minimap: { enabled: false },
        showUnused: false,
        folding: false,
        lineNumbersMinChars: 3,
        fontSize: 16,
        scrollBeyondLastLine: false,
        automaticLayout: true
      }}
    />
  );
};

export default CodeEditor;