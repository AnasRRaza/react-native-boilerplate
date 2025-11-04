import React from 'react';
import { Text, View } from 'react-native';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { makeStyles } from '@rneui/themed';

import { Button } from '@/components';
import Config from '@/config/app.config';
import { AUTH_ROUTES, AuthStackNavigatorParamList } from '@/types/routes';

type StartScreenNavigationProp = StackNavigationProp<
  AuthStackNavigatorParamList,
  AUTH_ROUTES.START
>;

const Start: React.FC = () => {
  const styles = useStyles();
  const navigation = useNavigation<StartScreenNavigationProp>();

  const handleSignIn = () => {
    navigation.navigate(AUTH_ROUTES.SIGNIN);
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Logo/Branding Section */}
        <View style={styles.logoContainer}>
          {/* Replace with your app logo */}
          <View style={styles.logoPlaceholder}>
            <Text style={styles.logoText}>{Config.APP_NAME}</Text>
          </View>
          <Text style={styles.tagline}>Your Boilerplate for Success</Text>
        </View>

        {/* Welcome Message */}
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeTitle}>Welcome!</Text>
          <Text style={styles.welcomeSubtitle}>
            Get started by signing in or creating a new account
          </Text>
        </View>
      </View>

      {/* Bottom Actions */}
      <View style={styles.actionsContainer}>
        <Button
          title="Sign In"
          onPress={handleSignIn}
          buttonStyle={styles.signInButton}
          titleStyle={styles.signInButtonText}
        />

        <Text style={styles.termsText}>
          By continuing, you agree to our{'\n'}
          <Text style={styles.termsLink}>Terms of Service</Text> and{' '}
          <Text style={styles.termsLink}>Privacy Policy</Text>
        </Text>
      </View>
    </View>
  );
};

const useStyles = makeStyles(theme => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingHorizontal: theme.spacing.lg,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: verticalScale(60),
  },
  logoPlaceholder: {
    width: moderateScale(120),
    height: moderateScale(120),
    borderRadius: moderateScale(60),
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: verticalScale(16),
  },
  logoText: {
    fontSize: moderateScale(20),
    fontWeight: '700',
    color: theme.colors.white,
    textAlign: 'center',
  },
  tagline: {
    fontSize: moderateScale(14),
    color: theme.colors.grey3,
    textAlign: 'center',
  },
  welcomeContainer: {
    alignItems: 'center',
  },
  welcomeTitle: {
    fontSize: moderateScale(32),
    fontWeight: '700',
    color: theme.colors.black,
    marginBottom: verticalScale(12),
  },
  welcomeSubtitle: {
    fontSize: moderateScale(16),
    color: theme.colors.grey2,
    textAlign: 'center',
    lineHeight: moderateScale(24),
  },
  actionsContainer: {
    paddingBottom: verticalScale(40),
  },
  signInButton: {
    borderRadius: moderateScale(12),
    paddingVertical: verticalScale(16),
    backgroundColor: theme.colors.primary,
  },
  signInButtonText: {
    fontSize: moderateScale(16),
    fontWeight: '600',
  },
  guestButton: {
    borderRadius: moderateScale(12),
    paddingVertical: verticalScale(16),
    marginTop: verticalScale(12),
    borderColor: theme.colors.grey4,
  },
  guestButtonText: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    color: theme.colors.grey1,
  },
  termsText: {
    fontSize: moderateScale(12),
    color: theme.colors.grey3,
    textAlign: 'center',
    marginTop: verticalScale(24),
    lineHeight: moderateScale(18),
  },
  termsLink: {
    color: theme.colors.primary,
    fontWeight: '600',
  },
}));

export default Start;
