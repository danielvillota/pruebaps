import React, { useState } from 'react';
import { SelectPropsNormal } from '../../Props/InputProps';
import { InputGeneral } from '../inputs/InputGeneral';
import { useFormContext } from 'react-hook-form';

export const GeneralSelect: React.FC<SelectPropsNormal> = ({
   options, tamano, context, info, name, validationsInput,nameDescripcion,validations,showAdditional,textDescripcion
   }) => {
  const [estado, setEstado] = useState('hidden');
  const { register, formState: { errors }, setValue, clearErrors } = useFormContext();
  
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    const valor = options[parseInt(selectedValue)];
    console.log(valor)
    setValue(name, selectedValue);
    if (selectedValue !== '0') {
      clearErrors(name); // Limpiar el error asociado al campo
    }
    
    if (valor === showAdditional) {
      // Cambiar el estado a 'visible' si el valor seleccionado es el último valor del diccionario
      setEstado('block');
    } else {
      // Cambiar el estado a 'invisible' si no es el último valor
      setEstado('hidden');
    }
  };
  return (
    <div className={`${tamano}`}>
      <div className='mt-8 md:mx-4 basis-full' >
        <label className="block text-sm font-medium leading-6 text-gray-900 text-start">
        {context}
        </label>
        <div className="mt-2 rounded-md ">
          <select
            {...register(name, {
              ...validations,
              validate: value => value !== '0' || 'El campo es requerido' // Valida que se haya seleccionado una opción distinta de "0"
            })}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
            onChange={handleChange}
          >
            
            {Object.entries(options).map(([key, value]) => (
              <option key={key} value={key}>
                {value}
              </option>
            ))}
          </select>
        </div>
        {/* Mostrar mensaje de error según las reglas de validación */}
        {errors[name] && (
          <p className="mt-2 text-sm leading-6 text-red-600">{errors[name]?.message}</p>
        )}
        <p className="mt-2 text-sm leading-6 text-gray-600">{info}</p>
      </div>
      {estado === 'block' && <InputGeneral
            name={nameDescripcion}
            type='text'
            context={textDescripcion}
            validations={validationsInput}
            tamano='basis-full'/>}
    </div>
  );
};
