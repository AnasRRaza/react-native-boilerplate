import { createNavigationContainerRef } from '@react-navigation/native';

import { RootStackParamList } from '@/types/routes';

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

export function navigate(name: string, params?: object) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name as keyof RootStackParamList, params as never);
  }
}

export function navigateGoBack() {
  if (navigationRef.isReady()) {
    navigationRef.goBack();
  }
}

export function goBack() {
  if (navigationRef.isReady() && navigationRef.canGoBack()) {
    navigationRef.goBack();
  }
}
