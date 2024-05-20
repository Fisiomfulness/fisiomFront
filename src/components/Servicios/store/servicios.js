
import { atom } from "jotai";

export const filtersAtom = atom({
  search: ["ciudad:Rosario", "Cruz"],
  specialtyId: "",
});

export const locationAtom = atom({
    user: [0, 0],
    mapCenter: [0, 0],
    cityId: ""
})

