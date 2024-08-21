import { BASE_URL } from '@/utils/api';
import axios from 'axios';

export const deleteComment = async (id, token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Así se configura el header de autorización
      },
    };

    const { data } = await axios.delete(
      `${BASE_URL}/comments/delete/${id}`,
      config
      // `${process.env.NEXT_PUBLIC_BACKEND_URL}/users`
    );
    return { data };
  } catch (error) {
    return {
      error: error.response.data.message,
    };
  }
};
