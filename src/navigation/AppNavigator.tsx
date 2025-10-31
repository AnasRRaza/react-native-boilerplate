import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createStackNavigator } from '@react-navigation/stack';
import { useTheme } from '@rneui/themed';

import { APP_ROUTES, AppStackNavigatorParamList } from '@/types/routes';

import DrawerNavigator from './DrawerNavigator';

const Stack = createStackNavigator<AppStackNavigatorParamList>();

const AppNavigator = () => {
  const { theme } = useTheme();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name={APP_ROUTES.DRAWER} component={DrawerNavigator} />
      </Stack.Navigator>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default AppNavigator;
