import { getErrorMessage } from '@/utils/utils';
import axios from 'axios';

export const updateProduct = async (product) => {
  try {
    const { data } = await axios.patch(
      `http://localhost:3000/products/${product._id}`
      // `${process.env.NEXT_PUBLIC_BACKEND_URL}/users`
    );
    return { data };
  } catch (error) {
    return {
      error: getErrorMessage(error),
    };
  }
};
