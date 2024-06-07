import { InputNumber } from '../components/inputs/InputNumber';
import {IncrementBar} from '../components/dash/IncrementBar';
import { Button } from '../components/button/Button';
import {GeneralSelect} from '../components/select/GeneralSelect'
import {} from '../data/diccionario';
import React, { useState } from 'react';
import {animals,placesaround,desicions,irrigationScenarios,accessToHome,foodSource,typeLiving,wallMaterial,floorMaterial,roofMaterial } from '../data/diccionario'


export const FormLivingPlace = () => {
  const [step, setStep] = useState(1);
  const [anchoBarra, setAnchoBarra] = useState('0%');


  const manejarClickBoton = () => {
    setAnchoBarra('20%');
  };
  
  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };


  return (
    <>
      <h1 className='font-medium my-4'></h1>
        {step === 1 && (
        <div  className='flex flex-col rounded-md border-2 pb-10 px-6 md:flex-row md:flex-wrap '>



          <div className=' basis-full md:pe-4'><Button fun={nextStep} msg='Siguiente' msgTwo='Cancelar'/></div>
        </div>
      )}
      {step === 2 && (
        <div  className='flex flex-col rounded-md border-2 pb-10 px-6 md:flex-row md:flex-wrap '>

          <div className=' basis-full md:pe-4'><Button funTwo={prevStep} fun={manejarClickBoton} msg='Siguiente' msgTwo='Anterior'/></div>
    
        </div>
      )}
         
      
        <IncrementBar anchoBarra={anchoBarra}/>
    </>
  )

}
