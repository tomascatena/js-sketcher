import React from 'react';
import Editor, { EditorDidMount } from "@monaco-editor/react";
import prettier from 'prettier';
import parser from 'prettier/parser-babel';

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
  const editorRef = React.useRef<any>();

  const onEditorDidMount: EditorDidMount = (getValue, monacoEditor) => {
    editorRef.current = monacoEditor;

    monacoEditor.onDidChangeModelContent(() => {
      console.log(getValue());
    });

    monacoEditor.getModel()?.updateOptions({ tabSize: 2 });
  };

  const onFormatClick = () => {
    const unformatted = editorRef.current.getModel().getValue();

    const formatted = prettier.format(unformatted, {
      parser: 'babel',
      plugins: [parser],
      useTabs: false,
      semi: true,
      singleQuote: true
    });

    editorRef.current.setValue(formatted);
  };

  return (
    <div>
      <button onClick={onFormatClick}>Format</button>

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
    </div>
  );
};

export default CodeEditor;