import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createStackNavigator } from '@react-navigation/stack';
import { makeStyles } from '@rneui/themed';

import ForgotPassword from '@/screens/Auth/ForgotPassword';
import OTP from '@/screens/Auth/OTP';
import ResetPassword from '@/screens/Auth/ResetPassword';
import Signin from '@/screens/Auth/Signin';
import Signup from '@/screens/Auth/Signup';
import Privacy from '@/screens/Onboarding/Privacy';
import Profile from '@/screens/Onboarding/Profile';
import { AUTH_ROUTES, AuthStackNavigatorParamList } from '@/types/routes';

const Stack = createStackNavigator<AuthStackNavigatorParamList>();

const AuthNavigator = () => {
  const styles = useStyles();

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name={AUTH_ROUTES.SIGNIN} component={Signin} />
        <Stack.Screen name={AUTH_ROUTES.SIGNUP} component={Signup} />
        <Stack.Screen name={AUTH_ROUTES.OTP} component={OTP} />
        <Stack.Screen
          name={AUTH_ROUTES.FORGOT_PASSWORD}
          component={ForgotPassword}
        />
        <Stack.Screen
          name={AUTH_ROUTES.RESET_PASSWORD}
          component={ResetPassword}
        />
        <Stack.Screen name={AUTH_ROUTES.PROFILE} component={Profile} />
        <Stack.Screen name={AUTH_ROUTES.PRIVACY} component={Privacy} />
      </Stack.Navigator>
    </SafeAreaView>
  );
};

export default AuthNavigator;

const useStyles = makeStyles(theme => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
}));
