import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AUTH_LOCAL_STORAGE } from "../../utils/constants";

export type AuthState = {
  token: string | null;
  fullName: string | null;
  isLogged: () => boolean;
  setToken: (token: string, fullName?: string) => void;
  removeToken: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      fullName: null,
      isLogged: () => get().token !== null,
      setToken: (token: string, fullName?: string) => set({ token, fullName }),
      removeToken: () => set({ token: null, fullName: null }),
    }),
    {
      name: AUTH_LOCAL_STORAGE, // default saved to localStorage
    }
  )
);
