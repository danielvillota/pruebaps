import { LayoutHeader } from './Layout';
import { HeaderDataPollster, HeaderDataAnalist, HeaderData, Admin } from '../data/header';
import { Bars4Icon, XMarkIcon } from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react';
import { NavLink,Outlet } from 'react-router-dom';
import imageLogo from '../assets/svg/apsMobil.svg'
import { useUserContext } from '../Props/UserProvider';

 const Header = () => {
  const [open, setOpen] = useState(false);
  const user = useUserContext();
  const [userNav,setUserNav] = useState<HeaderData>(HeaderDataAnalist)

  useEffect(() => {
    console.log(user.pollster.grupo[0].id)
    if (user.pollster.grupo[0].id === 1){
      setUserNav(HeaderDataPollster);
    } else if (user.pollster.grupo[0].id === 2){
      setUserNav(HeaderDataAnalist);
    }else{
      setUserNav(Admin);
    }

}, []);

  return (
    
    <header className="bg-white w-full h-20 top-0 z-50 border-b-[1px] focus:bg-gray-100 active:bg-gray-100 p-2">
        <LayoutHeader>
        <img src={imageLogo} className=' h-20 w-20' />
        <nav className='hidden md:block md:order-2'>
          <ul className='flex items-center gap-x-6 font-normal'>
            {userNav.nav.map((item) => (
              <li onClick={()=>setOpen(false)} key={item.id} className={item.title === 'Inicio' ? 'text-blue-600 font-light flex flex-row' : 'text-blue-950 md:hover:text-blue-500'}>
                 <NavLink to={item.link} onClick={item.fun} className='flex flex-row'>
                  {item.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        {/* Icono de las barras */}
        <div onClick={()=>setOpen(!open)} className={` z-[999] text-xl md:hidden m-5 ${open ? 'hidden' : 'block'} text-blue-500`}>
          <Bars4Icon className='h-8 w-8 text-blue-700 font-light'/>
        </div>
        {/* Capa de fondo semi-transparente */}
          {open && (
            <div className="fixed inset-0 bg-black opacity-50 z-40" onClick={() => setOpen(false)}></div>
          )}
        <div className={`md:hidden z-40 fixed w-2/3 h-full p-4 font-light border-2 bg-white rounded-e-lg top-0 right-0 duration-700 ${open ? 'left-0':'left-[-100%]'}`}>
        {/* Icono de X para cerrar el menú */}
        <div className="flex justify-end">
        <div onClick={()=>setOpen(!open)} className="z-[999] text-3xl text-blue-800">
          <XMarkIcon className='h-7 w-7 text-blue-700 font-normal mt-2'/>
        </div>
        </div>
          <ul className='flex flex-col gap-4 h-full text-lg'>
            <li>
            <img src={imageLogo} className=' h-32 w-32' />
            </li>
          {userNav.nav.map((item) => (
              <li onClick={()=>setOpen(false)} key={item.id} className={item.title === 'Inicio' ? 'text-blue-800 font-normal text-xl hover:bg-gray-100 focus:bg-gray-100 active:bg-gray-100 p-2 rounded-e-xl' : 'text-blue-600 font-medium text-xl  hover:bg-gray-100 focus:bg-gray-100 active:bg-gray-100 p-2 rounded-e-xl'}>
                <NavLink to={item.link} onClick={item.fun} className='flex flex-row'>
                {item.icon && <span className="mr-2">{item.icon}</span>}
                  {item.title}
                </NavLink>

              </li>
            ))}
          </ul>
        </div>
        </LayoutHeader>
          <section>
            <Outlet></Outlet>
    
          </section>
    </header>
  );
};
export default Header;