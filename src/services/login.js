import { BASE_URL } from '@/utils/api';
import axios from 'axios'

export const login = async (user) => {
    const response = await axios.post(`${BASE_URL}/login`, user);

    return response;
};
