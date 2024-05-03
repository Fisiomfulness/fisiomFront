import { getErrorMessage } from '@/utils/utils';
import axios from 'axios';

export const createNewProduct = async (product) => {
  try {
    const { data } = await axios.post(
      `http://localhost:3000/products/create`,
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
