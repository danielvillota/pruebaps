import { tipeFamilies, familyFraphic, Apgar, desicions, sarit, ecomapa } from '../../data/diccionario';
import { Button } from '../../components/button/Button';
import { FormStyle } from '../../components/FormStyle';
import { TitleFormText } from '../../components/TitleFormText';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { FamilyData } from '../../Props/Interfaces';
import axios from 'axios';
import { API_URL } from '../../data/api';
import { SelectFormHook } from '../../components/select/SelectFormHook';


const Family = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FamilyData>();
    const navigate = useNavigate();
    const keyInfogeneral = localStorage.getItem('key')
    const onSubmit = async (data: FamilyData) => {
        console.log(keyInfogeneral);

        try {
            const requestData = {
                family_type: data.family_type,
                family_graphic: data.family_graphic,
                apgar: data.apgar,
                carer: data.carer,
                zarit: data.zarit,
                ecomapa: data.ecomapa,
                observation:data.observation,
                info_general: keyInfogeneral,
            };

            console.log(requestData)
            const response = await axios.post(`${API_URL}family/add/`, requestData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
            console.log(response.data.id)
            localStorage.setItem('family', response.data.id)
            navigate("/register/familyContext");
        } catch (error: unknown) {
            if (error.response) {
                alert('Registro Invalido')
            } else if (error.request) {
                alert('Servidor en mantenimiento Intente mas Tarde')
            } else {
                // Algo paso al preparar la petición que lanzo un Error
                console.log('Error', error.message);
            }
        }

    }


    return (
        <>
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


                    <div className='mt-8' >Algunas Observaciones</div>

                    <textarea 
                    rows={4}
                    {...register('observation')}
                    className="block w-full rounded-md border-0 py-1.5 mt-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:bg-[#3b82f6 ] sm:text-sm sm:leading-6">
                    </textarea>
                    
                        <div className=' basis-full mt-16 md:pe-4'><Button msg='Siguiente' msgTwo='Cancelar' /></div>
                    </div>
                </form>


            </FormStyle>
        </>
    )
}
export default Family;

//OK