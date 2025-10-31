import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import { Avatar, Divider, Text } from '@rneui/themed';

import { useAuthStore } from '@/store/authStore';

import DrawerItem from './DrawerItem';

const CustomDrawer = (props: DrawerContentComponentProps) => {
  const { user, logout } = useAuthStore();

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
          title={user?.name?.charAt(0) || 'U'}
          containerStyle={styles.avatar}
        />
        <Text h4 style={styles.name}>
          {user?.name}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  avatar: {
    backgroundColor: '#A3B18A',
    marginBottom: 15,
  },
  name: {
    marginTop: 10,
    marginBottom: 5,
  },
  email: {
    fontSize: 14,
    opacity: 0.7,
  },
  menuSection: {
    paddingVertical: 10,
  },
  divider: {
    marginVertical: 10,
  },
  footer: {
    marginTop: 20,
    paddingBottom: 30,
  },
});

export default CustomDrawer;
