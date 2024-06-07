import { BarChart, Card, EventProps, Title } from '@tremor/react';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Graficprops } from './DonutGraphSport';

export const BarChartStratum: React.FC<Graficprops> = ({ dataref, title, variable }) => {
  const [value, setValue] = React.useState<EventProps | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (value !== null) {
      navigate(`/Family/${variable}/${value.id}`);
    }
  }, [value, navigate, variable]);

  return (
    <Card className="md:h-1/2 md:w-1/2 m-2 border border-blue-200 ">
            <Title className='text-black text-center'>{title}</Title>
            <BarChart
                className='border-2 border-blue-500 mt-2'
                data={dataref}
                index="name"
                categories={['total']}
                colors={['blue', 'teal', 'amber', 'rose', 'indigo', 'emerald','blue']}
                onValueChange={(v) => setValue(v)}
            />
            <p className='text-sm text-blue-900 font-medium mt-4 text-center '>En esta grafica presenta la cantidad total de familias asociadas a cada estrato social.</p>
        </Card>
  )
}
