import React, { useEffect, useState } from 'react'
import { SelectFormHook } from '../../components/select/SelectFormHook'
import { desicions, communicable_disease } from '../../data/diccionario'
import { FormStyle } from '../../components/FormStyle'
import { TitleFormText } from '../../components/TitleFormText'
import { Button } from '../../components/button/Button'
import { useForm } from 'react-hook-form'
import { ContexFamilyData } from '../../Props/Interfaces'
import { useNavigate, useParams } from 'react-router-dom'
import { API_URL, get, post } from '../../data/api'
import { SelectMultipleFormHook } from '../../components/select/SelectMultipleFormHook'
import { getFood } from '../../data/maps'
import { mapValuesToOptions } from './EditAtributesMember'

const EditFamilyContext = () => {
    const { id } = useParams();
    const [val, setVal] = useState<string>();
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { register, formState: { errors }, control, reset, handleSubmit } = useForm<ContexFamilyData>();
    useEffect(() => {
        const fetchData = async () => {
            try {
                setVal(id)
                const familyContext = await get(`${API_URL}family_context/?family=${id}`);
                setLoading(false);
                console.log(familyContext)
                const transformedData = {
                    ...familyContext[0],
                    source_food:mapValuesToOptions(familyContext[0].source_food,getFood),

                };
                reset(transformedData);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };
        fetchData();
    }, [id, reset]);

    const onSubmit = async (data:ContexFamilyData) => {
        let concatOptions: any = [];

    
        const muiltipleOptionsValue = [
          data.source_food,
    
      ]
    
      muiltipleOptionsValue.forEach((element) => {
          const concat: any = [];
          for (const select in element) {
              const valorSelect = element[select];
              concat.push(valorSelect.value)
          }
          concatOptions.push(concat);
      })
    
        try {
          const requestData = {
    
            younger: data.younger,
            pregnant: data.pregnant,
            senior: data.senior,
            victim: data.victim,
            source_food:concatOptions[0],
            descripcion_source: data.descripcion_source,
            healthy_habits: data.healthy_habits,
            socioemotional: data.socioemotional,
            environment_care: data.environment_care,
            healthy_relationships: data.healthy_relationships,
            health_support: data.health_support,
            senior_protection: data.senior_protection,
            family_welfare: data.family_welfare,
            scl_conservation: data.scl_conservation,
            recognition_rights: data.recognition_rights,
            disable: data.disable,
            patient: data.patient,
            infected_person: data.infected_person,
            event_noted: data.event_noted,
            vulneravility: data.vulneravility,
            risk_psychosocial: data.risk_psychosocial,
            antecedent_salud: data.antecedent_salud,
          };
            console.log(requestData)
            await post(`${API_URL}family_context/update/${val}/`, requestData)
            navigate(`/panelFamily/${id}`);
        }catch (error){
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    }
    const buttonCancel = () => {
      if (window.confirm('Estas Seguro de no guardar los cambios')) {
          navigate(`/panelFamily/${id}`);
      }
  };

  return (
    <>{loading && <div>Cargando...</div>}{!loading &&(
        <FormStyle>
        <TitleFormText
          title='Registro'
          text='Caracteristica de la Familia'
        />
        <form onSubmit={handleSubmit(onSubmit)}  className='flex flex-col'>
          <SelectFormHook
            name='younger'
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
            context='Familia con niñas, niños y adolescentes'
            options={desicions}
            errors={errors}
          >
          </SelectFormHook>
          <SelectFormHook
            name='pregnant'
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
            context='Gestante en la familia'
            options={desicions}
            errors={errors}
          >
          </SelectFormHook>
          <SelectFormHook
            name='senior'
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
            context='Familia con personas adultos mayores'
            options={desicions}
            errors={errors}
          >
          </SelectFormHook>
          <SelectFormHook
            name='victim'
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
            context='Familia víctima del conflicto armado'
            options={desicions}
            errors={errors}
          >
          </SelectFormHook>

          <SelectMultipleFormHook
            context='Forma obtención alimentos'
            errors={errors}
            name='source_food'
            options={getFood}
            tamano='w-full mt-8'
            validations={control}
            placeholder='Seleccion Multiple'>
          </SelectMultipleFormHook>

          <SelectFormHook
            name='healthy_habits'
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
            context='Hábitos de vida saludable'
            options={desicions}
            errors={errors}
          >
          </SelectFormHook>


          <SelectFormHook
            name='socioemotional'
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
            context='Recursos potenciadores cuidado de la salud'
            options={desicions}
            errors={errors}
          >
          </SelectFormHook>
          <SelectFormHook
            name='environment_care'
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
            context='Prácticas para el cuidado y protección de los entornos'
            options={desicions}
            errors={errors}
          >
          </SelectFormHook>
          <SelectFormHook
            name='healthy_relationships'
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
            context='Prácticas favorecen relaciones sanas y constructivas'
            options={desicions}
            errors={errors}
          >

          </SelectFormHook>
          <SelectFormHook
            name='health_support'
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
            context='Recursos redes colectivas salud'
            options={desicions}
            errors={errors}
          >
          </SelectFormHook>
          <SelectFormHook
            name='senior_protection'
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
            context='Prácticas autonomía personas mayores'
            options={desicions}
            errors={errors}
          >
          </SelectFormHook>
          <SelectFormHook
            name='family_welfare'
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
            context='Prácticas para la prevención de enfermedades'
            options={desicions}
            errors={errors}
          >
          </SelectFormHook>
          <SelectFormHook
            name='scl_conservation'
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
            context='Prácticas de cuidado desde los saberes ancestrales/tradicionales'
            options={desicions}
            errors={errors}
          >
          </SelectFormHook>
          <SelectFormHook
            name='recognition_rights'
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
            context='Capacidad exigibilidad del derecho a la salud'
            options={desicions}
            errors={errors}
          >
          </SelectFormHook>

          <SelectFormHook
            name='disable'
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
            context='Familia que convive con personas con discapacidad'
            options={desicions}
            errors={errors}
          >
          </SelectFormHook>

          <SelectFormHook
            name='patient'
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
            context='Conviviente enfermedad crónica, huérfana o en estado terminal'
            options={desicions}
            errors={errors}
          >
          </SelectFormHook>
          <SelectFormHook
            name='infected_person'
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
            context='Conviviente enfermedad transmisible'
            options={communicable_disease}
            errors={errors}
          >
          </SelectFormHook>
          <SelectFormHook
            name='event_noted'
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
            context='Conviviente sucesos vitales normativos y no normativos'
            options={desicions}
            errors={errors}
          >
          </SelectFormHook>
          <SelectFormHook
            name='vulneravility'
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
            context='Familia vulnerabilidad social'
            options={desicions}
            errors={errors}
          >
          </SelectFormHook>
          <SelectFormHook
            name='risk_psychosocial'
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
            context='Familias con prácticas de cuidado de salud críticas'
            options={desicions}
            errors={errors}
          >
          </SelectFormHook>
          <SelectFormHook
            name='antecedent_salud'
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
            context='Familia antecedentes crónicos'
            options={desicions}
            errors={errors}
          >
          </SelectFormHook>
          <div className=' basis-full mb-8 md:pe-4'><Button msg='Siguiente' msgTwo='Cancelar' funTwo={buttonCancel}/></div>
        </form>

      </FormStyle>
    )}
    </>
  )
}

export default EditFamilyContext