import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button, Text } from '@rneui/themed';

import { Input } from '@/components';
import { useAuthStore } from '@/store/authStore';
import { AUTH_ROUTES, AuthStackNavigationProp } from '@/types/routes';

const SignIn = () => {
  const navigation = useNavigation<AuthStackNavigationProp>();
  const login = useAuthStore(state => state.login);

  const handleSignIn = () => {
    // Mock login
    login('mock-token', {
      id: '1',
      name: 'Test User',
      email: 'test@example.com',
      isOnboarded: false,
    });
  };

  return (
    <View style={styles.container}>
      <Text h2>Sign In</Text>
      <Input
        label="Email"
        placeholder="Enter your email"
        containerStyle={styles.input}
      />
      <Input
        label="Password"
        placeholder="Enter your password"
        secureTextEntry
        containerStyle={styles.input}
      />
      <Button
        title="Sign In"
        onPress={handleSignIn}
        containerStyle={styles.button}
      />
      <Button
        title="Forgot Password?"
        type="clear"
        onPress={() => navigation.navigate(AUTH_ROUTES.FORGOT_PASSWORD)}
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
  input: {
    marginVertical: 10,
  },
  button: {
    marginVertical: 20,
  },
});

export default SignIn;
