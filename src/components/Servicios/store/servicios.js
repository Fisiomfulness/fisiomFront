
import { atom } from "jotai";

export const filtersAtom = atom({
  search: "",
  specialtyId: "",
});

export const locationAtom = atom({
    user: [0, 0],
    mapCenter: [0, 0],
    cityId: ""
})

