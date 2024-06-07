import { Card, DonutChart, EventProps, Legend, Title } from '@tremor/react'
import React, { useEffect } from 'react'
import { Graficprops } from './DonutGraphSport'
import { useNavigate } from 'react-router-dom';


export const DonutGraphDisability:React.FC<Graficprops> = ({dataref, title,variable}) => {
  const [value, setValue] = React.useState<EventProps>(null);
const navigate = useNavigate();

useEffect(() => {
  const getData = async () => {
    console.log(value)
   navigate(`/Family/${variable}/${value.id}`)
  };

  if (value !== null) {
    getData();
  }
  
}, [value]); 
  return (
    <Card className="m-2 border border-blue-200">
        <Title className='text-black text-center'>{title}</Title>
            <Legend
                categories={['Fisica', 'Auditiva', 'Visual', 'Sordoceguera', 'Intelectual', 'Psicosocial', 'Multiple', 'Otra', 'Ninguna']}
                colors={['blue-500', 'red-500', 'pink-500', 'gray-500', 'yellow-500', 'green-500', 'lime-500', 'violet-500', 'rose-500']}
                className="mt-4"/>
            <DonutChart
            className=' flex border-2 border-blue-500 mt-16 2xl:mt-10 p-4 '
            data={dataref}
            category='total'
            index="name"
            colors={[
              'blue-500', 
              'red-500',
              'pink-500',
              'gray-500',
              'yellow-500',
              'green-500',
              'lime-500', 
              'violet-500', 
              'rose-500'
            ]}
            variant="pie"
            onValueChange={(v) => setValue(v) }
            />
            <p className='text-sm text- font-medium mt-4 text-center '>En esta grafica presenta la cantidad total de personas que sufren alguna discapacidad de salud.</p>
    </Card>
  )
}
