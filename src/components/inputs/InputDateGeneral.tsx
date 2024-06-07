import React from 'react'
import { InputComponentProps } from '../../Props/InputProps'
import { useFormContext } from 'react-hook-form';


const InputDateGeneral:React.FC<InputComponentProps> = ({
    name,
    context,
    type,
  
  }) => {
  const { register } = useFormContext();
  return (
    <div className='mt-4 mx-1 lg:mx-32'>
    <label htmlFor="fecha" className=" block text-sm font-medium leading-6 text-gray-900 text-start">
      {context}
    </label>
    <div className="relative mt-2 rounded-md shadow-sm">
      <input
        type={type}
        {...register(name)}
        className="block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"      /> 
    </div>
  </div>
  )
}

export default InputDateGeneral
