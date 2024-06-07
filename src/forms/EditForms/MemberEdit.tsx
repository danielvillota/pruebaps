import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { API_URL, get, post } from '../../data/api';
import { useForm } from 'react-hook-form';
import { FormStyle } from '../../components/FormStyle';
import { SelectFormHook } from '../../components/select/SelectFormHook';
import { TitleFormText } from '../../components/TitleFormText';
import { memberData } from '../../Props/Interfaces';
import { InputFormHook } from '../../components/inputs/InputFormHook';
import { desicions, type_identification, sex, role, level_education, affiliation_regime, etnia, eps } from '../../data/diccionario'
import { SelectAskFormHook } from '../../components/select/SelectAskFormHook';
import { InputNumberFormHook } from '../../components/inputs/InputNumberFormHook';
import { Button } from '../../components/button/Button';
import Prev from '../../assets/svg/prevInfo.svg'


const MemberEdit = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [val, setval] = useState('')
    const { register, reset, formState: { errors }, control, handleSubmit } = useForm<memberData>();
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const member = await get(`${API_URL}member/?id=${id}`);
                setLoading(false);
                setval(member[0].family)
                // Transformamos los datos recibidos en un formato adecuado para react-hook-form
                const transformedData = {
                    ...member[0],
                    ...member[0].name_person,
                    ...member[0].contact,
                    eps: eps.find(option => option.value === member[0].eps) || { value: '', label: 'Seleccione EPS' }
                };
                reset(transformedData);
                const family = member[0].family.toString();
                localStorage.setItem('FamilyMembers',family)

            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };
        fetchData();
    }, [id, reset]);


    const onSubmit = async (data: memberData) => {
        try {
            const requestData = {
                present_person: data.present_person,
                name_person: {
                    name: data.name,
                    second_name: data.second_name,
                    last_name: data.last_name,
                    second_last_name: data.second_last_name,
                    id_document: data.id_document
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
            };
            console.log(requestData)
            const response = await post(`${API_URL}member/update/${id}/`, requestData)
           
            navigate(`/panelFamily/${response.family}`);
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }

    }
    const buttonCancel = () => {
        if (window.confirm('Estas Seguro de no guardar los cambios')) {
            navigate(`/panelFamily/${val}`);
        }
    };

    return (
        <>
            <div className='w-max p-4 md:p-8'>
               <button onClick={buttonCancel}> <img src={Prev} alt="" className='pl-[5%] w-7 hover:bg-gray-200'   /></button>
               
          
            </div>
            {loading && <div>cargando...</div>}
            {!loading && (
                
                <FormStyle>
                
                    <TitleFormText
                        title='Registro Parte 1'
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
                                pattern: { value: /^[A-Za-z\s]+$/i, message: "El formato no es el correcto" }
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
                                pattern: { value: /^[A-Za-z\s]+$/i, message: "El formato no es el correcto" }
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
                                pattern: { value: /^[A-Za-z\s]+$/i, message: "El formato no es el correcto" }
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
                        <div className=' basis-full md:pe-4'><Button msg='Actualizar' prev={`/atributeMember/${id}`} msgTwo='Registro N°2' /></div>
                    </form>
                </FormStyle>
            )}
        </>
    );
};

export default MemberEdit;
