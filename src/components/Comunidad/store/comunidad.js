import { atom } from "jotai";


export const filtersAtom = atom({
  search: '',
  interestsId: [],
  page: 1,
});
