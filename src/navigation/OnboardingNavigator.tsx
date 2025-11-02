import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createStackNavigator } from '@react-navigation/stack';
import { makeStyles } from '@rneui/themed';

import Privacy from '@/screens/Onboarding/Privacy';
import Profile from '@/screens/Onboarding/Profile';
import {
  ONBOARDING_ROUTES,
  OnboardingStackNavigatorParamList,
} from '@/types/routes';

const Stack = createStackNavigator<OnboardingStackNavigatorParamList>();

const OnboardingNavigator = () => {
  const styles = useStyles();

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name={ONBOARDING_ROUTES.PROFILE} component={Profile} />
        <Stack.Screen name={ONBOARDING_ROUTES.PRIVACY} component={Privacy} />
      </Stack.Navigator>
    </SafeAreaView>
  );
};

export default OnboardingNavigator;

const useStyles = makeStyles(theme => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
}));
