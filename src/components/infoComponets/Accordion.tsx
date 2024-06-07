import React, { useState } from 'react'
import { AccordionProps } from '../../Props/InputProps';
import flecha from '../../assets/svg/flecha_abajo.svg'

export const Accordion:React.FC<AccordionProps> = ({ title, data }) => {
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
            <div className='flex w-1/3 border-2'>
                <td className='basis-[90%] px-4 py-2 font-semibold'>Victima Conflicto:</td>
                <td className='basis-[10%] px-4 py-2 border-l-2'>{data.victim || 'N/A'}</td>
            </div>
            <div className='flex w-1/3 border-2'>
                <td className='basis-[90%] px-4 py-2 font-semibold'>Vulnerabilidad Social:</td>
                <td className='basis-[10%] px-4 py-2 border-l-2'>{data.vulneravility || 'N/A'}</td>
            </div>
            <div className='flex w-1/3 border-2 rounded-sm'>
                <td className='basis-[90%] px-4 py-2 font-semibold'>Convive con personas con discapacidad:</td>
                <td className='basis-[10%] px-4 py-2 border-l-2'>{data.disable || 'N/A'}</td>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
