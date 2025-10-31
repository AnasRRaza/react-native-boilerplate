import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Text } from '@rneui/themed';

import { Checkbox } from '@/components';
import { useAuthStore } from '@/store/authStore';

const Privacy = () => {
  const [termsAccepted, setTermsAccepted] = React.useState(false);
  const [privacyAccepted, setPrivacyAccepted] = React.useState(false);
  const updateUser = useAuthStore(state => state.updateUser);

  const handleComplete = () => {
    // Mark user as onboarded
    updateUser({ isOnboarded: true });
  };

  return (
    <ScrollView style={styles.container}>
      <Text h2>Privacy & Terms</Text>
      <Text style={styles.subtitle}>Please review and accept our policies</Text>

      <View style={styles.content}>
        <Text h4 style={styles.sectionTitle}>
          Terms of Service
        </Text>
        <Text style={styles.text}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Text>

        <Text h4 style={styles.sectionTitle}>
          Privacy Policy
        </Text>
        <Text style={styles.text}>
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
          nisi ut aliquip ex ea commodo consequat.
        </Text>

        <Checkbox
          title="I agree to the Terms of Service"
          name="terms"
          checked={termsAccepted}
          onPress={() => setTermsAccepted(!termsAccepted)}
          containerStyle={styles.checkbox}
        />

        <Checkbox
          title="I agree to the Privacy Policy"
          name="privacy"
          checked={privacyAccepted}
          onPress={() => setPrivacyAccepted(!privacyAccepted)}
          containerStyle={styles.checkbox}
        />

        <Button
          title="Complete Onboarding"
          onPress={handleComplete}
          containerStyle={styles.button}
          disabled={!termsAccepted || !privacyAccepted}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  subtitle: {
    marginTop: 10,
    marginBottom: 20,
  },
  content: {
    marginBottom: 40,
  },
  sectionTitle: {
    marginTop: 20,
    marginBottom: 10,
  },
  text: {
    marginBottom: 15,
    lineHeight: 22,
  },
  checkbox: {
    marginVertical: 10,
  },
  button: {
    marginVertical: 30,
  },
});

export default Privacy;
