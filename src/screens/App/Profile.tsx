import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Avatar, Button, Text } from '@rneui/themed';

import { useAuthStore } from '@/store/authStore';

const Profile = () => {
  const { user, logout } = useAuthStore();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Avatar
          size={100}
          rounded
          title={user?.fullName?.charAt(0) || 'U'}
          containerStyle={styles.avatar}
        />
        <Text h3 style={styles.name}>
          {user?.fullName}
        </Text>
        <Text style={styles.email}>{user?.email || 'Anonymous User'}</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.infoSection}>
          <Text h4 style={styles.sectionTitle}>
            Account Information
          </Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>User ID:</Text>
            <Text style={styles.infoValue}>{user?._id}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Onboarding Complete:</Text>
            <Text style={styles.infoValue}>
              {user?.isOnboarded ? 'Yes' : 'No'}
            </Text>
          </View>
        </View>

        <Button
          title="Logout"
          onPress={logout}
          containerStyle={styles.button}
          buttonStyle={styles.logoutButton}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    padding: 30,
  },
  avatar: {
    backgroundColor: '#A3B18A',
    marginBottom: 15,
  },
  name: {
    marginTop: 10,
  },
  email: {
    marginTop: 5,
    opacity: 0.7,
  },
  content: {
    padding: 20,
  },
  infoSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    marginBottom: 15,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  infoLabel: {
    fontWeight: '600',
  },
  infoValue: {
    opacity: 0.7,
  },
  button: {
    marginTop: 20,
  },
  logoutButton: {
    backgroundColor: '#ff190c',
  },
});

export default Profile;
