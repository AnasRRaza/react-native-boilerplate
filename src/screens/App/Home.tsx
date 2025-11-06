import React from 'react';
import { ScrollView, View } from 'react-native';
import { Theme } from '@rneui/base';
import { makeStyles, Text } from '@rneui/themed';

import { useAuthStore } from '@/store/authStore';

const Home = () => {
  const user = useAuthStore(state => state.user);
  const styles = useStyles();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text h2 style={styles.welcomeText}>
          Welcome, {user?.fullName}!
        </Text>
      </View>

      <View style={styles.content}>
        <Text h4 style={styles.sectionTitle}>
          Quick Stats
        </Text>
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text h3 style={styles.statNumber}>
              0
            </Text>
            <Text style={styles.statLabel}>Projects</Text>
          </View>
          <View style={styles.statCard}>
            <Text h3 style={styles.statNumber}>
              0
            </Text>
            <Text style={styles.statLabel}>Tasks</Text>
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

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    padding: 20,
  },
  welcomeText: {
    color: theme.colors.foreground,
  },
  subtitle: {
    marginTop: 10,
    color: theme.colors.grey2,
  },
  content: {
    padding: 20,
  },
  sectionTitle: {
    marginTop: 20,
    marginBottom: 15,
    color: theme.colors.foreground,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  statCard: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: theme.colors.grey4,
    borderRadius: 12,
    flex: 1,
    marginHorizontal: 5,
  },
  statNumber: {
    color: theme.colors.foreground,
  },
  statLabel: {
    color: theme.colors.grey2,
  },
  emptyText: {
    textAlign: 'center',
    color: theme.colors.grey2,
    marginVertical: 20,
  },
}));

export default Home;
