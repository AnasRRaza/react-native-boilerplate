import React, { useCallback } from 'react';
import { Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useTheme } from '@rneui/themed';

import { Header } from '@/components';
import Home from '@/screens/App/Home';
import Profile from '@/screens/App/Profile';
import Settings from '@/screens/App/Settings';
import {
  APP_ROUTES,
  BOTTOM_TAB_ROUTES,
  BottomTabParamList,
  MainStackNavigatorParamList,
} from '@/types/routes';

const Tab = createBottomTabNavigator<BottomTabParamList>();

const BottomTabNavigator = () => {
  const { theme } = useTheme();
  const navigation =
    useNavigation<StackNavigationProp<MainStackNavigatorParamList>>();

  const handleNotificationPress = useCallback(() => {
    navigation.navigate(APP_ROUTES.NOTIFICATIONS);
  }, [navigation]);

  return (
    <Tab.Navigator
      screenOptions={{
        header(props) {
          return <Header title={props?.options?.title || ''} />;
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.grey3,
        tabBarStyle: {
          height: Platform.OS === 'ios' ? 90 : 70,
          paddingBottom: Platform.OS === 'ios' ? 20 : 10,
          paddingTop: 10,
          borderTopWidth: 1,
          borderTopColor: theme.colors.grey5,
          backgroundColor: theme.colors.background,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}>
      <Tab.Screen
        name={BOTTOM_TAB_ROUTES.HOME}
        component={Home}
        options={{
          title: 'Home',
          header: () => (
            <Header
              title="Home"
              rightIcon="bell"
              onRightIconPress={handleNotificationPress}
            />
          ),
          tabBarIcon: ({ color, size }) => (
            <Icon name="home-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name={BOTTOM_TAB_ROUTES.SETTINGS}
        component={Settings}
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <Icon name="settings-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name={BOTTOM_TAB_ROUTES.PROFILE}
        component={Profile}
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Icon name="person-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
