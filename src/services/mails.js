import { BASE_URL } from '@/utils/api';

export const sendJobPostulation = async (formData) => {
  const res = await fetch(`${BASE_URL}/mail/job-request`, {
    method: 'POST',
    body: formData,
  });
  if (!res.ok) throw new Error('Error sending postulation');
  return await res.json();
};
