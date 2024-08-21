import { BASE_URL } from '@/utils/api';
import { getErrorMessage } from '@/utils/utils';
import axios from 'axios';

export const createNewProduct = async (product) => {
  try {
    const { data } = await axios.post(
      `${BASE_URL}/products/create`,
      product,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return { data };
  } catch (error) {
    return {
      error: error.response.data.message,
    };
  }
};
