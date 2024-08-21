import { BASE_URL } from '@/utils/api';
import { getErrorMessage } from '@/utils/utils';
import axios from 'axios';

export const getAllProducts = async () => {
  try {
    const { data } = await axios(
      `${BASE_URL}/products`
      // `${process.env.NEXT_PUBLIC_BACKEND_URL}/users`
    );
    return { data };
  } catch (error) {
    return {
      error: getErrorMessage(error),
    };
  }
};
