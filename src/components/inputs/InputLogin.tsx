import React from 'react'
import { InputComponentProps } from '../../Props/InputProps';
import { useFormContext } from 'react-hook-form';
import { useForm } from "react-hook-form"
import { ErrorMessage } from "@hookform/error-message"

interface FormInputs {
  singleErrorInput: string
}

export const InputLogin :React.FC<InputComponentProps> = ({
    name,
    type,
   context,
   validations,
  }) => {
    const {
      formState: { errors },
    } = useForm<FormInputs>()
    const { register } = useFormContext();


  return (
    <>
    <input type={type} 
    {...register(name,validations)}
    
    placeholder={context}
    className='w-full px-2 border-l-transparent border-t-transparent border-r-transparent  p-4 mt-2 focus:outline-none focus:border-l-transparent focus:border-r-transparent focus:border-t-transparent  focus:ring-0' />
    <ErrorMessage errors={errors} name="singleErrorInput" />

    <ErrorMessage
      errors={errors}
      name="singleErrorInput"
      render={({ message }) => <p>{message}</p>}
    />  </>
  )
}
