import { BASE_URL } from '@/utils/api';

export const getBlogs = async () => {
  const res = await fetch(`${BASE_URL}/blogs`, {
    method: 'GET',
  });
  if (!res.ok) throw new Error('Error fetching blogs');
  return await res.json();
};

export const getBlogDetail = async (blogId) => {
  const res = await fetch(`${BASE_URL}/blogs/detail/${blogId}`, {
    method: 'GET',
  });
  if (!res.ok) throw new Error('Error fetching detail');
  return await res.json();
};
