import { Card, DonutChart, Title } from '@tremor/react';
export interface DonutGraphprops {
  numFamiliar : number;
  date:string;
  total_persons:number;
}

export interface TableGeneralpronps {
  dataref : DonutGraphprops[];
}

 export const DonutGraph:React.FC<TableGeneralpronps> = ({dataref}) => {
  return (
   <Card className="mx-aut md:w-1/3">
  <Title>Familias Encuestadas</Title>
      <DonutChart
      className='mt-6'
      data={dataref}
      category="total_families"
      index="date"
      colors={[
        'blue-900',
        'blue-800',
        'blue-700',
        'blue-600',
        'blue-500',
        'blue-400',
        'blue-300',
      ]}
    />
    <p className='text-sm text-gray-500 mt-4 text-center '>En esta grafica presenta la cantidad de Familias Que has encuestado en los ultimos 7 dias.</p>
    </Card>
  

  );
}