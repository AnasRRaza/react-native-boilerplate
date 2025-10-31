import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { MainStackNavigatorParamList } from '@/types/routes';

import BottomTabNavigator from './BottomTabNavigator';

const Stack = createStackNavigator<MainStackNavigatorParamList>();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Dashboard" component={BottomTabNavigator} />
      {/* Add more stack screens here as needed */}
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
