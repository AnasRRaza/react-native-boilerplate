import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type ThemeMode = 'light' | 'dark';

interface ThemeState {
  mode: ThemeMode;
  isInitialized: boolean;
  setMode: (mode: ThemeMode) => void;
  toggleMode: () => void;
  setIsInitialized: (initialized: boolean) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    set => ({
      mode: 'light',
      isInitialized: false,

      setMode: mode => set({ mode }),
      toggleMode: () =>
        set(state => ({ mode: state.mode === 'light' ? 'dark' : 'light' })),
      setIsInitialized: initialized => set({ isInitialized: initialized }),
    }),
    {
      name: 'theme-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: state => ({ mode: state.mode }),
      onRehydrateStorage: () => state => {
        if (state) {
          state.setIsInitialized(true);
        }
      },
    },
  ),
);
