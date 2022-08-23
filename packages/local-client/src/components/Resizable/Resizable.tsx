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

  let resizableProps: ResizableBoxProps;

  if (direction === 'horizontal') {
    resizableProps = {
      height: Infinity,
      width: window.innerWidth * 0.75,
      resizeHandles: ['e'],
      maxConstraints: [window.innerWidth * 0.75, Infinity],
      minConstraints: [window.innerWidth * 0.2, Infinity]
    };
  } else {
    resizableProps = {
      height: 300,
      width: Infinity,
      resizeHandles: ['s'],
      maxConstraints: [Infinity, window.innerHeight * 0.9],
      minConstraints: [Infinity, window.innerHeight * 0.1]
    };
  }

  return (
    <>
      <ResizableBox {...resizableProps}>
        {children}
      </ResizableBox>
    </>
  );
};

export default Resizable;