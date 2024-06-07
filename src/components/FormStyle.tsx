import React, { ReactNode } from 'react';

export const FormStyle = ({ children }: { children: ReactNode }) => {
  return (
    <div className='flex flex-col rounded-md shadow-2xl pb-10 px-6 m-4 bg-white md:mx-32 mt-5 mb-5'>
      {children}
    </div>
  );
};