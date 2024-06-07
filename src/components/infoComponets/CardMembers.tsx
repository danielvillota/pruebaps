import React, { useEffect, useMemo, useState } from 'react';
import { TableGeneralpronps } from './TableGeneral';
import flecha from '../../assets/svg/flecha.svg';
import { differenceInYears, parse } from 'date-fns';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../data/api';
import deleteIcon from '../../assets/svg/delete.svg'

interface NamePerson {
  id: number;
  last_name: string;
  name: string;
  second_last_name: string;
  second_name: string;
  id_document: string; // Asegúrate de que este campo existe en NamePerson
}

export const CardMembers: React.FC<TableGeneralpronps> = ({ data, next, prev, page }) => {
  const [personstate, setPersonState] = useState<boolean>(false);
  const [cards, setCards] = useState<JSX.Element[]>([]); // Inicialización correcta del estado

  useEffect(() => {
    setCards(
      data.map((member, index) => (
        <div key={index} className='flex flex-col space-x-4 text-sm bg-white p-4 rounded-lg shadow-lg mb-2'>
          <div className='flex justify-end'> <button className='' onClick={() => handleClick(member.id)}><img src={deleteIcon} className='w-6'/></button></div>
          <ul className='mb-2'>
            <a href=" " className='font-bold text-blue-600 hover:underline'>{member.role}</a>
          </ul>
          <ul>
            <p className='font-medium text-black hover:underline'>Nombre: {nameConcat(member.name_person)}</p>
          </ul>
          <ul>
            <p className='font-medium text-black hover:underline'>Edad: {calculateAge(member.date_birth)}</p>
          </ul>
          <ul>
            <p className='font-medium text-black hover:underline'>Género: {member.sex}</p>
          </ul>
          <ul>
            <p className='font-medium text-black hover:underline'>Documento: {member.type_id + ' ' + member.name_person.id_document}</p>
          </ul>
          <ul>
            <p className='font-light text-black hover:underline'><b>Eps Afiliada: </b>{member.eps}</p>
          </ul>
          {rolState(member.present_person) && <ul>Cabeza de Familia</ul>}
          <ul className='flex justify-end pr-4 mt-2'>
            <button className="p-2 basis-1/6 rounded-lg text-white font-medium animated-background bg-gradient-to-r from-blue-600 via-blue-500 to-blue-900 transition ease-in-out delay-200 hover:-translate-y-1 hover:scale-110 duration-300 hover:bg-blue-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              <Link to={`/member/${member.id}`}>
                <h1>Ver</h1>
              </Link >
            </button>
          </ul>
        </div>
      ))
    );
  }, [data]);

  const handleClick = async (id: number) => {
    try {
      if (window.confirm('¿Estas Seguro de Eliminar a la Persona de Esta familia?')) {
        await axios.delete(`${API_URL}member/${id}/delete/`);
    
     
      const updatedData = data.filter(member => member.id !== id);
      setCards(
        updatedData.map((member, index) => (
          <div key={index} className='flex flex-col space-x-4 text-sm bg-white p-4 rounded-lg shadow-lg mb-2'>
            <button className='hover:bg-gray-300' onClick={() => handleClick(member.id)}><img src={deleteIcon} className='w-6'/></button>
            <ul className='mb-2'>
              <a href=" " className='font-bold text-blue-600 hover:underline'>{member.role}</a>
            </ul>
            <ul>
              <p className='font-medium text-black hover:underline'>Nombre: {nameConcat(member.name_person)}</p>
            </ul>
            <ul>
              <p className='font-medium text-black hover:underline'>Edad: {calculateAge(member.date_birth)}</p>
            </ul>
            <ul>
              <p className='font-medium text-black hover:underline'>Género: {member.sex}</p>
            </ul>
            <ul>
              <p className='font-medium text-black hover:underline'>Documento: {member.type_id + ' ' + member.name_person.id_document}</p>
            </ul>
            <ul>
              <p className='font-light text-black hover:underline'><b>Eps Afiliada: </b>{member.eps}</p>
            </ul>
            {rolState(member.present_person) && <ul>Cabeza de Familia</ul>}
            <ul className='flex justify-end pr-4'>
              <button className="p-2 basis-1/6 rounded-lg text-white font-medium animated-background bg-gradient-to-r from-blue-600 via-blue-500 to-blue-900 transition ease-in-out delay-200 hover:-translate-y-1 hover:scale-110 duration-300 hover:bg-blue-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                <Link to={`/member/${member.id}`}>
                  <h1>Ver</h1>
                </Link >
              </button>
            </ul>
          </div>
        ))
      );
    }
    } catch (error) {
      console.error('Error al eliminar el miembro:', error);
    }
  };

  const rolState = useMemo(() => (state: string) => {
    if (state === '1') {
      setPersonState(true);
    }
    return personstate;
  }, [personstate]);

  const nameConcat = useMemo(() => (name: NamePerson) => {
    const fullName = name.name + ' ' + name.second_name + ' ' + name.last_name + ' ' + name.second_last_name;
    return fullName.toUpperCase();
  }, []);

  const calculateAge = useMemo(() => (age: string) => {
    const dob = parse(age, 'yyyy-MM-dd', new Date());
    const currentDate = new Date();
    return differenceInYears(currentDate, dob);
  }, []);

  return (
    <div className="flex flex-col gap-2">
      {cards}
      <div className='flex justify-around mx-28 mb-4'>
        <button className='flex justify-center items-center rounded-lg w-11 h-11 hover:bg-gray-200' onClick={prev}><img src={flecha} alt="" className='rotate-180 w-[20px]' /></button>
        <div className='flex justify-center items-center text-center'>{page}</div>
        <button className='flex justify-center items-center rounded-lg w-11 h-11 hover:bg-gray-200' onClick={next}><img src={flecha} alt="" className='w-[20px]' /></button>
      </div>
    </div>
  );
};
