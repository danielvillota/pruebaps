import React, { useEffect, useState } from 'react';
import { API_URL, get } from '../../data/api';
import { CardMembers } from './CardMembers';

interface Props {
  id: unknown;
}

export const MemberList: React.FC<Props> = ({ id }) => {
  const [familyData, setFamilyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [members, setMembers] = useState([]);
  const [page, setPage] = useState(0);
  const ITEMS_PER_PAGE = 4;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const membersData = await get(`${API_URL}member/?family=${id}`);
        console.log(membersData)
        if (!membersData || membersData.length === 0) {
          setLoading(false);
          setMembers([]);
        } else {
          setFamilyData(membersData);
          setMembers(membersData.slice(0, ITEMS_PER_PAGE));
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const nextHandler = () => {
    const totalData = familyData.length;
    const nextPage = page + 1;
    const firstIndex = nextPage * ITEMS_PER_PAGE;
    if (firstIndex >= totalData) return;
    const nextPageItems = familyData.slice(firstIndex, firstIndex + ITEMS_PER_PAGE);
    setMembers(nextPageItems);
    setPage(nextPage);
  };

  const prevHandler = () => {
    const prevPage = page - 1;
    if (prevPage < 0) return;
    const firstIndex = prevPage * ITEMS_PER_PAGE;
    const prevPageItems = familyData.slice(firstIndex, firstIndex + ITEMS_PER_PAGE);
    setMembers(prevPageItems);
    setPage(prevPage);
  };

  return (
    <div className="h-auto">
      {loading ? (
        <div  >Cargando...</div>
      ) : members.length === 0 ? (
        <div className='w-full h-44 text-center flex justify-center items-center my-4 text-gray-600 font-semibold bg-gray-100'>No hay Personas en la Familia</div>
      ) : (
        <CardMembers data={members} next={nextHandler} prev={prevHandler} page={page + 1} />
      )}
    </div>
  );
};
