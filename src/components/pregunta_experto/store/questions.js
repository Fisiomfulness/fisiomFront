import { getQuestions } from '@/services/questions';
import { atom } from 'jotai';

export const questionsAtom = atom({
  questions: [],
  specialties: [],
  totalQuestions: 0,
  hasMoreToLoad: false,
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

export const deleteQuestionAtom = atom(null, (get, set, idToDelete) => {
  const store = get(questionsAtom);
  const filtered = store.questions.filter((q) => q._id !== idToDelete);
  set(questionsAtom, { ...store, questions: filtered });
});
