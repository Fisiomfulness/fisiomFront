import { getQuestions } from '@/services/questions';
import { atom } from 'jotai';

export const questionsAtom = atom({
  questions: [],
  specialties: [],
  totalQuestions: 0,
  query: {},
});

export const filtersAtom = atom({
  search: '',
  specialtyId: '1',
});

export const updateQuestionAtom = atom(null, (get, set, updatedQuestion) => {
  const store = get(questionsAtom);
  const questionIndex = store.questions.findIndex((q) => q._id === updatedQuestion._id);
  if (questionIndex !== -1) {
    const updatedQuestions = [...store.questions];
    updatedQuestions[questionIndex] = updatedQuestion;
    set(questionsAtom, { ...store, questions: updatedQuestions });
  }
});
