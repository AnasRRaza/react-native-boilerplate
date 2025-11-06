import React from 'react';
import { View } from 'react-native';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import { Theme } from '@rneui/base';
import { Avatar, Divider, makeStyles, Text } from '@rneui/themed';

import { useAuthStore } from '@/store/authStore';

import DrawerItem from './DrawerItem';

const CustomDrawer = (props: DrawerContentComponentProps) => {
  const { user, logout } = useAuthStore();
  const styles = useStyles();

  const menuItems = [
    { title: 'Dashboard', icon: 'home-outline', screen: 'Dashboard' },
    { title: 'Profile', icon: 'person-outline', screen: 'Profile' },
    { title: 'Settings', icon: 'settings-outline', screen: 'Settings' },
  ];

  return (
    <DrawerContentScrollView {...props} style={styles.container}>
      {/* User Profile Section */}
      <View style={styles.profileSection}>
        <Avatar
          size={70}
          rounded
          title={user?.fullName?.charAt(0) || 'U'}
          containerStyle={styles.avatar}
        />
        <Text h4 style={styles.name}>
          {user?.fullName}
        </Text>
        <Text style={styles.email}>{user?.email || 'Anonymous User'}</Text>
      </View>

      <Divider style={styles.divider} />

      {/* Menu Items */}
      <View style={styles.menuSection}>
        {menuItems.map((item, index) => (
          <DrawerItem
            key={index}
            title={item.title}
            icon={item.icon}
            onPress={() => {
              props.navigation.closeDrawer();
              // Navigate to screen if needed
            }}
          />
        ))}
      </View>

      <Divider style={styles.divider} />

      {/* Logout */}
      <View style={styles.footer}>
        <DrawerItem title="Logout" icon="log-out-outline" onPress={logout} />
      </View>
    </DrawerContentScrollView>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 20,
    backgroundColor: theme.colors.background,
  },
  avatar: {
    backgroundColor: theme.colors.primary,
    marginBottom: 15,
  },
  name: {
    marginTop: 10,
    marginBottom: 5,
    color: theme.colors.foreground,
  },
  email: {
    fontSize: 14,
    color: theme.colors.grey2,
  },
  menuSection: {
    paddingVertical: 10,
  },
  divider: {
    marginVertical: 10,
    backgroundColor: theme.colors.divider,
  },
  footer: {
    marginTop: 20,
    paddingBottom: 30,
  },
}));

export default CustomDrawer;
