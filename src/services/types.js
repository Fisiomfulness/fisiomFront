import { BASE_URL } from '@/utils/api';

export const getTypes = async () => {
  const res = await fetch(`${BASE_URL}/types`, {
    method: 'GET',
    cache: 'no-cache',
  });
  if (!res.ok) throw new Error('Error fetching types');
  return await res.json();
};
