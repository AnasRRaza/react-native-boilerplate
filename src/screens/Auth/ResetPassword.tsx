import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button, Text } from '@rneui/themed';

import { Input } from '@/components';
import { AuthStackNavigationProp } from '@/types/routes';

const ResetPassword = () => {
  const navigation = useNavigation<AuthStackNavigationProp>();

  return (
    <View style={styles.container}>
      <Text h2>Reset Password</Text>
      <Text style={styles.subtitle}>Enter your new password</Text>
      <Input
        label="New Password"
        placeholder="Enter new password"
        secureTextEntry
        containerStyle={styles.input}
      />
      <Input
        label="Confirm Password"
        placeholder="Confirm new password"
        secureTextEntry
        containerStyle={styles.input}
      />
      <Button
        title="Reset Password"
        onPress={() => navigation.popToTop()}
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

export default ResetPassword;
