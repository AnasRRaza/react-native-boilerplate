import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { setAuthToken as setApiAuthToken } from '../api';
import { User } from '../models';

interface AuthState {
  // State
  token: string | null;
  user: User | null;
  isLoading: boolean;
  isInitialized: boolean;

  // Actions
  setToken: (token: string | null) => void;
  setUser: (user: User | null) => void;
  setIsLoading: (loading: boolean) => void;
  setIsInitialized: (initialized: boolean) => void;
  login: (token: string, user: User) => void;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // Initial State
      token: null,
      user: null,
      isLoading: false,
      isInitialized: false,

      // Set Token
      setToken: token => {
        set({ token });
        setApiAuthToken(token);
      },

      // Set User
      setUser: user => set({ user }),

      // Set Loading
      setIsLoading: loading => set({ isLoading: loading }),

      // Set Initialized
      setIsInitialized: initialized => set({ isInitialized: initialized }),

      // Login - Save token and user
      login: (token, user) => {
        set({
          token,
          user,
          isLoading: false,
        });
        setApiAuthToken(token);
      },

      // Logout - Clear everything
      logout: () => {
        set({
          token: null,
          user: null,
          isLoading: false,
        });
        setApiAuthToken(null);
      },

      // Update User Data
      updateUser: updates => {
        const currentUser = get().user;
        if (currentUser) {
          set({
            user: { ...currentUser, ...updates },
          });
        }
      },

      // Clear Auth (for complete cleanup)
      clearAuth: () => {
        set({
          token: null,
          user: null,
          isLoading: false,
          isInitialized: false,
        });
        setApiAuthToken(null);
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: state => ({
        token: state.token,
        user: state.user,
      }),
      onRehydrateStorage: () => state => {
        if (state) {
          // Set the token in API client after rehydration
          setApiAuthToken(state.token);
          // Mark as initialized
          state.setIsInitialized(true);
        }
      },
    },
  ),
);
