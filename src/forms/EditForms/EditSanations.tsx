import React, { useEffect, useState } from 'react'
import { FormStyle } from '../../components/FormStyle'
import { SelectFormHook } from '../../components/select/SelectFormHook'
import { Button } from '../../components/button/Button'
import { SelectMultipleFormHook } from '../../components/select/SelectMultipleFormHook'
import { TitleFormText } from '../../components/TitleFormText'
import { waterSupply,disposalSystem,residualWater,solidWaste } from '../../data/maps';
import { useNavigate, useParams } from 'react-router-dom'
import { SanationData } from '../../Props/Interfaces'
import { API_URL, get, post } from '../../data/api'
import { brushed, desicions } from '../../data/diccionario'
import { useForm } from 'react-hook-form'
import { mapValuesToOptions } from './EditAtributesMember'



const EditSanations = () => {
    const { id } = useParams();
    const { register, reset, formState: { errors }, control, handleSubmit } = useForm<SanationData>();
    const navigate = useNavigate();
    const idFamily = localStorage.getItem('FamilyGlobal')
    const [loading, setLoading] = useState(true);
    const [val, setval] = useState('')
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const sanation = await get(`${API_URL}sanation/?id=${id}`);
                setLoading(false);
                setval(sanation[0].id)
                const transformedData = {
                    ...sanation[0],
                    water_supply:mapValuesToOptions(sanation[0].water_supply,waterSupply),
                    disposal_system:mapValuesToOptions(sanation[0].disposal_system,disposalSystem),
                    residual_water:mapValuesToOptions(sanation[0].residual_water,residualWater),
                    solid_waste:mapValuesToOptions(sanation[0].solid_waste,solidWaste)
                
                };
                reset(transformedData);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };
        fetchData();
    }, [id, reset]);

    const onSubmit = async (data: SanationData) => {
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
            };
            console.log(requestData)
            await post(`${API_URL}sanation/update/${val}/`, requestData)
            
            navigate(`/panelFamily/${id}`);
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
            title='Registro'
            text='Saneamiento'
        />

        <form onSubmit={handleSubmit(onSubmit)}   className='flex flex-col'>
        <SelectMultipleFormHook
                context='Principal fuente de abastecimiento de agua'
                errors={errors}
                name='water_supply'
                options={waterSupply}
                tamano='w-full mt-8'
                validations={control}
                placeholder='Seleccion Multiple'>
            </SelectMultipleFormHook>

            <SelectMultipleFormHook
                context='Sistema de disposición de excretas'
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
            <div className=' basis-full md:pe-4'><Button msg='Actualizar' msgTwo='Cancelar' funTwo={buttonCancel} /></div>
        </form>



    </FormStyle>

    )}
    </>
  )
}

export default EditSanations