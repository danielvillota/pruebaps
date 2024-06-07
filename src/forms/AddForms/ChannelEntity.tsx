import { Button } from '../../components/button/Button'
import { FormStyle } from '../../components/FormStyle'
import { InputGeneral } from '../../components/inputs/InputGeneral'
import { TitleFormText } from '../../components/TitleFormText'

export const ChannelEntity = () => {
  return (
    <>
        <FormStyle>
            <TitleFormText
                text='Datos de la Entidad'
            />
            <InputGeneral
                name='name'
                context='Nombre'
                type='text'
                tamano='basis-1/2'
                validations={{required:true}}
            />
            <InputGeneral
                name='type'
                context='tipo'
                type='text'
                tamano='basis-1/2'
                validations={{required:true}}
            />
            <InputGeneral
                name='campus'
                context='Intalaciones'
                type='text'
                tamano='basis-1/2'
                validations={{required:true}}
            />
            <div className=' basis-full md:pe-4'><Button msg='Siguiente' msgTwo='Cancelar' /></div>
        </FormStyle>
    </>
  )
}
