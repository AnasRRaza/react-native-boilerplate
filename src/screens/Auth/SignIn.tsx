import React, { useCallback } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import {
  KeyboardAvoidingView,
  Linking,
  Platform,
  ScrollView,
  View,
} from 'react-native';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Ionicons';
import { yupResolver } from '@hookform/resolvers/yup';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Theme } from '@rneui/base';
import { makeStyles, Text } from '@rneui/themed';
import * as Yup from 'yup';

import Button from '@/components/Button';
import Input from '@/components/Input';
import {
  PRIVACY_POLICY_URL,
  SIGNIN_FORM_FIELDS,
  TERMS_OF_SERVICE_URL,
} from '@/constants/auth';
import { COLORS } from '@/constants/colors';
import { useLogin } from '@/hooks/auth';
import { useAuthStore } from '@/store/authStore';
import { OTP_TYPE } from '@/types/common';
import {
  AUTH_ROUTES,
  AuthStackNavigatorParamList,
  ONBOARDING_ROUTES,
  STACKS,
  StacksNavigationProp,
} from '@/types/routes';
import { loginSchema, useToastNotification } from '@/utils';

type TLoginForm = Yup.InferType<typeof loginSchema>;

const Login = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TLoginForm>({
    mode: 'onSubmit',
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const styles = useStyles();
  const navigation =
    useNavigation<NavigationProp<AuthStackNavigatorParamList>>();
  const navigationStack = useNavigation<StacksNavigationProp>();

  const { mutate: login, isPending } = useLogin();

  const { setUser, setToken } = useAuthStore();
  const toast = useToastNotification();

  const onSubmit: SubmitHandler<TLoginForm> = data => {
    login(data, {
      onSuccess: async response => {
        if (response?.data) {
          const { token, ...user } = response.data;
          await Promise.all([setToken(token), setUser(user)]);
          if (user.isOnboarded) {
          } else {
            navigationStack.navigate(STACKS.ONBOARDING, {
              screen: ONBOARDING_ROUTES.PROFILE,
            });
          }
        } else {
          navigation.navigate(AUTH_ROUTES.OTP, {
            email: data.email,
            otpType: OTP_TYPE.SIGNUP,
          });
        }
      },
      onError: error => {
        toast(error.message, 'error');
      },
    });
  };

  const handleForgotPassword = useCallback(() => {
    navigation.navigate(AUTH_ROUTES.FORGOT_PASSWORD);
  }, []);

  const handleTermsOfService = useCallback(() => {
    Linking.openURL(TERMS_OF_SERVICE_URL);
  }, []);

  const handlePrivacyPolicy = useCallback(() => {
    Linking.openURL(PRIVACY_POLICY_URL);
  }, []);

  const handleSignup = useCallback(() => {
    navigation.navigate(AUTH_ROUTES.SIGNUP);
  }, []);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Welcome Back!</Text>
          <Text style={styles.signup} onPress={handleSignup}>
            Signup
          </Text>
        </View>
        <Text style={styles.description}>Sign in to your account</Text>
        {SIGNIN_FORM_FIELDS.map(_field => (
          <Controller
            key={_field.name}
            control={control}
            name={_field.name as keyof TLoginForm}
            render={({ field }) => (
              <Input
                key={field.name}
                label={_field.label}
                placeholder={_field.placeholder}
                secureTextEntry={_field.secureTextEntry}
                onChangeText={field.onChange}
                errorMessage={errors?.[field.name]?.message}
                autoCapitalize="none"
                leftIcon={
                  <Icon
                    name={_field.leftIcon}
                    size={22}
                    color={COLORS.primary}
                  />
                }
                {...field}
              />
            )}
          />
        ))}
        <View style={styles.forgotPasswordContainer}>
          <Text style={styles.forgotPassword} onPress={handleForgotPassword}>
            Forgot Password?
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Sign In"
            onPress={handleSubmit(onSubmit)}
            loading={isPending}
          />
          <Text style={styles.orText}>Or continue with</Text>
          <Button
            type="outline"
            title="Continue with Google"
            onPress={() => {}}
            icon={
              <Icon
                name="logo-google"
                size={22}
                color={COLORS.primary}
                style={styles.icon}
              />
            }
          />
          {Platform.OS === 'ios' && (
            <Button
              buttonStyle={styles.appleButton}
              titleStyle={styles.appleButtonTitle}
              type="outline"
              title="Continue with Apple"
              onPress={() => {}}
              icon={
                <Icon
                  name="logo-apple"
                  size={22}
                  color={COLORS.white}
                  style={styles.icon}
                />
              }
            />
          )}
        </View>
        <View style={styles.privacyPolicyContainer}>
          <Text style={styles.privacyPolicy}>
            By continuing, you agree to our{' '}
            <Text
              style={styles.privacyPolicyLink}
              onPress={handlePrivacyPolicy}>
              Privacy Policy
            </Text>{' '}
            and{' '}
            <Text
              style={styles.privacyPolicyLink}
              onPress={handleTermsOfService}>
              Terms of Service
            </Text>
          </Text>
        </View>
        <View style={styles.spacer} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Login;

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  signup: {
    fontSize: moderateScale(16),
    fontWeight: '400',
    color: theme.colors.primary,
    marginRight: moderateScale(8),
  },
  title: {
    fontSize: moderateScale(24),
    fontWeight: '500',
    color: theme.colors.foreground,
  },
  description: {
    fontSize: moderateScale(16),
    fontWeight: '400',
    color: theme.colors.grey2,
    marginTop: verticalScale(10),
    marginBottom: verticalScale(20),
  },
  forgotPasswordContainer: {
    alignItems: 'center',
    marginBottom: verticalScale(20),
  },
  forgotPassword: {
    fontSize: moderateScale(16),
    fontWeight: '500',
    color: theme.colors.primary,
  },
  orText: {
    textAlign: 'center',
    fontSize: moderateScale(16),
    fontWeight: '400',
    color: theme.colors.grey3,
  },
  buttonContainer: {
    gap: verticalScale(14),
  },
  appleButton: {
    backgroundColor: theme.colors.black,
    borderColor: theme.colors.black,
  },
  appleButtonTitle: {
    color: theme.colors.white,
  },
  icon: {
    marginRight: moderateScale(10),
  },
  privacyPolicyContainer: {
    alignItems: 'center',
    marginTop: verticalScale(20),
  },
  privacyPolicy: {
    textAlign: 'center',
    fontSize: moderateScale(16),
    fontWeight: '400',
    color: theme.colors.grey1,
  },
  privacyPolicyLink: {
    color: theme.colors.primary,
  },
  spacer: {
    height: verticalScale(40),
  },
}));
