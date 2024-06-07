import React from 'react';
import { SelectProps } from '../../Props/InputProps';
import Select from 'react-select';
import { useFormContext } from 'react-hook-form';


export const CustomSelect: React.FC<SelectProps> = ({ optionsMulti, context, name, tamano,info,validations }) => {
  const { register, formState: { errors } } = useFormContext();
  return (
    <div className={`${tamano}`}>
    <div className='mt-8 md:mx-4'>
      <label className="block text-sm font-bold text-black leading-6 text-start">
        {context}
      </label>
      <div className="relative mt-2 rounded-md border border-blue-500">
        <Select
          className='text-sm'
          options={optionsMulti}
          placeholder='Buscar'
          onChange={(selectedOption) => {
            register(name, { value: selectedOption?.value, ...validations});
          }}
          styles={{
            input: (base) => ({
              ...base,
              "input:focus": {
                boxShadow: "none",
              },
            }),
          }}
        />
      </div>
      {errors[name]?.type === 'required' && (
          <p className="mt-2 text-sm leading-6 text-red-600">{errors[name]?.message}</p>
      )}
      <p className="mt-2 text-sm leading-6 text-gray-600">{info}</p>
    </div>
  </div>
  
  );
};
