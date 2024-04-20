import { BASE_URL } from '@/utils/api';

export const getBlogs = async ({
  page = 1,
  limit = 9,
  sortBy,
  order,
  search = '',
}) => {
  let query = `?page=${page}&limit=${limit}`;
  if (search !== '') query += `&search=${search}`;
  if (sortBy && order) query += `&sortBy=${sortBy}&order=${order}`;

  const res = await fetch(`${BASE_URL}/blogs${query}`, {
    method: 'GET',
    next: { revalidate: 20 }, // ? Revalidate last blogs after 20 seconds
  });
  if (!res.ok) throw new Error('Error fetching blogs');

  return await res.json();
};

export const getBlogDetail = async (blogId) => {
  const res = await fetch(`${BASE_URL}/blogs/detail/${blogId}`, {
    method: 'GET',
    next: { revalidate: 300 },
  });
  if (!res.ok) throw new Error('Error fetching detail');
  return await res.json();
};

export const createBlog = async (newBlog) => {
  const res = await fetch(`${BASE_URL}/blogs/create`, {
    method: 'POST',
    body: JSON.stringify(newBlog),
    headers: { 'Content-Type': 'application/json' },
  });
  if (!res.ok) throw new Error('Error creating blog');
  return await res.json();
};
