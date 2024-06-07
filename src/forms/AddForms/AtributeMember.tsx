import { FormStyle } from '../../components/FormStyle'
import { desicions } from '../../data/diccionario'
import { Button } from '../../components/button/Button'
import { TitleFormText } from '../../components/TitleFormText'
import { SelectFormHook } from '../../components/select/SelectFormHook'
import { API_URL } from '../../data/api'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { InputNumberFormHook } from '../../components/inputs/InputNumberFormHook'
import { SelectMultipleFormHook } from '../../components/select/SelectMultipleFormHook'
import { optionsArray, optionsArrayMedical, optionsArrayReasons, optionsArraydemographic, optionsArraydisability, optionsArrayinterventions, optionsArraypromotion } from '../../Props/Converters'
import { memberInfoData } from '../../Props/Interfaces'
import { useEffect, useState } from 'react'
import { canalizations } from '../../data/maps'




const AtributeMember = () => {
    const { register, handleSubmit, formState: { errors }, control } = useForm<memberInfoData>();
    const navigate = useNavigate();
    const { id } = useParams();
    const personAge = localStorage.getItem('personAge')
    const personSize = localStorage.getItem('personSize')
    const personWeight = localStorage.getItem('personWeight')
    const [hidden, setHidden] = useState('hidden')
    const currentDate = new Date();
    const personBirthDate = new Date(personAge);
    const keyfamily = localStorage.getItem('family')
    const person = localStorage.getItem('person')


    useEffect(() => {
        const timeDiff = currentDate.getTime() - personBirthDate.getTime();
        const ageDiff = new Date(timeDiff).getUTCFullYear() - 1970;
        if (ageDiff < 5) {
            console.log('La persona es menor');
            setHidden('block');
        } else {
            console.log('La persona es mayor');
            setHidden('hidden');
        }

    }, []);

    const onSubmit = async (data: memberInfoData) => {
        let concatOptions: any = [];
        console.log(person)

        const muiltipleOptionsValue = [
            data.disability,
            data.group_demographic,
            data.health_promotion,
            data.medical_care,
            data.pending_interventions,
            data.physical_signs_of_malnutrition,
            data.reason_for_no_attention,
            data.canalization
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
                present_person: data.present_person,
                group_demographic: concatOptions[1],
                disability: concatOptions[0],
                chronic_condition: data.chronic_condition,
                care_scheme: data.care_scheme,
                pending_interventions: concatOptions[4],
                health_promotion: concatOptions[2],
                sport: data.sport,
                breastfeeding: data.breastfeeding,
                breastfeeding_months: data.breastfeeding,
                under_five_years: data.under_five_years,
                weight_for_height: data.weight_for_height,
                brachial_perimete: data.brachial_perimeter,
                physical_signs_of_malnutrition: concatOptions[5],
                presented_disease: data.presented_disease,
                disease_description: data.disease_description,
                acute_disease_treatment: data.acute_disease_treatment,
                reason_for_no_attention: concatOptions[6],
                medical_care: concatOptions[3],
                canalization:concatOptions[7],
                member: id,
            };
            console.log(requestData)
            await axios.post(`${API_URL}atributes_member/add/`, requestData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
            navigate(`/panelFamily/${keyfamily}`);
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
                    text='Detalles Personales'
                />
                <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col'>

                    <SelectMultipleFormHook
                        context='Grupo poblacional'
                        errors={errors}
                        name='group_demographic'
                        options={optionsArraydemographic}
                        tamano='w-full mt-8'
                        validations={control}
                        placeholder='Seleccion Multiple'>
                    </SelectMultipleFormHook>

                    <SelectMultipleFormHook
                        context='condiciones de discapacidad que reconoce'
                        errors={errors}
                        name='disability'
                        options={optionsArraydisability}
                        tamano='w-full mt-8'
                        validations={control}
                        placeholder='Seleccion Multiple'>
                    </SelectMultipleFormHook>



                    <SelectFormHook
                        name='chronic_condition'
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
                        context='Condición Cronica'
                        options={desicions}
                        errors={errors}
                    >
                    </SelectFormHook>

                    <SelectFormHook
                        name='care_scheme'
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
                        context='Esquema de Cuidado'
                        options={desicions}
                        errors={errors}
                    >
                    </SelectFormHook>


                    <SelectMultipleFormHook
                        context='Intervenciones pendientes
                        de promoción y
                        mantenimiento'
                        errors={errors}
                        name='pending_interventions'
                        options={optionsArrayinterventions}
                        tamano='w-full mt-8'
                        validations={control}
                        placeholder='Seleccion Multiple'>
                    </SelectMultipleFormHook>

                    <SelectMultipleFormHook
                        context='Motivos no atención de
                        promoción y mantenimiento'
                        errors={errors}
                        name='health_promotion'
                        options={optionsArraypromotion}
                        tamano='w-full mt-8'
                        validations={control}
                        placeholder='Seleccion Multiple'>
                    </SelectMultipleFormHook>

                    <SelectFormHook
                        name='sport'
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
                        context='Practica deporte o ejercicio'
                        options={desicions}
                        errors={errors}
                    >
                    </SelectFormHook>






                    <SelectMultipleFormHook
                        context='Signos físicos de desnutrición aguda'
                        errors={errors}
                        name='physical_signs_of_malnutrition'
                        options={optionsArray}
                        tamano='w-full mt-8'
                        validations={control}
                        placeholder='Seleccion Multiple'>
                    </SelectMultipleFormHook>
                    <SelectFormHook
                        name='presented_disease'
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
                        context='Presenta o ha presentado
                        en el último mes gástrica o
                        respiratoria aguda'
                        options={desicions}
                        errors={errors}
                        nameDescripcion='disease_description'
                        showAdditional='Si'
                        textDescripcion='Descripcion'
                    >
                    </SelectFormHook>
                    <SelectFormHook
                        name='acute_disease_treatment'
                        tamano='md:w-1/2'
                        register={register}
                        context='Recibe atención y
                        tratamiento para la
                        enfermedad aguda'
                        options={desicions}
                        validations={{
                            valueAsNumber: true,
                            validate: (value: number) => {
                                if (value === 0) {
                                    return 'EL campo es requerido'
                                }
                            }
                        }}
                        errors={errors}
                        placeholder='Elegir'

                    >
                    </SelectFormHook>

                    <SelectMultipleFormHook
                        context='Motivos por los cuales no
                        ha recibido la atención
                        enfermedad aguda'
                        errors={errors}
                        name='reason_for_no_attention'
                        options={optionsArrayReasons}
                        tamano='w-full mt-8'
                        validations={control}
                        placeholder='Seleccion Multiple'>
                    </SelectMultipleFormHook>

                    <SelectMultipleFormHook
                        context='En población étnica, acompañado por agente o medico tradicional'
                        errors={errors}
                        name='medical_care'
                        options={optionsArrayMedical}
                        tamano='w-full mt-8'
                        validations={control}
                        rules={{ required: "campo requerido" }}
                        placeholder='Seleccion Multiple'>
                    </SelectMultipleFormHook>


                    {hidden === 'block' && <div>

                        <SelectFormHook
                            name='breastfeeding'
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
                            context='Lactancia materna exclusiva hasta 6 meses'
                            options={desicions}
                            errors={errors}
                        >
                        </SelectFormHook>
                        <InputNumberFormHook
                            name="breastfeeding_months"
                            tamano='md:w-1/2'
                            register={register}
                            validations={{
                                required: { value: true, message: "El campo es requerido" },
                                valueAsNumber: { value: true, message: "El Valor debe ser Numerico" },
                                min: { value: 0, message: "El Valor debe ser mayor que 0" },
                                max: { value: 25, message: "El Valor debe ser menor que 25" },
                                pattern: /^[0-9]+$/i
                            }}
                            context='Meses lactancia materna menor de dos años'
                            placeholder={"0"}
                            errors={errors}
                            type='number'
                        ></InputNumberFormHook>

                        <InputNumberFormHook
                            name="brachial_perimeter"
                            tamano='md:w-1/2'
                            register={register}
                            validations={{
                                required: { value: true, message: "El campo es requerido" },
                                valueAsNumber: { value: true, message: "El Valor debe ser Numerico" },
                                min: { value: 0, message: "El Valor debe ser mayor que 0" },
                                max: { value: 200, message: "El Valor debe ser menor que 200" },
                                pattern: /^[0-9]+$/i
                            }}
                            context='Perimetro braquial'
                            placeholder={"0"}
                            errors={errors}
                            type='number'
                        ></InputNumberFormHook>
                  

                    </div>}


                    <SelectMultipleFormHook
                            context='Canalizaciones'
                            errors={errors}
                            name='canalization'
                            options={canalizations}
                            tamano='w-full mt-8'
                            validations={control}
                            placeholder='Seleccion Multiple'>
                        </SelectMultipleFormHook>

                    <div className=' basis-full md:pe-4'><Button msg='Siguiente' msgTwo='Cancelar' /></div>

                </form>
            </FormStyle>
        </>
    )
}
export default AtributeMember;