import React, { ReactNode } from 'react';

interface LayoutHeader {
    children: ReactNode;
  }
  
export const LayoutHeader: React.FC<LayoutHeader> = ({ children }) => {
    return (
    <div className='flex justify-around gap-52  md:justify-between items-center mx-auto px-4 max-w-[1140px] font-roboto xl:px-0'>
        {children}
    </div>
    );
  };