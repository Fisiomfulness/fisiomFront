import { BASE_URL } from '@/utils/api';
import axios from 'axios';
import toast from 'react-hot-toast';

export const registerUserForm = async (user) => {
  return toast.promise(
    axios.post(`${BASE_URL}/login/register/user`, user, {
      withCredentials: true,
    }),
    {
      loading: 'Registrandose...',
      success: (response) => response.data.message,
      error: (error) => {
        if (error.response) {
          return error.response.data.message;
        } else {
          return error.message;
        }
      },
    }
  );
};

export const registerProfesionalForm = async (user) => {
  return toast.promise(
    axios.post(`${BASE_URL}/login/register/professional`, user, {
      withCredentials: true,
    }),
    {
      loading: 'Registrandose...',
      success: (response) => response.data.message,
      error: (error) => {
        if (error.response) {
          return error.response.data.message;
        } else {
          return error.message;
        }
      },
    }
  );
};
