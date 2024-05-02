import { getErrorMessage } from '@/utils/utils';
import axios from 'axios';

export const getAllProfessionals = async () => {
  try {
    const { data } = await axios(
      `http://localhost:3000/professionals`
      // `${process.env.NEXT_PUBLIC_BACKEND_URL}/users`
    );
    return { data };
  } catch (error) {
    return {
      error: getErrorMessage(error),
    };
  }
};
