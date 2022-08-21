import React from 'react';
import Editor, { EditorDidMount } from "@monaco-editor/react";
import prettier from 'prettier';
import parser from 'prettier/parser-babel';
import { StyledBox, StyledButton } from './CodeEditor.styled';
import codeShift from 'jscodeshift';
import Highlighter from 'monaco-jsx-highlighter';

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

    const highlighter = new Highlighter(
      // @ts-ignore
      window.monaco,
      codeShift,
      monacoEditor
    );

    highlighter.highLightOnDidChangeModelContent(
      () => { },
      () => { },
      undefined,
      () => { }
    );
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
    <StyledBox>
      <StyledButton
        variant="outlined"
        onClick={onFormatClick}
        className="format-button"
      >
        Format
      </StyledButton>

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
    </StyledBox>
  );
};

export default CodeEditor;