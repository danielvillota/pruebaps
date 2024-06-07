import { Button } from '../../components/button/Button';
import { useForm } from 'react-hook-form';
import { InputFormHook } from '../../components/inputs/InputFormHook';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { API_URL } from '../../data/api';
import { useEffect, useState } from "react";
import fondo from '../../assets/img/fondo.jpg'
import { useUserToggleContext } from '../../Props/UserProvider';
export const MOBILE_BREAKPOINT: number = 760;

export interface recovery {
  id_document: string,
  email: string,
  code: string
}

const Register = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const { register, handleSubmit, formState: { errors } } = useForm<recovery>();
  const navigate = useNavigate();
  const activeUser = useUserToggleContext();
  const onSubmit = async (data: recovery) => {


    try {
      const response = await axios.post(`${API_URL}user/recovery/`, data);
      if (response.data) {
        activeUser(response.data);
        navigate(`/recoveryPassword`)
      } else {
        alert('¡Ve a tu correo!')
      }
    } catch (error: unknown) {
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
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleResize = () => {
    setWidth(window.innerWidth);
  };


  return (
    <>
      <div className="flex flex-rows justify-center h-screen md:justify-end">
        {width >= MOBILE_BREAKPOINT && (
          <div className="hidden md:block w-1/2 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${fondo})` }}></div>
        )}
        <div className='flex flex-col justify-center bg-white basis-full px-12 md:justify-start md:basis-1/2 md:px-20 xl:px-40 2xl:px-52  3xl:px-44' >
          <div className='mt-2 md:mt-24 md:pl-4'>
            <h4 className="text-black text-4xl font-semibold mb-2   ">Recuperacion de Contraseña</h4>
            <p className="text-black mb-4">se te enviara un correo con el codigo de recuperacion</p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>

            <InputFormHook
              name="email"
              tamano='md:w-full'
              register={register}
              validations={{
                required: { value: true, message: "El campo es requerido" },
                pattern: {
                  value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                  message: "El formato no es el correcto"
                },

              }}
              type='text'
              context='Correo de recuperacion'
              errors={errors}
              info='Este correo debe ser el que utilizaste para registrarte '
            />




            <InputFormHook
              name="id_document"
              tamano='md:w-full'
              register={register}
              validations={{
                required: { value: true, message: "El campo es requerido" },
                pattern: { value: /^[A-Za-z0-9]+$/i, message: "El formato no es el correcto" }
              }}
              type='text'
              context='N° de documento de identidad'
              errors={errors}
            />

            <div className='flex w-full mt-4  justify-end '>
              <button type="submit" className="p-2 basis-1/4 rounded-lg md:mr-4 text-white font-normal animated-background bg-gradient-to-r  from-blue-600 via-blue-500 to-blue-900 transition ease-in-out delay-200 hover:-translate-y-1 hover:scale-110 duration-300 hover:bg-blue-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ">Enviar</button>

            </div>
            <InputFormHook
              name="code"
              tamano='md:w-2/3'
              register={register}
              type='text'
              context='Codigo'
              errors={errors}
            />

            <div className=' basis-full mt-8 md:pe-4'><Button msg='Recuperar' msgTwo='Cancelar' prev='/login' /></div>
          </form>
        </div>
      </div>
    </>
  )
}
export default Register;

