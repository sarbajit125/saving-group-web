import { atom, createStore } from 'jotai';

const tokenAtom = atom(null);
export const authStore = createStore();
authStore.set(tokenAtom, null);
