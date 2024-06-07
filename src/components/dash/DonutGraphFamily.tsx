import React from 'react'
import { Card, DonutChart, Legend, Title } from '@tremor/react';
  
  export interface Graficprops {
    dataref: number;
    title: string;
  }

export const DonutGraphFamily:React.FC<Graficprops> = ({dataref, title}) => {
  const transformedData = [{ name: 'Total Familias', total: dataref }];
  return (
    <Card className="m-2 border border-blue-200">
        <Title className='text-black text-center'>{title}</Title>
            <Legend
            categories={['Total Familias']}
            colors={['green-500']}
            className="mt-4"/>
            <DonutChart
            className='border-2 border-blue-500 mt-10 p-4'
            data={transformedData}
            category='total'
            index="name"
            colors={[
                'green-500',
            ]}
            />
            <p className='text-sm text-blue-900 font-medium mt-4 text-center'>En esta grafica presenta la cantidad total de Familias encuestadas.</p>
    </Card>
  )
}
