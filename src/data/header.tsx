import axios from 'axios';
import logo from './../assets/svg/Logo.svg'
import { EyeIcon, UserPlusIcon, ArrowRightCircleIcon } from '@heroicons/react/24/solid';
import perfil from '../assets/svg/perfil.svg'
import family from '../assets/svg/familiy.svg'
import { API_URL } from './api';
 // Asegúrate de importar useNavigate de la manera adecuada según tu configuración



interface NavItem {
    id: number;
    title: string;
    link: string;
    icon: JSX.Element;
    fun?: () => Promise<void>;
}

export interface HeaderData {
    logo: {
    title: string;
    link: string;
    icon: string;
    };
    nav: NavItem[];
  }
  
export const HeaderDataPollster: HeaderData = {
    logo: {
      title: 'UCC',
      link: 'index.html',
      icon: logo,
    },
    nav: [
      {
        id: 1,
        title: 'Listado Familias',
        link: '/encuestador',
        icon: <img src={family}/>,
      },
      {
        id: 2,
        title: 'Novedades',
        link: '/newFile',
        icon: <UserPlusIcon className="h-6 w-6 text-blue-400" />,
      },
      {
        id:4,
        title: 'Perfil',
        icon: <img src={perfil}/>,
        link:'/editUser'
      }, 

      {
        id: 3,
        title: 'Cerrar Sesión',
        link: '/login',
        icon: <ArrowRightCircleIcon className="h-6 w-6 text-blue-400" />,
       

        fun : async () => {
          const data = {
            username: "validate"
          };
        
          try {
            const response = await axios.post(`${API_URL}logout/`, data, {
              headers: {
                'Content-Type': 'application/json',
              },
            });

            console.log(response);
            localStorage.clear();
            window.location.reload();
          } catch (error) {
            console.error('Error al cerrar sesión:', error);
          }
        }
        
      },
    ],
};

export const HeaderDataAnalist: HeaderData = {
  logo: {
    title: 'UCC',
    link: 'index.html',
    icon: logo,
    
  },
  nav: [
    {
      id: 1,
      title: 'Panel de Control',
      link: '/analista',
      icon: <EyeIcon className="h-6 w-6 text-blue-400" />,
    },
    {
      id:4,
      title: 'Perfil',
      icon: <img src={perfil}/>,
      link:'/editUser'
    }, 

    {
      id: 3,
      title: 'Cerrar Sesión',
      link: '/login',
      icon: <ArrowRightCircleIcon className="h-6 w-6 text-blue-400" />,
     

      fun : async () => {
        const data = {
          username: "validate"
        };
      
        try {
          const response = await axios.post(`${API_URL}logout/`, data, {
            headers: {
              'Content-Type': 'application/json',
            },
          });

          console.log(response);
          localStorage.clear();
          window.location.reload();
        } catch (error) {
          console.error('Error al cerrar sesión:', error);
        }
      }
      
    },
  ],
};


export const Admin: HeaderData = {
  logo: {
    title: 'UCC',
    link: 'index.html',
    icon: logo,
    
  },
  nav: [
    {
      id:4,
      title: 'Perfil',
      icon: <img src={perfil}/>,
      link:'/editUser'
    }, 

    {
      id: 3,
      title: 'Cerrar Sesión',
      link: '/login',
      icon: <ArrowRightCircleIcon className="h-6 w-6 text-blue-400" />,
     

      fun : async () => {
        const data = {
          username: "validate"
        };
      
        try {
          const response = await axios.post(`${API_URL}logout/`, data, {
            headers: {
              'Content-Type': 'application/json',
            },
          });

          console.log(response);
          localStorage.clear();
          window.location.reload();
        } catch (error) {
          console.error('Error al cerrar sesión:', error);
        }
      }
      
    },
  ],
};