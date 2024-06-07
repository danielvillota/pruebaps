import React, { useState } from 'react';
import { InputComponentProps } from '../../Props/InputProps';
import { useFormContext } from 'react-hook-form';



export const InputGeneral: React.FC<InputComponentProps> = ({
  context,
  name,
  type,
  info,
  tamano,
  validations,
  placeholder,
  errors
}) => {
  const { register, formState: { isSubmitted } } = useFormContext(); 
  const handleInputChange = () => {
    setIsDirty(false); // Marcar el input como tocado cuando cambia
  };

  return (
    <div className={`${tamano}`}>
      <div className='mt-8 md:mx-4' >
        <label className="block text-sm font-medium leading-6 text-gray-900 text-start">
          {context}
        </label>
        <div className="relative mt-2 rounded-md shadow-sm">
          <input
            type={type}
            {...register(name, validations)}
            placeholder={placeholder}
            onChange={handleInputChange}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
          />
        </div>
        {errors?.name &&  <span className='text-sm text-red-500'>{errors.name?.message}</span> }
        <p className="mt-2 text-sm leading-6 text-gray-600">{info}</p>
      </div>
    </div>
  );
};
