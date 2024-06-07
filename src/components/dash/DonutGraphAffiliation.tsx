import { Card, DonutChart, EventProps, Legend, Title } from '@tremor/react';
import React, { useEffect } from 'react'
import { Graficprops } from './DonutGraphSport';
import { useNavigate } from 'react-router-dom';


export const DonutGraphAffiliation:React.FC<Graficprops> = ({dataref, title,variable}) => {
  const [value, setValue] = React.useState<EventProps>(null);
const navigate = useNavigate();

useEffect(() => {
  const getData = async () => {
   navigate(`/Family/${variable}/${value.id}`)
  };

  if (value !== null) {
    getData();
  }
  
}, [value]); 

  return (
    <Card className="md:h-full md:w-1/2 m-2 border border-blue-200 pb-20">
        <Title className='text-black text-center'>{title}</Title>
            <Legend
            categories={['Subsidiado', 'Contributivo', 'Especial', 'Excepcion', 'No Afiliado']}
            colors={['blue', 'green', 'indigo', 'violet', 'orange']}
            className="mt-4"/>
            <DonutChart
            className='border-2 border-blue-500 mt-10 p-4'
            data={dataref}
            category='total'
            index="name"
            colors={['blue', 'green', 'indigo', 'violet', 'orange']}
            onValueChange={(v) => setValue(v) }
            variant="pie"
            />

            <p className='text-sm text-blue-900 font-medium mt-4 text-center '>En esta grafica presenta la cantidad total de personas encuestadas vinculada a un regimen de afiliación.</p>
    </Card>
  )
}
