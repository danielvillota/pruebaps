import { Button } from '../../components/button/Button';
import { FormStyle } from '../../components/FormStyle'
import { TitleFormText } from '../../components/TitleFormText';
import { tenure, permanence, life_style, desicions } from '../../data/diccionario';
import { API_URL } from '../../data/api';
import { WalfarData } from '../../Props/Interfaces';
import axios from 'axios';
import { SelectFormHook } from '../../components/select/SelectFormHook';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { InputNumberFormHook } from '../../components/inputs/InputNumberFormHook';



const Welfare = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<WalfarData>();
    const navigate = useNavigate();

    const keyfamily = localStorage.getItem('family')
    const onSubmit = async (data: WalfarData) => {
        console.log(keyfamily);
        try {
            const requestData = {
                tenure: data.tenure,
                time_residence: data.time_residence,
                permanence: data.permanence,
                lgtbi: data.lgtbi,
                life_style: data.life_style,
                alternative_health: data.alternative_health,
                family: keyfamily
            };
            console.log(requestData)
            await axios.post(`${API_URL}welfare/add/`, requestData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
            navigate(`/panelFamily/${keyfamily}`);
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
                    text='Bienestar'
                />

                <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col'>
                    <SelectFormHook
                        name='tenure'
                        tamano='md:w-1/2'
                        register={register}
                        validations={{
                            valueAsNumber: true,
                            validate: (value: number) => {
                                if (value === 0) {
                                    return 'EL campo es requerido'
                                }
                            }
                        }}
                        context='Tenencia'
                        options={tenure}
                        errors={errors}
                    >
                    </SelectFormHook>
                    <SelectFormHook
                        name='permanence'
                        tamano='md:w-1/2'
                        register={register}
                        validations={{
                            valueAsNumber: true,
                            validate: (value: number) => {
                                if (value === 0) {
                                    return 'EL campo es requerido'
                                }
                            }
                        }}
                        context='Permanencia'
                        options={permanence}
                        errors={errors}
                    >
                    </SelectFormHook>
                    <InputNumberFormHook
                            name="time_residence"
                            tamano='md:w-1/2'
                            register={register}
                            validations={{
                                required: { value: true, message: "El campo es requerido" },
                                maxLength: { value: 50, message: "Supera el limite real" }
                            }}
                            context='Descripcion detallada breve'
                            errors={errors}
                            type='text'
                        ></InputNumberFormHook>
                    <SelectFormHook
                        name='lgtbi'
                        tamano='md:w-1/2'
                        register={register}
                        validations={{
                            valueAsNumber: true,
                            validate: (value: number) => {
                                if (value === 0) {
                                    return 'EL campo es requerido'
                                }
                            }
                        }}
                        context='Existe un miembro dela familia de la comunidad LGTBI'
                        options={desicions}
                        errors={errors}
                    >
                    </SelectFormHook>
                    <SelectFormHook
                        name='life_style'
                        tamano='md:w-1/2'
                        register={register}
                        validations={{
                            valueAsNumber: true,
                            validate: (value: number) => {
                                if (value === 0) {
                                    return 'EL campo es requerido'
                                }
                            }
                        }}
                        context='Estilo de Vida'
                        options={life_style}
                        errors={errors}
                    >
                    </SelectFormHook>
                    <SelectFormHook
                        name='alternative_health'
                        tamano='md:w-1/2'
                        register={register}
                        validations={{
                            valueAsNumber: true,
                            validate: (value: number) => {
                                if (value === 0) {
                                    return 'EL campo es requerido'
                                }
                            }
                        }}
                        context='Salud alternativa'
                        options={desicions}
                        errors={errors}
                    >
                    </SelectFormHook>
                    <div className=' basis-full md:pe-4'><Button msg='Siguiente' msgTwo='Cancelar' /></div>
                </form>
            </FormStyle>
        </>
    )
}
export default Welfare;
//OK