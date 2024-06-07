import Select from 'react-select';
import { useFormContext, Controller } from 'react-hook-form';
import { InputMultiSelectProps } from '../Props/InputProps';
import React, { useState } from 'react';
import { InputGeneral } from './InputGeneral';

export const InputMultiSelect: React.FC<InputMultiSelectProps> = ({ name, options, labelText, textDescripcion, nameDescripcion, showAdditional, ...rest }) => {
  const { control, setValue } = useFormContext();

  const handleChange = (selectedOption: any[]) => {
    // Extraer solo el valor de la opción seleccionada
    const selectedValue = selectedOption.map(option => option.value);
    
    // Actualizar el valor del campo del formulario con el valor seleccionado
    setValue(name, selectedValue);
  };

  return (
    <div className='basis-1/2'>
      <div className='mt-8 md:mx-4 basis-full' >
        <label className="block text-sm font-medium leading-6 mb-2 text-gray-900 text-start">
          {labelText}
        </label>
        <Controller
          control={control}
          name={name}
          render={({ field }) => (
            <Select
              {...field}
              options={options}
              isMuli
              styles={{
                input: (base) => ({
                  ...base,
                  "input:focus": {
                    boxShadow: "none",
                  },
                }),
              }}
              placeholder='Buscar'
              onChange={handleChange}
            />
          )}
        />
      </div>
      {/* Asegúrate de pasar el valor seleccionado al componente InputGeneral */}
    </div>
  );
};
