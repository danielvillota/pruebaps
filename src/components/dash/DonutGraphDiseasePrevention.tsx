import { Card, DonutChart, EventProps, Legend, Title } from '@tremor/react';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { Graficprops } from './DonutGraphSport';

export const DonutGraphDiseasePrevention:React.FC<Graficprops> = ({dataref, title,variable}) => {
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
    <Card className="m-2 border border-blue-200  pb-14">
        <Title className='text-black text-center'>{title}</Title>
            <Legend
            categories={['Previenen Enfermedades', 'No Previenen Enfermedades']}
            colors={['violet-700','green']}
            className="mt-4"/>
            <DonutChart
            className='border-2 border-blue-500 mt-10 p-4'
            data={dataref}
            category='total'
            index="name"
            colors={['violet-700','green']}
            onValueChange={(v) => setValue(v) }
            />

            <p className='text-sm text-blue-900 font-medium mt-4 text-center '>En esta grafica presenta la cantidad total de personas encuestadas que realizan alguna prevencion de enfermedades.</p>
    </Card>
  )
}
