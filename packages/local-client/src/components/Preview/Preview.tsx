import React from 'react';
import './preview.css';

const html = /*html */`
<!DOCTYPE html>
<html lang="en">
  <head>
    <style>
      html { background-color: #fff; }
    </style>
  </head>

  <body>
    <div id="root">

    <script>
      window.addEventListener('message', (event) => {
        try {
          eval(event.data);
        } catch (error) {
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
        }
      }, false);
    </script>
  </body>
</html>
`;

type Props = {
  code: string;
};

const Preview = ({ code }: Props) => {
  const iframeRef = React.useRef<HTMLIFrameElement>(null);

  React.useEffect(() => {
    if (iframeRef?.current) {
      iframeRef.current.srcdoc = html;

      setTimeout(() => {
        if (iframeRef?.current?.contentWindow) {
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
    </div>
  );
};

export default Preview;