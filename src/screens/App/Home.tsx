import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Text } from '@rneui/themed';

import { useAuthStore } from '@/store/authStore';

const Home = () => {
  const user = useAuthStore(state => state.user);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text h2>Welcome, {user?.fullName}!</Text>
        <Text style={styles.subtitle}>Home Screen</Text>
      </View>

      <View style={styles.content}>
        <Text h4 style={styles.sectionTitle}>
          Quick Stats
        </Text>
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text h3>0</Text>
            <Text>Projects</Text>
          </View>
          <View style={styles.statCard}>
            <Text h3>0</Text>
            <Text>Tasks</Text>
          </View>
        </View>

        <Text h4 style={styles.sectionTitle}>
          Recent Activity
        </Text>
        <Text style={styles.emptyText}>No recent activity</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
  },
  subtitle: {
    marginTop: 10,
    opacity: 0.7,
  },
  content: {
    padding: 20,
  },
  sectionTitle: {
    marginTop: 20,
    marginBottom: 15,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  statCard: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    flex: 1,
    marginHorizontal: 5,
  },
  emptyText: {
    textAlign: 'center',
    opacity: 0.5,
    marginVertical: 20,
  },
});

export default Home;
