import React, { useState } from 'react'
import { AccordionProps } from '../../Props/InputProps';
import flecha from '../../assets/svg/flecha_abajo.svg'

export const AccordionDos:React.FC<AccordionProps> = ({ title, data }) => {
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
                <td className='basis-[90%] px-4 py-2 font-semibold'>Familia con niñas, niños y adolescentes:</td>
                <td className='basis-[10%] px-4 py-2 border-l-2'>{data.younger || 'N/A'}</td>
            </div>
            <div className='flex w-1/3 border-2'>
                <td className='basis-[90%] px-4 py-2 font-semibold'>Gestante en la familia:</td>
                <td className='basis-[10%] px-4 py-2 border-l-2'>{data.pregnant || 'N/A'}</td>
            </div>
            <div className='flex w-1/3 border-2'>
                <td className='basis-[90%] px-4 py-2 font-semibold'>Familia con personas adultos mayores:</td>
                <td className='basis-[10%] px-4 py-2 border-l-2'>{data.senior || 'N/A'}</td>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
