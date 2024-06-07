import { BarList, Card, Title } from '@tremor/react'
import React from 'react'
export interface BarChartprops {
    name:string;
    total:number;
}

export interface Graficprops {
    dataref : BarChartprops[];
    title: string;
}

const colorMapping: { [key: string]: string } = {
    'hombre': 'blue-600',
    'mujer': 'pink-600',
    'indeterminado': 'yellow-500'
};

export const BarListSex:React.FC<Graficprops> = ({dataref, title}) => {
    // Mapea los datos a la estructura esperada por BarList
    const transformedData = dataref.map(item => ({
        name: item.name,
        value: item.total,
        color: colorMapping[item.name] // Asigna color basado en el nombre
    }));
  return (
    <Card className="m-2 border border-blue-200  pb-20">
        <Title className='text-black text-center'>{title}</Title>
        <>
            <BarList data={transformedData} className=' mt-10 p-4' color={['blue','pink','yellow']} />
        </>
            <p className='text-sm text-blue-900 font-medium mt-4 text-center'>En esta grafica presenta la cantidad total Generos sexuales existentes.</p>
    </Card>
  )
}
