import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import flecha from '../../assets/svg/flecha.svg';
import { tipeFamilies } from '../../data/diccionario';
import { getDiccionary, getLabelByValue, getMemberResponsable } from '../../data/filter';
import { diccionaryNH } from '../../data/maps';

export interface TableGeneralprop {
  data: any[];
  page: number;
  prev?: () => void; 
  next?: () => void;
}

export const TableGeneralAnalista: React.FC<TableGeneralprop> = ({ data, next, prev, page }) => {
  const [tableRows, setTableRows] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const tableAnalista = data.map((family, index) => {
      const member = getMemberResponsable(family.family[0].in_charge);
      return (
        <tr key={index}>
          <td className='p-3 text-sm text-gray-700'><a href="" className='font-bold text-blue-600 hover:underline'>{family.id}</a></td>
          <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>{getDiccionary(family.family[0].family_type, tipeFamilies)}</td>
          <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>{member?.name_person.name + ' ' + member?.name_person.last_name || 'N/A'}</td>
          <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>{member?.contact.telephone || 'N/A'}</td>
          <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>{getLabelByValue(family.name_branding, diccionaryNH)}</td>
          <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>{family.address}</td>
          <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>{family.creation_date}</td>
          <td>
            <button className="p-2 m-2 rounded-lg text-sm text-white font-medium animated-background bg-gradient-to-r from-blue-600 via-blue-500 to-blue-900 transition ease-in-out delay-200 hover:-translate-y-1 hover:scale-110 duration-300 hover:bg-blue-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              <Link to={`/detallePanelFamily/${family.id}`} key={family.family[0].id}>
                <h1>Ver Detalle</h1>
              </Link>
            </button>
          </td>
        </tr>
      );
    });
    setTableRows(tableAnalista);
  }, [data]);

  return (
    <div className='mt-10 shadow-md'>
      <table className="w-full">
        <thead className="table-auto bg-gray-50 border-b-2 border-gray-200">
          <tr>
            <th className='p-3 text-sm font-semibold tracking-wide text-left'>ID</th>
            <th className='p-3 text-sm font-semibold tracking-wide text-left'>Tipo de Familia</th>
            <th className='p-3 text-sm font-semibold tracking-wide text-left'>Cabeza de Hogar</th>
            <th className='p-3 text-sm font-semibold tracking-wide text-left'>Celular</th>
            <th className='p-3 text-sm font-semibold tracking-wide text-left'>Barrio</th>
            <th className='p-3 text-sm font-semibold tracking-wide text-left'>Dirección</th>
            <th className='p-3 text-sm font-semibold tracking-wide text-left'>Fecha</th>
            <th className='p-3 text-sm font-semibold tracking-wide text-left'>Opciones</th>
          </tr>
        </thead>
        <tbody className='divide-y divide-gray-100'>
          {tableRows}
        </tbody>
      </table>
      <div className='flex justify-around mx-28 mb-4 mt-4'>
        <button className='flex justify-center items-center rounded-lg w-11 h-11 hover:bg-gray-200' onClick={prev}>
          <img src={flecha} alt="flecha previa" className='rotate-180 w-[20px]'/>
        </button>
        <div className='flex justify-center items-center text-center'>{page}</div> 
        <button className='flex justify-center items-center rounded-lg w-11 h-11 hover:bg-gray-200' onClick={next}>
          <img src={flecha} alt="flecha siguiente" className='w-[20px]'/>
        </button>
      </div>
    </div>
  );
};
