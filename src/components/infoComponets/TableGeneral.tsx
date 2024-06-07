import React, { useMemo } from 'react'
import { Family } from '../../Props/Interfaces'
import flecha from '../../assets/svg/flecha.svg'

export interface TableGeneralpronps {
    data : any;
    page:number;
    prev ?: () => void; 
    next ?: () =>void;
}

export const TableGeneral:React.FC<TableGeneralpronps> = ({data,next,prev,page }) => {
const dataResponsable = useMemo(() => (family: Family) => {
    if (family.in_charge.length > 0) {
      const responsable = family.in_charge[0];
      return `${responsable.name_person.name} ${responsable.name_person.last_name}`;
    } else {
      return 'No hay responsable';
    }
  }, []);

const dataResponsableContact = useMemo(() => (family: Family) => {
    if (family.in_charge.length > 0) {
      const responsable = family.in_charge[0];
      return responsable.contact.telephone;
    } else {
      return 'No hay responsable';
    }
  }, []);

  
  const cards = data.map((family, index) => {
    return<tr key={index}>
    <td className='p-3 text-sm text-gray-700'><a href="" className='font-bold text-blue-600 hover:hunderline'>{family.id}</a></td>
    <td className='p-3 text-sm text-gray-700 whitespace-nowgrap' >{family.family_type}</td>
    <td className='p-3 text-sm text-gray-700 whitespace-nowgrap' >{dataResponsable(family)}</td>
    <td className='p-3 text-sm text-gray-700 whitespace-nowgrap'>{dataResponsableContact(family)}</td>
    <td className='p-3 text-sm text-gray-700 whitespace-nowgrap'> {family.info_general.address}</td>
    <td className='p-3 text-sm text-gray-700 whitespace-nowgrap'>  {family.info_general.municipality}</td>
    <td className='p-3 text-sm text-gray-700 whitespace-nowgrap'>   {family.info_general.creation_date}</td>
    <td> <button>Editar</button> </td>
  </tr>

  })
  return (
    <div className=' mx-4 rounded-lg shadow '>
    <table className="w-full ">
      <thead className="table-auto bg-gray-50 border-b-2 border-gray-200">
        <tr >
          <th className='p-3 text-sm font-semibold tracking-wide text-left'>id</th>
          <th className='p-3 text-sm font-semibold tracking-wide text-left'>Tipo de Familia</th>
          <th className='p-3 text-sm font-semibold tracking-wide text-left'>Cabeza de Hogar</th>
          <th className='p-3 text-sm font-semibold tracking-wide text-left'>Celular</th>
          <th className='p-3 text-sm font-semibold tracking-wide text-left'>Ubicacion</th>
          <th className='p-3 text-sm font-semibold tracking-wide text-left'>Direccion</th>
          <th className='p-3 text-sm font-semibold tracking-wide text-left'>Fecha</th>

        </tr>
      </thead>
      <tbody className='divide-y divide-gray-100 '>
      {cards}
      </tbody>
   
    </table>
    <div className='flex justify-around mx-28 mb-4'>
    <button className='flex justify-center items-center rounded-lg w-11 h-11 hover:bg-gray-200' onClick={prev}><img src={flecha} alt="" className='rotate-180 w-[20px]'/></button>
    <div className=' flex justify-center items-center text-center'>{page}</div> 
    <button className='flex justify-center items-center rounded-lg w-11 h-11 hover:bg-gray-200' onClick={next}><img src={flecha} alt="" className='w-[20px]'/></button>
  </div>
  </div>
  )
}

