export interface prompSelectAsk extends prompInputs{
    options?:{value:any;label:string}[];
    showAdditional?:string;
    nameDescripcion?:string;
    textDescripcion?:string;
    validationsInput?:string;


}

import Select from 'react-select';
import { prompInputs } from '../../Props/InputProps';
import { Controller } from 'react-hook-form';


export const SelectAskFormHook: React.FC<prompSelectAsk> = ({
  name,
  tamano,
  context,
  info,
  options,
  validations,
  errors,
}) => {  

return (
  <div className={`${tamano}`}>
    <div className='mt-8 md:mx-4' >
      <label className="block text-sm  font-medium leading-6 text-gray-900 text-start">
          {context}
      </label>
      <div className="relative mt-2 rounded-md shadow-sm">
        <Controller
          name={name}
          rules={{required:"campo requerido"}}
          render={({ field }) => (
            <Select
              placeholder = 'Buscar'
              {...field}
              options={options}
              styles={{
                input: (base) => ({
                  ...base,
                  "input:focus": {
                    boxShadow: "none",
                  },
                }),
              }}
            />
          )}
          control={validations}
          defaultValue=""
        
        />
        {errors[name] && <span className='text-sm text-red-500'>{errors[name]?.message}</span>}
      </div>
    { name === 'Otro' && (
  <div>
   
  </div>
)}
      <p className="mt-2 text-sm leading-6 text-gray-600">{info}</p>
    </div>
  </div>
)}
