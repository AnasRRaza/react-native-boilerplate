import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createStackNavigator } from '@react-navigation/stack';
import { makeStyles } from '@rneui/themed';

import { APP_ROUTES, AppStackNavigatorParamList } from '@/types/routes';

import DrawerNavigator from './DrawerNavigator';

const Stack = createStackNavigator<AppStackNavigatorParamList>();

const AppNavigator = () => {
  const styles = useStyles();

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name={APP_ROUTES.DRAWER} component={DrawerNavigator} />
      </Stack.Navigator>
    </SafeAreaView>
  );
};

const useStyles = makeStyles(theme => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
}));

export default AppNavigator;
