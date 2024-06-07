import { ButtonProps } from '../../Props/ButtonProps';


export const ButtonLogin:React.FC<ButtonProps> = ({
    msg,
    fun
}
) => {
  return (
      <button type="submit" onClick={fun} className='p-4 w-full rounded-lg mt-6 text-white font-medium animated-background bg-gradient-to-r  from-blue-600 via-blue-500 to-blue-900 transition ease-in-out delay-200 hover:-translate-y-1 hover:scale-110 duration-300 hover:bg-blue-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
        {msg}</button>


  )
}
