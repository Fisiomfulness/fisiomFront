import { BASE_URL } from '@/utils/api';

export const getInterests = async ({ name = '' } = {}) => {
  let query = '';
  if (name && name != '') query = `?name=${name}`;
  const res = await fetch(`${BASE_URL}/interests${query}`, {
    method: 'GET',
    cache: 'no-cache',
  });
  if (!res.ok) throw new Error('Error obteniendo intereses');
  return await res.json();
};
