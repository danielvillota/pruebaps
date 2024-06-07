import { FormStyle } from '../../components/FormStyle';
import { TitleFormText } from '../../components/TitleFormText';
import { InputFormHook } from '../../components/inputs/InputFormHook';
import { useForm } from 'react-hook-form';
import { useUserContext } from '../../Props/UserProvider';
import { API_URL } from '../../data/api';
import axios from 'axios';
import { encryptPassword } from '../../data/psScript'
import { useNavigate } from 'react-router-dom';

export interface passwordData {
    password: string
}

const RecoveryPassword = () => {
    const { register, handleSubmit, formState: { errors }, watch } = useForm<passwordData>();
    const user = useUserContext();
    const navigate = useNavigate();
    const onSubmit = async (data: passwordData) => {
        const encryptedData = encryptPassword(data.password);
        try {
            const datareset = {
                password: encryptedData.password,
                iv: encryptedData.iv,
            }
            await axios.post(`${API_URL}reset/password/${user.user.id}/`, datareset);
            alert('Cambio Exitoso')
            navigate("/login");
        }
        catch (error: unknown) {
            if (error.response) {
                alert(error.response)
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
                    title='Renueva '
                    text='Contraseña'
                />
                <form onSubmit={handleSubmit(onSubmit)} className='w-full flex flex-col justify-center items-center '>

                    <div className='flex flex-col justify-center w-1/2 lg:w-1/4'>
                        <InputFormHook
                            name="password"
                            tamano='md:w-full'
                            register={register}
                            validations={{
                                required: { value: true, message: "El campo es requerido" },
                                minLength: { value: 2, message: "La contraseña debe tener al menos 6 caracteres" }
                            }}
                            type='password'
                            context='Contraseña'
                            errors={errors}
                        />

                        <InputFormHook
                            name="confirm"
                            tamano='md:w-full'
                            register={register}
                            validations={{
                                required: { value: true, message: "El campo es requerido" },
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

                        <button type="submit" className="p-2 w-full mt-7 rounded-lg  text-white font-normal animated-background bg-gradient-to-r  from-blue-600 via-blue-500 to-blue-900 transition ease-in-out delay-200 hover:-translate-y-1 hover:scale-110 duration-300 hover:bg-blue-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ">Enviar</button>
                    </div>






                </form>


            </FormStyle>

        </>
    )
}

export default RecoveryPassword