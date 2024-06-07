import { useEffect, useState } from 'react'
import { Button } from '../../components/button/Button';
import { dictionary } from '../../data/diccionario';
import { departamentosFormato, diccionaryNH, dictionaryEbs, municipiosFormato } from '../../data/maps';
import { FormStyle } from '../../components/FormStyle';
import { TitleFormText } from '../../components/TitleFormText';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { InputFormHook } from '../../components/inputs/InputFormHook';
import { useUserContext } from '../../Props/UserProvider';
import { InfoGeneralData } from '../../Props/Interfaces';
import { SelectFormHook } from '../../components/select/SelectFormHook';
import { SelectAskFormHook } from '../../components/select/SelectAskFormHook';
import axios from 'axios';
import { API_URL } from '../../data/api';




const InfoGeneral = () => {
    const { register, handleSubmit, formState: { errors }, control } = useForm<InfoGeneralData>();
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const navigate = useNavigate();
    const user = useUserContext();

    useEffect(() => {
        getLocation();
    }, []); // Esto asegura que getLocation se llame solo una vez al cargar el componente

    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                setLatitude(position.coords.latitude.toPrecision(8));
                setLongitude(position.coords.longitude.toPrecision(8));
            }, (error) => {
                console.error('Error getting geolocation:', error);
            });
        } else {
            console.error('Geolocation is not supported by this browser.');
        }
    };

    const onSubmit = async (data: InfoGeneralData) => {
        try {
            if (window.confirm('¿Es seguro de seguir con el siguiente formulario?')) {
                const requestData = {
                    departament: data.departament.value,
                    municipality: data.municipality.value,
                    name_branding: data.name_branding.value,
                    longitud: longitude,
                    latitud: latitude,
                    home_location: data.home_location,
                    estratum: data.estratum,
                    id_primary_provider: data.id_primary_provider.value,
                    pollster: user.pollster.pollster.id
                };
                console.log(requestData)
                const response = await axios.post(`${API_URL}info_general/add/`, requestData,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });
                localStorage.setItem('key', response.data.id)
                console.log(localStorage.getItem('key'))

                navigate("/register/livingPlace");
            }
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

    const buttonCancel = () => {
        if (window.confirm('Estas Seguro de Cancelar el registro')) {
            navigate("/encuestador");
        }
    };

    return (
        <>
            <FormStyle>
                <TitleFormText
                    title='Registro'
                    text='Localización'
                />
                <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col '>
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
                            validate: (value: string) => {
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
                    <div className=' basis-full mt-8 md:pe-4'><Button msg='Siguiente' msgTwo='Cancelar' funTwo={buttonCancel} /></div>
                </form>
            </FormStyle>
        </>
    )
}
export default InfoGeneral;
//OK