import { BASE_URL } from '@/utils/api';
import axios from 'axios';
import toast from 'react-hot-toast';

export const login = async (user) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, user, {
      withCredentials: true,
    });
    toast.success('Logeado con exito!');
    return response;
  } catch (error) {
    if (error.response) {
      toast.error(error.response.data);
      return false;
    } else {
      toast.error(error.message);
      return false;
    }
  }
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
