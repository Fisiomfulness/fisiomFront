import { BASE_URL } from '@/utils/api';

export const getQuestions = async ({
  offset = 0,
  limit = 30,
  specialtyId,
  search,
}) => {
  let query = `?offset=${offset}&limit=${limit}`;
  if (specialtyId && specialtyId !== '1') query += `&specialtyId=${specialtyId}`;
  if (search && search != '') query += `&search=${search}`;
  const res = await fetch(`${BASE_URL}/questions${query}`, {
    method: 'GET',
    cache: 'no-cache',
  });
  if (!res.ok) throw new Error('Error obteniendo preguntas');
  return await res.json();
};

export const createQuestion = async (values) => {
  const res = await fetch(`${BASE_URL}/questions/create`, {
    method: 'POST',
    body: JSON.stringify(values),
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  });
  if (!res.ok) throw new Error('Error creando la pregunta');
  return await res.json();
};

export const respondQuestion = async (questionId, values) => {
  const res = await fetch(`${BASE_URL}/questions/response/${questionId}`, {
    method: 'PUT',
    body: JSON.stringify(values),
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  });
  if (!res.ok) throw new Error('Error respondiendo a la pregunta');
  return await res.json();
};

export const deleteQuestion = async (questionId) => {
  const res = await fetch(`${BASE_URL}/questions/${questionId}`, {
    method: 'DELETE',
    credentials: 'include',
  });
  if (!res.ok) throw new Error('Error eliminando la pregunta');
};
