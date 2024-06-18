import { atom } from "jotai";


export const filtersAtom = atom({
  search: [],
  interestsId: [],
  page: 1,
});


export const locationAtom = atom({
  user: [0, 0]
});