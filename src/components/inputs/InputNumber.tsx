import React from 'react'
import { InputNumberprops } from '../../Props/InputProps'
import {useForm  } from 'react-hook-form';


export const InputNumber:React.FC<InputNumberprops> = ({
  context,
  name,
  info,
  tamano,
  maxValue,
  minValue,
  validations,
  
  }) => {
    const { register, formState: { errors } } = useForm();
    return (
      <div className={`${tamano} `}>
        <div className='mt-8 md:mx-4' >
          <label className="block text-sm font-medium leading-6 text-gray-900 text-start">
            {context}
          </label>
          <div className="relative mt-2 rounded-md shadow-sm">
            <input
              type="number"
              aria-describedby="helper-text-explanation"
              placeholder="0"
              {...register(name,validations)}
              min={minValue}
              max={maxValue} 
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6" />
          </div>
          {errors[name] && (
          <p className="mt-2 text-sm leading-6 text-red-600">{errors[name]?.message}</p>
        )}
          <p className="mt-2 text-sm leading-6 text-gray-600">{info}</p>
        </div>
      </div>
    )
  }