'use client';
import { Fragment, useEffect, useState } from 'react';
import { useHydrateAtoms } from 'jotai/utils';
import { questionsAtom } from '@/components/pregunta_experto/store/questions';
import { useSession } from 'next-auth/react';
import QuestionForm from '@/components/pregunta_experto/QuestionForm';
import QuestionFilters from '@/components/pregunta_experto/QuestionFilters';
import QuestionsContainer from '@/components/pregunta_experto/QuestionsContainer';
import Link from 'next/link';
import Loader from '@/components/Loader';

function PreguntaExpertoClient({ initialData, session }) {
  // * State to show the content only when all components are hydrated
  const [loading, setLoading] = useState(true);

  useHydrateAtoms([[questionsAtom, initialData]]);

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) return <Loader />;

  return (
    <Fragment>
      {session ? (
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
    </Fragment>
  );
}

export default PreguntaExpertoClient;
