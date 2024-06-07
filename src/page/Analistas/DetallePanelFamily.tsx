import React, { useEffect,useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { API_URL, get } from '../../data/api';
import { Family, FamilyContext, FamilyMember } from '../../Props/InputProps';
import { TitleFormText } from '../../components/TitleFormText';
import { differenceInYears, parse } from 'date-fns';
import Prev from '../../assets/svg/prevInfo.svg'
import { Accordion } from '../../components/infoComponets/Accordion';
import { AccordionDos } from '../../components/infoComponets/AccordionDos';
import { AccordionTres } from '../../components/infoComponets/AccordionTres';

export interface TableMemberprop {
  data : FamilyMember[];
}

export const DetallePanelFamily:React.FC<TableMemberprop> = () => {
  const { id } = useParams<{ id: string }>();
  const [family, setFamily] = useState<Family | null>(null);
  const [familyContext, setFamilyContext] = useState<FamilyContext | null>(null);
  const [familyMember, setFamilyMember] = useState<FamilyMember[]>([]);
  const navigate = useNavigate();
  const calculateAge = useMemo(() => (age: string) => {
    const dob = parse(age, 'yyyy-MM-dd', new Date());
    const currentDate = new Date();
    return differenceInYears(currentDate, dob);
  }, []);
  //localStorage.setItem('FamilyGlobal',id)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const familyData = await get(`${API_URL}family_detail/${id}/`);
        setFamily(familyData);
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [id]);
  console.log(family)


  useEffect(() => {
    const fetchData = async () => {
      try {
        const familyContextData = await get(`${API_URL}familyContext_detail/${id}/`);
        setFamilyContext(familyContextData);
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const familyMemberData = await get(`${API_URL}familyMember/${id}/`);
        console.log('Family Member Data:', familyMemberData);
        // Asegurarse de que familyMemberData es un array
        if (Array.isArray(familyMemberData)) {
          setFamilyMember(familyMemberData);
        } else {
          setFamilyMember([familyMemberData]); // Convertir el objeto en un array
        }
      } catch (error) {
        console.error('Error fetching family members:', error);
      }
    };
    fetchData();
  }, [id]);
  console.log(familyContext)

  if (!family || !familyContext || familyMember.length === 0) {
    return <div>Loading...</div>;
  }

  const tableMember = familyMember.map((member, index) => (
    <tr key={index}>
      <td className='p-3'>
        {`${member?.name_person?.name || ''} ${member?.name_person?.second_name || ''} ${member?.name_person?.last_name || ''}`.trim()}
      </td>
      <td className='p-3'>
        {member?.contact?.email || 'No Tiene Email'}
      </td>
      <td className='p-3'>
        {member?.contact?.telephone || 'No Tiene Celular'}
      </td>
      <td className='p-3'>{member.role}</td>
      <td className='p-3'>{calculateAge(member.date_birth)}</td>
      <td className='p-3'>N/A</td>
    </tr>
  ));
  const buttonCancel = () => {
    if (window.confirm('¿Estas Seguro de Salir al Panel Principal?')) {
        navigate(-1);
    }
};

  return (
    <>   <div className='w-max p-4 md:p-8'>
    <button onClick={buttonCancel}> <img src={Prev} alt="" className='pl-[5%] w-7 hover:bg-gray-200'   /></button>

 </div>
    <div className="px-20 pb-4">
        <TitleFormText
          title='Reporte General'
          text='Familia'
        />
      <div className="mt-4 shadow">
          <>
            <div className='flex flex-row justify-between border p-4'>
              <div className=''>
              <tr>
                <td className='px-4 py-2 font-semibold'>Atención Primaria En Salud</td>
              </tr>
              </div>
              <div className="flex flex-row">
              <div className='flex flex-row'>
              <tr>
                <td className='px-4 py-2 font-semibold'>Fecha Registro</td>
                <td className='px-4 py-2 font-semibold text-[#3b82f6]'>{family.info_general?.creation_date|| 'N/A'}</td>
              </tr>
              </div>
            </div>
            </div>
            <div className='border p-4'>
            <h2 className='flex justify-center text-[#3b82f6] font-semibold m-2'>Información Encuestador</h2>
            <div className='flex'>
            <h2 className='text-base mb-4 text-[#3b82f6] font-semibold me-4'>Datos Personales</h2>
              
                <td className='font-semibold me-2'>Correo:</td>
                <td className='me-4'>{family.info_general?.pollster?.contact?.email || 'N/A'}</td>
                <td className='font-semibold me-4'>Contacto:</td>
                <td className='me-4'>{family.info_general?.pollster?.contact?.telephone || 'N/A'}</td>
            </div>
            
            </div>
            
            <div className='border p-4'>
            <h2 className='flex justify-center m-2 text-[#3b82f6] font-semibold'>Información Del Hogar De La Familia</h2>
            <h2 className='text-base mt-2 text-[#3b82f6] font-semibold'>Datos Geograficos</h2>
            <div className='flex flex-row gap-10'>
                  <tr>
                    <td className='font-semibold'>Departamento:</td>
                    <td className=''>{family.info_general?.departament || 'N/A'}</td>
                  </tr>
                  <tr>
                    <td className='font-semibold'>Municipio:</td>
                    <td className=''>{family.info_general?.municipality || 'N/A'}</td>
                  </tr>
                  <tr>
                    <td className='font-semibold'>Latitud:</td>
                    <td className=''>{family.info_general?.latitud || 'N/A'}</td>
                  </tr>
                  <tr>
                    <td className='font-semibold'>Longitud:</td>
                    <td className=''>{family.info_general?.longitud || 'N/A'}</td>
                  </tr>
            </div>

            <h2 className='text-base mt-4 text-[#3b82f6] font-semibold'>Datos Del Hogar</h2>
            <div className='flex flex-row gap-10'>
                  <tr className='flex gap-1'>
                    <td className='font-semibold'>Centro Poblado:</td>
                    <td className=''>{family.info_general?.name_branding || 'N/A'}</td>
                  </tr>
                  <tr className='flex gap-1'>
                    <td className='font-semibold'>Dirección:</td>
                    <td className=''>{family.info_general?.address || 'N/A'}</td>
                  </tr>
                  <tr className='flex gap-1'>
                    <td className='font-semibold'>Referencia:</td>
                    <td className=''>{family.info_general?.home_location || 'N/A'}</td>
                  </tr>
                  <tr className='flex gap-1'>
                    <td className='font-semibold'>Estrato Social:</td>
                    <td className=''>{family.info_general?.estratum || 'N/A'}</td>
                  </tr>
            </div>
            </div>
            
            <div className='border p-4'>
            <h2 className='flex justify-center text-[#3b82f6] font-semibold'>Información General De La Familia</h2>
            
            <div className='flex flex-row gap-10 me-16 mb-4 mt-4'>
            <h2 className='flex justify-center text-base text-[#3b82f6] font-semibold'>Datos De La Familia</h2>
              <tr className='flex gap-1'>
                <td className='font-semibold'>N° De Integrantes:</td>
                <td className=''>{family.total_members || 'N/A'}</td>
              </tr>
              <tr className='flex gap-1'>
                <td className='font-semibold'>Tipo Familia:</td>
                <td className=''>{family.family_type || 'N/A'}</td>
              </tr>
            </div>
            <div className="mt-4">
              <Accordion title='Caracteristicas Sociales' data={familyContext}/>
            </div>
            <div className="mt-4">
              <AccordionDos title='Caracteristicas De Los Integrantes' data={familyContext}/>
            </div>
            <div className="mt-4">
              <AccordionTres title='Caracteristicas En La Salud' data={familyContext}/>
            </div>
          </div>
          <div className='px-20 pb-4'>
          <TitleFormText
          text='Integrantes'
          title='Descripción General'/>
          </div>
          <div className='border mt-2'>
            <div>
              <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
              <tr>
                  <th className="px-6 py-3 text-left font-semibold text-[#3b82f6]">Nombre</th>
                  <th className="px-6 py-3 text-left font-semibold text-[#3b82f6]">Correo</th>
                  <th className="px-6 py-3 text-left font-semibold text-[#3b82f6]">Celular</th>
                  <th className="px-6 py-3 text-left font-semibold text-[#3b82f6]">Rol</th>
                  <th className="px-6 py-3 text-left font-semibold text-[#3b82f6]">Edad</th>
                  <th className="px-6 py-3 text-left font-semibold text-[#3b82f6]">Canalización</th>
              </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
              {tableMember}
              </tbody>
          </table>
          </div>
          </div>
          </>
      </div>
    </div>
    </>
  )
}

export default DetallePanelFamily;
