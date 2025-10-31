import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ForgotPassword from '@/screens/Auth/ForgotPassword';
import OTP from '@/screens/Auth/OTP';
import ResetPassword from '@/screens/Auth/ResetPassword';
import SignIn from '@/screens/Auth/SignIn';
import { AUTH_ROUTES, AuthStackNavigatorParamList } from '@/types/routes';

const Stack = createStackNavigator<AuthStackNavigatorParamList>();

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={AUTH_ROUTES.SIGNIN}>
      <Stack.Screen name={AUTH_ROUTES.SIGNIN} component={SignIn} />
      <Stack.Screen name={AUTH_ROUTES.OTP} component={OTP} />
      <Stack.Screen
        name={AUTH_ROUTES.FORGOT_PASSWORD}
        component={ForgotPassword}
      />
      <Stack.Screen
        name={AUTH_ROUTES.RESET_PASSWORD}
        component={ResetPassword}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
