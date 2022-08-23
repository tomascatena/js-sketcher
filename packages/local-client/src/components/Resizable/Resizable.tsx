import React from 'react';
import { ResizableBox, ResizableBoxProps } from 'react-resizable';
import './resizable.css';

type Props = {
  direction: 'horizontal' | 'vertical';
  children: React.ReactNode;
};

const Resizable = ({
  direction,
  children
}: Props) => {
  const [innerHeight, setInnerHeight] = React.useState(window.innerHeight);
  const [innerWidth, setInnerWidth] = React.useState(window.innerWidth);

  const [width, setWidth] = React.useState(innerWidth * 0.75);

  let resizableProps: ResizableBoxProps;

  React.useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;

    const listener = () => {
      if (timer) {
        clearTimeout(timer);
      }

      timer = setTimeout(() => {
        setInnerHeight(window.innerHeight);
        setInnerWidth(window.innerWidth);

        if (window.innerWidth * 0.75 < width) {
          setWidth(window.innerWidth * 0.75);
        }
      }, 100);
    };

    window.addEventListener('resize', listener);

    return () => {
      window.removeEventListener('resize', listener);
    };
  }, [width]);

  if (direction === 'horizontal') {
    resizableProps = {
      className: 'resize-horizontal',
      height: Infinity,
      width,
      resizeHandles: ['e'],
      maxConstraints: [innerWidth * 0.75, Infinity],
      minConstraints: [innerWidth * 0.2, Infinity],
      onResizeStop(e, data) {
        setWidth(data.size.width);
      },
    };
  } else {
    resizableProps = {
      height: 300,
      width: Infinity,
      resizeHandles: ['s'],
      maxConstraints: [Infinity, innerHeight * 0.9],
      minConstraints: [Infinity, innerHeight * 0.1]
    };
  }

  return (
    <ResizableBox {...resizableProps}>
      {children}
    </ResizableBox>
  );
};

export default Resizable;