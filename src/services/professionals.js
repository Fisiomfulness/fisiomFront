import { apiEndpoints } from '@/api_endpoints';
import { BASE_URL } from '@/utils/api';
import axios from 'axios';

export const getProfessionalDetail = async (professionalId) => {
  try {
    const response = await axios.get(
      apiEndpoints.professionalsDetail + professionalId
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getProfessionalRatings = async (
  professionalId,
  offset = 0,
  limit = 30
) => {
  try {
    const response = await axios.get(
      `${
        apiEndpoints.professionalRating + professionalId
      }?offset=${offset}&limit=${limit}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const hasUserCommented = async (professionalId, userId) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/professionals/rating/${professionalId}/${userId}/hasCommented`
    );
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

export const createService = async (values) => {
  try {
    const response = await axios.post(`${BASE_URL}/services`, values, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
