import { create } from 'zustand';

export const useAuthStore = create<AuthStoreType>((set) => ({
  bearerToken: undefined,
  setBearerToken: (token) => set(() => ({ bearerToken: token })),
  removeBearerToken: () => set({ bearerToken: undefined }),
}));

interface AuthStoreType {
    bearerToken: string | undefined,
    setBearerToken: (token: string) => void,
    removeBearerToken: () => void
}
