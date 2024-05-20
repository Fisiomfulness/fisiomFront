import { useEffect } from 'react';
import { useAtom, useAtomValue } from 'jotai';
import { questionsAtom, filtersAtom } from './store/questions';
import { getQuestions } from '@/services/questions';
import Question from './Question';

const QuestionsContainer = () => {
  const filters = useAtomValue(filtersAtom);
  const [store, setStore] = useAtom(questionsAtom);

  useEffect(() => {
    getQuestions({ ...store.query, ...filters }).then((data) =>
      setStore({ ...store, ...data })
    );
  }, [filters]);

  return (
    <div className="w-full flex flex-col gap-4 text-center">
      {store.questions?.length > 0 ? (
        store.questions.map((question) => (
          <Question key={question._id} data={question} />
        ))
      ) : (
        <p>No se encontraron preguntas...</p>
      )}
    </div>
  );
};

export default QuestionsContainer;
