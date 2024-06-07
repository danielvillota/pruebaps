import { Button } from '../../components/button/Button';
import { desicions, brushed } from '../../data/diccionario'
import { FormStyle } from '../../components/FormStyle';
import { TitleFormText } from '../../components/TitleFormText';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../data/api';
import { SelectMultipleFormHook } from '../../components/select/SelectMultipleFormHook';
import { waterSupply,disposalSystem,residualWater,solidWaste } from '../../data/maps';
import { SelectFormHook } from '../../components/select/SelectFormHook';
import { SanationData } from '../../Props/Interfaces';

const Sanation = () => {
    const { register, handleSubmit, formState: { errors }, control } = useForm<SanationData>();
    const navigate = useNavigate();


    const keyLivingPlace = localStorage.getItem('living')
    const onSubmit = async (data: SanationData) => {
        console.log(keyLivingPlace);
        let concatOptions: any = [];


        const muiltipleOptionsValue = [
            data.water_supply,
            data.disposal_system,
            data.residual_water,
            data.solid_waste,
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
     
                water_supply:concatOptions[0],
                other_water_supply: data.other_water_supply,
                disposal_system: concatOptions[1],
                other_disposal_system: data.other_disposal_system,
                residual_water: concatOptions[2],
                other_residual_water: data.other_residual_water,
                solid_waste: concatOptions[3],
                other_Solid_waste: data.other_Solid_waste,
                hygiene: data.hygiene,
                food_hygiene: data.food_hygiene,
                kitchen_toilet: data.kitchen_toilet,
                handwashing: data.handwashing,
                hygiene_element: data.hygiene_element,
                brushed: data.brushed,
                living_place_id:keyLivingPlace,
            };
            console.log(requestData)
            const response = await axios.post(`${API_URL}sanation/add/`, requestData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
            localStorage.setItem('key', response.data.id)
            localStorage.setItem('walfare',response.data.id)
            navigate("/register/family");
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
                    title='Registro'
                    text='Saneamiento'
                />

                <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col'>
                <SelectMultipleFormHook
                        context='Principal fuente de abastecimiento de agua'
                        errors={errors}
                        name='water_supply'
                        options={waterSupply}
                        rules={{ required: "campo requerido" }}
                        tamano='w-full mt-8'
                        validations={control}
                        placeholder='Seleccion Multiple'>
                    </SelectMultipleFormHook>

                    <SelectMultipleFormHook
                        context='Sistema de disposición de excretas'
                        rules={{ required: "campo requerido" }}
                        errors={errors}
                        name='disposal_system'
                        options={disposalSystem}
                        tamano='w-full mt-8'
                        validations={control}
                        placeholder='Seleccion Multiple'>
                    </SelectMultipleFormHook>

                    
                    <SelectMultipleFormHook
                        context='Sistema de disposición de aguas residuales domésticas'
                        errors={errors}
                        rules={{ required: "campo requerido" }}
                        name='residual_water'
                        options={residualWater}
                        tamano='w-full mt-8'
                        validations={control}
                        placeholder='Seleccion Multiple'>
                    </SelectMultipleFormHook>

                    <SelectMultipleFormHook
                        context='Disposición final de los residuos sólidos ordinarios'
                        errors={errors}
                        name='solid_waste'
                        rules={{ required: "campo requerido" }}
                        options={solidWaste}
                        tamano='w-full mt-8'
                        validations={control}
                        placeholder='Seleccion Multiple'>
                    </SelectMultipleFormHook>

                    <SelectFormHook
                        name='hygiene'
                        tamano='md:w-1/2'
                        register={register}
                        validations={{
                            valueAsNumber: true,
                            validate: (value:number) => {
                                if (value === 0) {
                                    return 'EL campo es requerido'
                                }
                            }
                        }}
                        context='Buenas Costrubre de higiene'
                        options={desicions}
                        errors={errors}
                    >
                    </SelectFormHook>
                    <SelectFormHook
                        name='food_hygiene'
                        tamano='md:w-1/2'
                        register={register}
                        validations={{
                            valueAsNumber: true,
                            validate: (value:number) => {
                                if (value === 0) {
                                    return 'EL campo es requerido'
                                }
                            }
                        }}
                        context='Higiene en los alimentos'
                        options={desicions}
                        errors={errors}
                    >
                    </SelectFormHook>
                    <SelectFormHook
                        name='kitchen_toilet'
                        tamano='md:w-1/2'
                        register={register}
                        validations={{
                            valueAsNumber: true,
                            validate: (value:number) => {
                                if (value === 0) {
                                    return 'EL campo es requerido'
                                }
                            }
                        }}
                        context='Cocina limpia'
                        options={desicions}
                        errors={errors}
                    >
                    </SelectFormHook>
                    <SelectFormHook
                        name='handwashing'
                        tamano='md:w-1/2'
                        register={register}
                        validations={{
                            valueAsNumber: true,
                            validate: (value:number) => {
                                if (value === 0) {
                                    return 'EL campo es requerido'
                                }
                            }
                        }}
                        context='Lavado de Manos'
                        options={desicions}
                        errors={errors}
                    >
                    </SelectFormHook>

                    <SelectFormHook
                        name='hygiene_element'
                        tamano='md:w-1/2'
                        register={register}
                        validations={{
                            valueAsNumber: true,
                            validate: (value:number) => {
                                if (value === 0) {
                                    return 'EL campo es requerido'
                                }
                            }
                        }}
                        context='Elementos de Higiene'
                        options={desicions}
                        errors={errors}
                    >
                    </SelectFormHook>
                    <SelectFormHook
                        name='brushed'
                        tamano='md:w-1/2'
                        register={register}
                        validations={{
                            valueAsNumber: true,
                            validate: (value:number) => {
                                if (value === 0) {
                                    return 'EL campo es requerido'
                                }
                            }
                        }}
                        context='Cepillado'
                        options={brushed}
                        errors={errors}
                    >
                    </SelectFormHook>
                    <div className=' basis-full md:pe-4'><Button msg='Siguiente' msgTwo='Cancelar' /></div>
                </form>



            </FormStyle>

        </>
    )
}
export default Sanation
//OK
