/* eslint-disable no-nested-ternary */
import React, { useEffect } from 'react';
import { NavigationContainer as RNNavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { useAuthStore } from '@/store/authStore';
import { RootStackParamList, STACKS } from '@/types/routes';

import AppNavigator from './AppNavigator';
import AuthNavigator from './AuthNavigator';
import { navigationRef } from './NavigationRef';
import OnboardingNavigator from './OnboardingNavigator';

const RootStack = createStackNavigator<RootStackParamList>();

const AppNavigationContainer = () => {
  const { authToken, user, isLoading, setIsLoading } = useAuthStore();

  useEffect(() => {
    // Initialize app - check for stored auth token
    // This is where you would restore auth state from AsyncStorage
    const initializeAuth = () => {
      try {
        // TODO: Check AsyncStorage for auth token
        // const token = await AsyncStorage.getItem('authToken');
        // if (token) {
        //   // Validate token and get user data
        // }
      } catch (error) {
        console.error('Error initializing auth:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  if (isLoading) {
    // TODO: Show splash screen or loading indicator
    return null;
  }

  return (
    <RNNavigationContainer ref={navigationRef}>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {authToken ? (
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
    </RNNavigationContainer>
  );
};

export default AppNavigationContainer;
