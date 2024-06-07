import  { useEffect, useState } from 'react'
import { dictionaryJobs } from '../../data/maps';
import {  useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { InputFormHook } from '../../components/inputs/InputFormHook';
import { SelectAskFormHook } from '../../components/select/SelectAskFormHook';
import { Button } from '../../components/button/Button';
import { API_URL } from '../../data/api';
import { useUserContext } from '../../Props/UserProvider';
import { pollsterprops } from '../../Props/InputProps';
import { MOBILE_BREAKPOINT } from '../../page/register/Register';
import fondo from '../../assets/img/fondo.jpg'


const Pollster = () => {
    const { register, handleSubmit, formState: { errors },control } = useForm<pollsterprops>();
    const navigate = useNavigate();
    const user = useUserContext();
    const [width, setWidth] = useState(window.innerWidth);
    const onSubmit = async (data: pollsterprops) => {  
        try {
            const requestData = {
                name_person: {
                    name: data.name,
                    last_name: data.last_name,
                    id_document: data.id_document
                },
                contact: {
                    email: data.email,
                    telephone: data.telephone
                },
                job: data.job.value,
                user:user
                
            };
            console.log(requestData)
            await axios.post(`${API_URL}pollster/add/`, requestData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
            navigate("/login");
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
    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => {
          window.removeEventListener("resize", handleResize);
        };
      }, []);
    const handleResize = () => {
        setWidth(window.innerWidth);
      };

      const buttonCancel = () => {
        if (window.confirm('Estas Seguro de Cancelar el registro')) {
            navigate("/login/");
        }
    };
    return (


        <div className="flex flex-rows justify-center h-screen md:justify-end ">
             {width >= MOBILE_BREAKPOINT && (
        <div className="hidden md:block w-1/2 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${fondo})` }}></div>
    )}
            <div className='flex flex-col justify-start bg-white basis-full px-12 md:basis-1/2 md:px-20 xl:px-40 2xl:px-52 overflow-auto' >
                <div className='mt-8 md:mt-12 md:pl-4'>
                    <h4 className="text-black text-4xl font-semibold mb-2   ">Registro</h4>
                    <p className="text-black mb-4">Paso 2: Informacion Personal</p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <p className='text-start text-gray-400'>Su usuario estara activo cuando el administrador habilite la cuenta recuerda que te llegara un correo</p>
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
                        tamano='md:w-full'
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
                            context='Corro electronico'
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


                    <div className=' basis-full mt-8 mb-14 md:mx-4'><Button msg='Siguiente' msgTwo='Cancelar' funTwo={buttonCancel} /></div>
                </form>
            </div>
        </div>

    )
}
export default Pollster;
//OK