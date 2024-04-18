import { BASE_URL } from '@/utils/api';

export const createComment = async (newComment) => {
  const res = await fetch(`${BASE_URL}/comments/create`, {
    method: 'POST',
    body: JSON.stringify(newComment),
    headers: { 'Content-Type': 'application/json' },
  });
  if (!res.ok) throw new Error('Error creating comment');
  return await res.json();
};
