import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Privacy from '@/screens/Onboarding/Privacy';
import Profile from '@/screens/Onboarding/Profile';
import {
  ONBOARDING_ROUTES,
  OnboardingStackNavigatorParamList,
} from '@/types/routes';

const Stack = createStackNavigator<OnboardingStackNavigatorParamList>();

const OnboardingNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={ONBOARDING_ROUTES.PROFILE} component={Profile} />
      <Stack.Screen name={ONBOARDING_ROUTES.PRIVACY} component={Privacy} />
    </Stack.Navigator>
  );
};

export default OnboardingNavigator;
