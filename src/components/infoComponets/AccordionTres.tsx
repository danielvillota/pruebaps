import React, { useState } from 'react'
import { AccordionProps } from '../../Props/InputProps';
import flecha from '../../assets/svg/flecha_abajo.svg'

export const AccordionTres:React.FC<AccordionProps> = ({ title, data }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };
  return (
    <div className="shadow-md">
      <button 
        className="w-full px-4 py-2 text-left focus:outline-none focus-visible:ring focus-visible:ring-opacity-75"
        onClick={toggleAccordion}
      >
        <div className="flex justify-between items-center">
          <span className="font-semibold text-[#3b82f6] ms-2">{title}</span>
          <span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
            <img src={flecha}/>
          </span>
        </div>
      </button>
      <div className={`transition-max-height duration-300 overflow-hidden ${isOpen ? 'max-h-screen' : 'max-h-0'}`}>
        <div className="p-4">
          <div className='flex flex-row gap-3 justify-around'>
            <div className='flex w-1/2 border-2'>
                <td className='basis-[90%] px-4 py-2 font-semibold'>Conviviente sucesos vitales normativos y no normativos:</td>
                <td className='basis-[10%] px-4 py-2 border-l-2'>{data.event_noted || 'N/A'}</td>
            </div>
            <div className='flex w-1/2 border-2'>
                <td className='basis-[90%] px-4 py-2 font-semibold'>Familias con prácticas de cuidado de salud críticas afectación:</td>
                <td className='basis-[10%] px-4 py-2 border-l-2'>{data.risk_psychosocial || 'N/A'}</td>
            </div>
          </div>
        </div>

        <div className="p-4">
          <div className='flex flex-row gap-3 justify-around'>
            <div className='flex w-1/2 border-2'>
                <td className='basis-[90%] px-4 py-2 font-semibold'>cuidado desde los saberes ancestrales/tradicionales:</td>
                <td className='basis-[10%] px-4 py-2 border-l-2'>{data.health_support || 'N/A'}</td>
            </div>
            <div className='flex w-1/2 border-2'>
                <td className='basis-[90%] px-4 py-2 font-semibold'>Prácticas para el cuidado y protección de los entornos:</td>
                <td className='basis-[10%] px-4 py-2 border-l-2'>{data.environment_care || 'N/A'}</td>
            </div>
          </div>
        </div>

        <div className="p-4">
          <div className='flex flex-row gap-3 justify-around'>
            <div className='flex w-1/2 border-2'>
                <td className='basis-[90%] px-4 py-2 font-semibold'>Prácticas favorecen relaciones sanas y constructivas:</td>
                <td className='basis-[10%] px-4 py-2 border-l-2'>{data.healthy_relationships || 'N/A'}</td>
            </div>
            <div className='flex w-1/2 border-2'>
                <td className='basis-[90%] px-4 py-2 font-semibold'>Recursos redes colectivas salud:</td>
                <td className='basis-[10%] px-4 py-2 border-l-2'>{data.health_support || 'N/A'}</td>
            </div>
          </div>
        </div>

        <div className="p-4">
          <div className='flex flex-row gap-3 justify-around'>
            <div className='flex w-1/2 border-2'>
                <td className='basis-[90%] px-4 py-2 font-semibold'>Prácticas autonomia personas mayores:</td>
                <td className='basis-[10%] px-4 py-2 border-l-2'>{data.environment_care || 'N/A'}</td>
            </div>
            <div className='flex w-1/2 border-2'>
                <td className='basis-[90%] px-4 py-2 font-semibold'>Prácticas para la prevención de enfermedades:</td>
                <td className='basis-[10%] px-4 py-2 border-l-2'>{data.healthy_relationships || 'N/A'}</td>
            </div>
          </div>
        </div>

        <div className="p-4">
          <div className='flex flex-row gap-3 justify-around'>
            <div className='flex w-1/2 border-2'>
                <td className='basis-[90%] px-4 py-2 font-semibold'>Recursos potenciadores cuidado de la salud:</td>
                <td className='basis-[10%] px-4 py-2 border-l-2'>{data.socioemotional || 'N/A'}</td>
            </div>
            <div className='flex w-1/2 border-2'>
                <td className='basis-[90%] px-4 py-2 font-semibold'>Hábitos de vida saludable:</td>
                <td className='basis-[10%] px-4 py-2 border-l-2'>{data.healthy_habits || 'N/A'}</td>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
