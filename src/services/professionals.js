import { BASE_URL } from '@/utils/api';
import axios from 'axios';

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
