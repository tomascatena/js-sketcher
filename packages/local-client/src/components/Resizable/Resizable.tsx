import React from 'react';
import { ResizableBox } from 'react-resizable';
import './resizable.css';

type Props = {
  direction: 'horizontal' | 'vertical';
  children: React.ReactNode;
};

const Resizable = ({
  direction,
  children
}: Props) => {
  return (
    <>
      <ResizableBox
        height={300}
        width={Infinity}
        resizeHandles={direction === 'horizontal' ? ['e', 'w'] : ['n', 's']}
      >
        {children}
      </ResizableBox>
    </>
  );
};

export default Resizable;