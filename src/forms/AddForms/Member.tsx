import { FormStyle } from '../../components/FormStyle'
import { desicions, type_identification, sex, role, level_education, affiliation_regime, etnia, eps } from '../../data/diccionario'
import { Button } from '../../components/button/Button'
import { TitleFormText } from '../../components/TitleFormText'
import { SelectFormHook } from '../../components/select/SelectFormHook'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { API_URL } from '../../data/api'
import { InputNumberFormHook } from '../../components/inputs/InputNumberFormHook'
import { SelectAskFormHook } from '../../components/select/SelectAskFormHook'
import { memberData } from '../../Props/Interfaces'
import { InputFormHook } from '../../components/inputs/InputFormHook'

 const Member = () => {
    const { register, handleSubmit, formState: { errors }, control } = useForm<memberData>();
    const navigate = useNavigate();
    const { id } = useParams();


   
   
    const onSubmit = async (data: memberData) => { 
        try {
            const requestData = {
                present_person: data.present_person,
                name_person: {
                      name: data.name,
                      second_name:data.second_name,
                      last_name: data.last_name,
                      second_last_name:data.second_last_name,
                      id_document:data.id_document
                    },
                contact: {
                      email: data.email,
                      telephone: data.telephone
                    },
                type_id: data.type_id,
                date_birth: data.date_birth,
                sex: data.sex,
                role: data.role,
                weight: data.weight,
                size: data.size,
                level_education: data.level_education,
                affiliation_regime: data.affiliation_regime,
                eps: data.eps.value,
                etnia: data.etnia,
                family: id
            };
            console.log(requestData)
            const response = await axios.post(`${API_URL}member/add/`, requestData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
            console.log(response.data)
            localStorage.setItem('person',response.data.id)
            localStorage.setItem('personAge',response.data.date_birth)
            localStorage.setItem('personSize',response.data.size)
            localStorage.setItem('personWeight',response.data.weight)
            localStorage.setItem('family',response.data.family)
            navigate(`/register/atributeMember/${response.data.id}`);
        } catch (error: unknown) {
            if (error.response) {
                const dataError = error.response.data;
                Object.keys(dataError).forEach((key) => {
                  alert(`${key}: ${dataError[key]}`);
                });
            } else if (error.request) {
                alert('Servidor en mantenimiento Intente mas Tarde')
            } else {
                // Algo paso al preparar la petición que lanzo un Error
                console.log('Error', error.message);
            }
        }

    }

    const buttonCancel = () => {
        if (window.confirm('Estas Seguro de Cancelar el registro')) {
            navigate(`/panelFamily/${id}`);
        }
    };

    return (
        <>
            <FormStyle>
                <TitleFormText
                    title='Registro'
                    text='Persona'
                />

                <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col'>
                <InputFormHook
                            name="name"
                            tamano='md:w-1/2'
                            register={register}
                            validations={{
                                required: { value: true, message: "El campo es requerido" },
                                pattern: { value: /^[A-Za-z]+$/i, message: "El formato no es el correcto" }
                            }}
                            type='text'
                            context='Nombre'
                            errors={errors}
                        />

                        <InputFormHook
                            name="second_name"
                            tamano='md:w-1/2'
                            register={register}
                            validations={{
                                pattern: { value: /^[A-Za-z]+$/i, message: "El formato no es el correcto" }
                            }}
                            type='text'
                            context='Segundo nombre'
                            errors={errors}
                        />
                                        <InputFormHook
                            name="last_name"
                            tamano='md:w-1/2'
                            register={register}
                            validations={{
                                required: { value: true, message: "El campo es requerido" },
                                pattern: { value: /^[A-Za-z]+$/i, message: "El formato no es el correcto" }
                            }}
                            type='text'
                            context='Apellido'
                            errors={errors}
                        />

                        <InputFormHook
                            name="second_last_name"
                            tamano='md:w-1/2'
                            register={register}
                            validations={{
                                pattern: { value: /^[A-Za-z]+$/i, message: "El formato no es el correcto" }
                            }}
                            type='text'
                            context='Segundo Apellido'
                            errors={errors}
                        />
                    <SelectFormHook
                        name='present_person'
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
                        context='Es la cabeza de Hogar'
                        options={desicions}
                        errors={errors}
                    >
                    </SelectFormHook>

                    <InputFormHook
                            name="telephone"
                            tamano='md:w-full'
                            register={register}
                            placeholder='+57'
                            validations={{
                                pattern: { value: /^[0-9]+$/i, message: "El formato no es el correcto" },
                                maxLength: { value: 20, message: "Supera el limite real" }
                            }}
                            type='text'
                            context='Telefono de Contacto'
                            errors={errors}
                        />
                        <InputFormHook
                            name="email"
                            tamano='md:w-full'
                            register={register}
                            placeholder='exam@xxx.com'
                            validations={{
                                pattern: {
                                    value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                                    message: "El formato no es el correcto"
                                },

                            }}
                            type='text'
                            context='Corro electronico'
                            errors={errors}
                        />

                    <SelectFormHook
                        name='type_id'
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
                        context='Tipo Identificacion'
                        options={type_identification}
                        errors={errors}
                    >
                    </SelectFormHook>
                    <InputFormHook
                        name="id_document"
                        tamano='md:w-full'
                        register={register}
                        validations={{
                            required: { value: true, message: "El campo es requerido" },
                            pattern: { value: /^[0-9]+$/i, message: "El formato no es el correcto" },
                            maxLength: { value: 20, message: "Supera el limite real" }
                        }}
                        type='text'
                        context='Numero de Documento'
                        errors={errors}
                    />

                    <InputNumberFormHook
                        name="date_birth"
                        tamano='md:w-1/2'
                        register={register}
                        validations={{
                            required: { value: true, message: "El campo es requerido" },
                            maxLength: { value: 250, message: "Supera el limite real" }
                        }}
                        context='Fecha de Nacimiento'
                        placeholder="Elegir"
                        errors={errors}
                        type='date'
                    ></InputNumberFormHook>

                    <SelectFormHook
                        name='sex'
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
                        context='Sexo'
                        options={sex}
                        errors={errors}
                    >
                    </SelectFormHook>

                    <SelectFormHook
                        name='role'
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
                        context='Rol'
                        options={role}
                        errors={errors}
                    >
                    </SelectFormHook>

                    <InputNumberFormHook
                        name="weight"
                        tamano='md:w-1/2'
                        register={register}
                        validations={{
                            required: { value: true, message: "El campo es requerido" },
                            maxLength: { value: 6, message: "Supera el limite real" }
                        }}
                        context='Peso'
                        placeholder=""
                        errors={errors}
                        type='text'
                    ></InputNumberFormHook>
                    
                    <InputNumberFormHook
                        name="size"
                        tamano='md:w-1/2'
                        register={register}
                        validations={{
                            required: { value: true, message: "El campo es requerido" },
                            maxLength: { value: 6, message: "Supera el limite real" }
                        }}
                        context='Talla'
                        placeholder="Peso"
                        errors={errors}
                        type='text'
                    ></InputNumberFormHook>

                    <SelectFormHook
                        name='level_education'
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
                        context='Nivel de Educación'
                        options={level_education}
                        errors={errors}
                    >
                    </SelectFormHook>

                    <SelectFormHook
                        name='affiliation_regime'
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
                        context='Regimen de afiliación'
                        options={affiliation_regime}
                        errors={errors}
                    >
                    </SelectFormHook>


                    <SelectFormHook
                        name='etnia'
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
                        context='etnia'
                        options={etnia}
                        errors={errors}
                    >
                    </SelectFormHook>

                    <SelectAskFormHook
                        context='EPS'
                        errors={errors}
                        name='eps'
                        options={eps}
                        tamano='w-full'
                        register={register}
                        validations={control}
                    ></SelectAskFormHook>
                    <div className=' basis-full md:pe-4'><Button msg='Siguiente' msgTwo='Cancelar' funTwo={buttonCancel}/></div>
                </form>
            </FormStyle>
        </>
    )
}  
export default Member;