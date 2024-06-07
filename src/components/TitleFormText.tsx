import React from 'react'


export interface TitleForm{
  text:string;
  title:string;
}

export const TitleFormText:React.FC<TitleForm> = ({text,title}) => {
  return (
    <div className='flex flex-col mt-2 text-center w-full rounded-md pt-2 pb-2'>
        <h1 className='text-black text-2xl font-semibold mx-2 '>{title}</h1>
        <h1 className='text-blue-500 text-4xl font-semibold mx-2 '>{text}</h1>
    </div>
  )
}
