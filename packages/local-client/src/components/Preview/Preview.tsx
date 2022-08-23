import React from 'react';
import './preview.css';

const html = /*html */`
<!DOCTYPE html>
<html lang="en">
  <head>
    <style>
      html { 
        background-color: #fff; 
        font-family: 'Roboto', sans-serif;
        font-size: 1rem;
        margin: 0;
        padding: 0;
      }
    </style>
  </head>

  <body>
    <div id="root">

    <script>
      const handlerError = (error) => {
        const root = document.querySelector('#root');

        const errorTitle = document.createElement('h4');
        errorTitle.innerText = 'Runtime Error';
        errorTitle.style.color = 'red';
        root.appendChild(errorTitle);

        const spanElement = document.createElement('span');
        spanElement.innerText = error;
        spanElement.style.color = 'red';
        root.appendChild(spanElement);

        throw error;
      };

      window.addEventListener('error', (event) => {
        event.preventDefault();
        handlerError(event.error);
      });

      window.addEventListener('message', (event) => {
        try {
          eval(event.data);
        } catch (error) {
          handlerError(error);
        }
      }, false);
    </script>
  </body>
</html>
`;

type Props = {
  code: string | null;
  error: string | null;
};

const Preview = ({ code, error }: Props) => {
  const iframeRef = React.useRef<HTMLIFrameElement>(null);

  React.useEffect(() => {
    if (iframeRef?.current) {
      iframeRef.current.srcdoc = html;

      // Wait for the event listener inside the iframe to load
      setTimeout(() => {
        if (iframeRef.current?.contentWindow) {
          iframeRef.current.contentWindow.postMessage(code, '*');
        }
      }, 50);
    }
  }, [code]);

  return (
    <div className='iframe-wrapper'>
      <iframe
        ref={iframeRef}
        srcDoc={html}
        title="Preview"
        sandbox="allow-scripts"
      />

      {error && (
        <div className="build-error">
          <h4>Runtime Error</h4>
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

export default Preview;