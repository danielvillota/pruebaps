import React from 'react'
import { LayoutHeader } from './Layout'

export const Footer = () => {
  return (
    <footer className='w-screen bg-white backdrop-blur-lg bottom-0 left-0 right-0 z-0'>
      <LayoutHeader>
        <nav className='mx-auto px-4 py-4 z-0 '>
            <ul className='flex flex-col items-center z-0'>
                <li><h1 className=' text-blue-500 text-4xl font-semibold mx-2 '>APS</h1></li>
                <li><h5 className='text-sm font-light mx-2'>Atención Primaria en Salud</h5></li>
                <li><h5 className='text-sm font-light mx-2'>Proyecto de aprendizaje educativo</h5></li>
                <li><h5 className='text-xs font-medium mx-2'>Jeysson Getial - Daniel Villota</h5></li>
            </ul>
        </nav>
        </LayoutHeader>
    </footer>
  )
}

export default Footer