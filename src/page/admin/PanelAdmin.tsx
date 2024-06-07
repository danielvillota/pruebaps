import React, { useEffect, useState } from 'react'
import { FormStyle } from '../../components/FormStyle'
import { TitleFormText } from '../../components/TitleFormText'
import { useForm } from 'react-hook-form';
import { API_URL, get } from '../../data/api';
import green from '../../assets/svg/green.svg';
import red from '../../assets/svg/red.svg';
import { UsersControl } from './UsersControl';

const validations = {
  true : 'inactivo',
  false : 'activo'
}

const PanelAdmin = () => {
  const [loading, setLoading] = useState(true);
  const [icon,iconState] = useState(true);
  const [val, setval] = useState([]);
  const {reset } = useForm();
  useEffect(() => {
    const fetchData = async () => {
      try {
          const userData = await get(`${API_URL}pollster/`);
          setLoading(false);
          console.log(userData);
          setval(userData);
          reset(userData);
      } catch (error) {
          console.error('Error fetching data:', error);
          setLoading(false);
      }
  };
  fetchData();
  },[]);
  return (
   <>
        <FormStyle>
     <TitleFormText
         title='Panel'
         text='Administrador'
     />

<div className='flex flex-col mt-2 text-start w-full  pt-2'>
        <h1 className='text-black text-2xl font-semibold md:ml-4 mt-6 '>Gestor de Usuarios</h1>
    </div>
    
    <table className='table-auto mt-6 text-gray-500'>
      <thead className='flex justify-around font-normal border-b-[0.5px] pb-1'>
        <th className='font-normal basis-1/6' >Nombre</th>
        <th className='font-normal  basis-1/6'>Usuario</th>
        <th className='font-normal  basis-1/6'>Rol</th>
        <th className='font-normal  basis-1/6'>Telefono</th>
        <th className='font-normal  basis-1/6'>Accion</th>
        <th className='font-normal  basis-1/6'>Estado</th>
      </thead>
      <tbody className=''>
      <UsersControl users={val}/>
      </tbody>
    </table>
 </FormStyle>
   </>
  )
}

export default PanelAdmin

