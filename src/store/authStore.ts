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
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    set => ({
      token: null,
      user: null,
      isLoading: false,
      isInitialized: false,

      setToken: token => {
        set({ token });
        setApiAuthToken(token);
      },
      setUser: user => set({ user }),
      setIsLoading: loading => set({ isLoading: loading }),
      setIsInitialized: initialized => set({ isInitialized: initialized }),
      logout: () => {
        set({ token: null, user: null, isLoading: false });
        setApiAuthToken(null);
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
      // persist the token and user data
      partialize: state => ({ token: state.token, user: state.user }),
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
