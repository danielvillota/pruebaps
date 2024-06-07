import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { FamilyData } from '../../Props/Interfaces'
import { useNavigate, useParams } from 'react-router-dom';
import { API_URL, get, post } from '../../data/api';
import { SelectFormHook } from '../../components/select/SelectFormHook';
import { tipeFamilies, familyFraphic, Apgar, desicions, sarit, ecomapa } from '../../data/diccionario';
import { FormStyle } from '../../components/FormStyle';
import { TitleFormText } from '../../components/TitleFormText';
import { Button } from '../../components/button/Button';

const EditFamily = () => {
    const { id } = useParams();
    const { register , handleSubmit, formState:{ errors }, reset } = useForm<FamilyData>();
    const [val, setVal] = useState<string>();
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setVal(id)
                const family = await get(`${API_URL}family/all_info/?id=${id}`);
                setLoading(false);
                console.log(family)
                const transformedData = {
                    ...family[0],
                };
                reset(transformedData);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };
        fetchData();
    }, [id, reset]);


    const onSubmit = async (data:FamilyData) => {
        try{
            const requestData = {
                family_type: data.family_type,
                family_graphic: data.family_graphic,
                apgar: data.apgar,
                carer: data.carer,
                zarit: data.zarit,
                ecomapa: data.ecomapa,
                observation:data.observation,
            };

            console.log(requestData)
            await post(`${API_URL}family/update/${val}/`, requestData)
            navigate(`/panelFamily/${id}`);
        }catch (error){
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    }

    const buttonCancel = () => {
        if (window.confirm('Estas Seguro de no guardar los cambios')) {
            navigate(`/panelFamily/${id}`);
        }
    };

    return (
        <>
            {loading && <div>Cargando...</div>}
            {!loading && (
                <FormStyle>
                <TitleFormText
                    title='Registro'
                    text='Familia'
                />
                <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col'>

                <SelectFormHook
                        name='family_type'
                        tamano='md:w-1/2'
                        register={register}
                        validations={{
                            valueAsNumber: true,
                            validate: (value:number) => {
                                if (value === 0) {
                                    return 'EL campo es requerido'
                                }
                            }
                        }}
                        context='Tipo de Familia'
                        options={tipeFamilies}
                        errors={errors}
                    >
                    </SelectFormHook>

                    <SelectFormHook
                        name='carer'
                        tamano='md:w-1/2'
                        register={register}
                        validations={{
                            valueAsNumber: true,
                            validate: (value:number) => {
                                if (value === 0) {
                                    return 'EL campo es requerido'
                                }
                            }
                        }}
                        context='Cuidador en la familia'
                        options={desicions}
                        errors={errors}
                    >
                    </SelectFormHook>

                    <div className='md:basis-1/2'>
                        <SelectFormHook
                        name='family_graphic'
                        tamano='md:w-1/2'
                        register={register}
                        validations={{
                            valueAsNumber: true,
                            validate: (value:number) => {
                                if (value === 0) {
                                    return 'EL campo es requerido'
                                }
                            }
                        }}
                        context='Resultado de Familiograma'
                        options={familyFraphic}
                        errors={errors}
                    >
                    </SelectFormHook>
                    </div>
                    <div className='md:basis-1/2'>
                        
                    <SelectFormHook
                        name='apgar'
                        tamano='md:w-1/2'
                        register={register}
                        validations={{
                            valueAsNumber: true,
                            validate: (value:number) => {
                                if (value === 0) {
                                    return 'EL campo es requerido'
                                }
                            }
                        }}
                        context='Código del resultado del Apgar familiar'
                        options={Apgar}
                        errors={errors}
                    >
                    </SelectFormHook> 
                        
                    <SelectFormHook
                        name='zarit'
                        tamano='md:w-1/2'
                        register={register}
                        validations={{
                            valueAsNumber: true,
                            validate: (value:number) => {
                                if (value === 0) {
                                    return 'EL campo es requerido'
                                }
                            }
                        }}
                        context='Código del resultado de la escala ZARIT'
                        options={sarit}
                        errors={errors}
                    >
                    </SelectFormHook> 
             
                    <SelectFormHook
                        name='ecomapa'
                        tamano='md:w-1/2'
                        register={register}
                        validations={{
                            valueAsNumber: true,
                            validate: (value:number) => {
                                if (value === 0) {
                                    return 'EL campo es requerido'
                                }
                            }
                        }}
                        context='Código del resultado del Ecomapa'
                        options={ecomapa}
                        errors={errors}
                    >
                    </SelectFormHook>
                    <textarea 
                    rows={4}
                    {...register('observation')}
                    className="block w-full rounded-md border-0 py-1.5 mt-6 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:bg-[#3b82f6 ] sm:text-sm sm:leading-6">
                    </textarea>
                    
                        <div className=' basis-full mt-10 md:pe-4'><Button msg='Actualizar' funTwo={buttonCancel} msgTwo='cancelar' /></div>
                    </div>
                </form>


            </FormStyle>
            )}
        </>
    )
}

export default EditFamily