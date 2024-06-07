import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { InfoGeneralData } from '../../Props/Interfaces';
import { API_URL, get, post } from '../../data/api';
import { SelectAskFormHook } from '../../components/select/SelectAskFormHook';
import { SelectFormHook } from '../../components/select/SelectFormHook';
import { InputFormHook } from '../../components/inputs/InputFormHook';
import { TitleFormText } from '../../components/TitleFormText';
import { FormStyle } from '../../components/FormStyle';
import { dictionary } from '../../data/diccionario';
import { departamentosFormato, diccionaryNH, dictionaryEbs, municipiosFormato } from '../../data/maps';
import { Button } from '../../components/button/Button';
import { mapValuesToOptions } from './EditAtributesMember';

const EditInfoGeneral = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [val, setval] = useState<number>()
  const { register, reset, formState: { errors }, control, handleSubmit } = useForm<InfoGeneralData>();
  const navigate = useNavigate();
  const idt = localStorage.getItem('FamilyGlobal')
  
  useEffect(() => {
    const fetchData = async () => {
        try {
            const infoGeneral = await get(`${API_URL}info_general/?id=${id}`);
            setLoading(false);
            console.log(infoGeneral[0].id)
            setval(infoGeneral[0].id)

            const transformedData = {
                ...infoGeneral[0],
                departament: mapValuesToOptions([infoGeneral[0].departament], departamentosFormato),
                municipality:mapValuesToOptions([infoGeneral[0].municipality],municipiosFormato),
                id_primary_provider:mapValuesToOptions([infoGeneral[0].id_primary_provider],dictionaryEbs)
            };
            reset(transformedData);
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    };
    fetchData();
}, [id, reset]);

const onSubmit = async (data: InfoGeneralData) => {
  try {
      const requestData = {
        departament: data.departament.value,
        municipality: data.municipality.value,
        name_branding: data.name_branding.value,
        home_location: data.home_location,
        estratum: data.estratum,
        address:data.address,
        id_primary_provider: data.id_primary_provider.value,
      };
      console.log(requestData)
      await post(`${API_URL}info_general/update/${val}/`, requestData)
     
      navigate(`/panelFamily/${idt}`);
  } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
  }

}

const buttonCancel = () => {
    if (window.confirm('Estas Seguro de no guardar los cambios')) {
        navigate(`/panelFamily/${idt}`);
    }
};

  return (
   <>
   {loading && <div>cargando...</div>}
      {!loading && (
     <FormStyle>
     <TitleFormText
         title='Registro'
         text='Localización'
     />
     <form className='flex flex-col ' onSubmit={handleSubmit(onSubmit)}>
         <div className='w-full flex flex-col md:flex-row '>
             <SelectAskFormHook
                 context='Departamento'
                 errors={errors}
                 name='departament'
                 options={departamentosFormato}
                 tamano='md:w-1/2'
                 register={register}
                 validations={control}
             ></SelectAskFormHook>

             <SelectAskFormHook
                 context='Municipio'
                 errors={errors}
                 name='municipality'
                 options={municipiosFormato}
                 tamano='md:w-1/2'
                 register={register}
                 validations={control}
             ></SelectAskFormHook>
         </div>
         <SelectAskFormHook
                        context='Nombre del Centro Poblado'
                        errors={errors}
                        name='name_branding'
                        options={diccionaryNH}
                        tamano='md:w-1/2'
                        register={register}
                        validations={control}
                    />
         <InputFormHook
             name="address"
             tamano='md:w-2/3'
             register={register}
             validations={{
                 maxLength: { value: 200, message: 'Este campo no puede tener más de 200 caracteres' },
             }}
             type='text'
             context='Direccion'
             errors={errors}
         />

         <InputFormHook
             name="home_location"
             tamano='md:w-1/2'
             register={register}
             validations={{
                 maxLength: { value: 200, message: 'Este campo no puede tener mas de 200 caracteres' }
             }}
             type='text'
             context='Ubicación del hogar'
             errors={errors}
             info='Descripción de la ubicación del hogar (cuando no se cuenta con nomenclatura,
                     punto de referencia)'
         />

         <SelectFormHook
             name='estratum'
             tamano='md:w-1/4'
             register={register}
             validations={{
                 validate: (value) => {
                     if (value === "0") {
                         return 'EL campo es requerido'
                     }
                 }
             }}
             errors={errors}
             context='Estrato'
             options={dictionary}
             
         />

         <SelectAskFormHook
             context='Prestador Primario'
             errors={errors}
             name='id_primary_provider'
             options={dictionaryEbs}
             tamano='w-full'
             register={register}
             validations={control}
         ></SelectAskFormHook>
         <div className=' basis-full mt-8 md:pe-4'><Button msg='Actualizar' msgTwo='Cancelar'funTwo={buttonCancel}/></div>
     </form>
 </FormStyle>
      )}


          
   </>
  )
}

export default EditInfoGeneral