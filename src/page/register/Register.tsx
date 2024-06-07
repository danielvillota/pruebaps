import { rol } from '../../data/diccionario';
import { Button } from '../../components/button/Button';
import { useForm } from 'react-hook-form';
import { InputFormHook } from '../../components/inputs/InputFormHook';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { API_URL } from '../../data/api';
import { useregisterprops} from '../Login';
import { SelectFormHook } from '../../components/select/SelectFormHook';
import { useUserToggleContext } from '../../Props/UserProvider';
import { useEffect, useState } from "react";
import fondo from '../../assets/img/fondo.jpg'
export const MOBILE_BREAKPOINT: number = 760;
import {encryptPassword} from '../../data/psScript' 


const Register = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const { register,handleSubmit,formState: { errors },watch} = useForm<useregisterprops>();
  const navigate = useNavigate();
  const activeUser = useUserToggleContext();

  const onSubmit = async (data:useregisterprops) => {
    const encryptedData = encryptPassword(data.password);
    try {
      const requestData = {
       username:data.username,
       password : encryptedData.password,
       iv:encryptedData.iv,
       groups:data.groups
    };
    console.log(requestData)
      const response = await axios.post(`${API_URL}register/`,requestData,
       {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        activeUser(response.data.id)
        navigate("/register/pollster");
      } catch (error:unknown) {
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


  return (
    <>
 <div className="flex flex-rows justify-center h-screen md:justify-end">
    {width >= MOBILE_BREAKPOINT && (
        <div className="hidden md:block w-1/2 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${fondo})` }}></div>
    )}
    <div className='flex flex-col justify-start bg-white basis-full px-12 md:basis-1/2 md:px-20 xl:px-40 2xl:px-52  3xl:px-44' >
    <div className='mt-8 md:mt-44 md:pl-4'>
        <h4 className="text-black text-4xl font-semibold mb-2   ">Registro</h4>
        <p className="text-black mb-4">Paso 1: Crea tus credenciales de usuario</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>

      <InputFormHook
      name="username"
      tamano='md:w-full'
      register={register}
      validations={{
        required: { value: true, message: "El campo es requerido" },
        pattern:{value:/^[A-Za-z0-9]+$/i,message:"El formato no es el correcto"}
      }}
      type='text'
      context='Usuario'
      errors={errors}
      />


<div className='flex flex-col md:flex-row'>
<InputFormHook
      name="password"
      tamano='md:w-1/2'
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
      tamano='md:w-1/2'
      register={register}
      validations={{
        required: { value: true, message: "El campo es requerido" },
        validate:(value:any) => {
            if (value === watch('password')){
              return true;
            }else{
              return 'Las contraseñas no coinciden'
            }
        }
      }}
      type='password'
      context='Confirmar Contraseña'
      errors={errors}
      />
</div>

<div className='flex flex-col md:flex-row'>


<SelectFormHook
  name="groups[0]"
  tamano='md:w-5/3'
  register={register}
  validations={{
    validate:(value:string) => {
      console.log(value)
      if(value === '0' ){
        return 'EL campo es requerido'
      }
    }
  }}
  context='Rol'
  options={rol}
  errors={errors}
  >
</SelectFormHook>

  <InputFormHook
      name="key"
      tamano='md:w-5/3'
      register={register}
      validations={{
        required: { value: true, message: "El campo es requerido" },
        validate:(value:any) => {
            if (value === 'TDD'){
              return true;
            }else{
              return 'Las contraseña no coinciden'
            }
        }
      }}
      type='password'
      context='Key Entidad'
      errors={errors}
      />
      </div>
      <div className=' basis-full mt-8 md:pe-4'><Button msg='Siguiente' msgTwo='Cancelar' prev='/login' /></div>
      </form>
    </div>
  </div>
    </>
  )
}
export default Register;

