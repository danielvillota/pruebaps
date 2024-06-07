import React, { useEffect, useState } from 'react'
import { Card, DonutChart, Title } from '@tremor/react';
import { TableGeneralpronps } from '../dash/DonutGraph';


export const Carousel:React.FC<TableGeneralpronps> = ({dataref})=> {
    
    
    const [suma, setSuma] = useState(0);

    useEffect(() => {
        let total = 0;
        dataref.forEach(info => {
            total += info.total_persons;
        });
        setSuma(total);
    }, [dataref]);
    

  return (
    <div className='flex flex-col w-full h-full px-4 justify-center'>
        
        
        
        <div className="flex w-full rounded-lg p-4 mx-auto h-1/3 mb-4 bg-blue-800">
<div className='basis-2/3'>

<h4 className="text-white text-md font-semibold">Personas Caracterizadas</h4>
        <p className="text-white text-sm">Ultimo Reporte</p>
</div>

<div className='flex justify-center items-center mb-4 font-semibold basis-1/3 text-white text-4xl text-cente '>{suma}</div>
    </div> 
    <Card className="mx-aut md:w-full h-1/3 mb-4 bg-blue-600 ">
  Esre
    </Card>
    <Card className="mx-aut md:w-full h-1/3 bg-blue-300 ">
  Esre
    </Card>
    </div>
  )
}

export default Carousel