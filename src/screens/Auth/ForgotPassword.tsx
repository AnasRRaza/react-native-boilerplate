import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button, Text } from '@rneui/themed';

import { Input } from '@/components';
import { AUTH_ROUTES, AuthStackNavigationProp } from '@/types/routes';

const ForgotPassword = () => {
  const navigation = useNavigation<AuthStackNavigationProp>();

  return (
    <View style={styles.container}>
      <Text h2>Forgot Password</Text>
      <Text style={styles.subtitle}>Enter your email to reset password</Text>
      <Input
        label="Email"
        placeholder="Enter your email"
        containerStyle={styles.input}
      />
      <Button
        title="Send Reset Link"
        onPress={() =>
          navigation.navigate(AUTH_ROUTES.RESET_PASSWORD, { token: '' })
        }
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

export default ForgotPassword;
