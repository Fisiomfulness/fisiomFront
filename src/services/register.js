import { BASE_URL } from '@/utils/api';
import axios from 'axios';

export const registerForm = async (user) => {
    const response = await axios.post(`${BASE_URL}/register`, user);

    return response;
};

