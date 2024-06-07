import React, { useEffect, useState } from 'react';
import { useUserContext } from '../../Props/UserProvider';
import { API_URL, get } from '../../data/api';
import { TitleFormText } from '../../components/TitleFormText';
import deleteIcon from '../../assets/svg/delete.svg';
import add from '../../assets/svg/add.svg';
import deleteIncon from '../../assets/svg/cancel.svg';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const NewFiles = () => {
  const user = useUserContext();
  const [newField, setNewField] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    const getField = async () => {
      try {
        const data = await get(`${API_URL}new_fields/?pollster=${user.pollster.pollster.id}`);
        if (data.length === 0) {
          setIsEmpty(true);
        } else {
          setNewField(data);
          setIsEmpty(false);
        }
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };

    getField();
  }, [user.pollster.pollster.id]);

  const onSubmit = async (data) => {
    try {
      const requestData = {
        textJustify: data.textJustify,
        pollster: user.pollster.pollster.id,
      };

      const response = await axios.post(`${API_URL}new_fields/add/`, requestData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Actualizar la lista de newField con el nuevo dato
      setNewField((prevFields) => [...prevFields, response.data]);
      reset();
      setIsOpen(false);
    } catch (error) {
      if (error.response) {
        alert('Registro inválido');
      } else if (error.request) {
        alert('Servidor en mantenimiento. Intente más tarde');
      } else {
        console.log('Error', error.message);
      }
    }
  };

  const handleDelete = async (id, index) => {
    if (window.confirm('¿Estás seguro de eliminar esta novedad?')) {
      try {
        await axios.delete(`${API_URL}new_fields/${id}/delete/`);
        setNewField((prevFields) => prevFields.filter((_, idx) => idx !== index));
      } catch (error) {
        console.log('Error eliminando el campo:', error);
        alert('No se pudo eliminar la novedad. Intenta de nuevo más tarde.');
      }
    }
  };

  return (
    <>
      {loading && (
        <div>
          cargando......
        </div>
      )}
      {!loading && isEmpty && (
        <div className="flex flex-col items-center bg-transparent justify-start w-full h-max p-4 md:p-2">
          <div className="flex flex-col bg-white w-full h-max px-2 rounded-lg">
            <div className="w-full pb-4 md:pl-4">
              <TitleFormText
                title="Novedades"
                text="No se encontraron datos."
              />
              <div className="flex flex-col space-x-4 text-sm font-semibold bg-white p-4 shadow-md rounded-lg mb-2 text-start">
                <div className="text-center text-red-500">
                  <p>No hay datos disponibles para mostrar.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {!loading && !isEmpty && (
        <div className="flex flex-col items-center bg-transparent justify-start w-full h-max p-4 md:p-2">
          <div className="flex flex-col bg-white w-full h-max px-2 rounded-lg">
            <div className="w-full pb-4 md:pl-4">
              <TitleFormText
                title="Listado de"
                text="Novedades"
              />
              <div className="flex flex-col space-x-4 text-sm font-semibold bg-white p-4 shadow-md rounded-lg mb-2 text-start">
                <p className=' text-center font-normal text-gray-400'>Ingresa aqui novedades, casas no encuestada o enventos  a descar en el proceso de recoleccion</p>
                {newField.map((field, index) => {
                  const googleMapsUrl = `https://www.google.com/maps?q=${field.latitud},${field.longitud}`;
                  return (
                    <div key={field.id} className="flex flex-col space-x-4 text-sm font-semibold bg-white p-4 shadow-md rounded-lg mb-2 text-start my-4">
                      <div className='flex justify-end'>
                        <button onClick={() => handleDelete(field.id, index)} className=''>
                          <img src={deleteIcon} className='w-6' alt="delete"/>
                        </button>
                      </div>
                      <div>
                        <ul>
                          <li className='font-bold text-blue-600'>Fecha: {field.creation_date}</li>
                          <li>
                            Geolocalización:
                            <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer">
                              <p className='font-semibold text-[#3b82f6]'>Ver en Google Maps</p>
                            </a>
                          </li>
                          <li className='text-center mt-4'>Observaciones
                            <p className='text-start font-normal'>{field.textJustify}</p>
                          </li>
                        </ul>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className='w-full flex justify-center'>
                <button type='button' onClick={() => setIsOpen(true)} className='flex justify-center mx-36 '>
                  <img src={add} alt="add" />
                </button>
                {isOpen && (
                  <div className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center  z-20'>

                    <div className='bg-white p-5 w-80 rounded flex flex-col justify-center items-center gap-5'>

                    <div className='flex justify-end w-full'>
                          <button onClick={() => setIsOpen(false)}>
                           <img src={deleteIncon}  />
                          </button>
                        </div>
                      <form onSubmit={handleSubmit(onSubmit)}>
                        <div className='font-semibold mb-3'>Describe la Novedad</div>
                        <textarea
                          placeholder='¡Escribe Aqui!'
                          rows={6}
                          {...register('textJustify', { required: true })}
                          className="block mb-6 w-72 rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm"
                        />
                        <div className='flex justify-center'>
                          <button type='submit' className='p-2  basis-1/3 rounded-lg text-white font-medium animated-background bg-gradient-to-r from-blue-600 via-blue-500 to-blue-900 transition ease-in-out delay-200 hover:-translate-y-1 hover:scale-110 duration-300 hover:bg-blue-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
                            Guardar
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NewFiles;
