import { atom } from 'jotai';

export const myServicesAtom = atom({
  services: [],
  query: {},
  totalServices: 0,
  hasMoreToLoad: false,
});

export const updateServiceAtom = atom(null, (get, set, updatedService) => {
  const store = get(myServicesAtom);
  const foundIndex = store.services.findIndex((q) => q._id === updatedService._id);
  if (foundIndex !== -1) {
    const updatedServices = [...store.services];
    updatedServices[foundIndex] = updatedService;
    set(myServicesAtom, { ...store, services: updatedServices });
  }
});

export const deleteServiceAtom = atom(null, (get, set, idToDelete) => {
  const store = get(myServicesAtom);
  const filtered = store.services.filter((q) => q._id !== idToDelete);
  set(myServicesAtom, { ...store, services: filtered });
});
