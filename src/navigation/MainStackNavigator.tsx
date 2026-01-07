import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Header } from '@/components';
import ChangePassword from '@/screens/App/ChangePassword';
import { ChatConversation, ChatList } from '@/screens/App/Chat';
import EditProfile from '@/screens/App/EditProfile';
import Notifications from '@/screens/App/Notifications';
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
      <Stack.Screen
        name={APP_ROUTES.NOTIFICATIONS}
        component={Notifications}
        options={{
          title: 'Notifications',
        }}
      />
      <Stack.Screen
        name={APP_ROUTES.CHAT_LIST}
        component={ChatList}
        options={{
          title: 'Messages',
        }}
      />
      <Stack.Screen
        name={APP_ROUTES.CHAT_CONVERSATION}
        component={ChatConversation}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
