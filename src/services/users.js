import { BASE_URL } from '@/utils/api';
import { getErrorMessage } from '@/utils/utils';
import axios from 'axios';
import toast from 'react-hot-toast';

//#region Login
export const axiosLogin = async (user) => {
  return toast.promise(
    axios.post(`${BASE_URL}/login`, user, {
      withCredentials: true,
    }),
    {
      loading: 'Iniciando Sesion...',
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

//#region Register user
export const axiosRegisterUserForm = async (user) => {
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

//#region Register professional
export const axiosRegisterProfessionalForm = async (user) => {
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

export const getUserDetail = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/users/detail/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllUsers = async () => {
  try {
    const { data } = await axios(
      `${BASE_URL}/users/`
      // `${process.env.NEXT_PUBLIC_BACKEND_URL}/users`
    );
    return { data };
  } catch (error) {
    return {
      error: getErrorMessage(error),
    };
  }
};

export const updateUser = (id, newValues) => {
  return axios.put(`${BASE_URL}/users/update/${id}`, newValues, {
    withCredentials: true,
  });
};

// ? Cookie is httpOnly for more security, this is needed.
export const httpLogout = async () => {
  const res = await fetch(`${BASE_URL}/logout`, {
    method: 'GET',
    credentials: 'include',
  });
  if (!res.ok) throw new Error('Oops! vuelva a intentarlo mas tarde..');
  return await res.json();
};
