import { apiEndpoints } from '@/api_endpoints';
import { BASE_URL } from '@/utils/api';
import axios from 'axios';
import toast from 'react-hot-toast';

export const getProfessionalDetail = async (professionalId) => {
  try {
    const response = await axios.get(apiEndpoints.professionalsDetail + professionalId, { withCredentials: true });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const getProfessionalRatings = async (
  professionalId,
  offset = 0,
  limit = 30
) => {
  try {
    const response = await axios.get(
      `${apiEndpoints.professionalRating + professionalId}?offset=${offset}&limit=${limit}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const hasUserCommented = async (professionalId, userId) => {
  try {
    const response = await axios.get(`${BASE_URL}/professionals/rating/${professionalId}/${userId}/hasCommented`);
    return response.data.hasCommented;
  } catch (error) {
    throw error;
  }
};

export const addExperience = async (professionalId, newExperience) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/professionals/${professionalId}/experience`,
      newExperience,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateExperience = async (
  professionalId,
  experienceId,
  updatedExperience
) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/professionals/${professionalId}/experience/${experienceId}`,
      updatedExperience,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteExperience = async (professionalId, experienceId) => {
  try {
    const response = await axios.delete(
      `${BASE_URL}/professionals/${professionalId}/experience/${experienceId}`,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAvailability = async (userId) => {
  try {
    const response = await axios.get(`${BASE_URL}/professionals/availability/${userId}`
    )
    return response.data.availability
  } catch (error) {
    throw error
  }
}

export const postAvailability = async (userId, newData) => {
  /* return toast.promise(axios.post(`${BASE_URL}/professionals/availability/${userId}`
    , newData), {
    loading: "Actulizando Disponibilidad...",
    success: (response) => response.data.message,
    error: 'Ups! Algo salio mal...'
  }) */
  try {
    const response = await axios.post(`${BASE_URL}/professionals/availability/${userId}`, newData)
    toast.success(response.data.message)
    return response.data.userAvailability
  } catch (error) {
    console.log(error);
    return toast.error(error.response.message)
  }
}