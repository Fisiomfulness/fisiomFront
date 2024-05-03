import { getErrorMessage } from '@/utils/utils';
import axios from 'axios';

export const deleteProductById = async (id, token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Así se configura el header de autorización
      },
    };

    const { data } = await axios.delete(
      `http://localhost:3000/products/delete/${id}`,
      config
    );
    return { data };
  } catch (error) {
    return {
      error: error.response.data.message,
    };
  }
};
