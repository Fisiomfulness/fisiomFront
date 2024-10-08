import { BASE_URL } from '@/utils/api';

export const hasUserCommentedBlog = async (blogId, userId) => {
  const res = await fetch(`${BASE_URL}/blogs/comments/${blogId}/${userId}/hasCommented`, {
    method: 'GET'
  });
  return await res.json();
};

export const createComment = async (newComment) => {
  const res = await fetch(`${BASE_URL}/blogs/comments/create`, {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify(newComment),
    headers: { 'Content-Type': 'application/json' },
  });
  if (!res.ok) throw new Error('Error creating comment');
  return await res.json();
};

export const getBlogComments = async (blogId, offset = 0, limit = 30) => {
  const res = await fetch(
    `${BASE_URL}/blogs/comments/${blogId}?offset=${offset}&limit=${limit}`,
    {
      method: 'GET',
      cache: 'no-cache',
    }
  );
  if (!res.ok) throw new Error('Error fetching comments');
  return await res.json();
};

export const deleteComment = async (id) => {
  const res = await fetch(`${BASE_URL}/blogs/comments/${id}`, {
    method: 'DELETE',
    credentials: 'include',
  });
  if (!res.ok) throw new Error('Error eliminando el comentario');
  return await res.json();
};
