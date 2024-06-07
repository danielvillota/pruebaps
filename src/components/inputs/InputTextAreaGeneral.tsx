import React from 'react'
import { TextAreaProps } from '../../Props/InputProps'

export const InputTextAreaGeneral: React.FC<TextAreaProps> = ({context,tamano,name,cols,rows}) => {
  return (
    <div className={`${tamano}`}>
        <div className='mt-8 md:mx-4'>
            <label className=" block text-sm font-bold text-black leading-6 text-start">
            {context}
            </label>
            <textarea
                name={name}
                rows={rows}
                cols={cols}
                className="border border-blue-500 p-2 rounded-md relative mt-2 w-full"
            />
        </div>
    </div>
  )
}
