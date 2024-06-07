import React, { useEffect, useState } from 'react'
import { useForm,  } from 'react-hook-form';
import {  useNavigate, useParams } from 'react-router-dom';
import { LivingPlaceData } from '../../Props/Interfaces';
import { API_URL, get, post } from '../../data/api';
import { SelectFormHook } from '../../components/select/SelectFormHook';
import { FormStyle } from '../../components/FormStyle';
import { TitleFormText } from '../../components/TitleFormText';
import { InputNumberFormHook } from '../../components/inputs/InputNumberFormHook';
import { SelectMultipleFormHook } from '../../components/select/SelectMultipleFormHook';
import { typeLiving, wallMaterial, floorMaterial, accessToHome, desicions, foodSource, irrigationScenarios, placesaround, animals, roofMaterial } from '../../data/diccionario';
import { Button } from '../../components/button/Button';
import { mapValuesToOptions } from './EditAtributesMember';



const optionsArrayHome = Object.entries(accessToHome).map(([key, value]) => ({
    value: parseInt(key),
    label: value
}));
const optionsArrayIrrigation = Object.entries(irrigationScenarios).map(([key, value]) => ({
    value: parseInt(key),
    label: value
}));
const optionsArrayPlaces = Object.entries(placesaround).map(([key, value]) => ({
    value: parseInt(key),
    label: value
}));
const optionsArrayAnimals = Object.entries(animals).map(([key, value]) => ({
    value: parseInt(key),
    label: value
}));

const optionsArrayFood = Object.entries(foodSource).map(([key, value]) => ({
    value: parseInt(key),
    label: value
}));

const EditLivingPlace = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [val, setval] = useState<number>();
    const { register, reset, formState: { errors }, control, handleSubmit } = useForm<LivingPlaceData>();
    const navigate = useNavigate();
    const idFamily = localStorage.getItem('FamilyGlobal')

    useEffect(() => {
        const fetchData = async () => {
            try {
                const living_place = await get(`${API_URL}living_place/?info_general=${id}`);
                setLoading(false);
                console.log(living_place[0].id)
                setval(living_place[0].id)
    
                const transformedData = {
                    ...living_place[0],
                    irrigation_scenarios:mapValuesToOptions(living_place[0].irrigation_scenarios,optionsArrayIrrigation),
                    access_to_home:mapValuesToOptions(living_place[0].access_to_home,optionsArrayHome),
                    food_source:mapValuesToOptions(living_place[0].food_source,optionsArrayFood),
                    places_around:mapValuesToOptions(living_place[0].places_around,optionsArrayPlaces),
                    animals:mapValuesToOptions(living_place[0].animals,optionsArrayAnimals)
                };
                reset(transformedData);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };
        fetchData();
    }, [id, reset]);

   
    const onSubmit = async (data: LivingPlaceData) => {
        let concatOptions: any = [];

        const muiltipleOptionsValue = [
            data.access_to_home,
            data.animals,
            data.food_source,
            data.irrigation_scenarios,
            data.places_around,
        ]

        muiltipleOptionsValue.forEach((element) => {
            let concat: any = [];
            for (const select in element) {
                const valorSelect = element[select];
                concat.push(valorSelect.value)
            }
            concatOptions.push(concat);
        })
        try {
            const requestData = {
                type_living_place: data.type_living_place,
                description: data.description,
                wall_material: data.wall_material,
                other_wall_material: data.other_wall_material,
                floor_material: data.floor_material,
                other_floor_material: data.other_floor_material,
                roof_material: data.roof_material,
                other_roof_material: data.other_roof_material,
                bedrooms: data.bedrooms,
                over_population: data.over_population,
                irrigation_scenarios: concatOptions[3],
                access_to_home: concatOptions[0],
                food_source: concatOptions[2],
                other_food_source: data.other_food_source,
                transmitting_vectors: data.transmitting_vectors,
                vectors_description: data.vectors_description,
                places_around: concatOptions[4],
                other_places_around: data.other_places_around,
                economic_activity: data.economic_activity,
                animals: concatOptions[1],
                other_animals: data.other_animals,

            };
            console.log(requestData)
            await post(`${API_URL}living_place/update/${val}/`, requestData)
       
            navigate(`/panelFamily/${idFamily}`);
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }

    }

    const buttonCancel = () => {
        if (window.confirm('Estas Seguro de no guardar los cambios')) {
            
            navigate(`/panelFamily/${idFamily}`);
        }
    };
  return (
    <>
    
    {loading && <div>cargando...</div>}
            {!loading && (
           <FormStyle>
                <TitleFormText
                    title='Register'
                    text='Habitabilidad'
                />

                <form  onSubmit={handleSubmit(onSubmit)} className='flex flex-col'>

                    <SelectFormHook
                        name='type_living_place'
                        tamano='md:w-1/2'
                        register={register}
                        validations={{
                            valueAsNumber: true,
                            validate: (value: number) => {
                                if (value === 0) {
                                    return 'EL campo es requerido'
                                }
                            }
                        }}
                        context='Tipo de Vivienda'
                        options={typeLiving}
                        errors={errors}
                        nameDescripcion='description'
                        textDescripcion='Describelo'
                        showAdditional='Otro'
                    >
                    </SelectFormHook>

                    <SelectFormHook
                        name='wall_material'
                        tamano='md:w-1/2'
                        register={register}
                        validations={{
                            valueAsNumber: true,
                            validate: (value: number) => {
                                if (value === 0) {
                                    return 'EL campo es requerido'
                                }
                            }
                        }}
                        context='Material Predominante de las Paredes'
                        options={wallMaterial}
                        errors={errors}
                        nameDescripcion='other_wall_material'
                        textDescripcion='Describelo'
                        showAdditional='Otro'
                    >
                    </SelectFormHook>

                    <SelectFormHook
                        name='floor_material'
                        tamano='md:w-1/2'
                        register={register}
                        validations={{
                            valueAsNumber: true,
                            validate: (value: number) => {
                                if (value === 0) {
                                    return 'EL campo es requerido'
                                }
                            }
                        }}
                        context='Material Predominante del Suelo'
                        options={floorMaterial}
                        errors={errors}
                        nameDescripcion='other_floor_material'
                        textDescripcion='Describelo'
                        showAdditional='Otro'
                    >
                    </SelectFormHook>
                    <SelectFormHook
                        name='roof_material'
                        tamano='md:w-1/2'
                        register={register}
                        validations={{
                            valueAsNumber: true,
                            validate: (value: number) => {
                                if (value === 0) {
                                    return 'EL campo es requerido'
                                }
                            }
                        }}
                        context='Material Predominante del Suelo'
                        options={roofMaterial}
                        errors={errors}
                        nameDescripcion='other_roof_material'
                        textDescripcion='Describelo'
                        showAdditional='Otro'
                    >
                    </SelectFormHook>

                    <InputNumberFormHook
                        name="bedrooms"
                        tamano='md:w-1/2'
                        register={register}
                        validations={{
                            required: { value: true, message: "El campo es requerido" },
                            valueAsNumber: { value: true, message: "El Valor debe ser Numerico" },
                            min: { value: 0, message: "El Valor debe ser mayor que 0" },
                            max: { value: 50, message: "El Valor debe ser menor que 50" },
                        }}
                        context='Numero de Habitaciones'
                        placeholder={"0"}
                        errors={errors}
                        type='number'
                    ></InputNumberFormHook>


                    <SelectFormHook
                        name='over_population'
                        tamano='md:w-1/2'
                        register={register}
                        validations={{
                            valueAsNumber: true,
                            validate: (value: number) => {
                                if (value === 0) {
                                    return 'EL campo es requerido'
                                }
                            }
                        }}
                        context='Hacinamiento'
                        options={desicions}
                        errors={errors}
                    >
                    </SelectFormHook>

                    <SelectMultipleFormHook
                        context='Riesgo de accidente
                        en la vivienda'
                        errors={errors}
                        name='irrigation_scenarios'
                        options={optionsArrayIrrigation}
                        tamano='w-full mt-8'
                        validations={control}
                        placeholder='Seleccion Multiple'>
                    </SelectMultipleFormHook>

                    <SelectMultipleFormHook
                        context='Sitios de interés de fácil
                        acceso desde vivienda'
                        errors={errors}
                        name='access_to_home'
                        options={optionsArrayHome}
                        tamano='w-full mt-8'
                        validations={control}
                        placeholder='Seleccion Multiple'>
                    </SelectMultipleFormHook>

                    <SelectMultipleFormHook
                        context='Fuentes de energía o combustible para cocinar'
                        errors={errors}
                        name='food_source'
                        options={optionsArrayFood}
                        tamano='w-full mt-8'
                        validations={control}
                        placeholder='Seleccion Multiple'>
                    </SelectMultipleFormHook>



                    <SelectFormHook
                        name='transmitting_vectors'
                        tamano='md:w-1/2'
                        register={register}
                        validations={{
                            valueAsNumber: true,
                            validate: (value: number) => {
                                if (value === 0) {
                                    return 'EL campo es requerido'
                                }
                            }
                        }}
                        context='Observa criaderos de vectores'
                        options={desicions}
                        errors={errors}
                        nameDescripcion='vectors_description'
                        textDescripcion='Describe los vectores'
                        showAdditional='Si'
                    >
                    </SelectFormHook>

                    <SelectMultipleFormHook
                        context='Observaciones de lugares cerca de la vivienda'
                        errors={errors}
                        name='places_around'
                        options={optionsArrayPlaces}
                        tamano='w-full mt-8'
                        validations={control}
                        placeholder='Seleccion Multiple'>
                    </SelectMultipleFormHook>


                    <SelectFormHook
                        name='economic_activity'
                        tamano='md:w-1/2'
                        register={register}
                        validations={{
                            valueAsNumber: true,
                            validate: (value: number) => {
                                if (value === 0) {
                                    return 'EL campo es requerido'
                                }
                            }
                        }}
                        context='Realiza alguna actividad económica'
                        options={desicions}
                        errors={errors}
                    >
                    </SelectFormHook>




                    <SelectMultipleFormHook
                        context='Animales dentro de la vivienda o en su entorno inmediato'
                        errors={errors}
                        name='animals'
                        options={optionsArrayAnimals}
                        tamano='w-full mt-8'
                        validations={control}
                        placeholder='Seleccion Multiple'>
                    </SelectMultipleFormHook>


                    <div className=' basis-full md:pe-4'><Button msg='Siguiente' msgTwo='Cancelar' funTwo={buttonCancel} /></div>
                </form>

            </FormStyle>)}
    </>
  )
}

export default EditLivingPlace