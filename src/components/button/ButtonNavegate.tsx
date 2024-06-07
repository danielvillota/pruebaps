import React from 'react'
import { Link } from 'react-router-dom'

import { ButtonProps } from '../../Props/ButtonProps';


export const ButtonNavegate:React.FC<ButtonProps> = ({
    msg,
    msgTwo,
    prev,
    next,

    fun,
  
}) => {
  return (
    <div className='mt-6  flex items-center justify-end gap-x-6' >
         <button type="button"   className="p-2 basis-1/2 rounded-lg bg-black text-white font-medium  ">
         <Link to={prev}>{msgTwo}</Link></button> 
        <button type="submit" onClick={fun}  className="p-2 basis-1/2 rounded-lg  text-white font-medium animated-background bg-gradient-to-r  from-blue-600 via-blue-500 to-blue-900 transition ease-in-out delay-200 hover:-translate-y-1 hover:scale-110 duration-300 hover:bg-blue-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ">
        <Link to={next}>{msg}</Link></button> 
    </div>
  )
}
