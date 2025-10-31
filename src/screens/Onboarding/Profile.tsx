import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button, Text } from '@rneui/themed';

import { Input, TextArea } from '@/components';
import {
  ONBOARDING_ROUTES,
  OnboardingStackNavigationProp,
} from '@/types/routes';

const Profile = () => {
  const navigation = useNavigation<OnboardingStackNavigationProp>();

  return (
    <View style={styles.container}>
      <Text h2>Complete Your Profile</Text>
      <Text style={styles.subtitle}>Tell us about yourself</Text>
      <Input
        label="Full Name"
        placeholder="Enter your full name"
        containerStyle={styles.input}
      />
      <Input
        label="Phone Number"
        placeholder="Enter your phone number"
        containerStyle={styles.input}
      />
      <TextArea
        label="Bio"
        placeholder="Tell us about yourself"
        containerStyle={styles.input}
      />
      <Button
        title="Next"
        onPress={() => navigation.navigate(ONBOARDING_ROUTES.PRIVACY)}
        containerStyle={styles.button}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  subtitle: {
    marginTop: 10,
    marginBottom: 30,
  },
  input: {
    marginVertical: 10,
  },
  button: {
    marginVertical: 20,
  },
});

export default Profile;
