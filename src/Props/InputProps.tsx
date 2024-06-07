import  { ReactNode } from 'react';
import { ErrorOption, useFormContext } from 'react-hook-form';


export interface InputComponentProps {
  name?:any;
  context?: string;
  type?: string;
  tamano?: string;
  info?:string;
  value?:string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  validations?: Record<string, any>;
  placeholder?:string
  errors?:any
}


export interface SelectPropsNormal extends InputComponentProps {
   options?: { [key: number]: string } ;
   nameDescripcion?: string,
   textDescripcion?: string,
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   validationsInput?: Record<string, any>,
   showAdditional?:string,

}

export interface SelectPropsNormalDos extends InputComponentProps {
  options?: {[key: number]: string };
  nameDescripcion?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  validationsInput?: Record<string, any>;
  showAdditional?: string;
}


export interface typedat {
  value:number
  label:string
}

export interface InputNumberprops extends InputComponentProps {
    maxValue:number;
    minValue:number;
}

export interface FormGenericProps {
  children: ReactNode;
  pad:string;
  fun:SubmitFunction
  to:string;
  pk:string;
}

export interface SubmitFunction {
  (data: any, pad: string, to:string,navigate, pk:string): Promise<void>;
}


export interface Option {
value: number;
label: string;
}

export interface OptionSecundary {
value: string;
label: string;
}


export interface SelectProps extends SelectPropsNormal {
  optionsMulti: OptionSecundary[]; 
  }


export interface TextAreaProps extends InputComponentProps {
    rows: number;
    cols: number;
  }
  
  
  export interface prompInputs {
    name?: any;
    register?: any;
    context?: string;
    type?: string;
    info?: string;
    tamano?: string;
    validations?: any;
    placeholder?: any;
    errors?: ant;
}

export interface pollsterprops {
  telephone:any;
  email:any;
  last_name:any;
  name:any;
  id_document:any;
  job:any;
}

export interface Family {
  info_general: any;
  total_members: number;
  family_type: string;
}

export interface FamilyContext {
  disable: string;
  environment_care: string;
  event_noted: string;
  family: number;
  family_welfare: string;
  health_support: string;
  healthy_habits: string;
  healthy_relationships: string;
  id: number;
  infected_person: number;
  patient: string;
  pregnant: string;
  risk_psychosocial: string;
  scl_conservation: string;
  senior: string;
  senior_protection: string;
  socioemotional: string;
  victim: string;
  vulneravility: string;
  younger: string;
}

export interface FamilyAnalista {
  id: number;
  info_general: any;
  total_members: number;
  family_type: number; // Según los datos proporcionados, es un número
  in_charge: any[]; // Esto puede ajustarse a una interfaz específica si tienes más detalles
}

export interface Contact {
  telephone: string;
  email: string;
}

export interface NamePerson {
  name: string;
  second_name: string;
  last_name: string;
  second_last_name: string;
  id: number;
}

export interface FamilyMember {
  id: number;
  name_person: NamePerson;
  contact: Contact;
  role: number;
  date_birth:string;
}

export interface AccordionProps {
  title: string;
  data: DataProps;
}


