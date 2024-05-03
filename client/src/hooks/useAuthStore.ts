import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AUTH_LOCAL_STORAGE } from "../utils/constants";

export type AuthState = {
  token: string | null;
  isLogged: () => boolean;
  setToken: (token: string) => void;
  removeToken: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      isLogged: () => get().token !== null,
      setToken: (token: string) => set({ token }),
      removeToken: () => set({ token: null }),
    }),
    {
      name: AUTH_LOCAL_STORAGE, // default saved to localStorage
    }
  )
);
