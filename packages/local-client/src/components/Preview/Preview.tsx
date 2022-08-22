import React from 'react';

const html = /*html */`
<!DOCTYPE html>
<html lang="en">
  <head></head>

  <body>
    <div id="root">

    <h1>Initial HTML</h1>

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
    <iframe
      ref={iframeRef}
      srcDoc={html}
      title="Preview"
      style={{ backgroundColor: '#fff' }}
      sandbox="allow-scripts"
    />
  );
};

export default Preview;