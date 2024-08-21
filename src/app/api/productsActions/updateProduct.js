import { BASE_URL } from '@/utils/api';
import { getErrorMessage } from '@/utils/utils';
import axios from 'axios';

export const updateProduct = async (product) => {
  try {
    const { data } = await axios.patch(
      `${BASE_URL}/products/${product._id}`
      // `${process.env.NEXT_PUBLIC_BACKEND_URL}/users`
    );
    return { data };
  } catch (error) {
    return {
      error: getErrorMessage(error),
    };
  }
};
