import { FormStyle } from '../components/FormStyle'
import { TitleFormText } from '../components/TitleFormText'
import { InputFormHook } from '../components/inputs/InputFormHook'
import { useForm } from 'react-hook-form'
import { Button } from '../components/button/Button'
import { SelectAskFormHook } from '../components/select/SelectAskFormHook'
import { dictionaryJobs } from '../data/maps'
import { useUserContext } from '../Props/UserProvider'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { API_URL, get, post } from '../data/api'
import { mapValuesToOptions } from '../forms/EditForms/EditAtributesMember'
export interface userDataExport {
    name: string;
    password: string;
    old_password:string;
    username: string;
    id_document:string;
    last_name: string;
    telephone:string;
    email: string;
    job: any
}
const EditUser = () => {
    const user = useUserContext();
    const [loading, setLoading] = useState(true);
    const [val, setval] = useState('')
    const { register, formState: { errors }, watch, control, reset, handleSubmit } = useForm<userDataExport>();
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const userData = await get(`${API_URL}pollster/?id=${user.pollster.pollster.id}`);
                setLoading(false);
                console.log(userData[0])
                setval(userData[0].user.id)
                console.log()

                const transformedData = {
                    ...userData[0],
                    username: userData[0].user.username,
                    id_document: userData[0].name_person.id_document,
                    last_name: userData[0].name_person.last_name,
                    name: userData[0].name_person.name,
                    telephone: userData[0].contact.telephone,
                    email: userData[0].contact.email,
                    job: mapValuesToOptions([userData[0].job], dictionaryJobs)

                };
                reset(transformedData);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

   

    
    const buttonCancel = () => {
        if (window.confirm('Estas Seguro de no guardar los cambios')) {
            
            console.log(user.pollster.grupo[0].id)
            if (user.pollster.grupo[0].id === 1){
                navigate(`/encuestador`);
            } else if (user.pollster.grupo[0].id === 2){
                navigate(`/analista`);
            }else{
                navigate(`/admin`);
            }
            
            
        }
    };
    const onSubmit = async (data: userDataExport) => {
        try {

            const requestData = {
                    username:data.username,
                    password: data.password,
                    old_password: data.old_password,
            };

            const pollsterSend = {
                name_person:{
                    name: data.name,
                    id_document:data.id_document,
                    last_name: data.last_name,
                },
                contact:{
                    telephone:data.telephone,
                    email: data.email,
                },
                job: data.job.value,
            }
            await post(`${API_URL}user/update/${val}/`, requestData)
            await post(`${API_URL}pollster/update/${user.pollster.pollster.id}/`, pollsterSend)
        } catch (error) {
            console.error('Error fetching data:', error);
            alert('Verifica si la constraseña anatigua es correcta')
            setLoading(false);
        }

    }

    return (
        <div className='lg:mx-40 xl:mx-60 2xl:mx-80'>



            <FormStyle>

                <TitleFormText
                    title='Detalles del'
                    text={'Perfil'}
                />
                <form onSubmit={handleSubmit(onSubmit)}>


                    <InputFormHook
                        name="username"
                        tamano='md:w-full'
                        register={register}
                        validations={{
                            required: { value: true, message: "El campo es requerido" },
                            pattern: { value: /^[A-Za-z0-9]+$/i, message: "El formato no es el correcto" }
                        }}
                        type='text'
                        context='Usuario'
                        errors={errors}
                    />

<div className='flex flex-col mt-2 text-start w-full  pt-2'>
        <h1 className='text-black text-2xl font-semibold md:ml-4 mt-6 '>Cambio de Contraseña</h1>
    </div>
                    <InputFormHook
                        name="old_password"
                        tamano='md:w-1/2'
                        register={register}
                        type='password'
                        context='Contraseña Antigua'
                        errors={errors}
                    />

                    <div className='flex flex-col md:flex-row'>
                        <InputFormHook
                            name="password"
                            tamano='md:w-1/2'
                            register={register}
                            validations={{
                                minLength: { value: 2, message: "La contraseña debe tener al menos 6 caracteres" }
                            }}
                            type='password'
                            context='Nueva Contraseña'
                            errors={errors}
                        />

                        <InputFormHook
                            name="confirm"
                            tamano='md:w-1/2'
                            register={register}
                            validations={{
                                validate: (value: any) => {
                                    if (value === watch('password')) {
                                        return true;
                                    } else {
                                        return 'Las contraseñas no coinciden'
                                    }
                                }
                            }}
                            type='password'
                            context='Confirmar Contraseña'
                            errors={errors}
                        />
                    </div>

                    <div className='flex flex-col mt-2 text-start w-full  pt-2'>
        <h1 className='text-black text-2xl font-semibold md:ml-4 mt-6 '>Datos Personales</h1>
    </div>
                    <div className='flex flex-col md:flex-row'>
                        <InputFormHook
                            name="name"
                            tamano='md:w-1/2'
                            register={register}
                            validations={{
                                required: { value: true, message: "El campo es requerido" },
                                pattern: { value: /^[A-Za-z\s]+$/i, message: "El formato no es el correcto" }
                            }}
                            type='text'
                            context='Nombres'
                            errors={errors}
                        />

                        <InputFormHook
                            name="last_name"
                            tamano='md:w-1/2'
                            register={register}
                            validations={{
                                required: { value: true, message: "El campo es requerido" },
                                pattern: { value: /^[A-Za-z\s]+$/i, message: "El formato no es el correcto" }
                            }}
                            type='text'
                            context='Apellidos'
                            errors={errors}
                        />
                    </div>
                    <InputFormHook
                        name="id_document"
                        tamano='md:w-1/2'
                        register={register}
                        validations={{
                            required: { value: true, message: "El campo es requerido" },
                            pattern: { value: /^[0-9]+$/i, message: "El formato no es el correcto" },
                            maxLength: { value: 20, message: "Supera el limite real" }
                        }}
                        type='text'
                        context='Numero de Documento'
                        errors={errors}
                    />

                    <div className='flex flex-col md:flex-row'>
                        <InputFormHook
                            name="telephone"
                            tamano='md:w-full'
                            register={register}
                            placeholder='+57'
                            validations={{
                                required: { value: true, message: "El campo es requerido" },
                                pattern: { value: /^[0-9]+$/i, message: "El formato no es el correcto" },
                                maxLength: { value: 20, message: "Supera el limite real" }
                            }}
                            type='text'
                            context='Telefono de Contacto'
                            errors={errors}
                        />
                        <InputFormHook
                            name="email"
                            tamano='md:w-full'
                            register={register}
                            placeholder='exam@xxx.com'
                            validations={{
                                required: { value: true, message: "El campo es requerido" },
                                pattern: {
                                    value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                                    message: "El formato no es el correcto"
                                },

                            }}
                            type='text'
                            context='Correo electronico'
                            errors={errors}
                        />
                    </div>


                    <SelectAskFormHook
                        context='Profesion'
                        errors={errors}
                        name='job'
                        options={dictionaryJobs}
                        tamano='w-full'
                        register={register}
                        validations={control}
                    ></SelectAskFormHook>


                    <div className=' w-full md:w-1/3 md:mt-10 md:mb-0 mt-8 mb-14 md:mx-4'><Button msg='Actualizar' msgTwo='salir' funTwo={buttonCancel}/></div>
                </form>

            </FormStyle>
        </div>
    )
}

export default EditUser