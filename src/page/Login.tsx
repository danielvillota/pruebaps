import { NavLink } from 'react-router-dom';
import { ButtonLogin } from '../components/button/ButtonLogin';
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { API_URL,  } from '../data/api';
import imageLogo from '../assets/svg/apsMobil.svg'
import { useUserToggleContext} from '../Props/UserProvider';
import fondo from '../assets/img/fondo.jpg'
import { useEffect, useState } from "react";
export const MOBILE_BREAKPOINT: number = 760;
import {encryptPassword} from '../data/psScript' 




export interface userprops{
  username:string;
  password:string;
}
export interface useregisterprops extends userprops{
  groups:number;
}

const Login = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const { register, handleSubmit, formState:{errors}} = useForm<userprops>();
  const navigate = useNavigate();
  const activeUser = useUserToggleContext();

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleResize = () => {
    setWidth(window.innerWidth);
  };

  
  const onSubmit = async (data:userprops) => {
const encryptedData = encryptPassword(data.password);



    const user = {
      username : data.username,
      password : encryptedData.password,
      iv:encryptedData.iv
    }
    try {
      const response = await axios.post(`${API_URL}login/`,user,
       {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        console.log(response.data)
        activeUser(response.data);
        if(response.data.pollster.grupo[0].id === 1){
          navigate("/encuestador");
        }
        if(response.data.pollster.grupo[0].id === 2){
          navigate("/analista");
        }
        if(response.data.pollster.grupo[0].id === 4){
          navigate("/admin");
        }
      
      } catch (error:unknown) {
          if (error.response) {
            alert('Usuario o Contraseña Invalidos')
          } else if (error.request) {
            alert('Servidor en mantenimiento Intente mas Tarde')
          } else {
            // Algo paso al preparar la petición que lanzo un Error
            console.log('Error', error.message);
          }
      }

  } 
  return (
    <div className="flex flex-rows justify-center h-screen md:justify-start">
      <div className='flex flex-col  justify-center bg-white basis-full px-12 md:basis-1/2 md:px-32 2xl:px-64' >
        <div className='flex justify-center'>
          <div className='w-32'>
          <img src={imageLogo} className='  w-80' />
          </div>
        </div>
        <h4 className="text-black text-4xl font-semibold mb-2 mt-20 md:mt-14">Iniciar Sesion</h4>
        <p className="text-black mb-2">¡Bienvenido a APS Entra ya!</p>


        <form onSubmit={handleSubmit(onSubmit)}>
        <input type='text'  
        {...register("username",
        {
          required:{value:true,message: "El campo es requerido"},
          pattern:{value:/^[A-Za-z0-9]+$/i,message:"El formato no es el correcto"}
        })}
        placeholder='usuario'
        autoComplete="username"
        className='w-full px-2 border-l-transparent border-t-transparent border-r-transparent  p-4 mt-2 focus:outline-none focus:border-l-transparent focus:border-r-transparent focus:border-t-transparent  focus:ring-0' />
        {errors.username && <span className='text-sm text-red-500'>{errors.username?.message}</span>}
        
        <input type='password'  
        {...register("password",
        {
          required:{value:true,message: "El campo es requerido"},
          minLength:{value:2,message:"La contraseña debe tener 6 almenos caracteres"}
        })}
        autoComplete="current-password"
        placeholder='contraseña'
        className='w-full px-2 border-l-transparent border-t-transparent border-r-transparent  p-4 mt-2 focus:outline-none focus:border-l-transparent focus:border-r-transparent focus:border-t-transparent  focus:ring-0' />
        {errors.password && <span className='text-sm text-red-500'>{errors.password?.message}</span>}
          <ButtonLogin msg="Entrar"/>
        </form>
       
        <NavLink to="/register/user" type='button' className='relative bg-trasparent p-4 rounded-lg mt-2 text-white font-medium text-center'><h1 className='text-black'>Registrarse</h1></NavLink>
        <div className='flex mt-4 justify-end'>  <NavLink to='/recovery' className="text-sm mb-9 text-blue-600">¿Olvidaste la contraseña?</NavLink></div>
      </div>
      {width >= MOBILE_BREAKPOINT && (
        <div className="hidden md:block w-1/2 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${fondo})` }}></div>
      )}
    </div>


  );
};
export default Login;




