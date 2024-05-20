import { getQuestions } from '@/services/questions';
import { apiEndpoints } from '@/api_endpoints';
import PreguntaExpertoClient from './client';

const LIMIT_QUESTIONS = 10;
const iniQuery = { limit: LIMIT_QUESTIONS };

const getSpecialties = async () => {
  const res = await fetch(apiEndpoints.specialties, {
    method: 'GET',
  });
  if (!res.ok) throw new Error('Error obteniendo especialidades');
  return await res.json();
};

const PreguntaExpertoPage = async () => {
  const { questions, totalQuestions } = await getQuestions(iniQuery);
  const { results } = await getSpecialties();
  return (
    <PreguntaExpertoClient
      iniQuestions={questions}
      iniTotalQuestions={totalQuestions}
      iniQuery={iniQuery}
      specialties={results}
    />
  );
};

export default PreguntaExpertoPage;
