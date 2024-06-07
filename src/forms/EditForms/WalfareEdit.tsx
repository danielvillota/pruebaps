import React, { useEffect, useState } from 'react'
import { SelectFormHook } from '../../components/select/SelectFormHook'
import { desicions } from '../../data/diccionario'
import { FormStyle } from '../../components/FormStyle'
import { TitleFormText } from '../../components/TitleFormText'
import { Button } from '../../components/button/Button'
import { useForm } from 'react-hook-form'
import { tenure, permanence, life_style, } from '../../data/diccionario';
import { WalfarData } from '../../Props/Interfaces'
import { useNavigate, useParams } from 'react-router-dom'
import { API_URL, get, post } from '../../data/api'
import { InputNumberFormHook } from '../../components/inputs/InputNumberFormHook'

const WalfareEdit = () => {
    const { id } = useParams();
    const [val, setVal] = useState<string>();
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { register, formState: { errors }, reset, handleSubmit } = useForm<WalfarData>();
    useEffect(() => {
        const fetchData = async () => {
            try {
                setVal(id)
                const walfare = await get(`${API_URL}welfare/?family=${id}`);
                setLoading(false);
                console.log(walfare)
                const transformedData = {
                    ...walfare[0],
                };
                reset(transformedData);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };
        fetchData();
    }, [id, reset]);

    const onSubmit = async (data:WalfarData) => {
      try {
        const requestData = {
            tenure: data.tenure,
            time_residence: data.time_residence,
            permanence: data.permanence,
            lgtbi: data.lgtbi,
            life_style: data.life_style,
            alternative_health: data.alternative_health,
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
    <>{loading && <div>Cargando...</div>}
    {!loading && (
        <FormStyle>
        <TitleFormText
        title='Registro'
            text='Bienestar'
        />

        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col'>
            <SelectFormHook
                name='tenure'
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
                context='Tenencia'
                options={tenure}
                errors={errors}
            >
            </SelectFormHook>
            <SelectFormHook
                name='permanence'
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
                context='Permanencia'
                options={permanence}
                errors={errors}
            >
            </SelectFormHook>
            <InputNumberFormHook
                    name="time_residence"
                    tamano='md:w-1/2'
                    register={register}
                    validations={{
                        required: { value: true, message: "El campo es requerido" },
                        maxLength: { value: 50, message: "Supera el limite real" }
                    }}
                    context='Descripcion detallada breve'
                    errors={errors}
                    type='text'
                ></InputNumberFormHook>
            <SelectFormHook
                name='lgtbi'
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
                context='Existe un miembro dela familia de la comunidad LGTBI'
                options={desicions}
                errors={errors}
            >
            </SelectFormHook>
            <SelectFormHook
                name='life_style'
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
                context='Estilo de Vida'
                options={life_style}
                errors={errors}
            >
            </SelectFormHook>
            <SelectFormHook
                name='alternative_health'
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
                context='Salud alternativa'
                options={desicions}
                errors={errors}
            >
            </SelectFormHook>
            <div className=' basis-full md:pe-4'><Button msg='Actualizar' msgTwo='Cancelar'  funTwo={buttonCancel}/></div>
        </form>
    </FormStyle>  
    )}
    </>
  )
}

export default WalfareEdit