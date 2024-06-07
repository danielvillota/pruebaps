import axios from 'axios';
import { SubmitFunction } from '../Props/InputProps';
import { useState } from 'react';
import { urlchangue } from '../../url';
import { ErrorMessage } from '@hookform/error-message';

export const API_URL = urlchangue;
localStorage.setItem('id','0')
export const secretKey = '123'

export const onSubmit = async (data, to, pad, navigate, pk) => {
  try {
    if (pk) {
      data[pk] = localStorage.getItem('id');
    }
    console.log(data);
    const response = await axios.post(`${API_URL}${pad}`, data, {
      headers: {
        'Content-Type': 'application/json',
        // Agrega cualquier otro encabezado necesario aquí
      },
    });

    console.log('Respuesta de la API:', response.data);
    localStorage.setItem('id', response.data.id);
    navigate(to);

  } catch (error) {
    console.error('Error al enviar los datos:', error);
    if (error.response.data) {
      const errorMessage = JSON.parse(error.response.data).username[0].string;
      alert(`Error del servidor: ${errorMessage}`);
    } else {
      alert('Error al enviar los datos. Por favor, inténtalo de nuevo más tarde.');
    }
  }
};


export const test = async (id: unknown) => {
  try {
      const url = `${API_URL}family/?id=${id}`;
      const response = await axios.get(url);
      return response.data;
  } catch (error) {
      console.error(error);
      throw error;
  }
}


export const get = async (url:string) => {
  try {
      const response = await axios.get(url);
      return response.data;
  } catch (error) {
      console.error(error);
      throw error;
  }
}


export const post = async (url:string,data:unknown) => {
  try {
      const response = await axios.post(url,data);
      return response.data;
  } catch (error) {
    console.error(error);
      throw error;
  }
}


export const onSubmitGet = async () => {
  return axios.get(`${API_URL}family/1/pollster/`)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.error('Error al enviar los datos:', error);
      throw error; // Para propagar el error hacia arriba
    });
};

export const onSubmitDelete = (id:number) => {
  return axios.delete(`${API_URL}family/${id}/delete/`)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.error('Error al eliminar los datos:', error);
      throw error; // Para propagar el error hacia arriba
    });
};


export const onSubmitAnalit = async () => {
  return axios.get(`${API_URL}info_general/1/donut/`)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.error('Error al enviar los datos:', error);
      throw error; // Para propagar el error hacia arriba
    });
};


export async function getInfoGeneral() {
  try {
    const response = await axios.get(`${API_URL}info_general/1/donut/`);
    return response.data
  } catch (error) {
    console.error(error);
  }
}
