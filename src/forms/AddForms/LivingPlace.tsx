import { Button } from '../../components/button/Button';
import { FormStyle } from '../../components/FormStyle';
import { typeLiving, wallMaterial, floorMaterial, accessToHome, desicions, foodSource, irrigationScenarios, placesaround, animals, roofMaterial } from '../../data/diccionario';
import { TitleFormText } from '../../components/TitleFormText';
import { LivingPlaceData } from '../../Props/Interfaces';
import { API_URL } from '../../data/api';
import { SelectFormHook } from '../../components/select/SelectFormHook';
import { SelectMultipleFormHook } from '../../components/select/SelectMultipleFormHook';
import { InputNumberFormHook } from '../../components/inputs/InputNumberFormHook';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


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



const LivingPlace = () => {
    const { register, handleSubmit, formState: { errors }, control } = useForm<LivingPlaceData>();
    const navigate = useNavigate();


    const keyInfogeneral = localStorage.getItem('key')
    const onSubmit = async (data: LivingPlaceData) => {
        console.log(keyInfogeneral);
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
                info_general: keyInfogeneral,
            };
            console.log(requestData)
            const response = await axios.post(`${API_URL}living_place/add/`, requestData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
            console.log(response.data.id)
            localStorage.setItem('living', response.data.id)
            navigate("/register/sanation");
        } catch (error: unknown) {
            if (error.response) {
                alert('Registro Invalido')
            } else if (error.request) {
                alert('Servidor en mantenimiento Intente mas Tarde')
            } else {
                // Algo paso al preparar la petición que lanzo un Error
                console.log('Error', error.message);
            }
        }

    }

    

    return (
        <>
            <FormStyle>
                <TitleFormText
                    title='Register'
                    text='Habitabilidad'
                />

                <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col'>

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
                        context='Material Predominante del Techo'
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
                        rules={{ required: "campo requerido" }}
                        tamano='w-full mt-8'
                        validations={control}
                        placeholder='Seleccion Multiple'>
                    </SelectMultipleFormHook>

                    <SelectMultipleFormHook
                        context='Fuentes de energía o combustible para cocinar'
                        errors={errors}
                        name='food_source'
                        options={optionsArrayFood}
                        rules={{ required: "campo requerido" }}
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
                        rules={{ required: "campo requerido" }}
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
                        rules={{ required: "campo requerido" }}
                        tamano='w-full mt-8'
                        validations={control}
                        placeholder='Seleccion Multiple'>
                    </SelectMultipleFormHook>


                    <div className=' basis-full md:pe-4'><Button msg='Siguiente' msgTwo='Agregar Observacion' /></div>
                </form>

            </FormStyle>
        </>

    )
}
export default LivingPlace;
//Ok
