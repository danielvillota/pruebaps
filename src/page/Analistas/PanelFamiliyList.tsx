import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { DateTable } from '../../data/filter';
import { TableGeneralAnalista } from './TableGeneralAnalista';
import { TitleFormText } from '../../components/TitleFormText';


const PanelFamiliyList = () => {
  const { ask } = useParams();
  const { value } = useParams();
  const [results, setResults] = useState<any[]>([]);
  const[items,setItems] = useState([]);
  const ITEMS_PER_PAGE = 4;
  const[page,setPage] = useState(0);


  const nextHandler = () => {
    const totalData = items.length;
    const nextPage = page + 1;
    const firstIndex = nextPage * ITEMS_PER_PAGE;
    if (firstIndex >= totalData) return;
    const nextPageItems = items.slice(firstIndex, firstIndex + ITEMS_PER_PAGE);
    setItems(nextPageItems);
    setPage(nextPage);
     }

  const prevHandler = () => {
    const prevPage = page - 1;
    if (prevPage < 0) return;
    const firstIndex = prevPage * ITEMS_PER_PAGE;
    const prevPageItems = items.slice(firstIndex, firstIndex + ITEMS_PER_PAGE);
    setItems(prevPageItems);
    setPage(prevPage);
  }

  useEffect(() => {
    const getData = async () => {
        const data = DateTable(ask,Number(value))
        setResults( await data)
    };

    if (value !== null) {
      getData();
    }
    
  }, []); 

  return (
    <div>
    <TitleFormText
    title={`Filtro de`}
    text='Familias'
  />
   <div className=' w-full px-24 mt-4'>
   <TableGeneralAnalista data={results} next={nextHandler} prev={prevHandler} page={page + 1} />
   </div>
      
    </div>
  )
}

export default PanelFamiliyList