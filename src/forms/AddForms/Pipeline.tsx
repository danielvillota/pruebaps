import { Button } from '../../components/button/Button'
import { FormStyle } from '../../components/FormStyle'
import { GeneralSelect } from '../../components/select/GeneralSelect'
import { InputGeneral } from '../../components/inputs/InputGeneral'
import { TitleFormText } from '../../components/TitleFormText'
import {state} from '../../data/diccionario'

export const Pipeline = () => {
  return (
    <>
        <FormStyle>
          <TitleFormText
          text='Caracteristicas de la Tubería' title={''}          />
            {/*este campo es text area preguntar ? */}
            <InputGeneral
                name='channel'
                context='Canal'
                type='text'
                tamano='basis-1/2'
                validations={{required:true}}
            />
            <GeneralSelect
                name='state'
                context='Estado'
                options={state}
                tamano='basis-1/2'
                validations={{required:true}}
            />
            <div className=' basis-full md:pe-4'><Button msg='Siguiente' msgTwo='Cancelar' /></div>
        </FormStyle>
    </>
  )
}
