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
