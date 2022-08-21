import React from 'react';
import Editor from "@monaco-editor/react";

type Props = {
  language?: string;
  theme?: 'vs-dark' | 'light';
  initialValue?: string;
  onChange: (value: string) => void;
};

const CodeEditor = ({
  language = 'javascript',
  theme = 'vs-dark',
  initialValue = 'const a = 1;'
}: Props) => {
  const onEditorDidMount = (getValue: () => void, monacoEditor: any) => {
    console.log(getValue());

    monacoEditor.onDidChangeModelContent(() => {
      console.log(getValue());
    });
  };

  return (
    <Editor
      value={initialValue}
      editorDidMount={onEditorDidMount}
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