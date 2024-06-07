import React from 'react'
import { BarChartAnalista } from '../../components/dash/BarChartAnalista'
import { DonutGraphVictim } from '../../components/dash/DonutGraphVictim';
import { BarChartEtnia } from '../../components/dash/BarChartEtnia';

interface DashboardGeneralProps {
  data: any[];
}

export const DashboardInfogeneral:React.FC<DashboardGeneralProps> = ({data}) => {

  return (
    <div>
        <div className='mt-4  p-4 '>
          <BarChartEtnia dataref={data[4]} title='Total personas en etnias sociales' variable='etnia'/>
        </div>
        <div className='flex flex-col items-center p-4  md:flex-row'>
          <BarChartAnalista dataref={data[6]} title='vulnerabilidad Social' variable='vulneravility'/>
          <DonutGraphVictim dataref={data[7]} title='Victimas del conflicto armado' variable='victim'/>
        </div>
    </div>
  )
}
