import { create } from 'zustand';

export const useAuthStore = create<AuthStoreType>((set) => ({
  bearerToken: undefined,
  isAuthenticated: false,
  setBearerToken: (token) =>
    set(() => ({ bearerToken: token, isAuthenticated: token.length > 0 })),
  removeBearerToken: () => set({ bearerToken: undefined, isAuthenticated: false }),
}));

interface AuthStoreType {
  bearerToken: string | undefined;
  isAuthenticated: boolean;
  setBearerToken: (token: string) => void;
  removeBearerToken: () => void;
}
