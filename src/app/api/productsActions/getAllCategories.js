import { BASE_URL } from '@/utils/api';
import { getErrorMessage } from '@/utils/utils';
import axios from 'axios';

export const getAllCategories = async () => {
  try {
    const { data } = await axios(`${BASE_URL}/category`);
    return { data };
  } catch (error) {
    return {
      error: error.response.data.message,
    };
  }
};
