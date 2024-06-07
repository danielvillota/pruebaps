import React from 'react'

interface dataFamily {
    object: any
}

export const CardFamily: React.FC<dataFamily> = ({ object }) => {
    const googleMapsUrl = `https://www.google.com/maps?q=${object.info_general.latitud},${object.info_general.longitud}`;

    // Manejar el clic en el enlace para redirigir al usuario
    const handleClick = () => {
        window.location.href = googleMapsUrl;
    };

    return (

        <div className='flex flex-col  space-x-4 text-sm font-semibold bg-white p-4 shadow-md rounded-lg mb-2 text-start'>
            <ul className='text-[#3b82f6] '>
                <b className='font-bold mr-2'>Fecha de Registro: </b> {object.info_general.creation_date}
            </ul>
            <ul>
                <b className='text-black font-semibold' >Departamento: </b> {object.info_general.departament}
            </ul>
            <ul>
                <b className='text-black font-semibold' >Municipio: </b> {object.info_general.municipality}
            </ul>
            <ul>
                <b className='text-black font-semibold mr-2'>Direccion: </b> {object.info_general.address}
            </ul>
            <ul className='flex'>
                <b className='text-black font-semibold mr-2'>Geolocalizacion: </b>
                <a href={googleMapsUrl} onClick={handleClick} target="_blank" rel="noopener noreferrer">
                    <p className='font-semibold text-[#3b82f6]  '>Ver en Google Maps</p>
                </a>
            </ul>
            <ul>
                <b className='text-black font-normal mr-2'>N° Integrantes: </b> {object.total_members}
            </ul>
            <ul>
                <b className='text-black font-normal mr-2'>Tipo de Familia: </b> {object.family_type}
            </ul>
            <ul>
                <b className='text-black font-normal mr-2'>Estrato: </b> {object.info_general.estratum}
            </ul>
            <ul className='flex'>
                <b className='text-black font-normal mr-2'>Prestador Primario: </b> <h4 className='uppercase'> {object.info_general.id_primary_provider}</h4>
            </ul>

            <ul className='flex flex-col justify-center text-center mt-4'>
                <b className='text-black font-semibold text-lg mr-2 mb-2'>Observaciones </b>
                <li className='text-black font-normal text-start texts-sm mr-2 mb-2'>{object.observation}</li>
            </ul>

        </div>

    )
}


