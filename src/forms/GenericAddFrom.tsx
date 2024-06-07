import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import {FormGenericProps} from '../Props/InputProps'
import { useNavigate } from 'react-router-dom';

export const GenericAddFrom: React.FC<FormGenericProps> = ({ children, to ,pad, fun,pk}) => {
  const methods = useForm();

  const navigate = useNavigate();
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit((data) => fun(data,to,pad,navigate,pk))} className='mt-28'>
         {children}
      </form>
    </FormProvider> 
  );
};