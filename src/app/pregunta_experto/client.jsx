'use client';
import { Fragment, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useHydrateAtoms } from 'jotai/utils';
import { questionsAtom } from '@/components/pregunta_experto/store/questions';
import QuestionForm from '@/components/pregunta_experto/QuestionForm';
import QuestionFilters from '@/components/pregunta_experto/QuestionFilters';
import QuestionsContainer from '@/components/pregunta_experto/QuestionsContainer';
import Link from 'next/link';
import Loader from '@/components/Loader';

function PreguntaExpertoClient({ initialData }) {
  // * State to show the content only when all components are hydrated
  const [loading, setLoading] = useState(true);
  const { data: session, status } = useSession();

  useHydrateAtoms([[questionsAtom, initialData]]);

  useEffect(() => {
    if (status !== 'loading') setLoading(false);
  }, [status]);

  if (loading) return <Loader />;

  return (
    <Fragment>
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
      <QuestionsContainer user={session?.user} />
    </Fragment>
  );
}

export default PreguntaExpertoClient;
