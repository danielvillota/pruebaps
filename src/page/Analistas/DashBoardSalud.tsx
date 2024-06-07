import { BarChartAntecedent } from '../../components/dash/BarChartAntecedent'
import { DonutGraphSport } from '../../components/dash/DonutGraphSport';
import { DonutGraphDisability } from '../../components/dash/DonutGraphDisability';
import { DonutGraphDiseasePrevention } from '../../components/dash/DonutGraphDiseasePrevention';
import { DonutGraphHealthyHabits } from '../../components/dash/DonutGraphHealthyHabits';

interface DashboardGeneralProps {
  data: any[];
}

export const DashBoardSalud:React.FC<DashboardGeneralProps> = ({data}) => {

  return (
    <>
        <div className='flex flex-col items-center p-4  md:flex-row '>
        <BarChartAntecedent dataref={data[8]} title='Antecedentes Cronicos de salud' variable='antecedent_salud'/>
        <DonutGraphSport dataref={data[5]} title='Total Personas que practican Deporte' variable='sport'/>
        </div>
        <div className='flex flex-col items-center p-4  md:flex-row'>
        <DonutGraphDisability dataref={data[11]} title='Total Personas con Alguna Discapacidad A nivel general' variable='disability'/>
        <DonutGraphDiseasePrevention dataref={data[10]} title='Total de Familias que practican prevencion de enfermedades' variable='family_welfare'/>
        <DonutGraphHealthyHabits dataref={data[9]} title='Total de Familias con Habitos de Vida Saludable' variable='healthy_habits'/>
        </div>
    </>
  )
}
