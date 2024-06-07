import React, { useState } from 'react'
import { prompInputs } from '../../Props/InputProps';
import { useForm } from 'react-hook-form';
import { InputFormHook } from '../inputs/InputFormHook';

export interface prompSelect extends prompInputs{
  options : { [key: number | string ]: string };
  nameDescripcion?:any;
  textDescripcion?:any;
  validationsInput?:any;
  showAdditional?:any
}

export const SelectFormHook: React.FC<prompSelect> = ({
    name,
    register,
    validations,
    placeholder,
    errors,
    tamano,
    context,
    info,
    type,
    options,
    nameDescripcion,
    textDescripcion,
    showAdditional
}) => {
  const [estado, setEstado] = useState('hidden'); 
  const { setValue, clearErrors } = useForm();
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
    <div className='mt-8 md:mx-4' >
        <label className="block text-sm font-medium leading-6 text-gray-900 text-start">
            {context}
        </label>
        <div className="relative mt-2 rounded-md shadow-sm">
            <select
                type={type}
                {...register(name, validations)}
                autoComplete="current-password"
                placeholder={placeholder}
                defaultValue={null}
                onChange={handleChange}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6">
                         {Object.entries(options).map(([key, value]) => (
                    <option key={key} value={key}>
                      {value}
                    </option>
                  ))}   </select>
            {errors[name] && <span className='text-sm text-red-500'>{errors[name]?.message}</span>}
        </div>
        <p className="mt-2 text-sm leading-6 text-gray-600">{info}</p>
    </div>
    {estado === 'block' &&   <InputFormHook
      name={nameDescripcion}
      tamano='md:w-full'
      register={register}
      validations={{
        maxLength: { value: 30, message: 'Este campo no puede tener más de 30 caracteres' },
      }}
      
      type='text'
      context={textDescripcion}
      errors={errors}
      />}
</div>
  )
}

