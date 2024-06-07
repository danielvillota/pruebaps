import { signs_of_malnutrition, reasons, medical_care, demographic, disability_type, interventions, promotion } from '../data/diccionario'



export const optionsArray = Object.entries(signs_of_malnutrition).map(([key, value]) => ({
    value: parseInt(key),
    label: value
}));
export const optionsArrayReasons = Object.entries(reasons).map(([key, value]) => ({
    value: parseInt(key),
    label: value
}));
export const optionsArrayMedical = Object.entries(medical_care).map(([key, value]) => ({
    value: parseInt(key),
    label: value
}));

export const optionsArraydemographic = Object.entries(demographic).map(([key, value]) => ({
    value: parseInt(key),
    label: value
}));

export const optionsArraydisability = Object.entries(disability_type).map(([key, value]) => ({
    value: parseInt(key),
    label: value
}));

export const optionsArrayinterventions = Object.entries(interventions).map(([key, value]) => ({
    value: parseInt(key),
    label: value
}));

export const optionsArraypromotion = Object.entries(promotion).map(([key, value]) => ({
    value: parseInt(key),
    label: value
}));