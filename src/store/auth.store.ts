import { create } from "zustand";
import type { User } from "@appTypes/auth.types";
import { APP_CONFIG } from "@constants/config";
import { setToken, getToken, clearStorage } from "@utils/storage";

interface AuthStore {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;

  // Actions
  setAuth: (user: User, token: string) => void;
  setUser: (user: User) => void;
  logout: () => void;
  initFromStorage: () => void;
}

/**
 * Global auth state — seperti session di Laravel tapi di sisi browser
 */
export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,

  setAuth: (user, token) => {
    setToken(token);
    localStorage.setItem(APP_CONFIG.USER_KEY, JSON.stringify(user));
    set({ user, token, isAuthenticated: true });
  },

  setUser: (user) => {
    localStorage.setItem(APP_CONFIG.USER_KEY, JSON.stringify(user));
    set({ user });
  },

  logout: () => {
    clearStorage();
    set({ user: null, token: null, isAuthenticated: false });
  },

  // Restore state dari localStorage saat halaman di-refresh
  initFromStorage: () => {
    const token = getToken();
    const rawUser =
      typeof window !== "undefined"
        ? localStorage.getItem(APP_CONFIG.USER_KEY)
        : null;

    if (token && rawUser) {
      try {
        const user = JSON.parse(rawUser) as User;
        set({ user, token, isAuthenticated: true });
      } catch {
        clearStorage();
      }
    }
  },
}));
