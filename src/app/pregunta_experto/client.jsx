'use client';
import { useEffect, useState } from 'react';
import { useSetAtom } from 'jotai';
import { questionsAtom } from '@/components/pregunta_experto/store/questions';
import { useSession } from 'next-auth/react';
import QuestionForm from '@/components/pregunta_experto/QuestionForm';
import QuestionFilters from '@/components/pregunta_experto/QuestionFilters';
import QuestionsContainer from '@/components/pregunta_experto/QuestionsContainer';
import Link from 'next/link';
import Loader from '@/components/Loader';

function PreguntaExpertoClient({
  iniQuestions,
  iniQuery,
  totalQuestions,
  specialties,
}) {
  const [loading, setLoading] = useState(true);
  const { data: session, status } = useSession();
  const setQuestions = useSetAtom(questionsAtom);

  useEffect(() => {
    setQuestions({
      questions: iniQuestions,
      query: iniQuery,
      totalQuestions,
      specialties,
    });
    setLoading(false);
  }, [iniQuestions, specialties]);

  return (
    <main className="p-4 min-h-[92vh] w-full max-w-4xl flex flex-col items-center mx-auto gap-4">
      {loading ? (
        <Loader />
      ) : (
        <>
          {status === 'authenticated' ? (
            <QuestionForm />
          ) : (
            <p className="px-3 py-5 bg-primary-500 text-center w-full text-white text-lg">
              <Link
                href="/login"
                className="text-primary-50 hover:underline font-semibold"
              >
                Inicia sesión
              </Link>{' '}
              para enviar una pregunta
            </p>
          )}
          <QuestionFilters />
          <QuestionsContainer />
        </>
      )}
    </main>
  );
}

export default PreguntaExpertoClient;
