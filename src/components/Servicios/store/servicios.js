import { atom } from "jotai";


export const filtersAtom = atom({
  search: [],
  specialtyId: "",
  city: "",
  page: 1,
});


export const locationAtom = atom({
  user: [0, 0],
  mapCenter: [0, 0] // is this useful?
});

