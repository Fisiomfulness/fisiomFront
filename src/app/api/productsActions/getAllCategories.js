import { getErrorMessage } from '@/utils/utils';
import axios from 'axios';

export const getAllCategories = async () => {
  try {
    const { data } = await axios(`http://localhost:3000/category`);
    return { data };
  } catch (error) {
    return {
      error: error.response.data.message,
    };
  }
};
