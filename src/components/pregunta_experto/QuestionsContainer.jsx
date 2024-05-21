import { useState, useEffect } from 'react';
import { useEffectAfterMount } from '@/hooks/useEffectAfterMount';
import { useAtom, useAtomValue } from 'jotai';
import { useInView } from 'react-intersection-observer';
import { questionsAtom, filtersAtom } from './store/questions';
import { getQuestions } from '@/services/questions';
import { Spinner } from '@nextui-org/react';
import Question from './Question';

const QuestionsContainer = () => {
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [store, setStore] = useAtom(questionsAtom);

  const { ref: bottomContainerRef, inView } = useInView();
  const filters = useAtomValue(filtersAtom);
  const countCurrentQuestions = store.questions.length;

  useEffectAfterMount(() => {
    setLoading(true);
    getQuestions({ ...store.query, ...filters })
      .then((data) => setStore({ ...store, ...data }))
      .finally(() => setLoading(false));
  }, [filters]);

  useEffect(() => {
    if (inView) loadMoreQuestions();
  }, [inView]);

  const loadMoreQuestions = async () => {
    if (!loadingMore && countCurrentQuestions < store.totalQuestions) {
      setLoadingMore(true);
      getQuestions({ offset: countCurrentQuestions, ...store.query, ...filters })
        .then((data) =>
          setStore({...store, questions: [...store.questions, ...data.questions]})
        )
        .finally(() => setLoadingMore(false));
    }
  };

  return (
    <div className="w-full grow flex flex-col gap-4 text-center overflow-y-auto">
      {loading ? (
        <Spinner />
      ) : store.questions?.length > 0 ? (
        <>
          {store.questions.map((question) => (
            <Question key={question._id} data={question} />
          ))}
          <div ref={bottomContainerRef}>{loadingMore && <Spinner />}</div>
        </>
      ) : (
        <p>No se encontraron preguntas...</p>
      )}
    </div>
  );
};

export default QuestionsContainer;
