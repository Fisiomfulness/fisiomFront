import { BASE_URL } from '@/utils/api';

export const createComment = async (newComment) => {
  const res = await fetch(`${BASE_URL}/comments/create`, {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify(newComment),
    headers: { 'Content-Type': 'application/json' },
  });
  if (!res.ok) throw new Error('Error creating comment');
  return await res.json();
};

export const getBlogComments = async (blogId, offset = 0, limit = 30) => {
  const res = await fetch(`${BASE_URL}/comments/blog/${blogId}?offset=${offset}&limit=${limit}`, {
    method: 'GET',
    cache: 'no-cache',
  });
  if (!res.ok) throw new Error('Error fetching comments');
  return await res.json();
};
