import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { DRAWER_ROUTES, DrawerNavigatorParamList } from '@/types/routes';

import CustomDrawer from './Drawer/CustomDrawer';
import MainStackNavigator from './MainStackNavigator';

const Drawer = createDrawerNavigator<DrawerNavigatorParamList>();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        drawerStyle: {
          width: '80%',
        },
        drawerType: 'front',
      }}>
      <Drawer.Screen
        name={DRAWER_ROUTES.MAIN}
        component={MainStackNavigator}
        options={{
          headerShown: false,
        }}
      />
      {/* Add more drawer screens here as needed */}
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
