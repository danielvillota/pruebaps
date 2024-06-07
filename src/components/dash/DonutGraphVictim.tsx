import { Card, DonutChart, EventProps, Legend, Title } from '@tremor/react';
import { Graficprops } from './DonutGraphSport';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

 export const DonutGraphVictim:React.FC<Graficprops> = ({dataref, title,variable}) => {
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
   <Card className="m-2 border border-blue-200 pb-28">
  <Title className='text-black text-center'>{title}</Title>
      <Legend
        categories={['Victimas', 'No Victimas']}
        colors={['blue-600', 'pink-500']}
        className="mt-4"/>
      <DonutChart
      className='border-2 border-blue-500 mt-10 p-4'
      data={dataref}
      category='total'
      index="name"
      colors={[
        'blue-600',
        'pink-500',
      ]}
      onValueChange={(v) => setValue(v) } 
    />
    <p className='text-sm text-blue-900 font-medium mt-4 text-center '>En esta grafica presenta la cantidad total de Familias encuestadas con o sin antecedentes cronicos de salud.</p>
    </Card>
  

  );
}