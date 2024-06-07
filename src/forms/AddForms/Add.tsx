import { GenericAddFrom } from '../GenericAddFrom'
import { onSubmit } from '../../data/api';
import { ChannelEntity } from './ChannelEntity';
import { Pipeline } from './Pipeline';







      









//falta en el backend
export const AddChannelEntity = () => {
  return (
    <>
      <GenericAddFrom pad='' fun={onSubmit} to=''>
        <ChannelEntity/>
      </GenericAddFrom>
    </>
  )
}

export const AddPipeline = () => {
  return (
    <>
      <GenericAddFrom pad='' fun={onSubmit} to=''>
        <Pipeline/>
      </GenericAddFrom>
    </>
  )
}


