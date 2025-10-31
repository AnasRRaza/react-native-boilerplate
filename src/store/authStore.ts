import { create } from 'zustand';

interface User {
  id: string;
  name: string;
  email: string;
  isOnboarded: boolean;
  // Add more user properties as needed
}

interface AuthState {
  authToken: string | null;
  user: User | null;
  isLoading: boolean;

  // Actions
  setAuthToken: (token: string | null) => void;
  setUser: (user: User | null) => void;
  setIsLoading: (loading: boolean) => void;
  login: (token: string, user: User) => void;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>(set => ({
  authToken: null,
  user: null,
  isLoading: true,

  setAuthToken: token => set({ authToken: token }),

  setUser: user => set({ user }),

  setIsLoading: loading => set({ isLoading: loading }),

  login: (token, user) =>
    set({
      authToken: token,
      user,
      isLoading: false,
    }),

  logout: () =>
    set({
      authToken: null,
      user: null,
      isLoading: false,
    }),

  updateUser: updates =>
    set(state => ({
      user: state.user ? { ...state.user, ...updates } : null,
    })),
}));
