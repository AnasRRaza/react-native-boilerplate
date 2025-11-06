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
import { makeStyles, Text, useTheme } from '@rneui/themed';
import * as Yup from 'yup';

import Button from '@/components/Button';
import Checkbox from '@/components/Checkbox';
import Input from '@/components/Input';
import {
  PRIVACY_POLICY_URL,
  SIGNUP_FORM_FIELDS,
  TERMS_OF_SERVICE_URL,
} from '@/constants/auth';
import { useSignup } from '@/hooks/auth';
import { OTP_TYPE } from '@/types/common';
import { AUTH_ROUTES, AuthStackNavigatorParamList } from '@/types/routes';
import { useToastNotification } from '@/utils';
import { signupSchema } from '@/utils/validationSchemas';

type TSignupForm = Yup.InferType<typeof signupSchema>;

const Signup = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TSignupForm>({
    mode: 'onSubmit',
    resolver: yupResolver(signupSchema),
    defaultValues: {
      email: '',
      password: '',
      confirm_password: '',
      agreeToTerms: false,
    },
  });

  const styles = useStyles();
  const { theme } = useTheme();
  const navigation =
    useNavigation<NavigationProp<AuthStackNavigatorParamList>>();

  const { mutate: signup, isPending } = useSignup();

  const toast = useToastNotification();

  const onSubmit: SubmitHandler<TSignupForm> = data => {
    const payload = {
      email: data.email,
      password: data.password,
    };
    signup(payload, {
      onSuccess: _data => {
        toast(_data.message, 'success');
        navigation.navigate(AUTH_ROUTES.OTP, {
          email: data.email,
          otpType: OTP_TYPE.SIGNUP,
        });
      },
      onError: error => {
        toast(error.message, 'error');
      },
    });
  };

  const handleTermsOfService = useCallback(() => {
    Linking.openURL(TERMS_OF_SERVICE_URL);
  }, []);

  const handlePrivacyPolicy = useCallback(() => {
    Linking.openURL(PRIVACY_POLICY_URL);
  }, []);

  const handleSignin = useCallback(() => {
    navigation.navigate(AUTH_ROUTES.SIGNIN);
  }, []);

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
            name={_field.name as keyof Omit<TSignupForm, 'agreeToTerms'>}
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
                    color={theme.colors.primary}
                  />
                }
                {...field}
              />
            )}
          />
        ))}
        <Controller
          control={control}
          name="agreeToTerms"
          render={({ field: { onChange, value } }) => (
            <Checkbox
              name="agreeToTerms"
              checked={value}
              onPress={() => onChange(!value)}
              title={
                <Text style={styles.privacyPolicy}>
                  I agree to the{' '}
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
              }
              containerStyle={styles.privacyPolicyContainer}
              wrapperStyle={styles.checkboxWrapper}
              errors={errors}
            />
          )}
        />

        <View style={styles.buttonContainer}>
          <Button
            title="Sign Up"
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
                color={theme.colors.primary}
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
              icon={
                <Icon
                  name="logo-apple"
                  size={22}
                  color={theme.colors.white}
                  style={styles.icon}
                />
              }
            />
          )}
        </View>
        <View style={styles.alreadyHaveAccount}>
          <Text style={styles.alreadyHaveAccountText}>
            Already have an account?{' '}
            <Text style={styles.alreadyHaveAccountLink} onPress={handleSignin}>
              Signin
            </Text>
          </Text>
        </View>
        <View style={styles.bottomSpacing} />
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
  orText: {
    textAlign: 'center',
    fontSize: moderateScale(16),
    fontWeight: '400',
    color: theme.colors.grey3,
  },
  buttonContainer: {
    marginTop: verticalScale(10),
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
  checkboxWrapper: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    gap: 10,
  },
  alreadyHaveAccount: {
    alignItems: 'center',
    marginTop: verticalScale(20),
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
  privacyPolicyContainer: {
    padding: 0,
    margin: 0,
  },
  privacyPolicy: {
    fontSize: moderateScale(16),
    fontWeight: '400',
    color: theme.colors.grey1,
  },
  privacyPolicyLink: {
    fontWeight: '500',
    color: theme.colors.primary,
  },
  bottomSpacing: {
    height: 40,
  },
}));
