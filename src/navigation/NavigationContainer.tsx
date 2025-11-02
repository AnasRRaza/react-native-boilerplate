/* eslint-disable no-nested-ternary */
import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { COLORS } from '@/constants/colors';
import { useAuthStore } from '@/store/authStore';
import { RootStackParamList, STACKS } from '@/types/routes';

import AppNavigator from './AppNavigator';
import AuthNavigator from './AuthNavigator';
import { navigationRef } from './NavigationRef';
import OnboardingNavigator from './OnboardingNavigator';

const RootStack = createStackNavigator<RootStackParamList>();

const AppNavigationContainer = () => {
  const { token, user, isInitialized } = useAuthStore();

  // Wait for auth store to rehydrate from AsyncStorage
  if (!isInitialized) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
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

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

export default AppNavigationContainer;
