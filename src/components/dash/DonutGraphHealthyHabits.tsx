import { Card, DonutChart, EventProps, Legend, Title } from '@tremor/react'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { Graficprops } from './DonutGraphSport';


export const DonutGraphHealthyHabits:React.FC<Graficprops> = ({dataref, title,variable}) => {
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
    <Card className="m-2 border border-blue-200 pb-20">
        <Title className='text-black text-center'>{title}</Title>
            <Legend
            categories={['Realizan Hábitos de vida saludable', 'No Realizan Hábitos de vida saludable']}
            colors={['yellow-500','red-600']}
            className="mt-4"/>
            <DonutChart
            className='border-2 border-blue-500 mt-10 p-4'
            data={dataref}
            category='total'
            index="name"
            colors={['yellow-500','red-600']}
            onValueChange={(v) => setValue(v) }
            />

            <p className='text-sm text-blue-900 font-medium mt-4 text-center '>En esta grafica presenta la cantidad total de personas encuestadas que realizan habitos de vida saludable.</p>
    </Card>
  )
}
