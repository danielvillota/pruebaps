import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { TitleFormText } from '../../components/TitleFormText';
import { API_URL, get } from '../../data/api';
import { CardFamily } from '../../components/infoComponets/CardFamily';
import { CarrouselFamily } from '../../components/infoComponets/CarrouselFamily';
import { MenuFamily } from '../../data/MenuFamily';
import { MemberList } from '../../components/infoComponets/MemberList';
import Prev from '../../assets/svg/prevInfo.svg'


const PanelFamily = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [family, setFamily] = useState(null);
  
  const [loading, setLoading] = useState(true);
  localStorage.setItem('FamilyGlobal', id)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const familyData = await get(`${API_URL}family/?id=${id}`);
        setFamily(familyData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);
  const buttonCancel = () => {
    navigate('/encuestador/');
  };


  return (
    <div>
      <div className='w-max p-4 md:p-8'>
        <button onClick={buttonCancel}> <img src={Prev} alt="" className='pl-[5%] w-7 hover:bg-gray-500 hover:rounded-3xl' /></button>


      </div>
      {loading && <div>cargando...</div>}
      {!loading && (
        <div className="flex flex-col items-center border-white justify-start w-full h-max p-4 md:p-2">
          <div className="flex flex-col bg-white w-full h-max px-1 rounded-lg overflow-auto">
            <TitleFormText title="Ficha" text="Familiar" />
            <h2 className="text-black text-2xl font-semibold mx-2 mt-4">Integrantes de la Familia</h2>
            <MemberList id={id}></MemberList>
            <button className="p-2 basis-1/2 rounded-lg mx-20 text-white font-medium animated-background bg-gradient-to-r from-blue-600 via-blue-500 to-blue-900 transition ease-in-out delay-200 hover:-translate-y-1 hover:scale-110 duration-300 hover:bg-blue-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              <Link to={`/register/member/${id}`}>Agregar Integrante</Link>
            </button>
            <h2 className="text-black text-2xl font-semibold mx-2 mb-2 mt-5">Informacion Basica</h2>
            <div className="mb-4">
              {family && family.length > 0 && <CardFamily object={family[0]} />}
            </div>
            <h2 className="text-black text-2xl font-semibold mx-2 mb-2">Editar Registros</h2>
            <CarrouselFamily data={MenuFamily} padId={[family[0].info_general.id, id]}></CarrouselFamily>
          </div>
        </div>
      )}
    </div>
  );
};

export default PanelFamily;