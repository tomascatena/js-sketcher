import React from 'react';
import Editor, { OnMount } from "@monaco-editor/react";
import prettier from 'prettier';
import parser from 'prettier/parser-babel';
import { StyledBox, StyledButton } from './CodeEditor.styled';

type Props = {
  language?: string;
  theme?: 'vs-dark' | 'light';
  initialValue?: string;
  onChange: (value: string) => void;
};

const CodeEditor = ({
  language = 'javascript',
  theme = 'vs-dark',
  initialValue = 'const a = 1;',
  onChange
}: Props) => {
  const editorRef = React.useRef<any>();

  const handleEditorMount: OnMount = async (editor, monaco) => {
    editorRef.current = editor;

    const model = editor.getModel();

    if (model) {
      model.updateOptions({ tabSize: 2 });
    }
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

  const handleChange = (value: string | undefined) => {
    onChange(value || '');
  };

  return (
    <StyledBox className='editor-wrapper'>
      <StyledButton
        variant="outlined"
        onClick={onFormatClick}
        className="format-button"
      >
        Format
      </StyledButton>

      <Editor
        value={initialValue}
        onMount={handleEditorMount}
        onChange={handleChange}
        height='100%'
        width='100%'
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