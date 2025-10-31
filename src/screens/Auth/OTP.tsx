import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button, Text } from '@rneui/themed';

import { Input } from '@/components';
import { AuthStackNavigationProp } from '@/types/routes';

const OTP = () => {
  const navigation = useNavigation<AuthStackNavigationProp>();

  return (
    <View style={styles.container}>
      <Text h2>OTP Verification</Text>
      <Text style={styles.subtitle}>Enter the code sent to your email</Text>
      <Input
        label="OTP Code"
        placeholder="Enter 6-digit code"
        containerStyle={styles.input}
      />
      <Button
        title="Verify"
        onPress={() => navigation.goBack()}
        containerStyle={styles.button}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
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

export default OTP;
