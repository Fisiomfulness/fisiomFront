import { BASE_URL } from '@/utils/api';

export const verifyToken = async () => {
  const res = await fetch(`${BASE_URL}/auth/verify-token`, {
    method: 'GET',
    credentials: 'include',
  });
  if (!res.ok) throw new Error('No autorizado');
  return await res.json();
};

// ? credentials doesn't exist in server
export const serverSideVerify = async (cookieValue) => {
  const res = await fetch(`${BASE_URL}/auth/verify-token`, {
    method: 'GET',
    headers: {
      Cookie: `accessToken=${cookieValue}`,
    },
  });
  if (!res.ok) throw new Error('No autorizado');
  return await res.json();
};
