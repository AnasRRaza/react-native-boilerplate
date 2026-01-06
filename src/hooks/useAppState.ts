import { useEffect, useRef, useState } from 'react';
import { AppState, AppStateStatus } from 'react-native';

interface AppStateInfo {
  currentState: AppStateStatus;
  isActive: boolean;
  isBackground: boolean;
  isInactive: boolean;
  didComeFromBackground: boolean;
}

export const useAppState = (): AppStateInfo => {
  const appStateRef = useRef<AppStateStatus>(AppState.currentState);
  const [currentState, setCurrentState] = useState<AppStateStatus>(
    AppState.currentState,
  );
  const [didComeFromBackground, setDidComeFromBackground] = useState(false);

  useEffect(() => {
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      const wasInBackground =
        appStateRef.current.match(/inactive|background/) !== null;
      const isNowActive = nextAppState === 'active';

      setDidComeFromBackground(wasInBackground && isNowActive);
      setCurrentState(nextAppState);
      appStateRef.current = nextAppState;
    };

    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );

    return () => {
      subscription.remove();
    };
  }, []);

  return {
    currentState,
    isActive: currentState === 'active',
    isBackground: currentState === 'background',
    isInactive: currentState === 'inactive',
    didComeFromBackground,
  };
};
