/* eslint-disable no-nested-ternary */
import React, { useEffect } from 'react';
import { OneSignal } from 'react-native-onesignal';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { LoadingSpinner } from '@/components';
import { useAppState } from '@/hooks/useAppState';
import { useAuthStore } from '@/store/authStore';
import { useNotificationStore } from '@/store/notificationStore';
import { APP_ROUTES, RootStackParamList, STACKS } from '@/types/routes';

import AppNavigator from './AppNavigator';
import AuthNavigator from './AuthNavigator';
import { navigate, navigationRef } from './NavigationRef';
import OnboardingNavigator from './OnboardingNavigator';

const RootStack = createStackNavigator<RootStackParamList>();

const AppNavigationContainer = () => {
  const { token, user, isInitialized } = useAuthStore();
  const { startSSE, stopSSE, fetchUnreadNotifications } =
    useNotificationStore();
  const { isActive, isBackground, didComeFromBackground } = useAppState();

  // Start/Stop SSE based on authentication state
  useEffect(() => {
    if (token && user?._id) {
      startSSE(user._id, token);
      fetchUnreadNotifications();
    } else {
      stopSSE();
    }

    return () => {
      stopSSE();
    };
  }, [token, user?._id, startSSE, stopSSE, fetchUnreadNotifications]);

  // Handle app state changes (background/foreground)
  useEffect(() => {
    if (didComeFromBackground && isActive && token && user?._id) {
      startSSE(user._id, token);
      fetchUnreadNotifications();
    } else if (isBackground) {
      stopSSE();
    }
  }, [
    isActive,
    isBackground,
    didComeFromBackground,
    token,
    user?._id,
    startSSE,
    stopSSE,
    fetchUnreadNotifications,
  ]);

  // Handle OneSignal push notification click
  useEffect(() => {
    const handleNotificationClick = OneSignal.Notifications.addEventListener(
      'click',
      () => {
        if (navigationRef.isReady()) {
          navigate(STACKS.APP, {
            screen: APP_ROUTES.NOTIFICATIONS,
          });
        }
      },
    );

    return () => {
      handleNotificationClick?.remove();
    };
  }, []);

  // Wait for auth store to rehydrate from AsyncStorage
  if (!isInitialized) {
    return <LoadingSpinner />;
  }

  return (
    <NavigationContainer ref={navigationRef}>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {token ? (
          user?.isOnboarded ? (
            <RootStack.Screen name={STACKS.APP} component={AppNavigator} />
          ) : (
            <RootStack.Screen
              name={STACKS.ONBOARDING}
              component={OnboardingNavigator}
            />
          )
        ) : (
          <RootStack.Screen name={STACKS.AUTH} component={AuthNavigator} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigationContainer;
