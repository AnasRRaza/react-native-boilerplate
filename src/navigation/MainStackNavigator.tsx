import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Header } from '@/components';
import ChangePassword from '@/screens/App/ChangePassword';
import EditProfile from '@/screens/App/EditProfile';
import { APP_ROUTES, MainStackNavigatorParamList } from '@/types/routes';

import BottomTabNavigator from './BottomTabNavigator';

const Stack = createStackNavigator<MainStackNavigatorParamList>();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        header: props => <Header title={props?.options?.title || ''} isBack />,
      }}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="Dashboard"
        component={BottomTabNavigator}
      />
      <Stack.Screen
        name={APP_ROUTES.EDIT_PROFILE}
        component={EditProfile}
        options={{
          title: 'Edit Profile',
        }}
      />
      <Stack.Screen
        name={APP_ROUTES.CHANGE_PASSWORD}
        component={ChangePassword}
        options={{
          title: 'Change Password',
        }}
      />
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
