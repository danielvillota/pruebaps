import React from 'react';
import Select from 'react-select';
import { Controller } from 'react-hook-form';
import { rule } from 'postcss';

export const SelectMultipleFormHook: React.FC<{
    name: string;
    context: string;
    info?: string;
    options: any[]; // Ajusta el tipo de tus opciones según lo que esperas recibir
    tamano: string;
    validations: any; // Ajusta el tipo según las reglas de validación que estás usando
    errors: any; // Ajusta el tipo según cómo manejas los errores
    placeholder?:any;
    rules?:any;
}> = ({
    name,
    tamano,
    context,
    info,
    options,
    validations,
    errors,
    placeholder,
    rules
}) => {
    return (
        <div className={`${tamano}`}>
            <label className="block text-sm font-medium leading-6 text-gray-900 text-start">
                {context}
            </label>
            <Controller
                name={name} // Asegúrate de que el nombre coincida con el esperado por el formulario
                rules={rules}
                render={({ field }) => (
                    <Select
                        options={options}
                        isMulti
                        {...field}
                        placeholder={placeholder}
                    />
                )}
                control={validations}

            />
            {errors[name] && <span className='text-sm text-red-500'>{errors[name]?.message}</span>}
            <p className="mt-2 text-sm leading-6 text-gray-600">{info}</p>
        </div>
    );
};
