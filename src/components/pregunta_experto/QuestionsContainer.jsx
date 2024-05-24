import { useState, useEffect } from 'react';
import { useEffectAfterMount } from '@/hooks/useEffectAfterMount';
import { useAtom, useAtomValue } from 'jotai';
import { useInView } from 'react-intersection-observer';
import { questionsAtom, filtersAtom } from './store/questions';
import { getQuestions } from '@/services/questions';
import { Spinner } from '@nextui-org/react';
import Question from './Question';
import roles from '@/utils/roles';

const admins = [roles.ADMIN, roles.SUPER_ADMIN]

const QuestionsContainer = ({ user }) => {
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [store, setStore] = useAtom(questionsAtom);
  const [questionTabId, setQuestionTabId] = useState(null);

  const { ref: bottomContainerRef, inView } = useInView();
  const filters = useAtomValue(filtersAtom);
  const countCurrentQuestions = store.questions.length;
  const canDelete = admins.includes(user?.role)

  useEffectAfterMount(() => {
    setLoading(true);
    getQuestions({ ...store.query, ...filters })
      .then((data) => setStore({ ...store, ...data }))
      .finally(() => {
        setQuestionTabId(null);
        setLoading(false);
      });
  }, [filters]);

  useEffect(() => {
    if (inView && store.hasMoreToLoad) loadMoreQuestions();
  }, [inView]);

  const loadMoreQuestions = async () => {
    if (!loadingMore) {
      setLoadingMore(true);
      getQuestions({ offset: countCurrentQuestions, ...store.query, ...filters })
        .then((data) =>
          setStore({
            ...store,
            ...data,
            questions: [...store.questions, ...data.questions],
          })
        )
        .finally(() => setLoadingMore(false));
    }
  };

  return (
    <div className="w-full grow flex flex-col gap-4 text-center">
      {loading ? (
        <Spinner />
      ) : store.questions?.length > 0 ? (
        <>
          {store.questions.map((question) => (
            <Question
              key={question._id}
              data={question}
              tabOpened={questionTabId === question._id}
              setQuestionTabId={setQuestionTabId}
              canDelete={canDelete}
              user={user}
            />
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
