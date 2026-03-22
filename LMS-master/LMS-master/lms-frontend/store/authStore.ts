import { create } from 'zustand';
import { loginApi, registerApi, logoutApi } from '../lib/auth';
import { setAccessToken } from '../lib/apiClient';

interface User { sub: number; email: string; }

interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  setAuth: (token: string, user: User) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  isAuthenticated: false,
  isLoading: false,

  login: async (email, password) => {
    set({ isLoading: true });
    try {
      const data = await loginApi(email, password);
      // Decode JWT payload
      const payload = JSON.parse(atob(data.accessToken.split('.')[1]));
      set({ accessToken: data.accessToken, user: { sub: payload.sub, email: payload.email }, isAuthenticated: true });
    } finally {
      set({ isLoading: false });
    }
  },

  register: async (email, password, name) => {
    set({ isLoading: true });
    try {
      const data = await registerApi(email, password, name);
      const payload = JSON.parse(atob(data.accessToken.split('.')[1]));
      set({ accessToken: data.accessToken, user: { sub: payload.sub, email: payload.email }, isAuthenticated: true });
    } finally {
      set({ isLoading: false });
    }
  },

  logout: async () => {
    await logoutApi();
    setAccessToken(null);
    set({ user: null, accessToken: null, isAuthenticated: false });
  },

  setAuth: (token, user) => {
    setAccessToken(token);
    set({ accessToken: token, user, isAuthenticated: true });
  },

  clearAuth: () => {
    setAccessToken(null);
    set({ user: null, accessToken: null, isAuthenticated: false });
  },
}));
