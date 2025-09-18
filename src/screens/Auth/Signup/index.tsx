import React, { useCallback } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Ionicons';
import { yupResolver } from '@hookform/resolvers/yup';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Theme } from '@rneui/base';
import { makeStyles, Text } from '@rneui/themed';
import * as Yup from 'yup';

import Button from '@/components/Button';
import Input from '@/components/Input';
import { SIGNUP_FORM_FIELDS } from '@/constants/auth';
import { COLORS } from '@/constants/colors';
import { useSignup } from '@/hooks/useSignup';
import { useToastNotification } from '@/hooks/useToast';
import {
  APP_ROUTES,
  AUTH_ROUTES,
  AuthStackNavigatorParamList,
  STACKS,
  StacksNavigationProp,
} from '@/types/routes';
import { signupValidationSchema } from '@/utils/validationSchema';

type TSignupForm = Yup.InferType<typeof signupValidationSchema>;

const Signup = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TSignupForm>({
    mode: 'onSubmit',
    resolver: yupResolver(signupValidationSchema),
    defaultValues: {
      email: '',
      password: '',
      confirm_password: '',
    },
  });

  const styles = useStyles();
  const navigation =
    useNavigation<NavigationProp<AuthStackNavigatorParamList>>();
  const navigationStack = useNavigation<StacksNavigationProp>();
  const { mutate: signup, isPending } = useSignup();
  const toast = useToastNotification();

  const onSubmit: SubmitHandler<TSignupForm> = data => {
    signup(data, {
      onSuccess: () => {
        toast('Signup successful!', 'success');
        navigationStack.navigate(STACKS.APP, {
          screen: APP_ROUTES.HOME,
        });
      },
      onError: () => {
        toast('Invalid email or password', 'error');
      },
    });
  };

  const handleContinueAnonymously = useCallback(
    () => navigation.navigate(AUTH_ROUTES.PROFILE),
    [navigation],
  );

  const handleSignin = useCallback(
    () => navigation.navigate(AUTH_ROUTES.SIGNIN),
    [navigation],
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Welcome!</Text>
        <Text style={styles.description}>Sign up to your account</Text>
        {SIGNUP_FORM_FIELDS.map(_field => (
          <Controller
            key={_field.name}
            control={control}
            name={_field.name as keyof TSignupForm}
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
        <View style={styles.alreadyHaveAccount}>
          <Text style={styles.alreadyHaveAccountText}>
            Already have an account?{' '}
            <Text style={styles.alreadyHaveAccountLink} onPress={handleSignin}>
              Signin
            </Text>
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Sign Up"
            isShadow
            onPress={handleSubmit(onSubmit)}
            loading={isPending}
          />
          <Text style={styles.orText}>Or continue with</Text>
          <Button
            type="outline"
            title="Continue with Google"
            icon={
              <Icon
                name="logo-google"
                size={22}
                color={COLORS.primary}
                style={styles.icon}
              />
            }
          />
          <Button
            buttonStyle={styles.appleButton}
            titleStyle={styles.appleButtonTitle}
            type="outline"
            title="Continue with Apple"
            icon={
              <Icon
                name="logo-apple"
                size={22}
                color={COLORS.white}
                style={styles.icon}
              />
            }
          />
          <Button
            type="outline"
            title="Continue Anonymously"
            onPress={handleContinueAnonymously}
          />
        </View>
        <View style={styles.privacyPolicyContainer}>
          <Text style={styles.privacyPolicy}>
            By continuing, you agree to our{' '}
            <Text style={styles.privacyPolicyLink}>Privacy Policy</Text> and{' '}
            <Text style={styles.privacyPolicyLink}>Terms of Service</Text>
          </Text>
        </View>
        <View style={styles.spacer} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Signup;

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
  alreadyHaveAccount: {
    alignItems: 'center',
    marginBottom: verticalScale(20),
  },
  alreadyHaveAccountText: {
    fontSize: moderateScale(14),
    fontWeight: '400',
    color: theme.colors.grey3,
  },
  alreadyHaveAccountLink: {
    color: theme.colors.primary,
    fontWeight: '500',
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
  spacer: { height: verticalScale(40) },
}));
