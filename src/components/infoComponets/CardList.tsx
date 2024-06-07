import React, { useMemo, useEffect, useState } from 'react';
import { Family } from '../../Props/Interfaces';
import { TableGeneralpronps } from './TableGeneral';
import flecha from '../../assets/svg/flecha.svg';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../data/api';
import deleteIcon from '../../assets/svg/delete.svg'


interface CardListProps extends TableGeneralpronps {
  data: Family[];
}

export const CardList: React.FC<CardListProps> = ({ data, next, prev, page }) => {
  const [cards, setCards] = useState<JSX.Element[]>([]);

  // Función para manejar la eliminación de una tarjeta
  const handleDelete = async (index: number,id:number) => {
    const updatedData = data.filter((_, idx) => idx !== index); // Filtrar el array original sin el elemento en index
    if (window.confirm('¿Estas Seguro de Eliminar a la Persona de Esta familia?')) {
    await axios.delete(`${API_URL}family/${id}/delete/`);
    setCards(updatedData.map(renderCard)); // Actualizar las tarjetas mostradas
  }
  }
   

  // Función para renderizar cada tarjeta
  const renderCard = (family: Family, index: number) => (
    <div key={index} className='flex flex-col space-x-4 text-sm bg-white p-4 rounded-lg shadow-lg mb-2'>
      <div className='flex justify-end'>
        <button className='rounded-3xl ' onClick={() => handleDelete(index,family.id)}>
         <img src={deleteIcon} className='w-6'/>
        </button>
      </div>
      <ul>
        <a href=" " className='font-bold text-blue-600 hover:underline'>ID: {family.id}</a>
      </ul>
      <ul>
        Tipo de Familia: {family.family_type}
      </ul>
      <ul>
        Cabeza de Hogar: {dataResponsable(family)}
      </ul>
      <ul>
        Celular: <b><a href={`+57:${dataResponsableContact(family)}`} onClick={() => handleCall(dataResponsableContact(family))}>{dataResponsableContact(family)}</a></b>
      </ul>
      <ul className='text-gray-500'>
        Dirección: {family.info_general.address}
      </ul>
      <ul className='text-gray-500'>
        Ubicación Geográfica: {family.info_general.municipality}
      </ul>
      <ul className='text-gray-500'>
        Fecha: {family.info_general.creation_date}
      </ul>
      <ul className='flex justify-end pr-4'>
        <button className="p-2 basis-1/6 rounded-lg text-white font-medium animated-background bg-gradient-to-r from-blue-600 via-blue-500 to-blue-900 transition ease-in-out delay-200 hover:-translate-y-1 hover:scale-110 duration-300 hover:bg-blue-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          <Link to={`/panelFamily/${family.id}`} key={family.id}>
            <h1>Ver</h1>
          </Link>
        </button>
      </ul>
    </div>
  );

  // Función para obtener el responsable
  const dataResponsable = useMemo(() => (family: Family) => {
    if (family.in_charge.length > 0) {
      const responsable = family.in_charge[0];
      return `${responsable.name_person.name} ${responsable.name_person.last_name}`;
    } else {
      return 'No hay responsable';
    }
  }, []);

  // Función para manejar la llamada
  const handleCall = (number: string) => {
    window.location.href = `tel:${number}`;
  };

  // Función para obtener el contacto del responsable
  const dataResponsableContact = useMemo(() => (family: Family) => {
    localStorage.setItem('family', String(family.id));
    if (family.in_charge.length > 0) {
      const contact = family.in_charge[0];
      return `+57 ${contact.contact.telephone}`;
    } else {
      return 'No hay Celular';
    }
  }, []);

  // Efecto para inicializar las tarjetas cuando cambia `data`
  useEffect(() => {
    setCards(data.map(renderCard));
    console.log('Data')
  }, [data]);

  return (
    <div className="flex flex-col gap-2">
      {cards}
      <div className='flex justify-around mx-28 mb-4'>
        <button className='flex justify-center items-center rounded-lg w-11 h-11 hover:bg-gray-200' onClick={prev}>
          <img src={flecha} alt="" className='rotate-180 w-[20px]'/>
        </button>
        <div className='flex justify-center items-center text-center'>{page}</div>
        <button className='flex justify-center items-center rounded-lg w-11 h-11 hover:bg-gray-200' onClick={next}>
          <img src={flecha} alt="" className='w-[20px]'/>
        </button>
      </div>
    </div>
  );
};
